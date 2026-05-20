/**
 * UrjaLoop Global API Client
 * Binds the Next.js frontend application to the serverless Express/MongoDB backend.
 */

export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  "https://urjaloop-backend-959539813121.asia-south1.run.app/api/v1";

// Helper for standard JSON requests
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if available
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('urjaloop_auth_token');
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errText || response.statusText}`);
    }
    
    // In case of 204 No Content
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Request to ${endpoint} failed:`, error);
    throw error;
  }
}

export interface Alert {
  _id?: string;
  id?: string | number;
  type: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Active" | "Resolved";
  time?: string;
  createdAt?: string;
}

export interface AnalyticsSummary {
  totalWasteCollected: number;
  aiAccuracy: number;
  recyclingRatio: number;
  carbonSaved: number;
  dailyCollections: Array<{ date: string; amount: number }>;
}

export interface Bin {
  _id?: string;
  binId: string;
  fillLevel: number;
  status: "Active" | "Maintenance" | "Offline";
  lastPing?: string;
}

export interface Incident {
  _id?: string;
  id?: string;
  user_id?: string;
  type: string;
  location_name: string;
  severity: string;
  description: string;
  status: "Submitted" | "Under Review" | "Assigned" | "In Progress" | "Resolved";
  status_idx?: number;
  image_url?: string | null;
  ai_validated?: boolean;
  assigned_to?: string;
  expected_resolution?: string;
  created_at?: string;
}

export const alertsApi = {
  getAll: () => request<Alert[]>("/alerts"),
  create: (alert: Partial<Alert>) => request<Alert>("/alerts", {
    method: "POST",
    body: JSON.stringify(alert),
  }),
  resolve: (id: string) => request<Alert>(`/alerts/${id}/resolve`, {
    method: "PATCH",
  }),
};

export const analyticsApi = {
  getSummary: () => request<AnalyticsSummary>("/analytics/summary"),
  update: (data: Partial<AnalyticsSummary>) => request<any>("/analytics", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const binsApi = {
  getAll: () => request<Bin[]>("/bins"),
  updateStatus: (binId: string, data: { fillLevel: number; status?: string }) => request<any>(`/bins/${binId}/status`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};

export const incidentsApi = {
  getAll: () => request<Incident[]>("/incidents"),
  create: (incident: Partial<Incident>) => request<Incident>("/incidents", {
    method: "POST",
    body: JSON.stringify(incident),
  }),
  update: (id: string, update: Partial<Incident>) => request<Incident>(`/incidents/${id}`, {
    method: "PUT",
    body: JSON.stringify(update),
  }),
};

export const wastelogsApi = {
  getAll: () => request<any[]>("/wastelogs"),
  create: (log: any) => request<any>("/wastelogs", {
    method: "POST",
    body: JSON.stringify(log),
  }),
};

export const usersApi = {
  login: (data: { phone?: string; email?: string; password?: string }) => request<any>("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  register: (data: any) => request<any>("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getProfile: () => request<any>("/users/profile"),
  updateProfile: (data: any) => request<any>("/users/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  getWallet: () => request<any>("/users/wallet"),
  getWasteHistory: () => request<any>("/users/waste-history"),
  getCarbonImpact: () => request<any>("/users/carbon-impact"),
};

export const collectorApi = {
  getTasks: (status?: string) => request<any>(`/collector/tasks${status ? `?status=${status}` : ''}`),
  acceptTask: (taskId: string) => request<any>("/collector/accept-task", {
    method: "POST",
    body: JSON.stringify({ taskId }),
  }),
  completeTask: (data: { taskId: string; weight: number; notes?: string; imageUrl?: string }) => request<any>("/collector/complete-task", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateLocation: (data: { lat: number; lng: number; taskId?: string }) => request<any>("/collector/live-location", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getPerformance: () => request<any>("/collector/performance"),
};

export const fleetApi = {
  getVehicles: () => request<any>("/fleet"),
  getTracking: () => request<any>("/fleet/tracking"),
  getRoutes: () => request<any>("/fleet/routes"),
  optimizeRoute: (binIds: string[]) => request<any>("/fleet/routes/optimize", {
    method: "POST",
    body: JSON.stringify({ binIds }),
  }),
  assignVehicle: (data: { vehicleId: string; driverId: string; routeId?: string; binIds?: string[] }) => request<any>("/fleet/assign", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const adminApi = {
  getAnalytics: () => request<any>("/admin/analytics"),
  getSmartMetrics: () => request<any>("/admin/smart-metrics"),
  getIncidents: (status?: string) => request<any>(`/admin/incidents${status ? `?status=${status}` : ''}`),
  assignCollector: (data: { incidentId: string; collectorId: string; binId?: string; priority?: string }) => request<any>("/admin/assign-collector", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  sendEmergencyAlert: (data: { message: string; severity?: string; targetRole?: string; location?: string }) => request<any>("/admin/emergency-alert", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const rewardsApi = {
  getBalance: () => request<any>("/rewards/balance"),
  getHistory: (type?: string) => request<any>(`/rewards/history${type ? `?type=${type}` : ''}`),
  addCredits: (data: { amount: number; reason?: string; wasteType?: string }) => request<any>("/rewards/add", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  redeemCredits: (data: { amount: number; itemId?: string; itemName?: string }) => request<any>("/rewards/redeem", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const notificationApi = {
  getAll: (unreadOnly?: boolean) => request<any>(`/notifications${unreadOnly ? '?unreadOnly=true' : ''}`),
  markRead: (id: string) => request<any>(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () => request<any>("/notifications/read-all", { method: "PUT" }),
};

export const demoApi = {
  simulateOverflow: (binId?: string) => request<any>("/demo/simulate-overflow", {
    method: "POST",
    body: JSON.stringify({ binId }),
  }),
  simulateAiScan: (userId?: string, binId?: string) => request<any>("/demo/simulate-ai-scan", {
    method: "POST",
    body: JSON.stringify({ userId, binId }),
  }),
  simulateDispatch: (binId?: string, collectorId?: string) => request<any>("/demo/simulate-dispatch", {
    method: "POST",
    body: JSON.stringify({ binId, collectorId }),
  }),
  simulatePickup: (binId?: string, taskId?: string) => request<any>("/demo/simulate-pickup", {
    method: "POST",
    body: JSON.stringify({ binId, taskId }),
  }),
  simulateEmergency: (message?: string, severity?: string) => request<any>("/demo/simulate-emergency", {
    method: "POST",
    body: JSON.stringify({ message, severity }),
  }),
};

export const aiApi = {
  classify: (data: { base64Image?: string; imageUrl?: string; binId?: string }) => request<any>("/ai/classify", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getInsights: () => request<any>("/ai/insights"),
  predictOverflow: (binId?: string) => request<any>(`/ai/predict-overflow${binId ? `?binId=${binId}` : ''}`),
  optimizeRoute: (binIds: string[], startLocation?: any) => request<any>("/ai/optimize-route", {
    method: "POST",
    body: JSON.stringify({ binIds, startLocation }),
  }),
};
