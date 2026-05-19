import { Request, Response } from 'express';
import { Bin } from '../models/bin.model';
import { getIO } from '../sockets';
import mongoose from 'mongoose';

// In-Memory data store fallback when MongoDB is offline/unconfigured
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
    
    if (mongoose.connection.readyState !== 1) {
      const newBin = {
        binId,
        location: { type: 'Point', coordinates: location },
        address,
        capacity,
        currentFillLevel: 0,
        status: 'active',
        batteryLevel: 100,
        lastPing: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryBins.push(newBin);
      res.status(201).json({ success: true, data: newBin });
      return;
    }

    const newBin = await Bin.create({
      binId,
      location: { type: 'Point', coordinates: location },
      address,
      capacity,
    });

    res.status(201).json({ success: true, data: newBin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBinStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId } = req.params;
    const { currentFillLevel, batteryLevel, status } = req.body;

    if (mongoose.connection.readyState !== 1) {
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
      } catch (e) {
        // Socket.io not active
      }

      res.status(200).json({ success: true, data: inMemoryBins[binIdx] });
      return;
    }

    const bin = await Bin.findOneAndUpdate(
      { binId },
      { currentFillLevel, batteryLevel, status, lastPing: new Date() },
      { new: true }
    );

    if (!bin) {
      res.status(404).json({ success: false, message: 'Bin not found' });
      return;
    }

    // Emit real-time event to dashboard
    try {
      getIO().to('dashboard_updates').emit('bin_updated', bin);
    } catch (e) {
      // Socket.io not active
    }

    res.status(200).json({ success: true, data: bin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBins = async (req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({ success: true, data: inMemoryBins });
      return;
    }
    const bins = await Bin.find();
    res.status(200).json({ success: true, data: bins });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
