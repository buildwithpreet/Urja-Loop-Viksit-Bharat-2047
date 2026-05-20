import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '8080', 10),
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'urjaloop_secret_fallback_key',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  MQTT_BROKER_URL: process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/urjaloop'
};
