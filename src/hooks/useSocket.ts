import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../lib/api';

// Create a singleton instance outside to prevent multiple connections
let globalSocket: Socket | null = null;

const SOCKET_URL = API_BASE_URL.replace('/api/v1', '');

export const useSocket = (room: string = 'dashboard_updates') => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Event state stores
  const [events, setEvents] = useState<any[]>([]);
  const [binUpdates, setBinUpdates] = useState<Record<string, any>>({});
  const [alerts, setAlerts] = useState<any[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('urjaloop_auth_token');
    }

    if (!globalSocket) {
      globalSocket = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }

    socketRef.current = globalSocket;

    const socket = socketRef.current;

    const onConnect = () => {
      setIsConnected(true);
      setError(null);
      socket.emit('join_room', room);
      // Everyone joins dashboard_updates by default in backend, but explicit is fine
    };

    const onDisconnect = (reason: string) => {
      setIsConnected(false);
      console.warn(`Socket disconnected: ${reason}`);
    };

    const onConnectError = (err: Error) => {
      setError(err.message);
      console.error(`Socket connection error: ${err.message}`);
    };

    // Generic Event Handlers
    const onLiveEvent = (data: any) => {
      setEvents(prev => [data, ...prev].slice(0, 50));
    };

    const onBinUpdate = (data: any) => {
      setBinUpdates(prev => ({ ...prev, [data.id]: data }));
    };

    const onNewAlert = (data: any) => {
      setAlerts(prev => [data, ...prev].slice(0, 20));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    
    // Subscribe to standard UrjaLoop events
    socket.on('live_event', onLiveEvent);
    socket.on('bin_update', onBinUpdate);
    socket.on('bin-overflow', onBinUpdate);
    socket.on('new_alert', onNewAlert);
    socket.on('ai-alert', onNewAlert);

    // Initial connection state
    setIsConnected(socket.connected);
    if (socket.connected) socket.emit('join_room', room);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('live_event', onLiveEvent);
      socket.off('bin_update', onBinUpdate);
      socket.off('bin-overflow', onBinUpdate);
      socket.off('new_alert', onNewAlert);
      socket.off('ai-alert', onNewAlert);
      socket.emit('leave_room', room);
    };
  }, [room]);

  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return { isConnected, error, events, binUpdates, alerts, emit, socket: socketRef.current };
};
