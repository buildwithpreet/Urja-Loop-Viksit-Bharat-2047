import { Request, Response } from 'express';
import { Incident } from '../models/incident.model';

export const createIncident = async (req: Request, res: Response) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ success: true, data: incident });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;

    const incidents = await Incident.find(filters).populate('assignedTo', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: incidents });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findById(req.params.id).populate('assignedTo', 'name email');
    if (!incident) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    res.status(200).json({ success: true, data: incident });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!incident) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    res.status(200).json({ success: true, data: incident });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
