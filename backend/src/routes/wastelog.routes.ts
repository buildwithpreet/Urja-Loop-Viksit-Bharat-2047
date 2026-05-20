import { Router } from 'express';
import {
  createWasteLog,
  getWasteLogs,
  getWasteLogById,
  deleteWasteLog
} from '../controllers/wastelog.controller';

const router = Router();

router.route('/')
  .post(createWasteLog)
  .get(getWasteLogs);

router.route('/:id')
  .get(getWasteLogById)
  .delete(deleteWasteLog);

export default router;
