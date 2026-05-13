import { Request, Response } from 'express';
import { Route } from '../models/route.model';
import { Bin } from '../models/bin.model';

// Mock routing logic. In a real system, you would call Google Maps Route Optimization API
// or a TSP solver using the coordinates of the bins.
const calculateOptimizedRoute = async (binIds: string[]) => {
  return {
    distance: 12.5, // km
    duration: 45, // minutes
    polyline: 'mock_encoded_polyline_string'
  };
};

export const generateRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fleetId } = req.body;

    // Find bins that need pickup (e.g., > 80% full)
    const binsToPickup = await Bin.find({ currentFillLevel: { $gte: 80 } }).limit(10);
    
    if (binsToPickup.length === 0) {
      res.status(200).json({ success: true, message: 'No bins currently require pickup' });
      return;
    }

    const binIds = binsToPickup.map(b => b._id.toString());
    const routingResult = await calculateOptimizedRoute(binIds);

    const newRoute = await Route.create({
      fleetId,
      assignedBins: binIds,
      optimizedPath: routingResult,
      status: 'pending'
    });

    res.status(201).json({ success: true, data: newRoute });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
