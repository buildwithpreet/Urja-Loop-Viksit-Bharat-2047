import { Router } from 'express';
import {
  createOrUpdateAnalytics,
  getAnalytics,
  getAnalyticsSummary
} from '../controllers/analytics.controller';

const router = Router();

router.route('/')
  .post(createOrUpdateAnalytics)
  .get(getAnalytics);

router.route('/summary')
  .get(getAnalyticsSummary);

export default router;
