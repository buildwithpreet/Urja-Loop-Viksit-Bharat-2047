import { Request, Response } from 'express';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
let inMemoryIncidents: any[] = [
  {
    _id: "incident-1",
    id: "INC-3829",
    type: "Overflow Warning",
    location_name: "Connaught Place Gate 2",
    severity: "High",
    description: "Bin has exceeded 90% fill level threshold. Collector dispatch initiated.",
    status: "Assigned",
    ai_validated: true,
    created_at: new Date()
  },
  {
    _id: "incident-2",
    id: "INC-8291",
    type: "Illegal Dumping",
    location_name: "Sector 12 Market Complex",
    severity: "Medium",
    description: "Citizen reported unauthorized commercial waste disposal in organic bio-bins.",
    status: "Submitted",
    ai_validated: false,
    created_at: new Date(Date.now() - 7200000)
  }
];

export const createIncident = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const newIncident = {
          id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
          status: "Submitted",
          created_at: new Date().toISOString(),
          ...req.body
        };
        const docRef = await db.collection('incidents').add(newIncident);
        res.status(201).json({ success: true, data: { _id: docRef.id, ...newIncident } });
        return;
      } catch (e) {
        console.warn('Firestore createIncident failed, using fallback:', e);
      }
    }

    const newIncident = {
      _id: Math.random().toString(36).substring(7),
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Submitted",
      created_at: new Date(),
      ...req.body
    };
    inMemoryIncidents.unshift(newIncident);
    res.status(201).json({ success: true, data: newIncident });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        let queryRef: any = db.collection('incidents');
        if (req.query.status) {
          queryRef = queryRef.where('status', '==', req.query.status);
        }
        
        const snapshot = await queryRef.get();
        const incidents = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (incidents.length > 0) {
          res.status(200).json({ success: true, data: incidents });
          return;
        }
      } catch (e) {
        console.warn('Firestore getIncidents failed, using fallback:', e);
      }
    }

    let filtered = [...inMemoryIncidents];
    if (req.query.status) {
      filtered = filtered.filter(i => i.status === req.query.status);
    }
    res.status(200).json({ success: true, data: filtered });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        const doc = await db.collection('incidents').doc(id).get();
        if (doc.exists) {
          res.status(200).json({ success: true, data: { _id: doc.id, ...doc.data() } });
          return;
        }
      } catch (e) {
        console.warn('Firestore getIncidentById failed, using fallback:', e);
      }
    }

    const incident = inMemoryIncidents.find(i => i._id === id || i.id === id);
    if (!incident) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    res.status(200).json({ success: true, data: incident });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('incidents').doc(id).set(req.body, { merge: true });
        const doc = await db.collection('incidents').doc(id).get();
        res.status(200).json({ success: true, data: { _id: doc.id, ...doc.data() } });
        return;
      } catch (e) {
        console.warn('Firestore updateIncident failed, using fallback:', e);
      }
    }

    const idx = inMemoryIncidents.findIndex(i => i._id === id || i.id === id);
    if (idx === -1) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    inMemoryIncidents[idx] = { ...inMemoryIncidents[idx], ...req.body };
    res.status(200).json({ success: true, data: inMemoryIncidents[idx] });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (db) {
      try {
        await db.collection('incidents').doc(id).delete();
        res.status(200).json({ success: true, data: {} });
        return;
      } catch (e) {
        console.warn('Firestore deleteIncident failed, using fallback:', e);
      }
    }

    const idx = inMemoryIncidents.findIndex(i => i._id === id || i.id === id);
    if (idx === -1) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    inMemoryIncidents.splice(idx, 1);
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
