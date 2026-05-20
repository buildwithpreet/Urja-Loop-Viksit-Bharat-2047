import { Request, Response } from 'express';
import { db } from '../config/firebase';

// In-Memory data store fallback when GCP Firestore is offline/unconfigured
let inMemoryRoutes = [
  {
    _id: "route-1",
    routeId: "R-7092",
    collector: "Rajesh Kumar",
    status: "in-progress",
    waypoints: [
      [77.2090, 28.6139],
      [77.2180, 28.6250]
    ],
    bins: ["BIN-001", "BIN-002"],
    createdAt: new Date()
  }
];

export const generateRoute = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const binsSnapshot = await db.collection('bins').get();
        const highFillBins = binsSnapshot.docs
          .map((doc: any) => ({ _id: doc.id, ...doc.data() }))
          .filter((b: any) => b.currentFillLevel >= 80);

        const routeData = {
          routeId: `R-${Math.floor(Math.random() * 9000) + 1000}`,
          collector: "Demo Dispatcher",
          status: "assigned",
          waypoints: highFillBins.map((b: any) => b.location?.coordinates || [77.2090, 28.6139]),
          bins: highFillBins.map((b: any) => b.binId),
          createdAt: new Date().toISOString()
        };
        await db.collection('routes').add(routeData);

        res.status(200).json({ success: true, data: routeData });
        return;
      } catch (e) {
        console.warn('Firestore generateRoute failed, using fallback:', e);
      }
    }

    const routeData = {
      _id: Math.random().toString(36).substring(7),
      routeId: `R-${Math.floor(Math.random() * 9000) + 1000}`,
      collector: "Demo Dispatcher",
      status: "assigned" as const,
      waypoints: [
        [77.2090, 28.6139],
        [77.2180, 28.6250]
      ],
      bins: ["BIN-001", "BIN-002"],
      createdAt: new Date()
    };
    inMemoryRoutes.push(routeData);
    res.status(200).json({ success: true, data: routeData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRoutes = async (req: Request, res: Response) => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('routes').get();
        const routes = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (routes.length > 0) {
          res.status(200).json({ success: true, data: routes });
          return;
        }
      } catch (e) {
        console.warn('Firestore getRoutes failed, using fallback:', e);
      }
    }

    res.status(200).json({ success: true, data: inMemoryRoutes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
