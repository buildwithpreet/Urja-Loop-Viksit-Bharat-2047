import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { getIO } from '../sockets';

// In-memory fallback for collector tasks
let inMemoryTasks: any[] = [
  {
    _id: 'task-001',
    taskId: 'TASK-4829',
    binId: 'BIN-004',
    binAddress: 'Industrial Zone Gate 1',
    location: { lat: 28.6300, lng: 77.2300 },
    fillLevel: 92,
    wasteType: 'mixed',
    priority: 'high',
    status: 'pending',
    assignedTo: null,
    estimatedDuration: 25, // mins
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: 'task-002',
    taskId: 'TASK-7731',
    binId: 'BIN-002',
    binAddress: 'Metro Gate 2, Connaught Place',
    location: { lat: 28.6250, lng: 77.2180 },
    fillLevel: 85,
    wasteType: 'plastic',
    priority: 'medium',
    status: 'pending',
    assignedTo: null,
    estimatedDuration: 20,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

let inMemoryCollectorReports: any[] = [];

export const getCollectorTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId || 'demo-collector';
    const { status } = req.query;

    if (db) {
      try {
        let queryRef: any = db.collection('collector_tasks');
        if (status) queryRef = queryRef.where('status', '==', status);
        // For demo: show all pending OR assigned to this collector
        const snapshot = await queryRef.get();
        const tasks = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (tasks.length > 0) {
          res.status(200).json({ success: true, data: tasks });
          return;
        }
      } catch (e) {
        console.warn('Firestore getCollectorTasks failed:', e);
      }
    }

    let filtered = [...inMemoryTasks];
    if (status) filtered = filtered.filter(t => t.status === status);
    res.status(200).json({ success: true, data: filtered });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.body;
    const userId = req.user?.firebaseId || 'demo-collector';
    const collectorName = req.user?.profile?.fullName || 'Demo Collector';

    if (db) {
      try {
        const snapshot = await db.collection('collector_tasks').where('taskId', '==', taskId).limit(1).get();
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          await db.collection('collector_tasks').doc(docId).update({
            status: 'accepted',
            assignedTo: userId,
            assignedCollectorName: collectorName,
            acceptedAt: new Date().toISOString()
          });
          const updated = (await db.collection('collector_tasks').doc(docId).get()).data();
          
          try {
            getIO().to('admin_room').emit('collector-assigned', {
              taskId, collectorName, binId: updated?.binId, time: new Date().toLocaleTimeString()
            });
          } catch (e) {}

          res.status(200).json({ success: true, data: { _id: docId, ...updated } });
          return;
        }
      } catch (e) {
        console.warn('Firestore acceptTask failed:', e);
      }
    }

    // In-memory fallback
    const idx = inMemoryTasks.findIndex(t => t.taskId === taskId || t._id === taskId);
    if (idx === -1) { res.status(404).json({ success: false, message: 'Task not found' }); return; }
    inMemoryTasks[idx] = { ...inMemoryTasks[idx], status: 'accepted', assignedTo: userId, assignedCollectorName: collectorName, acceptedAt: new Date().toISOString() };
    
    try {
      getIO().to('admin_room').emit('collector-assigned', {
        taskId, collectorName, binId: inMemoryTasks[idx].binId, time: new Date().toLocaleTimeString()
      });
    } catch (e) {}
    
    res.status(200).json({ success: true, data: inMemoryTasks[idx] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId, weight, notes, imageUrl } = req.body;
    const userId = req.user?.firebaseId || 'demo-collector';

    const completion = {
      status: 'completed',
      completedBy: userId,
      completedAt: new Date().toISOString(),
      collectionWeight: weight || 0,
      notes: notes || '',
      proofImageUrl: imageUrl || null
    };

    if (db) {
      try {
        const snapshot = await db.collection('collector_tasks').where('taskId', '==', taskId).limit(1).get();
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          await db.collection('collector_tasks').doc(docId).update(completion);
          
          // Update bin fill level to 0
          const taskData = snapshot.docs[0].data();
          if (taskData.binId) {
            await db.collection('bins').doc(taskData.binId).update({ currentFillLevel: 0, status: 'active', lastPing: new Date().toISOString() });
          }

          try {
            getIO().to('dashboard_updates').emit('pickup-completed', { taskId, binId: taskData.binId, collectorId: userId, time: new Date().toLocaleTimeString() });
          } catch (e) {}

          res.status(200).json({ success: true, data: { _id: docId, ...completion } });
          return;
        }
      } catch (e) {
        console.warn('Firestore completeTask failed:', e);
      }
    }

    // In-memory
    const idx = inMemoryTasks.findIndex(t => t.taskId === taskId || t._id === taskId);
    if (idx !== -1) inMemoryTasks[idx] = { ...inMemoryTasks[idx], ...completion };
    try { getIO().to('dashboard_updates').emit('pickup-completed', { taskId, time: new Date().toLocaleTimeString() }); } catch (e) {}
    res.status(200).json({ success: true, data: completion });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLiveLocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lat, lng, taskId } = req.body;
    const userId = req.user?.firebaseId || 'demo-collector';

    const locationData = { collectorId: userId, lat, lng, taskId, timestamp: new Date().toISOString() };

    if (db) {
      try {
        await db.collection('collector_locations').doc(userId).set(locationData, { merge: true });
      } catch (e) {}
    }

    // Broadcast live location to admin and fleet dashboards
    try {
      getIO().to('fleet_room').emit('vehicle-tracking', { type: 'collector', id: userId, lat, lng, taskId });
    } catch (e) {}

    res.status(200).json({ success: true, data: locationData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectorPerformance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.firebaseId || 'demo-collector';

    if (db) {
      try {
        const snapshot = await db.collection('collector_tasks')
          .where('completedBy', '==', userId)
          .where('status', '==', 'completed')
          .get();

        const completed = snapshot.docs.map((d: any) => d.data());
        const totalPickups = completed.length;
        const totalWeight = completed.reduce((s: number, t: any) => s + (t.collectionWeight || 0), 0);
        const avgTime = totalPickups > 0 ? Math.round(completed.reduce((s: number, t: any) => {
          if (t.acceptedAt && t.completedAt) {
            return s + (new Date(t.completedAt).getTime() - new Date(t.acceptedAt).getTime()) / 60000;
          }
          return s;
        }, 0) / totalPickups) : 0;

        res.status(200).json({ success: true, data: { totalPickups, totalWeight, avgCompletionMinutes: avgTime, rating: 4.7, efficiency: 94 } });
        return;
      } catch (e) {
        console.warn('Firestore getCollectorPerformance failed:', e);
      }
    }

    res.status(200).json({ success: true, data: { totalPickups: 48, totalWeight: 320, avgCompletionMinutes: 22, rating: 4.7, efficiency: 94 } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
