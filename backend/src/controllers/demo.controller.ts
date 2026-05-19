import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { getIO } from '../sockets';

const DEMO_BINS = [
  { binId: 'BIN-001', address: 'Sector 4, Cyber City, New Delhi', lat: 28.6139, lng: 77.2090 },
  { binId: 'BIN-002', address: 'Metro Gate 2, Connaught Place', lat: 28.6250, lng: 77.2180 },
  { binId: 'BIN-003', address: 'Rural Bio-Hub Primary Center', lat: 28.6000, lng: 77.1950 },
  { binId: 'BIN-004', address: 'Industrial Zone Gate 1', lat: 28.6300, lng: 77.2300 },
  { binId: 'BIN-005', address: 'Sector 12 Market Complex', lat: 28.6150, lng: 77.1850 }
];

const DEMO_COLLECTORS = [
  { id: 'collector-001', name: 'Ramesh Kumar', phone: '+919876543210' },
  { id: 'collector-002', name: 'Suresh Singh', phone: '+919871234567' }
];

// STEP 1: Simulate bin overflow → creates alert + emits socket event
export const simulateOverflow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId } = req.body;
    const targetBin = DEMO_BINS.find(b => b.binId === binId) || DEMO_BINS[Math.floor(Math.random() * DEMO_BINS.length)];

    // Update bin fill level to 95%
    if (db) {
      try {
        await db.collection('bins').doc(targetBin.binId).set({
          binId: targetBin.binId, address: targetBin.address,
          currentFillLevel: 95, status: 'active',
          batteryLevel: 72, lastPing: new Date().toISOString()
        }, { merge: true });
      } catch (e) {}
    }

    const alert = {
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
      type: 'Critical Overflow Alert',
      binId: targetBin.binId,
      location: targetBin.address,
      lat: targetBin.lat, lng: targetBin.lng,
      severity: 'Critical',
      fillLevel: 95,
      resolved: false,
      createdAt: new Date().toISOString(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    if (db) {
      try { await db.collection('alerts').add(alert); } catch (e) {}
    }

    // Broadcast to all dashboards
    try {
      const io = getIO();
      io.to('dashboard_updates').emit('bin-overflow', { binId: targetBin.binId, fillLevel: 95, location: targetBin.address });
      io.to('dashboard_updates').emit('new_alert', alert);
      io.to('admin_room').emit('ai-alert', { ...alert, message: `⚠️ OVERFLOW: ${targetBin.binId} at ${targetBin.address} — 95% capacity` });
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: `Overflow simulated for ${targetBin.binId}`,
      data: { bin: targetBin, fillLevel: 95, alert },
      nextStep: 'Call POST /demo/simulate-dispatch to assign a collector'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STEP 2: Simulate AI waste scan → awards credits + emits event
export const simulateAiScan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, binId } = req.body;
    const targetBin = DEMO_BINS.find(b => b.binId === binId) || DEMO_BINS[1];
    const targetUser = userId || 'demo-citizen-001';

    const wasteTypes = [
      { category: 'plastic', confidence: 0.97, credits: 15, weight: 0.5, message: 'PET Plastic detected — High recyclability. Great job!' },
      { category: 'organic', confidence: 0.93, credits: 10, weight: 0.8, message: 'Organic waste detected — Perfect for bio-fuel conversion.' },
      { category: 'paper', confidence: 0.91, credits: 8, weight: 0.3, message: 'Paper/Cardboard detected — Send to recycling stream.' },
      { category: 'metal', confidence: 0.95, credits: 20, weight: 0.2, message: 'Metal detected — High value recycling material!' },
      { category: 'e-waste', confidence: 0.88, credits: 25, weight: 0.15, message: 'E-Waste detected — Route to certified e-waste facility.' }
    ];

    const result = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];

    const logData = {
      user: targetUser, bin: targetBin.binId,
      classification: { category: result.category, confidence: result.confidence, isVerified: true },
      weightEstimate: result.weight,
      creditsAwarded: result.credits,
      fraudScore: Math.floor(Math.random() * 10),
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('wastelogs').add(logData);
        const userRef = db.collection('users').doc(targetUser);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const current = userDoc.data()?.carbonCredits || 0;
          await userRef.update({ carbonCredits: current + result.credits, updatedAt: new Date().toISOString() });
        }
      } catch (e) {}
    }

    try {
      getIO().to('dashboard_updates').emit('live_event', {
        id: Date.now(), action: 'AI Analysis Complete',
        user: `User ${targetUser.substring(0, 8)}`, location: targetBin.address,
        credits: result.credits, icon: 'scan', color: 'emerald',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: 'AI Scan simulated successfully',
      data: { ...result, ...logData, timestamp: new Date().toISOString() },
      nextStep: 'Call POST /demo/simulate-overflow to trigger bin overflow'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STEP 3: Simulate collector dispatch → assigns task + emits event
export const simulateDispatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId, collectorId } = req.body;
    const targetBin = DEMO_BINS.find(b => b.binId === binId) || DEMO_BINS[3]; // Default BIN-004 (overflow)
    const collector = DEMO_COLLECTORS.find(c => c.id === collectorId) || DEMO_COLLECTORS[0];

    const task = {
      taskId: `TASK-${Math.floor(Math.random() * 9000) + 1000}`,
      binId: targetBin.binId, binAddress: targetBin.address,
      location: { lat: targetBin.lat, lng: targetBin.lng },
      fillLevel: 95, priority: 'high', status: 'accepted',
      assignedTo: collector.id, assignedCollectorName: collector.name,
      createdAt: new Date().toISOString(), acceptedAt: new Date().toISOString()
    };

    if (db) {
      try { await db.collection('collector_tasks').add(task); } catch (e) {}
    }

    try {
      const io = getIO();
      io.to('dashboard_updates').emit('collector-assigned', { collectorName: collector.name, binId: targetBin.binId, taskId: task.taskId, time: new Date().toLocaleTimeString() });
      io.to('admin_room').emit('collector-assigned', task);
      io.to('collector_room').emit('new-task', task);
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: `${collector.name} dispatched to ${targetBin.binId}`,
      data: { task, collector, bin: targetBin },
      nextStep: 'Call POST /demo/simulate-pickup to complete the collection'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STEP 4: Simulate pickup completion → clears bin + emits event
export const simulatePickup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { binId, taskId } = req.body;
    const targetBin = DEMO_BINS.find(b => b.binId === binId) || DEMO_BINS[3];

    if (db) {
      try {
        await db.collection('bins').doc(targetBin.binId).set({
          currentFillLevel: 5, status: 'active', lastPing: new Date().toISOString()
        }, { merge: true });
      } catch (e) {}
    }

    const pickupRecord = {
      binId: targetBin.binId, taskId: taskId || `TASK-${Date.now()}`,
      collectionWeight: Math.round(Math.random() * 30 + 10),
      status: 'completed', completedAt: new Date().toISOString()
    };

    try {
      const io = getIO();
      io.to('dashboard_updates').emit('pickup-completed', { ...pickupRecord, location: targetBin.address });
      io.to('dashboard_updates').emit('bin_update', { id: targetBin.binId, fillDelta: -90 });
      io.to('admin_room').emit('pickup-completed', pickupRecord);
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: `Pickup completed for ${targetBin.binId} — bin cleared to 5%`,
      data: pickupRecord,
      nextStep: 'Full demo cycle complete! 🎉 Try POST /demo/simulate-emergency'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// STEP 5: Simulate emergency broadcast
export const simulateEmergency = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, severity } = req.body;
    
    const alert = {
      id: `EMRG-${Date.now()}`,
      type: 'System Emergency',
      message: message || '🚨 CRITICAL: Multiple bin overflows detected in Sector 14. All available collectors dispatched.',
      severity: severity || 'Critical',
      location: 'System Wide',
      targetRole: 'all',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      issuedAt: new Date().toISOString()
    };

    if (db) {
      try { await db.collection('alerts').add(alert); } catch (e) {}
    }

    try {
      const io = getIO();
      io.to('dashboard_updates').emit('new_alert', alert);
      io.to('admin_room').emit('ai-alert', alert);
      io.to('collector_room').emit('ai-alert', alert);
      io.to('fleet_room').emit('ai-alert', alert);
    } catch (e) {}

    res.status(200).json({
      success: true,
      message: 'Emergency broadcast sent to all dashboards',
      data: alert
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
