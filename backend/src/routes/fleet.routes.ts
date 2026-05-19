import { Router } from 'express';
import { getAllVehicles, getLiveTracking, assignVehicle, getRoutes, optimizeRoute } from '../controllers/fleet.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /fleet:
 *   get:
 *     summary: Get all vehicles with their status
 *     tags: [Fleet]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/', verifyToken, getAllVehicles);

/**
 * @swagger
 * /fleet/tracking:
 *   get:
 *     summary: Get live GPS positions of all vehicles and collectors
 *     tags: [Fleet]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/tracking', verifyToken, getLiveTracking);

/**
 * @swagger
 * /fleet/assign:
 *   post:
 *     summary: Assign a vehicle to a route (admin only)
 *     tags: [Fleet]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/assign', verifyToken, requireRole(['admin', 'super_admin']), assignVehicle);

/**
 * @swagger
 * /fleet/routes:
 *   get:
 *     summary: Get optimized route list
 *     tags: [Fleet]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/routes', verifyToken, getRoutes);

/**
 * @swagger
 * /fleet/routes/optimize:
 *   post:
 *     summary: Generate optimized collection route for a set of bin IDs
 *     tags: [Fleet]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/routes/optimize', verifyToken, optimizeRoute);

export default router;
