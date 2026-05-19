import { Router } from 'express';
import { registerUser, loginUser, getProfile, updateProfile, getWallet, getWasteHistory, getCarbonImpact } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user (email + phone + password)
 *     tags: [Users]
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with email OR phone + password
 *     tags: [Users]
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/profile', verifyToken, getProfile);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile (name, phone, address, bio)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 */
router.put('/profile', verifyToken, updateProfile);

/**
 * @swagger
 * /users/wallet:
 *   get:
 *     summary: Get user carbon credits wallet
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/wallet', verifyToken, getWallet);

/**
 * @swagger
 * /users/waste-history:
 *   get:
 *     summary: Get paginated waste scan history
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/waste-history', verifyToken, getWasteHistory);

/**
 * @swagger
 * /users/carbon-impact:
 *   get:
 *     summary: Get CO2 saved, sustainability score, and badges
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/carbon-impact', verifyToken, getCarbonImpact);

export default router;
