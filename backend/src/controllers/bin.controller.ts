import { Request, Response } from 'express';
import { getIO } from '../sockets';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
let inMemoryBins = [
  { binId: "BIN-001", location: { type: 'Point', coordinates: [77.2090, 28.6139] }, address: "Sector 4, Cyber City, New Delhi", capacity: 80, currentFillLevel: 45, status: "active", batteryLevel: 92, lastPing: new Date() },
  { binId: "BIN-002", location: { type: 'Point', coordinates: [77.2180, 28.6250] }, address: "Metro Gate 2, Connaught Place", capacity: 100, currentFillLevel: 85, status: "active", batteryLevel: 78, lastPing: new Date() },
  { binId: "BIN-003", location: { type: 'Point', coordinates: [77.1950, 28.6000] }, address: "Rural Bio-Hub Primary Center", capacity: 120, currentFillLevel: 30, status: "active", batteryLevel: 88, lastPing: new Date() },
  { binId: "BIN-004", location: { type: 'Point', coordinates: [77.2300, 28.6300] }, address: "Industrial Zone Gate 1", capacity: 150, currentFillLevel: 92, status: "active", batteryLevel: 45, lastPing: new Date() },
  { binId: "BIN-005", location: { type: 'Point', coordinates: [77.1850, 28.6150] }, address: "Sector 12 Market Complex", capacity: 80, currentFillLevel: 15, status: "active", batteryLevel: 99, lastPing: new Date() },
];

export const registerBin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId, location, address, capacity } = req.body;

    if (db) {
      try {
        const newBin = {
          binId,
          location: { type: 'Point', coordinates: location },
          address,
          capacity,
          currentFillLevel: 0,
          status: 'active',
          batteryLevel: 100,
          lastPing: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await db.collection('bins').doc(binId).set(newBin);
        res.status(201).json({ success: true, data: newBin });
        return;
      } catch (e) {
        console.warn('Firestore registerBin failed, using fallback:', e);
      }
    }
    
    // In-memory fallback
    const newBin = {
      binId,
      location: { type: 'Point', coordinates: location },
      address,
      capacity,
      currentFillLevel: 0,
      status: 'active' as const,
      batteryLevel: 100,
      lastPing: new Date()
    };
    inMemoryBins.push(newBin);
    res.status(201).json({ success: true, data: newBin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBinStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId } = req.params;
    const { currentFillLevel, batteryLevel, status } = req.body;

    if (db) {
      try {
        const updateData: any = { 
          lastPing: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        if (currentFillLevel !== undefined) updateData.currentFillLevel = currentFillLevel;
        if (batteryLevel !== undefined) updateData.batteryLevel = batteryLevel;
        if (status !== undefined) updateData.status = status;

        await db.collection('bins').doc(binId).set(updateData, { merge: true });
        const doc = await db.collection('bins').doc(binId).get();
        const updatedBin = { _id: doc.id, ...doc.data() };

        // Emit real-time event to dashboard
        try {
          getIO().to('dashboard_updates').emit('bin_updated', updatedBin);
        } catch (e) {}

        res.status(200).json({ success: true, data: updatedBin });
        return;
      } catch (e) {
        console.warn('Firestore updateBinStatus failed, using fallback:', e);
      }
    }

    // In-memory fallback
    const binIdx = inMemoryBins.findIndex(b => b.binId === binId);
    if (binIdx === -1) {
      res.status(404).json({ success: false, message: 'Bin not found' });
      return;
    }
    if (currentFillLevel !== undefined) inMemoryBins[binIdx].currentFillLevel = currentFillLevel;
    if (batteryLevel !== undefined) inMemoryBins[binIdx].batteryLevel = batteryLevel;
    if (status !== undefined) inMemoryBins[binIdx].status = status;
    inMemoryBins[binIdx].lastPing = new Date();

    // Emit real-time event to dashboard
    try {
      getIO().to('dashboard_updates').emit('bin_updated', inMemoryBins[binIdx]);
    } catch (e) {}

    res.status(200).json({ success: true, data: inMemoryBins[binIdx] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBins = async (req: Request, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('bins').get();
        const bins = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (bins.length > 0) {
          res.status(200).json({ success: true, data: bins });
          return;
        }
      } catch (e) {
        console.warn('Firestore getAllBins failed, using fallback:', e);
      }
    }

    // In-memory fallback
    res.status(200).json({ success: true, data: inMemoryBins });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
