import { Router } from 'express';
import { getRewardsBalance, addCredits, redeemCredits, getRewardHistory } from '../controllers/rewards.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/balance', verifyToken, getRewardsBalance);
router.post('/add', verifyToken, addCredits);
router.post('/redeem', verifyToken, redeemCredits);
router.get('/history', verifyToken, getRewardHistory);

export default router;
