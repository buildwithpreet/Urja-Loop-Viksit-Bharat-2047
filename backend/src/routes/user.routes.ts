import { Router } from 'express';
import { registerUser, getProfile, getWallet } from '../controllers/user.controller';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', verifyToken, getProfile);

/**
 * @swagger
 * /users/wallet:
 *   get:
 *     summary: Get user carbon credits wallet
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/wallet', verifyToken, getWallet);

export default router;
