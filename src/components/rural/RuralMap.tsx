"use client"

import { useState } from "react"
import { 
  MapPin, Search, Navigation, Filter, 
  Tractor, Wheat, Factory, Sprout, ChevronUp, Leaf
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const locations = [
  { id: 1, type: "center", lat: "38%", lng: "28%", capacity: "Available", status: "open", name: "Kisan Bio-Hub", dist: "2.4 km" },
  { id: 2, type: "plant", lat: "52%", lng: "48%", capacity: "Full", status: "closed", name: "Agri-Waste Processor A", dist: "5.1 km" },
  { id: 3, type: "compost", lat: "22%", lng: "62%", capacity: "Available", status: "open", name: "Village Compost Unit", dist: "1.2 km" },
  { id: 4, type: "vehicle", lat: "58%", lng: "33%", name: "Transport Tractor #12", route: "Farm Route 4", eta: "~18 min away" },
]

export function RuralMap() {
  const [selectedEntity, setSelectedEntity] = useState<typeof locations[0]>(locations[0])
  const [showRoutes, setShowRoutes] = useState(true)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)

  return (
    <div className="h-[calc(100vh-0rem)] w-full relative overflow-hidden bg-background animate-in fade-in duration-700">
      
      {/* Map Simulation Background */}
      <div className="absolute inset-0 z-0">
        {/* Rural grid simulation */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }} />
        {/* Farm & road lines simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 text-amber-500">
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="0" y1="65%" x2="100%" y2="65%" stroke="currentColor" strokeWidth="1" />
          <line x1="35%" y1="0" x2="35%" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="68%" y1="0" x2="68%" y2="100%" stroke="currentColor" strokeWidth="1" />
          {/* Farm plots */}
          <rect x="10%" y="10%" width="20%" height="25%" fill="rgba(16, 185, 129, 0.1)" stroke="currentColor" strokeWidth="1" />
          <rect x="70%" y="20%" width="25%" height="30%" fill="rgba(16, 185, 129, 0.1)" stroke="currentColor" strokeWidth="1" />
          <rect x="40%" y="70%" width="20%" height="20%" fill="rgba(16, 185, 129, 0.1)" stroke="currentColor" strokeWidth="1" />
          
          {/* Aggregation Routes */}
          {showRoutes && (
            <>
              <path d="M 28% 38% C 35% 30%, 45% 40%, 48% 52%" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
              <path d="M 62% 22% C 55% 35%, 50% 45%, 48% 52%" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
            </>
          )}
        </svg>

        {/* Entities (Markers) */}
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => {
              setSelectedEntity(loc)
              setIsSheetExpanded(true)
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
              selectedEntity.id === loc.id ? "scale-125 z-20" : "scale-100 hover:scale-110 z-10"
            )}
            style={{ top: loc.lat, left: loc.lng }}
          >
            {loc.type === "center" && (
              <div className="relative">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-background text-white">
                  <Wheat size={20} />
                </div>
              </div>
            )}
            {loc.type === "plant" && (
              <div className="relative">
                <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/30 border-2 border-background text-white">
                  <Factory size={20} />
                </div>
              </div>
            )}
            {loc.type === "compost" && (
              <div className="relative">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-background text-white">
                  <Sprout size={20} />
                </div>
              </div>
            )}
            {loc.type === "vehicle" && (
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-background text-white">
                <Tractor size={20} />
              </div>
            )}
            
            {/* Active Indicator */}
            {selectedEntity.id === loc.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-background" />
            )}
          </button>
        ))}
        
        {/* User Location */}
        <div className="absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
        <div className="flex-1 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-2 flex items-center gap-3 shadow-lg">
          <Search size={18} className="text-muted-foreground ml-2" />
          <input 
            type="text" 
            placeholder="Search farm, center, or buyer..." 
            className="bg-transparent border-none outline-none flex-1 text-sm font-medium"
          />
        </div>
        <button className="w-12 h-12 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl flex items-center justify-center shadow-lg hover:bg-muted transition-colors">
          <Filter size={18} className="text-foreground" />
        </button>
      </div>

      {/* Map Layers Toggle */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button 
          onClick={() => setShowRoutes(!showRoutes)}
          className={cn(
            "p-3 rounded-2xl shadow-lg border transition-all",
            showRoutes ? "bg-emerald-500 border-emerald-400 text-white" : "bg-background/80 backdrop-blur-xl border-border/50 text-foreground"
          )}
        >
          <Leaf size={18} />
        </button>
      </div>

      {/* Bottom Information Sheet */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 z-30 transition-transform duration-500 ease-out pb-24 md:pb-6",
        isSheetExpanded ? "translate-y-0" : "translate-y-[calc(100%-80px)]"
      )}>
        <div className="mx-4 mb-4 bg-background/80 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Handle */}
          <button 
            onClick={() => setIsSheetExpanded(!isSheetExpanded)}
            className="w-full py-3 flex flex-col items-center justify-center border-b border-border/50"
          >
            <div className="w-12 h-1.5 bg-border rounded-full mb-1" />
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              <ChevronUp size={14} className={cn("transition-transform duration-300", isSheetExpanded ? "rotate-180" : "")} />
              {isSheetExpanded ? "Hide Details" : "Tap for details"}
            </div>
          </button>

          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={cn(
                    "text-[10px] uppercase font-bold",
                    selectedEntity.type === "center" ? "text-amber-500 border-amber-500/30" : 
                    selectedEntity.type === "plant" ? "text-rose-500 border-rose-500/30" :
                    selectedEntity.type === "compost" ? "text-emerald-500 border-emerald-500/30" :
                    "text-blue-500 border-blue-500/30"
                  )}>
                    {selectedEntity.type}
                  </Badge>
                  {selectedEntity.status && (
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-500">
                      {selectedEntity.status}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-bold">{selectedEntity.name}</h3>
                {selectedEntity.dist && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12}/> {selectedEntity.dist}</p>}
                {selectedEntity.eta && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Tractor size={12}/> ETA: {selectedEntity.eta}</p>}
              </div>
              <button 
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEntity.name)}`
                  window.open(url, '_blank')
                }}
                className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <Navigation size={18} className="fill-white" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-muted/50 border border-border">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Capacity</p>
                <p className="text-sm font-bold text-foreground flex items-center gap-1">
                  {selectedEntity.capacity || "N/A"}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-muted/50 border border-border">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Route / Activity</p>
                <p className="text-sm font-bold text-foreground">
                  {selectedEntity.route || "Accepting Waste"}
                </p>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
