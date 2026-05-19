import { Request, Response } from 'express';
import { Incident } from '../models/incident.model';
import mongoose from 'mongoose';

// In-Memory data store fallback when MongoDB is offline/unconfigured
let inMemoryIncidents: any[] = [
  {
    _id: "incident-1",
    id: "INC-3829",
    type: "Overflow Warning",
    location_name: "Connaught Place Gate 2",
    severity: "High",
    description: "Bin has exceeded 90% fill level threshold. Collector dispatch initiated.",
    status: "Assigned",
    ai_validated: true,
    created_at: new Date()
  },
  {
    _id: "incident-2",
    id: "INC-8291",
    type: "Illegal Dumping",
    location_name: "Sector 12 Market Complex",
    severity: "Medium",
    description: "Citizen reported unauthorized commercial waste disposal in organic bio-bins.",
    status: "Submitted",
    ai_validated: false,
    created_at: new Date(Date.now() - 7200000)
  }
];

export const createIncident = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newIncident = {
        _id: new mongoose.Types.ObjectId().toString(),
        id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
        status: "Submitted",
        created_at: new Date(),
        ...req.body
      };
      inMemoryIncidents.unshift(newIncident);
      res.status(201).json({ success: true, data: newIncident });
      return;
    }

    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ success: true, data: incident });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...inMemoryIncidents];
      if (req.query.status) {
        filtered = filtered.filter(i => i.status === req.query.status);
      }
      res.status(200).json({ success: true, data: filtered });
      return;
    }

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
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const incident = inMemoryIncidents.find(i => i._id === id || i.id === id);
      if (!incident) {
        res.status(404).json({ success: false, error: 'Incident not found' });
        return;
      }
      res.status(200).json({ success: true, data: incident });
      return;
    }

    const incident = await Incident.findById(id).populate('assignedTo', 'name email');
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
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const idx = inMemoryIncidents.findIndex(i => i._id === id || i.id === id);
      if (idx === -1) {
        res.status(404).json({ success: false, error: 'Incident not found' });
        return;
      }
      inMemoryIncidents[idx] = { ...inMemoryIncidents[idx], ...req.body };
      res.status(200).json({ success: true, data: inMemoryIncidents[idx] });
      return;
    }

    const incident = await Incident.findByIdAndUpdate(id, req.body, {
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
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const idx = inMemoryIncidents.findIndex(i => i._id === id || i.id === id);
      if (idx === -1) {
        res.status(404).json({ success: false, error: 'Incident not found' });
        return;
      }
      inMemoryIncidents.splice(idx, 1);
      res.status(200).json({ success: true, data: {} });
      return;
    }

    const incident = await Incident.findByIdAndDelete(id);
    if (!incident) {
      res.status(404).json({ success: false, error: 'Incident not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
