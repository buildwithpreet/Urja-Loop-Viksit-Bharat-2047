import { Router } from 'express';
import { registerBin, updateBinStatus, getAllBins } from '../controllers/bin.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /bins:
 *   get:
 *     summary: Get all bins
 *     tags: [Bins]
 */
router.get('/', verifyToken, getAllBins);

/**
 * @swagger
 * /bins/register:
 *   post:
 *     summary: Register a new IoT Bin
 *     tags: [Bins]
 */
router.post('/register', verifyToken, requireRole(['admin']), registerBin);

/**
 * @swagger
 * /bins/{binId}/status:
 *   put:
 *     summary: Update bin status (IoT ping)
 *     tags: [Bins]
 */
router.put('/:binId/status', updateBinStatus); // Often IoT devices don't use standard JWT, might need API key auth

export default router;
