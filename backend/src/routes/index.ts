import { Router } from 'express';
import userRoutes from './user.routes';
import binRoutes from './bin.routes';
import routeRoutes from './route.routes';
import aiRoutes from './ai.routes';
import collectorRoutes from './collector.routes';
import fleetRoutes from './fleet.routes';
import adminRoutes from './admin.routes';
import rewardsRoutes from './rewards.routes';
import notificationRoutes from './notification.routes';
import demoRoutes from './demo.routes';

const router = Router();

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'UrjaLoop API is running smoothly' });
});

// Mount Routes
router.use('/users', userRoutes);
router.use('/bins', binRoutes);
router.use('/routes', routeRoutes);
router.use('/ai', aiRoutes);
router.use('/collector', collectorRoutes);
router.use('/fleet', fleetRoutes);
router.use('/admin', adminRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/notifications', notificationRoutes);
router.use('/demo', demoRoutes);

export default router;
