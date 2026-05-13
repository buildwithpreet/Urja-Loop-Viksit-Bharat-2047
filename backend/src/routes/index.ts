import { Router } from 'express';
import userRoutes from './user.routes';
import binRoutes from './bin.routes';
import aiRoutes from './ai.routes';
import routeOptimizationRoutes from './route.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/bins', binRoutes);
router.use('/ai', aiRoutes);
router.use('/routes', routeOptimizationRoutes);

export default router;
