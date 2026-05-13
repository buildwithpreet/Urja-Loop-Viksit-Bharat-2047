import { Request, Response } from 'express';
import { Bin } from '../models/bin.model';
import { getIO } from '../sockets';

export const registerBin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId, location, address, capacity } = req.body;
    
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
    getIO().to('dashboard_updates').emit('bin_updated', bin);

    res.status(200).json({ success: true, data: bin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBins = async (req: Request, res: Response): Promise<void> => {
  try {
    const bins = await Bin.find();
    res.status(200).json({ success: true, data: bins });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
