import { Router } from 'express';
import {
  createAlert,
  getAlerts,
  getAlertById,
  resolveAlert,
  deleteAlert
} from '../controllers/alert.controller';

const router = Router();

router.route('/')
  .post(createAlert)
  .get(getAlerts);

router.route('/:id')
  .get(getAlertById)
  .delete(deleteAlert);

router.route('/:id/resolve')
  .patch(resolveAlert);

export default router;
