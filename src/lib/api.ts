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
  const headers = {
    "Content-Type": "application/json",
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
