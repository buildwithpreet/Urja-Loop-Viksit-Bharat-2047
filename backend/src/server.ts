import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { initSocketIO } from './sockets';
import './config/firebase'; // Initialize Firebase
import './config/redis'; // Initialize Redis

const server = http.createServer(app);

// Initialize Socket.IO
initSocketIO(server);

const startServer = async () => {
  await connectDB();
  
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
