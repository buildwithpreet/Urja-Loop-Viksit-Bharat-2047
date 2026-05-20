import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

let io: Server;

export const initSockets = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication Middleware for Sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
    
    // For demo purposes, allow unauthenticated connections but put them in a generic room
    if (!token) {
      socket.data.role = 'guest';
      return next();
    }
    
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;
      socket.data.user = decoded;
      socket.data.role = decoded.role;
      next();
    } catch (err) {
      console.warn('Socket auth failed, assigning guest role');
      socket.data.role = 'guest';
      next();
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id} (Role: ${socket.data.role})`);
    
    // Join role-specific rooms automatically
    const role = socket.data.role;
    if (role === 'admin' || role === 'super_admin') {
      socket.join('admin_room');
      socket.join('fleet_room');
      console.log(`User ${socket.id} joined admin_room & fleet_room`);
    } else if (role === 'collector') {
      socket.join('collector_room');
      console.log(`User ${socket.id} joined collector_room`);
    } else if (role === 'citizen') {
      socket.join('citizen_room');
    }
    
    // Everyone joins the generic dashboard updates room
    socket.join('dashboard_updates');

    // Handle Client Subscriptions Manually
    socket.on('join_room', (room: string) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room: ${room}`);
    });

    socket.on('leave_room', (room: string) => {
      socket.leave(room);
      console.log(`Client ${socket.id} left room: ${room}`);
    });

    // Chat / Support functionality
    socket.on('chat_message', (msg) => {
      // Broadcast to specific support channel or admin
      io.to('admin_room').emit('incoming_chat', { ...msg, senderId: socket.id });
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  console.log('✅ Socket.IO initialized with role-based rooms');
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
