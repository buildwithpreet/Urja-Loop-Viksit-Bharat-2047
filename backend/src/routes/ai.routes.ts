import { Router } from 'express';
import { classifyWaste, predictOverflow, getAiInsights, optimizeRoute } from '../controllers/ai.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /ai/classify:
 *   post:
 *     summary: Classify waste from image using Gemini Vision AI
 *     tags: [AI]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/classify', verifyToken, classifyWaste);

/**
 * @swagger
 * /ai/predict-overflow:
 *   get:
 *     summary: Predict overflow timing for bins using fill rate analysis
 *     tags: [AI]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/predict-overflow', verifyToken, predictOverflow);

/**
 * @swagger
 * /ai/insights:
 *   get:
 *     summary: Get AI-generated waste management insights and recommendations
 *     tags: [AI]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/insights', verifyToken, getAiInsights);

/**
 * @swagger
 * /ai/optimize-route:
 *   post:
 *     summary: Get AI-optimized collection route for given bin IDs
 *     tags: [AI]
 *     security: [{ bearerAuth: [] }]
 */
router.post('/optimize-route', verifyToken, optimizeRoute);

export default router;
