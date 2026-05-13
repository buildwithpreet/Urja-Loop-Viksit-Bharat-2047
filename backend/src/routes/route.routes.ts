import { Router } from 'express';
import { generateRoute } from '../controllers/route.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /routes/generate:
 *   post:
 *     summary: Generate optimized route for a fleet based on bin fill levels
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 */
router.post('/generate', verifyToken, requireRole(['admin', 'municipal']), generateRoute);

export default router;
