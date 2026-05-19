import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { getIO } from '../sockets';

// In-memory vehicle fleet data
let inMemoryVehicles: any[] = [
  {
    _id: 'VEH-001',
    plateNumber: 'DL 1C 2847',
    type: 'Compactor Truck',
    capacity: 5000,
    currentLoad: 1200,
    status: 'active',
    driver: 'Ramesh Kumar',
    driverId: 'collector-001',
    location: { lat: 28.6139, lng: 77.2090 },
    fuel: 78,
    lastUpdate: new Date().toISOString()
  },
  {
    _id: 'VEH-002',
    plateNumber: 'DL 4G 9012',
    type: 'Mini Pickup',
    capacity: 1500,
    currentLoad: 300,
    status: 'idle',
    driver: 'Suresh Singh',
    driverId: 'collector-002',
    location: { lat: 28.6250, lng: 77.2300 },
    fuel: 55,
    lastUpdate: new Date().toISOString()
  },
  {
    _id: 'VEH-003',
    plateNumber: 'DL 7K 3381',
    type: 'Electric Trike',
    capacity: 500,
    currentLoad: 0,
    status: 'maintenance',
    driver: 'Kavita Devi',
    driverId: 'collector-003',
    location: { lat: 28.6000, lng: 77.1950 },
    fuel: 100, // battery %
    lastUpdate: new Date().toISOString()
  }
];

let inMemoryRoutes: any[] = [
  {
    _id: 'route-001',
    vehicleId: 'VEH-001',
    name: 'Cyber City Circuit',
    bins: ['BIN-001', 'BIN-002', 'BIN-004'],
    estimatedDistance: 12.4,
    estimatedDuration: 45,
    status: 'active',
    optimized: true,
    startTime: new Date().toISOString(),
    waypoints: [
      { binId: 'BIN-001', address: 'Sector 4, Cyber City', lat: 28.6139, lng: 77.2090, fillLevel: 45, order: 1 },
      { binId: 'BIN-002', address: 'Metro Gate 2, CP', lat: 28.6250, lng: 77.2180, fillLevel: 85, order: 2 },
      { binId: 'BIN-004', address: 'Industrial Zone Gate 1', lat: 28.6300, lng: 77.2300, fillLevel: 92, order: 3 }
    ]
  }
];

export const getAllVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('vehicles').get();
        const vehicles = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (vehicles.length > 0) {
          res.status(200).json({ success: true, data: vehicles });
          return;
        }
      } catch (e) { console.warn('Firestore getAllVehicles failed:', e); }
    }
    res.status(200).json({ success: true, data: inMemoryVehicles });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLiveTracking = async (req: Request, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const [vehicleSnap, collectorSnap] = await Promise.all([
          db.collection('vehicles').get(),
          db.collection('collector_locations').get()
        ]);
        const vehicles = vehicleSnap.docs.map((d: any) => ({ id: d.id, type: 'vehicle', ...d.data() }));
        const collectors = collectorSnap.docs.map((d: any) => ({ id: d.id, type: 'collector', ...d.data() }));
        res.status(200).json({ success: true, data: { vehicles, collectors } });
        return;
      } catch (e) { console.warn('Firestore getLiveTracking failed:', e); }
    }
    
    // Simulate moving vehicles
    const tracking = inMemoryVehicles.map(v => ({
      id: v._id, type: 'vehicle',
      lat: v.location.lat + (Math.random() - 0.5) * 0.001,
      lng: v.location.lng + (Math.random() - 0.5) * 0.001,
      status: v.status, plateNumber: v.plateNumber, driver: v.driver
    }));
    res.status(200).json({ success: true, data: { vehicles: tracking, collectors: [] } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignVehicle = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { vehicleId, driverId, routeId, binIds } = req.body;

    const assignment = {
      vehicleId, driverId, routeId, binIds: binIds || [],
      status: 'dispatched',
      assignedAt: new Date().toISOString(),
      assignedBy: req.user?.firebaseId || 'admin'
    };

    if (db) {
      try {
        await db.collection('vehicles').doc(vehicleId).update({ status: 'active', driverId, lastUpdate: new Date().toISOString() });
        const docRef = await db.collection('fleet_assignments').add(assignment);
        
        try {
          getIO().to('fleet_room').emit('vehicle-tracking', { type: 'dispatch', vehicleId, driverId, binIds });
        } catch (e) {}
        
        res.status(200).json({ success: true, data: { _id: docRef.id, ...assignment } });
        return;
      } catch (e) { console.warn('Firestore assignVehicle failed:', e); }
    }

    const vIdx = inMemoryVehicles.findIndex(v => v._id === vehicleId);
    if (vIdx !== -1) inMemoryVehicles[vIdx].status = 'active';
    try { getIO().to('fleet_room').emit('vehicle-tracking', { type: 'dispatch', vehicleId, driverId, binIds }); } catch (e) {}
    res.status(200).json({ success: true, data: assignment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoutes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const snapshot = await db.collection('fleet_routes').get();
        const routes = snapshot.docs.map((doc: any) => ({ _id: doc.id, ...doc.data() }));
        if (routes.length > 0) {
          res.status(200).json({ success: true, data: routes });
          return;
        }
      } catch (e) { console.warn('Firestore getRoutes failed:', e); }
    }
    res.status(200).json({ success: true, data: inMemoryRoutes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const optimizeRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binIds } = req.body;
    
    // Simulate route optimization (in production, call Google Maps Directions API)
    const optimized = {
      waypoints: (binIds || []).map((binId: string, idx: number) => ({
        binId, order: idx + 1, estimatedArrival: new Date(Date.now() + (idx + 1) * 900000).toISOString()
      })),
      totalDistance: Math.round(Math.random() * 10 + 5),
      estimatedDuration: Math.round(Math.random() * 30 + 20),
      fuelSaving: Math.round(Math.random() * 15 + 5),
      optimized: true,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        const docRef = await db.collection('fleet_routes').add(optimized);
        res.status(200).json({ success: true, data: { _id: docRef.id, ...optimized } });
        return;
      } catch (e) {}
    }

    res.status(200).json({ success: true, data: optimized });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
