import { Request, Response } from 'express';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
let inMemoryWasteLogs: any[] = [
  {
    _id: "log-1",
    weight: 12.4,
    classification: {
      category: "Organic",
      confidence: 98.4,
      details: "High quality compostable wet organic waste."
    },
    carbonCreditsEarned: 15,
    createdAt: new Date(Date.now() - 3600000),
    user: "demo-admin-id",
    bin: "BIN-002"
  },
  {
    _id: "log-2",
    weight: 4.8,
    classification: {
      category: "Recyclable",
      confidence: 94.2,
      details: "Clean PET plastic beverage bottles."
    },
    carbonCreditsEarned: 8,
    createdAt: new Date(Date.now() - 7200000),
    user: "demo-admin-id",
    bin: "BIN-004"
  }
];

export const createWasteLog = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const newLog = {
          createdAt: new Date().toISOString(),
          ...req.body
        };
        const docRef = await db.collection('wastelogs').add(newLog);
        res.status(201).json({ success: true, data: { _id: docRef.id, ...newLog } });
        return;
      } catch (e) {
        console.warn('Firestore createWasteLog failed, using fallback:', e);
      }
    }

    const newLog = {
      _id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      ...req.body
    };
    inMemoryWasteLogs.unshift(newLog);
    res.status(201).json({ success: true, data: newLog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWasteLogs = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        let queryRef: any = db.collection('wastelogs');
        if (req.query.user) {
          queryRef = queryRef.where('user', '==', req.query.user);
        }
        if (req.query.bin) {
          queryRef = queryRef.where('bin', '==', req.query.bin);
        }
        if (req.query.category) {
          queryRef = queryRef.where('classification.category', '==', req.query.category);
        }

        const snapshot = await queryRef.get();
        const wastelogs = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (wastelogs.length > 0) {
          res.status(200).json({ success: true, data: wastelogs });
          return;
        }
      } catch (e) {
        console.warn('Firestore getWasteLogs failed, using fallback:', e);
      }
    }

    let filtered = [...inMemoryWasteLogs];
    if (req.query.user) {
      filtered = filtered.filter(l => l.user === req.query.user);
    }
    if (req.query.bin) {
      filtered = filtered.filter(l => l.bin === req.query.bin);
    }
    if (req.query.category) {
      filtered = filtered.filter(l => l.classification?.category === req.query.category);
    }
    res.status(200).json({ success: true, data: filtered });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getWasteLogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        const doc = await db.collection('wastelogs').doc(id).get();
        if (doc.exists) {
          res.status(200).json({ success: true, data: { _id: doc.id, ...doc.data() } });
          return;
        }
      } catch (e) {
        console.warn('Firestore getWasteLogById failed, using fallback:', e);
      }
    }

    const wastelog = inMemoryWasteLogs.find(l => l._id === id);
    if (!wastelog) {
      res.status(404).json({ success: false, error: 'WasteLog not found' });
      return;
    }
    res.status(200).json({ success: true, data: wastelog });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteWasteLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('wastelogs').doc(id).delete();
        res.status(200).json({ success: true, data: {} });
        return;
      } catch (e) {
        console.warn('Firestore deleteWasteLog failed, using fallback:', e);
      }
    }

    const idx = inMemoryWasteLogs.findIndex(l => l._id === id);
    if (idx === -1) {
      res.status(404).json({ success: false, error: 'WasteLog not found' });
      return;
    }
    inMemoryWasteLogs.splice(idx, 1);
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
