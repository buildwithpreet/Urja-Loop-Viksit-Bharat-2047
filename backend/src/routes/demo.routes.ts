import { Router } from 'express';
import { simulateOverflow, simulateAiScan, simulateDispatch, simulatePickup, simulateEmergency } from '../controllers/demo.controller';

const router = Router();

/**
 * @swagger
 * /demo/simulate-overflow:
 *   post:
 *     summary: "[DEMO] Step 1 — Trigger bin overflow, creates alert"
 *     tags: [Demo]
 */
router.post('/simulate-overflow', simulateOverflow);

/**
 * @swagger
 * /demo/simulate-ai-scan:
 *   post:
 *     summary: "[DEMO] Step 2 — Run AI waste scan, award credits"
 *     tags: [Demo]
 */
router.post('/simulate-ai-scan', simulateAiScan);

/**
 * @swagger
 * /demo/simulate-dispatch:
 *   post:
 *     summary: "[DEMO] Step 3 — Dispatch collector to overflow bin"
 *     tags: [Demo]
 */
router.post('/simulate-dispatch', simulateDispatch);

/**
 * @swagger
 * /demo/simulate-pickup:
 *   post:
 *     summary: "[DEMO] Step 4 — Complete pickup, clear bin"
 *     tags: [Demo]
 */
router.post('/simulate-pickup', simulatePickup);

/**
 * @swagger
 * /demo/simulate-emergency:
 *   post:
 *     summary: "[DEMO] Step 5 — Broadcast emergency to all dashboards"
 *     tags: [Demo]
 */
router.post('/simulate-emergency', simulateEmergency);

export default router;
