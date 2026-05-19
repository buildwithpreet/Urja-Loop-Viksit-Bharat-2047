import { Router } from 'express';
import { getAdminAnalytics, getSmartMetrics, assignCollector, sendEmergencyAlert, getAdminIncidents } from '../controllers/admin.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

const adminGuard = [verifyToken, requireRole(['admin', 'super_admin'])];

/**
 * @swagger
 * /admin/analytics:
 *   get:
 *     summary: Get aggregated real-time city metrics
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/analytics', adminGuard, getAdminAnalytics);

/**
 * @swagger
 * /admin/smart-metrics:
 *   get:
 *     summary: Get AI accuracy, route efficiency, sustainability metrics
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/smart-metrics', adminGuard, getSmartMetrics);

/**
 * @swagger
 * /admin/incidents:
 *   get:
 *     summary: Admin-level incident view with filters
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/incidents', adminGuard, getAdminIncidents);

/**
 * @swagger
 * /admin/assign-collector:
 *   post:
 *     summary: Manually assign a collector to an incident
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/assign-collector', adminGuard, assignCollector);

/**
 * @swagger
 * /admin/emergency-alert:
 *   post:
 *     summary: Broadcast an emergency alert to all dashboards
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/emergency-alert', adminGuard, sendEmergencyAlert);

export default router;
