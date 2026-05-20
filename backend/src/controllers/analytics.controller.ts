import { Request, Response } from 'express';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
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

    if (db) {
      try {
        const dateId = normalizedDate.toISOString().split('T')[0];
        await db.collection('analytics').doc(dateId).set({ date: normalizedDate.toISOString(), ...data }, { merge: true });
        const doc = await db.collection('analytics').doc(dateId).get();
        res.status(201).json({ success: true, data: { _id: doc.id, ...doc.data() } });
        return;
      } catch (e) {
        console.warn('Firestore createOrUpdateAnalytics failed, using fallback:', e);
      }
    }

    // In-memory fallback
    const idx = inMemoryAnalytics.findIndex(a => a.date.toDateString() === normalizedDate.toDateString());
    if (idx !== -1) {
      inMemoryAnalytics[idx] = { ...inMemoryAnalytics[idx], ...data };
    } else {
      inMemoryAnalytics.push({ date: normalizedDate, ...data });
    }
    res.status(201).json({ success: true, data: inMemoryAnalytics[idx !== -1 ? idx : inMemoryAnalytics.length - 1] });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('analytics').get();
        const analytics = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (analytics.length > 0) {
          res.status(200).json({ success: true, data: analytics });
          return;
        }
      } catch (e) {
        console.warn('Firestore getAnalytics failed, using fallback:', e);
      }
    }

    // In-memory fallback
    res.status(200).json({ success: true, data: inMemoryAnalytics.sort((a, b) => b.date.getTime() - a.date.getTime()) });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalyticsSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('analytics').get();
        let totalWasteCollected = 0;
        let sumRecyclingRatio = 0;
        let sumAiAccuracy = 0;
        let totalCarbonSaved = 0;
        let totalAlerts = 0;

        snapshot.docs.forEach((doc: any) => {
          const item = doc.data();
          totalWasteCollected += item.totalWasteCollected || 0;
          sumRecyclingRatio += item.recyclingRatio || 0;
          sumAiAccuracy += item.aiAccuracy || 0;
          totalCarbonSaved += item.carbonSaved || 0;
          totalAlerts += item.totalAlerts || 0;
        });

        const averageRecyclingRatio = snapshot.docs.length ? (sumRecyclingRatio / snapshot.docs.length) : 0;
        const averageAiAccuracy = snapshot.docs.length ? (sumAiAccuracy / snapshot.docs.length) : 0;

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
      } catch (e) {
        console.warn('Firestore getAnalyticsSummary failed, using fallback:', e);
      }
    }

    // In-memory fallback
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
