import { alertsApi, analyticsApi, binsApi, incidentsApi, wastelogsApi, usersApi } from "./api"

const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

class SupabaseQueryBuilder {
  table: string;
  action?: any;
  constructor(table: string) { this.table = table; }
  
  select(query = '*') {
    let isSingle = false;
    const builder = {
      eq: (field: string, value: any) => builder,
      single: () => { isSingle = true; return builder; },
      order: (column: string, options?: any) => builder,
      limit: (count: number) => builder,
      then: <TResult1 = any, TResult2 = never>(
        onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
      ): Promise<TResult1 | TResult2> => {
        const promise = new Promise<any>(async (resolve) => {
          try {
            if (this.action) {
               if (this.action.type === 'insert') {
                 if (this.table === 'complaints' || this.table === 'incidents') await incidentsApi.create(this.action.data);
                 else if (this.table === 'activity_log') await wastelogsApi.create(this.action.data);
               }
               resolve({ error: null });
               return;
            }

            let resData: any = [];
            if (this.table === 'smart_bins') {
              resData = await binsApi.getAll();
            } else if (this.table === 'complaints' || this.table === 'incidents') {
              resData = await incidentsApi.getAll();
            } else if (this.table === 'profiles') {
              const res = await usersApi.getProfile();
              resData = isSingle ? res.data : [res.data];
            } else if (this.table === 'alerts') {
              resData = await alertsApi.getAll();
            } else if (this.table === 'activity_log' || this.table === 'wastelogs') {
              resData = await wastelogsApi.getAll();
            } else if (this.table === 'analytics') {
              resData = await analyticsApi.getSummary();
            }
            
            if (isSingle && Array.isArray(resData)) {
               resData = resData.length > 0 ? resData[0] : null;
            }
            resolve({ data: resData, error: null });
          } catch(e) {
            resolve({ data: null, error: e });
          }
        });
        return promise.then(onfulfilled, onrejected);
      }
    };
    return builder;
  }
  
  insert(data: any) {
    this.action = { type: 'insert', data };
    return this.select(); // return builder
  }
  
  update(data: any) {
    this.action = { type: 'update', data };
    return this.select();
  }
  
  upsert(data: any, options?: any) {
    this.action = { type: 'upsert', data };
    return this.select();
  }
}

// Transparent Supabase-to-Express API Adapter
export const supabase = {
  auth: {
    getSession: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('urjaloop_auth_token') : null;
      if (!token) return { data: { session: null } };
      const user = decodeToken(token);
      return { data: { session: { user: { id: user?.id, email: user?.id } } } };
    },
    getUser: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('urjaloop_auth_token') : null;
      if (!token) return { data: { user: null } };
      const user = decodeToken(token);
      return { data: { user: { id: user?.id, email: user?.id, phone: user?.phone || "" } } };
    },
    verifyOtp: async (params: any) => {
      return { data: { user: { id: params.phone, email: params.phone, phone: params.phone } }, error: null };
    },
    signInWithOtp: async (params: any) => {
      return { data: {}, error: null };
    },
    signOut: async () => {
      if (typeof window !== 'undefined') localStorage.removeItem('urjaloop_auth_token');
      return { error: null };
    }
  },
  from: (table: string) => new SupabaseQueryBuilder(table),
  channel: (name: string) => {
    const channelBuilder = {
      on: (event: any, filter: any, callback: any) => channelBuilder,
      subscribe: () => channelBuilder,
      unsubscribe: () => channelBuilder
    };
    return channelBuilder;
  },
  removeChannel: (channel: any) => {
    return Promise.resolve();
  },
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any): Promise<{ data: any, error: any }> => ({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `https://dummy-storage.com/${bucket}/${path}` } })
    })
  }
};

export const getSessionUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) return { 
      id: session.user.id, 
      email: session.user.email, 
      isDemo: false 
    }
    return null
  } catch (e) {
    return null
  }
}
