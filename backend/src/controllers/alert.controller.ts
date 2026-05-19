import { Request, Response } from 'express';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
let inMemoryAlerts: any[] = [
  {
    _id: "alert-1",
    id: "INC-9002",
    type: "Sensor Offline Warning",
    location: "Connaught Place Gate 2",
    severity: "High",
    resolved: false,
    createdAt: new Date(),
    binId: "BIN-002"
  },
  {
    _id: "alert-2",
    id: "INC-4832",
    type: "Critical Overflow Alert",
    location: "Industrial Zone Gate 1",
    severity: "Critical",
    resolved: false,
    createdAt: new Date(Date.now() - 3600000),
    binId: "BIN-004"
  }
];

export const createAlert = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const newAlert = {
          id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
          resolved: false,
          createdAt: new Date().toISOString(),
          ...req.body
        };
        const docRef = await db.collection('alerts').add(newAlert);
        res.status(201).json({ success: true, data: { _id: docRef.id, ...newAlert } });
        return;
      } catch (e) {
        console.warn('Firestore createAlert failed, using fallback:', e);
      }
    }

    const newAlert = {
      _id: Math.random().toString(36).substring(7),
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
      resolved: false,
      createdAt: new Date(),
      ...req.body
    };
    inMemoryAlerts.unshift(newAlert);
    res.status(201).json({ success: true, data: newAlert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        let queryRef: any = db.collection('alerts');
        if (req.query.resolved !== undefined) {
          const isResolved = req.query.resolved === 'true';
          queryRef = queryRef.where('resolved', '==', isResolved);
        }
        if (req.query.severity) {
          queryRef = queryRef.where('severity', '==', req.query.severity);
        }
        
        const snapshot = await queryRef.get();
        const alerts = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (alerts.length > 0) {
          res.status(200).json({ success: true, data: alerts });
          return;
        }
      } catch (e) {
        console.warn('Firestore getAlerts failed, using fallback:', e);
      }
    }

    let filtered = [...inMemoryAlerts];
    if (req.query.resolved !== undefined) {
      const isResolved = req.query.resolved === 'true';
      filtered = filtered.filter(a => a.resolved === isResolved);
    }
    if (req.query.severity) {
      filtered = filtered.filter(a => a.severity === req.query.severity);
    }
    res.status(200).json({ success: true, data: filtered });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAlertById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (db) {
      try {
        const doc = await db.collection('alerts').doc(id).get();
        if (doc.exists) {
          res.status(200).json({ success: true, data: { _id: doc.id, ...doc.data() } });
          return;
        }
      } catch (e) {
        console.warn('Firestore getAlertById failed, using fallback:', e);
      }
    }

    const alert = inMemoryAlerts.find(a => a._id === id || a.id === id);
    if (!alert) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    res.status(200).json({ success: true, data: alert });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const resolveAlert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('alerts').doc(id).update({ resolved: true, resolvedAt: new Date().toISOString() });
        const doc = await db.collection('alerts').doc(id).get();
        res.status(200).json({ success: true, data: { _id: doc.id, ...doc.data() } });
        return;
      } catch (e) {
        console.warn('Firestore resolveAlert failed, using fallback:', e);
      }
    }

    const alertIdx = inMemoryAlerts.findIndex(a => a._id === id || a.id === id);
    if (alertIdx === -1) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    inMemoryAlerts[alertIdx].resolved = true;
    res.status(200).json({ success: true, data: inMemoryAlerts[alertIdx] });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteAlert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('alerts').doc(id).delete();
        res.status(200).json({ success: true, data: {} });
        return;
      } catch (e) {
        console.warn('Firestore deleteAlert failed, using fallback:', e);
      }
    }

    const alertIdx = inMemoryAlerts.findIndex(a => a._id === id || a.id === id);
    if (alertIdx === -1) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    inMemoryAlerts.splice(alertIdx, 1);
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
