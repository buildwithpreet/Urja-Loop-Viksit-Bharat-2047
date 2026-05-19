import { Router } from 'express';
import { sendNotification, getNotifications, markNotificationRead, markAllRead } from '../controllers/notification.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/send', verifyToken, sendNotification);
router.get('/', verifyToken, getNotifications);
router.put('/:id/read', verifyToken, markNotificationRead);
router.put('/read-all', verifyToken, markAllRead);

export default router;
