import { Request, Response } from 'express';
import { Alert } from '../models/alert.model';
import mongoose from 'mongoose';

// In-Memory data store fallback when MongoDB is offline/unconfigured
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
    if (mongoose.connection.readyState !== 1) {
      const newAlert = {
        _id: new mongoose.Types.ObjectId().toString(),
        id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
        resolved: false,
        createdAt: new Date(),
        ...req.body
      };
      inMemoryAlerts.unshift(newAlert);
      res.status(201).json({ success: true, data: newAlert });
      return;
    }

    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json({ success: true, data: alert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...inMemoryAlerts];
      if (req.query.resolved !== undefined) {
        const isResolved = req.query.resolved === 'true';
        filtered = filtered.filter(a => a.resolved === isResolved);
      }
      if (req.query.severity) {
        filtered = filtered.filter(a => a.severity === req.query.severity);
      }
      res.status(200).json({ success: true, data: filtered });
      return;
    }

    const filters: any = {};
    if (req.query.resolved !== undefined) {
      filters.resolved = req.query.resolved === 'true';
    }
    if (req.query.severity) {
      filters.severity = req.query.severity;
    }

    const alerts = await Alert.find(filters).populate('binId', 'location status').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: alerts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAlertById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const alert = inMemoryAlerts.find(a => a._id === id || a.id === id);
      if (!alert) {
        res.status(404).json({ success: false, error: 'Alert not found' });
        return;
      }
      res.status(200).json({ success: true, data: alert });
      return;
    }

    const alert = await Alert.findById(id).populate('binId', 'location status');
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
    if (mongoose.connection.readyState !== 1) {
      const alertIdx = inMemoryAlerts.findIndex(a => a._id === id || a.id === id);
      if (alertIdx === -1) {
        res.status(404).json({ success: false, error: 'Alert not found' });
        return;
      }
      inMemoryAlerts[alertIdx].resolved = true;
      res.status(200).json({ success: true, data: inMemoryAlerts[alertIdx] });
      return;
    }

    const alert = await Alert.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true, runValidators: true }
    );
    if (!alert) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    res.status(200).json({ success: true, data: alert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteAlert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const alertIdx = inMemoryAlerts.findIndex(a => a._id === id || a.id === id);
      if (alertIdx === -1) {
        res.status(404).json({ success: false, error: 'Alert not found' });
        return;
      }
      inMemoryAlerts.splice(alertIdx, 1);
      res.status(200).json({ success: true, data: {} });
      return;
    }

    const alert = await Alert.findByIdAndDelete(id);
    if (!alert) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
