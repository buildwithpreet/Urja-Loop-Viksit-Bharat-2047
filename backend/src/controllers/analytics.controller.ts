import { Request, Response } from 'express';
import { Analytics } from '../models/analytics.model';
import mongoose from 'mongoose';

// In-Memory data store fallback when MongoDB is offline/unconfigured
let inMemoryAnalytics = [
  { date: new Date(Date.now() - 3 * 86400000), totalWasteCollected: 120, recyclingRatio: 65, carbonSaved: 1.2, aiAccuracy: 93, totalAlerts: 4 },
  { date: new Date(Date.now() - 2 * 86400000), totalWasteCollected: 145, recyclingRatio: 68, carbonSaved: 1.4, aiAccuracy: 95, totalAlerts: 2 },
  { date: new Date(Date.now() - 1 * 86400000), totalWasteCollected: 160, recyclingRatio: 72, carbonSaved: 1.6, aiAccuracy: 94, totalAlerts: 5 },
  { date: new Date(), totalWasteCollected: 185, recyclingRatio: 70, carbonSaved: 1.8, aiAccuracy: 96, totalAlerts: 3 },
];

export const createOrUpdateAnalytics = async (req: Request, res: Response) => {
  try {
    const { date, ...data } = req.body;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    if (mongoose.connection.readyState !== 1) {
      const idx = inMemoryAnalytics.findIndex(a => a.date.toDateString() === normalizedDate.toDateString());
      if (idx !== -1) {
        inMemoryAnalytics[idx] = { ...inMemoryAnalytics[idx], ...data };
      } else {
        inMemoryAnalytics.push({ date: normalizedDate, ...data });
      }
      res.status(201).json({ success: true, data: inMemoryAnalytics[idx !== -1 ? idx : inMemoryAnalytics.length - 1] });
      return;
    }

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
    if (mongoose.connection.readyState !== 1) {
      res.status(200).json({ success: true, data: inMemoryAnalytics.sort((a, b) => b.date.getTime() - a.date.getTime()) });
      return;
    }
    const analytics = await Analytics.find().sort({ date: -1 }).limit(30);
    res.status(200).json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalyticsSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      // Aggregate in-memory datasets
      let totalWasteCollected = 0;
      let sumRecyclingRatio = 0;
      let sumAiAccuracy = 0;
      let totalCarbonSaved = 0;
      let totalAlerts = 0;

      inMemoryAnalytics.forEach(item => {
        totalWasteCollected += item.totalWasteCollected || 0;
        sumRecyclingRatio += item.recyclingRatio || 0;
        sumAiAccuracy += item.aiAccuracy || 0;
        totalCarbonSaved += item.carbonSaved || 0;
        totalAlerts += item.totalAlerts || 0;
      });

      const averageRecyclingRatio = inMemoryAnalytics.length ? (sumRecyclingRatio / inMemoryAnalytics.length) : 0;
      const averageAiAccuracy = inMemoryAnalytics.length ? (sumAiAccuracy / inMemoryAnalytics.length) : 0;

      res.status(200).json({
        success: true,
        data: {
          totalWasteCollected,
          averageRecyclingRatio,
          averageAiAccuracy,
          totalCarbonSaved,
          totalAlerts
        }
      });
      return;
    }

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
