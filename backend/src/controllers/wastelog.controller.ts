import { Request, Response } from 'express';
import { WasteLog } from '../models/wastelog.model';

export const createWasteLog = async (req: Request, res: Response) => {
  try {
    const wastelog = new WasteLog(req.body);
    await wastelog.save();
    res.status(201).json({ success: true, data: wastelog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWasteLogs = async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.query.user) filters.user = req.query.user;
    if (req.query.bin) filters.bin = req.query.bin;
    
    // Support filtering by category 
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
    const wastelog = await WasteLog.findById(req.params.id)
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
    const wastelog = await WasteLog.findByIdAndDelete(req.params.id);
    if (!wastelog) {
      res.status(404).json({ success: false, error: 'WasteLog not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
