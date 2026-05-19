import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { initSockets } from './sockets';
import { initMqtt } from './services/mqtt.service';
import './config/firebase'; // Initialize Firebase
import './config/redis'; // Initialize Redis

const server = http.createServer(app);

// Initialize Socket.IO
initSockets(server);

const startServer = async () => {
  await connectDB();
  
  // Initialize MQTT for IoT
  initMqtt();
  
  server.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    console.log(`Swagger Docs available at http://localhost:${env.PORT}/api-docs`);
  });
};

startServer();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
