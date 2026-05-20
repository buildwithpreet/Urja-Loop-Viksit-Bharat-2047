import { Router } from 'express';
import { Land, CropCycle } from '../models/biogrid.model';

const router = Router();

// Mock authentication middleware - assumes req.user is set
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { id: 'dummy_farmer_id' }; // Replace with actual auth middleware
  next();
};

router.use(mockAuth);

router.post('/register', async (req, res) => {
  try {
    const { state, district, village, areaAcres, location } = req.body;
    // In real app, farmerId comes from req.user
    const newLand = new Land({ farmerId: req.user.id, state, district, village, areaAcres, location });
    // await newLand.save();
    res.status(201).json({ success: true, message: 'Land registered successfully', data: newLand });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/my-land', async (req, res) => {
  try {
    // const lands = await Land.find({ farmerId: req.user.id });
    res.status(200).json({ success: true, data: [] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/harvest', async (req, res) => {
  try {
    const { landId, cropType, season, expectedHarvestDate } = req.body;
    const newCrop = new CropCycle({ landId, cropType, season, expectedHarvestDate });
    // await newCrop.save();
    res.status(201).json({ success: true, message: 'Harvest scheduled', data: newCrop });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/analytics', async (req, res) => {
  res.status(200).json({ success: true, data: { totalWaste: 1500, carbonCredits: 45, earnings: 12000 } });
});

export default router;
