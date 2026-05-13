import { Router } from 'express';
import { classifyWaste } from '../controllers/ai.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /ai/classify:
 *   post:
 *     summary: Classify waste image and award credits
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 */
router.post('/classify', verifyToken, classifyWaste);

export default router;
