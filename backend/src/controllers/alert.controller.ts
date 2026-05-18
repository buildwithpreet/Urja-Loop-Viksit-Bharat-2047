import { Request, Response } from 'express';
import { Alert } from '../models/alert.model';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json({ success: true, data: alert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
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
    const alert = await Alert.findById(req.params.id).populate('binId', 'location status');
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
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
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
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) {
      res.status(404).json({ success: false, error: 'Alert not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
