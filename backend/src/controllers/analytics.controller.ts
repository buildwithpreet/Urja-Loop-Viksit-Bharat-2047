import { Request, Response } from 'express';
import { Analytics } from '../models/analytics.model';

export const createOrUpdateAnalytics = async (req: Request, res: Response) => {
  try {
    const { date, ...data } = req.body;
    
    // Normalize date to midnight for daily records
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const analytics = await Analytics.findOneAndUpdate(
      { date: normalizedDate },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 }).limit(30); // Last 30 days by default
    res.status(200).json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalyticsSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const analytics = await Analytics.aggregate([
      {
        $group: {
          _id: null,
          totalWasteCollected: { $sum: "$totalWasteCollected" },
          averageRecyclingRatio: { $avg: "$recyclingRatio" },
          averageAiAccuracy: { $avg: "$aiAccuracy" },
          totalCarbonSaved: { $sum: "$carbonSaved" },
          totalAlerts: { $sum: "$totalAlerts" }
        }
      }
    ]);

    res.status(200).json({ success: true, data: analytics[0] || {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
