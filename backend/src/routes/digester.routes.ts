import { Router } from 'express';
import { Digester } from '../models/biogrid.model';

const router = Router();

router.get('/status', async (req, res) => {
  try {
    // const digesters = await Digester.find();
    res.status(200).json({ success: true, data: [] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/telemetry', async (req, res) => {
  try {
    // Mock telemetry for dashboard
    res.status(200).json({ 
      success: true, 
      data: {
        ph: 7.2,
        temperature: 38.5,
        pressure: 1.2,
        methaneOutput: 450
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { plantId, telemetry } = req.body;
    // await Digester.findOneAndUpdate({ plantId }, { telemetry }, { upsert: true });
    res.status(200).json({ success: true, message: 'Telemetry updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
