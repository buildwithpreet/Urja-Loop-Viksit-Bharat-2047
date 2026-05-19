import mqtt from 'mqtt';
import { env } from '../config/env';
import { db } from '../config/firebase';
import { getIO } from '../sockets';

let client: mqtt.MqttClient;

export const initMqtt = () => {
  const brokerUrl = env.MQTT_BROKER_URL;
  console.log(`Connecting to MQTT broker: ${brokerUrl}`);
  
  client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    console.log('✅ Connected to MQTT broker');
    
    // Subscribe to IoT bin topics
    client.subscribe('urjaloop/bins/+/status', (err) => {
      if (err) console.error('MQTT Subscription error:', err);
      else console.log('✅ Subscribed to urjaloop/bins/+/status');
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const topicParts = topic.split('/');
      const binId = topicParts[2];
      
      const payload = JSON.parse(message.toString());
      console.log(`[MQTT] Received payload for ${binId}:`, payload);
      
      const { fillLevel, battery, location } = payload;
      
      // Update Firestore
      if (db) {
        await db.collection('bins').doc(binId).set({
          binId,
          currentFillLevel: fillLevel,
          batteryLevel: battery,
          lastPing: new Date().toISOString(),
          status: 'active',
          ...(location ? { address: location } : {})
        }, { merge: true });
        
        // Auto-create alert if overflow
        if (fillLevel >= 90) {
          const alert = {
            id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
            type: 'Critical Overflow Alert',
            binId,
            location: location || 'Unknown',
            severity: 'Critical',
            fillLevel,
            resolved: false,
            createdAt: new Date().toISOString()
          };
          await db.collection('alerts').add(alert);
          
          try {
            getIO().to('dashboard_updates').emit('bin-overflow', { binId, fillLevel, location });
            getIO().to('dashboard_updates').emit('new_alert', alert);
            getIO().to('admin_room').emit('ai-alert', alert);
          } catch (e) {}
        }
      }
      
      // Broadcast live bin update to all connected dashboards
      try {
        getIO().to('dashboard_updates').emit('bin_update', { id: binId, fillDelta: 0, newFillLevel: fillLevel });
      } catch (e) {}
      
    } catch (error) {
      console.error('[MQTT] Message parsing error:', error);
    }
  });

  client.on('error', (err) => {
    console.error('❌ MQTT Error:', err);
  });
};

export const getMqttClient = () => client;
