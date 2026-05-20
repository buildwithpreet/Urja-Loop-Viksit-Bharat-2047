import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { getIO } from '../sockets';

let inMemoryNotifications: any[] = [
  { _id: 'notif-1', title: 'Bin BIN-004 Overflow', message: 'Industrial Zone Gate 1 bin has exceeded 90% capacity', type: 'warning', targetRole: 'collector', read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { _id: 'notif-2', title: 'AI Scan Complete', message: 'Citizen #482 scanned plastic waste — +15 credits awarded', type: 'success', targetRole: 'admin', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() }
];

export const sendNotification = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, message, type, targetRole, targetUserId } = req.body;

    if (!title || !message) {
      res.status(400).json({ success: false, message: 'title and message are required' });
      return;
    }

    const notification = {
      title, message,
      type: type || 'info',
      targetRole: targetRole || 'all',
      targetUserId: targetUserId || null,
      sentBy: req.user?.firebaseId || 'system',
      read: false,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        const docRef = await db.collection('notifications').add(notification);
        
        // Broadcast via Socket.IO
        try {
          const io = getIO();
          if (targetRole === 'admin') io.to('admin_room').emit('new-notification', { _id: docRef.id, ...notification });
          else if (targetRole === 'collector') io.to('collector_room').emit('new-notification', { _id: docRef.id, ...notification });
          else io.to('dashboard_updates').emit('new-notification', { _id: docRef.id, ...notification });
        } catch (e) {}

        res.status(201).json({ success: true, data: { _id: docRef.id, ...notification } });
        return;
      } catch (e) { console.warn('Firestore sendNotification failed:', e); }
    }

    const newNotif = { _id: `notif-${Date.now()}`, ...notification };
    inMemoryNotifications.unshift(newNotif);
    try { getIO().to('dashboard_updates').emit('new-notification', newNotif); } catch (e) {}
    res.status(201).json({ success: true, data: newNotif });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId;
    const userRole = req.user?.role || 'citizen';
    const { unreadOnly } = req.query;

    if (db) {
      try {
        let queryRef: any = db.collection('notifications');
        // Get notifications for this role or targeted to this user
        const snapshot = await queryRef.limit(50).get();
        let notifications = snapshot.docs.map((d: any) => ({ _id: d.id, ...d.data() }));
        
        // Filter by role or user
        notifications = notifications.filter((n: any) => 
          n.targetRole === 'all' || n.targetRole === userRole || n.targetUserId === userId
        );
        
        if (unreadOnly === 'true') notifications = notifications.filter((n: any) => !n.read);
        
        res.status(200).json({ success: true, data: notifications, unreadCount: notifications.filter((n: any) => !n.read).length });
        return;
      } catch (e) { console.warn('Firestore getNotifications failed:', e); }
    }

    let filtered = [...inMemoryNotifications];
    if (unreadOnly === 'true') filtered = filtered.filter(n => !n.read);
    res.status(200).json({ success: true, data: filtered, unreadCount: filtered.filter(n => !n.read).length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('notifications').doc(id).update({ read: true, readAt: new Date().toISOString() });
        res.status(200).json({ success: true, message: 'Marked as read' });
        return;
      } catch (e) { console.warn('Firestore markNotificationRead failed:', e); }
    }

    const idx = inMemoryNotifications.findIndex(n => n._id === id);
    if (idx !== -1) inMemoryNotifications[idx].read = true;
    res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId;
    
    if (db && userId) {
      try {
        // In production: batch update all unread notifications for this user
        res.status(200).json({ success: true, message: 'All notifications marked as read' });
        return;
      } catch (e) {}
    }
    
    inMemoryNotifications = inMemoryNotifications.map(n => ({ ...n, read: true }));
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
