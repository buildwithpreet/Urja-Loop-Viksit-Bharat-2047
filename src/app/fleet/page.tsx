"use client"

import { useState, useEffect } from "react"
import { 
  Truck, MapPin, CheckCircle2, AlertTriangle, 
  Clock, Activity, Battery, Fuel, Navigation2,
  ChevronRight, ArrowUpRight, Search, Filter,
  ShieldCheck, Zap, Factory, Wheat
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { useMode } from "@/components/shared/ModeProvider"

export default function FleetPage() {
  const { mode } = useMode()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [centers, setCenters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: vData } = await supabase.from('vehicles').select('*')
      const { data: cData } = await supabase.from('collection_centers').select('*')
      
      if (vData) setVehicles(vData)
      if (cData) setCenters(cData)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-8 animate-in fade-in duration-700 min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={18} className="text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Live Infrastructure</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet & Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time status of UrjaVans and Collection Hubs across {mode === 'rural' ? 'Ludhiana' : 'New Delhi'}.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">D{i}</div>
            ))}
          </div>
          <p className="text-xs font-semibold">12 Drivers Active</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Fleet", value: vehicles.length.toString(), sub: "UrjaVans Live", icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Processing Hubs", value: centers.length.toString(), sub: "Fully Operational", icon: Factory, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Daily Pickups", value: "142", sub: "+12% vs Yesterday", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Efficiency", value: "94%", sub: "Route Optimized", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat, i) => (
          <div key={i} className="p-5 bg-card border border-border rounded-3xl group hover:border-primary/20 transition-all">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-[10px] font-medium text-muted-foreground mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Fleet List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2"><Truck size={20} className="text-primary" /> Active Vehicles</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-muted rounded-lg hover:bg-muted/80"><Filter size={14} /></button>
              <button className="p-2 bg-muted rounded-lg hover:bg-muted/80"><Search size={14} /></button>
            </div>
          </div>

          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", 
                    v.status === 'on_route' ? 'bg-blue-500 shadow-blue-500/20' : 'bg-muted text-muted-foreground shadow-none'
                  )}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{v.plate_number}</p>
                      <Badge variant="outline" className="text-[9px] uppercase font-black py-0 px-1.5 border-border">{v.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Driver: {v.driver_name} · {v.status === 'on_route' ? 'On Route' : 'Stationary'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1.5 justify-end text-xs font-bold">
                         <Battery size={14} className="text-emerald-500" /> 84%
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1 tracking-tighter">Energy Level</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-foreground">Sector 14 Hub</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1 tracking-tighter">Destination</p>
                   </div>
                   <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Navigation2 size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Centers */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><Factory size={20} className="text-emerald-500" /> Infrastructure Status</h2>
          <div className="space-y-4">
            {centers.map((c) => (
              <div key={c.id} className="p-6 bg-card border border-border rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500/40" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={10} /> {c.location_name}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    {c.type === 'biomass' ? <Wheat size={16} /> : <Zap size={16} />}
                  </div>
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Stock Load</span>
                      <span>{Math.round((c.current_stock / c.capacity) * 100)}%</span>
                   </div>
                   <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(c.current_stock / c.capacity) * 100}%` }} />
                   </div>
                   <p className="text-[10px] text-muted-foreground text-right">{c.current_stock} / {c.capacity} Units</p>
                </div>

                <button className="w-full mt-6 py-2.5 border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all flex items-center justify-center gap-2">
                   View Live Camera <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
