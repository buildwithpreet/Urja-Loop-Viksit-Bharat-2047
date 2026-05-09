"use client"

import { 
  MapPin, 
  Search, 
  Navigation, 
  Layers, 
  Maximize2, 
  Filter,
  Info,
  Clock,
  Trash2,
  AlertCircle,
  MoreVertical,
  Truck,
  Target,
  Zap,
  Activity
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"

const locations = [
  { id: 1, type: "bin", lat: "40%", lng: "30%", status: "Optimal", capacity: "12%", address: "Sector 14 Main Terminal", lastCleaned: "2 hours ago", nextPickup: "Tomorrow, 6 AM" },
  { id: 2, type: "bin", lat: "55%", lng: "45%", status: "Nominal", capacity: "54%", address: "City Center Hub", lastCleaned: "5 hours ago", nextPickup: "Tomorrow, 7 AM" },
  { id: 3, type: "bin", lat: "25%", lng: "60%", status: "Critical", capacity: "92%", address: "Green View Terminal", lastCleaned: "Yesterday", nextPickup: "Today, ASAP" },
  { id: 4, type: "vehicle", lat: "60%", lng: "35%", status: "Active", address: "Dispatch Truck #402", route: "Sector 14 Distribution" },
]

export default function MapPage() {
  const { t } = useLanguage()
  const [selectedEntity, setSelectedEntity] = useState(locations[2])

  return (
    <div className="h-screen w-full relative overflow-hidden bg-background animate-in fade-in duration-1000">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/77.2090,28.6139,12/1200x800?access_token=YOUR_TOKEN')] bg-cover opacity-60 mix-blend-multiply filter grayscale transition-all duration-700"></div>
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
        
        {/* Route Lines Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
          <path 
            d="M 400 300 Q 550 450 600 250 T 800 450" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="3" 
            strokeDasharray="15 10" 
            className="animate-[dash_30s_linear_infinite]"
          />
        </svg>

        {/* Entity Markers */}
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedEntity(loc)}
            style={{ top: loc.lat, left: loc.lng }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-700 hover:scale-125 z-10"
          >
            <div className="relative">
              {/* Pulse effect for Critical bins */}
              {loc.status === 'Critical' && (
                <div className="absolute inset-0 bg-red-500 rounded-2xl animate-ping opacity-30 scale-150"></div>
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all border-4 border-background relative overflow-hidden",
                loc.type === 'vehicle' ? "bg-blue-600 text-white" :
                loc.status === 'Optimal' ? "bg-primary text-white" : 
                loc.status === 'Nominal' ? "bg-amber-500 text-white" : 
                "bg-red-500 text-white"
              )}>
                <div className="absolute inset-0 shimmer opacity-20"></div>
                {loc.type === 'vehicle' ? (
                  <Truck size={24} strokeWidth={2.5} />
                ) : (
                  <MapPin size={24} strokeWidth={2.5} fill="currentColor" fillOpacity={0.2} />
                )}
              </div>

              {/* Entity Label (Desktop) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 ultra-glass border border-foreground/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap pointer-events-none transform group-hover:translate-y-1">
                <p className="text-[10px] font-black uppercase text-foreground tracking-[0.1em]">
                  {loc.address}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Top Navigation Control */}
      <div className="absolute top-10 left-10 right-10 md:left-12 md:right-auto md:w-[450px] z-20 animate-in slide-in-from-top-10 duration-1000">
        <div className="ultra-glass rounded-[2.5rem] p-4 shadow-2xl border border-foreground/10 flex items-center gap-4 group">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30 group-hover:rotate-6 transition-transform">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
             <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{t("map_subtitle")}</p>
             <input 
              type="text" 
              placeholder={t("bot_placeholder")} 
              className="bg-transparent border-none outline-none w-full text-sm font-black uppercase tracking-widest text-foreground placeholder:opacity-30"
            />
          </div>
          <button className="w-12 h-12 ultra-glass border border-foreground/5 rounded-2xl text-muted-foreground hover:text-primary transition-all flex items-center justify-center shadow-lg active:scale-90">
            <Filter size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Side Tool Array */}
      <div className="absolute right-10 top-10 flex flex-col gap-5 z-20 animate-in slide-in-from-right-10 duration-1000">
        {[
          { icon: Layers, label: "Layers" },
          { icon: Target, label: "Relocate" },
          { icon: Activity, label: "Flux" },
          { icon: Maximize2, label: "Immersive" }
        ].map((btn, i) => (
          <button key={i} className="w-16 h-16 ultra-glass rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-2xl border border-foreground/10 group relative">
            <btn.icon size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            <div className="absolute right-full mr-4 px-3 py-1.5 ultra-glass rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-foreground/10">
               {btn.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tactical Entity Intel (Bottom) */}
      <div className="absolute bottom-28 md:bottom-12 left-10 right-10 md:left-12 md:right-auto md:w-[480px] z-20 animate-in slide-in-from-bottom-12 duration-1000">
        <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden ultra-glass border border-foreground/10 relative">
          <div className="absolute inset-0 bg-mesh opacity-10"></div>
          <CardContent className="p-0 relative z-10">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start gap-6">
                <div className="space-y-3">
                  <Badge className={cn(
                    "px-5 py-2 font-black text-[10px] tracking-[0.2em] border-none uppercase rounded-xl shadow-xl",
                    selectedEntity.type === 'vehicle' ? "bg-blue-500/10 text-blue-500 shadow-blue-500/10" :
                    selectedEntity.status === 'Optimal' ? "bg-primary/10 text-primary shadow-primary/10" : 
                    selectedEntity.status === 'Nominal' ? "bg-amber-500/10 text-amber-500 shadow-amber-500/10" : 
                    "bg-red-500/10 text-red-500 shadow-red-500/10"
                  )}>
                    {selectedEntity.type === 'vehicle' ? 'TELEMETRY ACTIVE' : t(`map_legend_${selectedEntity.status.toLowerCase()}`)}
                  </Badge>
                  <h3 className="text-3xl font-black text-foreground tracking-tighter leading-none uppercase">{selectedEntity.address}</h3>
                </div>
                <button className="w-14 h-14 ultra-glass border border-foreground/5 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-all active:scale-90">
                  <MoreVertical size={24} strokeWidth={2.5} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-foreground/5 border border-foreground/5 flex flex-col gap-3 group/stat">
                  <div className="flex items-center gap-3 text-muted-foreground opacity-60">
                    <Clock size={16} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Chronos Log</span>
                  </div>
                  <p className="text-sm font-black text-foreground uppercase tracking-tight">{selectedEntity.type === 'vehicle' ? 'LIVE FEED' : selectedEntity.lastCleaned}</p>
                </div>
                <div className="p-6 rounded-3xl bg-foreground/5 border border-foreground/5 flex flex-col gap-3 group/stat">
                  <div className="flex items-center gap-3 text-primary">
                    <Navigation size={16} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Vector Path</span>
                  </div>
                  <p className="text-sm font-black text-foreground uppercase tracking-tight">{selectedEntity.type === 'vehicle' ? selectedEntity.route : selectedEntity.nextPickup}</p>
                </div>
              </div>

              <button className="w-full btn-premium py-5 text-[11px] uppercase tracking-[0.2em] shadow-primary/20 flex items-center justify-center gap-4">
                 <Navigation size={20} strokeWidth={3} />
                 {t("dashboard_open_map")}
              </button>
            </div>
            
            {/* Warning Layer for critical entities */}
            {selectedEntity.status === 'Critical' && (
              <div className="bg-red-500/10 border-t border-red-500/20 p-6 flex items-center justify-between px-10">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
                       <AlertCircle size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                       <p className="text-[11px] font-black text-red-500 uppercase tracking-tight">Anomalous Status</p>
                       <p className="text-[9px] text-red-500/60 font-black uppercase tracking-widest">Verification Required</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">Create Report</button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Global Status Legend */}
      <div className="hidden lg:flex absolute bottom-12 right-12 ultra-glass rounded-[2rem] p-8 shadow-2xl flex-col gap-6 z-20 border border-foreground/10 min-w-[240px]">
        <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] pb-4 border-b border-foreground/5">Network Health</h4>
        <div className="space-y-5">
           {[
             { label: t("map_legend_clean"), color: "bg-primary", shadow: "shadow-primary/50" },
             { label: t("map_legend_medium"), color: "bg-amber-500", shadow: "shadow-amber-500/50" },
             { label: t("map_legend_full"), color: "bg-red-500", shadow: "shadow-red-500/50" }
           ].map((l) => (
             <div key={l.label} className="flex items-center gap-4">
               <div className={cn("w-3 h-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]", l.color, l.shadow)}></div>
               <span className="text-[10px] font-black text-foreground uppercase tracking-widest opacity-80">{l.label}</span>
             </div>
           ))}
        </div>
        <div className="w-full h-px bg-foreground/5 my-2"></div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-xl ultra-glass border border-foreground/10 flex items-center justify-center text-blue-500 shadow-xl">
             <Truck size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Mobile Unit</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  )
}
