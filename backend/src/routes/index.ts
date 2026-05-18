import { Router } from 'express';
import userRoutes from './user.routes';
import binRoutes from './bin.routes';
import aiRoutes from './ai.routes';
import routeOptimizationRoutes from './route.routes';
import incidentRoutes from './incident.routes';
import alertRoutes from './alert.routes';
import analyticsRoutes from './analytics.routes';
import wastelogRoutes from './wastelog.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/bins', binRoutes);
router.use('/ai', aiRoutes);
router.use('/routes', routeOptimizationRoutes);
router.use('/incidents', incidentRoutes);
router.use('/alerts', alertRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/wastelogs', wastelogRoutes);

export default router;
