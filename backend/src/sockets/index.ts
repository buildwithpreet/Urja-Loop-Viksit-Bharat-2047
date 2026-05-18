import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from '../config/env';

let io: Server;

export const initSocketIO = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Adjust for production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join_dashboard', () => {
      socket.join('dashboard_updates');
      console.log(`Socket ${socket.id} joined dashboard_updates`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  // Start background simulation engine for the Smart City Dashboard
  setInterval(() => {
    if (!io) return;
    const actions = ["AI Analysis Complete", "Waste Disposed", "Route Optimized", "User Scan"];
    const users = ["User #0482", "Live User", "Collector A", "Citizen #89"];
    const locations = ["Sector 14", "Cyber Hub", "Metro Station", "Rural Hub 02"];
    
    // Simulate global live activity
    if (Math.random() > 0.3) {
      io.to('dashboard_updates').emit('live_event', {
        id: Date.now(),
        action: actions[Math.floor(Math.random() * actions.length)],
        user: users[Math.floor(Math.random() * users.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        credits: Math.floor(Math.random() * 20),
        icon: Math.random() > 0.5 ? "scan" : "bin",
        color: Math.random() > 0.5 ? "emerald" : "blue",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    }

    // Simulate smart bin fill levels
    if (Math.random() > 0.5) {
      io.to('dashboard_updates').emit('bin_update', {
        id: `BIN-00${Math.floor(Math.random() * 5) + 1}`,
        fillDelta: Math.floor(Math.random() * 5) - 1, // Can go up or down
      });
    }

    // Simulate alerts
    if (Math.random() > 0.8) {
      const severities = ["Low", "Medium", "High", "Critical"];
      const incidentTypes = ["Sensor Offline", "Illegal Dumping", "Overflow Alert", "Route Delay"];
      io.to('dashboard_updates').emit('new_alert', {
        id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
        type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: "Open",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      });
    }
  }, 3000);

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
