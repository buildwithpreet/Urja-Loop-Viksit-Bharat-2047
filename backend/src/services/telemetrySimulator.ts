import { getIO } from '../sockets';

export const startTelemetrySimulator = () => {
  console.log('✅ Started BioGRID Telemetry Simulator');
  
  setInterval(() => {
    try {
      const io = getIO();
      if (!io) return;

      // Simulate Digester Telemetry
      const payload = {
        type: 'digester_telemetry',
        data: {
          tankId: 'TANK_01',
          temperature: (38 + Math.random() * 1.5).toFixed(1), // 38.0 - 39.5 C
          ph: (7.0 + Math.random() * 0.4).toFixed(2), // 7.0 - 7.4 pH
          pressure: (1.1 + Math.random() * 0.2).toFixed(2), // 1.1 - 1.3 Bar
          methaneVolume: Math.floor(800 + Math.random() * 50),
          gasOutput: Math.floor(480 + Math.random() * 30),
          timestamp: new Date().toISOString()
        }
      };

      // Emit to admin room
      io.to('admin_room').emit('telemetry_update', payload);

      // Randomly simulate AI Alerts (5% chance every interval)
      if (Math.random() < 0.05) {
        const aiAlert = {
          type: 'ai_predictive_alert',
          data: {
            id: `AI-ALT-${Math.floor(Math.random() * 10000)}`,
            severity: Math.random() > 0.5 ? 'WARNING' : 'CRITICAL',
            message: 'Predictive Alert: Anomalous temperature drop detected in Tank 02.',
            recommendation: 'Increase heating jacket flow by 15%.',
            timestamp: new Date().toISOString()
          }
        };
        io.to('admin_room').emit('ai_alert', aiAlert);
      }

    } catch (err) {
      // socket not ready or other error
    }
  }, 3000); // Every 3 seconds
};
