import { Request, Response } from 'express';
import { WasteLog } from '../models/wastelog.model';
import mongoose from 'mongoose';

// In-Memory data store fallback when MongoDB is offline/unconfigured
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
    if (mongoose.connection.readyState !== 1) {
      const newLog = {
        _id: new mongoose.Types.ObjectId().toString(),
        createdAt: new Date(),
        ...req.body
      };
      inMemoryWasteLogs.unshift(newLog);
      res.status(201).json({ success: true, data: newLog });
      return;
    }

    const wastelog = new WasteLog(req.body);
    await wastelog.save();
    res.status(201).json({ success: true, data: wastelog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWasteLogs = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
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
      return;
    }

    const filters: any = {};
    if (req.query.user) filters.user = req.query.user;
    if (req.query.bin) filters.bin = req.query.bin;
    
    if (req.query.category) {
      filters['classification.category'] = req.query.category;
    }

    const wastelogs = await WasteLog.find(filters)
      .populate('user', 'name email')
      .populate('bin', 'location status')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: wastelogs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getWasteLogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const wastelog = inMemoryWasteLogs.find(l => l._id === id);
      if (!wastelog) {
        res.status(404).json({ success: false, error: 'WasteLog not found' });
        return;
      }
      res.status(200).json({ success: true, data: wastelog });
      return;
    }

    const wastelog = await WasteLog.findById(id)
      .populate('user', 'name email')
      .populate('bin', 'location status');
      
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
    if (mongoose.connection.readyState !== 1) {
      const idx = inMemoryWasteLogs.findIndex(l => l._id === id);
      if (idx === -1) {
        res.status(404).json({ success: false, error: 'WasteLog not found' });
        return;
      }
      inMemoryWasteLogs.splice(idx, 1);
      res.status(200).json({ success: true, data: {} });
      return;
    }

    const wastelog = await WasteLog.findByIdAndDelete(id);
    if (!wastelog) {
      res.status(404).json({ success: false, error: 'WasteLog not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
