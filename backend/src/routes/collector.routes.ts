import { Router } from 'express';
import { getCollectorTasks, acceptTask, completeTask, updateLiveLocation, getCollectorPerformance } from '../controllers/collector.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /collector/tasks:
 *   get:
 *     summary: Get tasks for the logged-in collector
 *     tags: [Collector]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/tasks', verifyToken, getCollectorTasks);

/**
 * @swagger
 * /collector/accept-task:
 *   post:
 *     summary: Accept a pending pickup task
 *     tags: [Collector]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/accept-task', verifyToken, acceptTask);

/**
 * @swagger
 * /collector/complete-task:
 *   post:
 *     summary: Mark a task as completed with proof
 *     tags: [Collector]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/complete-task', verifyToken, completeTask);

/**
 * @swagger
 * /collector/live-location:
 *   post:
 *     summary: Push collector live GPS location
 *     tags: [Collector]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/live-location', verifyToken, updateLiveLocation);

/**
 * @swagger
 * /collector/performance:
 *   get:
 *     summary: Get collector performance KPIs
 *     tags: [Collector]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/performance', verifyToken, getCollectorPerformance);

export default router;
