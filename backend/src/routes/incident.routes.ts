import { Router } from 'express';
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
} from '../controllers/incident.controller';

const router = Router();

router.route('/')
  .post(createIncident)
  .get(getIncidents);

router.route('/:id')
  .get(getIncidentById)
  .put(updateIncident)
  .delete(deleteIncident);

export default router;
