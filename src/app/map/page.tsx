"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import {
  MapPin, Search, Navigation, AlertCircle,
  Clock, Truck, Recycle, ChevronUp, RefreshCw,
  Layers, Eye, AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralMap } from "@/components/rural/RuralMap"
import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamic import — Leaflet must NOT run on server
const LeafletMap = dynamic(
  () => import("@/components/shared/LeafletMap").then(m => m.LeafletMap),
  { ssr: false, loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/30">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <MapPin size={20} className="text-primary" />
        </div>
        <p className="text-xs text-muted-foreground font-medium">Loading map...</p>
      </div>
    </div>
  )}
)
const locations = [
  { id: 1, type: "bin", lat: 28.6180, lng: 77.2020, fill: 18, status: "low", address: "Sector 14 Main Gate", lastCleaned: "2h ago", nextPickup: "Tomorrow, 6 AM", capacity: "120L" },
  { id: 2, type: "bin", lat: 28.6139, lng: 77.2090, fill: 67, status: "medium", address: "City Center Park", lastCleaned: "5h ago", nextPickup: "Today, 4 PM", capacity: "120L" },
  { id: 3, type: "bin", lat: 28.6200, lng: 77.2150, fill: 91, status: "high", address: "Green View Market", lastCleaned: "12h ago", nextPickup: "ASAP", capacity: "120L" },
  { id: 4, type: "vehicle", lat: 28.6100, lng: 77.2050, address: "Collection Truck #402", route: "Sector 14 Route", eta: "~18 min away" },
  { id: 5, type: "complaint", lat: 28.6160, lng: 77.2180, address: "Illegal Dumping Reported", status: "in-progress" },
]

const statusColor = {
  low: { bg: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Low Fill" },
  medium: { bg: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Medium Fill" },
  high: { bg: "bg-red-500", text: "text-red-600 dark:text-red-400", badge: "bg-red-500/10 text-red-600 dark:text-red-400", label: "Needs Pickup" },
}

type MapLocation = {
  id: number
  type: string
  lat: number
  lng: number
  fill?: number
  status?: string
  address: string
  lastCleaned?: string
  nextPickup?: string
  capacity?: string
  route?: string
  eta?: string
}

export default function MapPage() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [selectedEntity, setSelectedEntity] = useState<MapLocation>(locations[2])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showTransparency, setShowTransparency] = useState(true)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBins()
  }, [])

  const fetchBins = async () => {
    setLoading(true)
    try {
      const { data: bins } = await supabase.from('smart_bins').select('*')
      
      const mappedBins = (bins || []).map(b => ({
        id: b.id,
        type: "bin",
        // Convert mock percentage to relative lat/lng around center for demo
        lat: b.lat_geo || BHARAT_CENTER[0] + (Math.random() - 0.5) * 0.05,
        lng: b.lng_geo || BHARAT_CENTER[1] + (Math.random() - 0.5) * 0.05,
        fill: b.fill_level || Math.floor(Math.random() * 100),
        status: (b.fill_level || 0) > 80 ? "high" : (b.fill_level || 0) > 50 ? "medium" : "low",
        address: b.location_name || "Smart Bin Station",
        lastCleaned: "2h ago",
        nextPickup: (b.fill_level || 0) > 80 ? "ASAP" : "Scheduled",
        capacity: "120L"
      }))

      if (mappedBins.length === 0) {
        // Add spread out mock bins
        for(let i=0; i<5; i++) {
          mappedBins.push({
            id: `m${i}`,
            type: 'bin',
            lat: BHARAT_CENTER[0] + (Math.random() - 0.5) * 0.04,
            lng: BHARAT_CENTER[1] + (Math.random() - 0.5) * 0.04,
            fill: Math.floor(Math.random() * 100),
            status: 'medium',
            address: `Zone ${i+1} Collection Point`,
            lastCleaned: '2h ago',
            nextPickup: 'Daily',
            capacity: '120L'
          })
        }
      }

      setLocations([...mappedBins])
      if (mappedBins.length > 0) setSelectedEntity(mappedBins[0])
    } catch (err) {
      console.error("Map Data Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (mode === "rural") {
    return <RuralMap />
  }

  return (
    <div className="h-[calc(100vh-0rem)] w-full relative overflow-hidden bg-background">

      {/* Real Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <LeafletMap
          locations={locations}
          selectedEntity={selectedEntity}
          onSelectEntity={(loc) => { setSelectedEntity(loc); setIsSheetExpanded(false) }}
          showHeatmap={showHeatmap}
        />
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-16 z-[500]">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder={t("map_search_placeholder")}
            aria-label={t("map_search_placeholder")}
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/60 focus-ring"
          />
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[500]">
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          aria-label="Toggle waste density heatmap"
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all focus-ring",
            showHeatmap ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers size={16} />
        </button>
        <button
          onClick={() => setShowTransparency(!showTransparency)}
          aria-label="Toggle transparency mode"
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all focus-ring",
            showTransparency ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
        >
          <Eye size={16} />
        </button>
        <button className="w-10 h-10 rounded-2xl bg-card/95 backdrop-blur-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary shadow-lg transition-all focus-ring" aria-label="Refresh map data">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 z-[500] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-4 py-2 items-center gap-4">
        {[
          { color: "bg-emerald-500", label: "Low Fill" },
          { color: "bg-amber-500", label: "Medium" },
          { color: "bg-red-500", label: "Needs Pickup" },
          { color: "bg-blue-500", label: "Collection Truck" },
          { color: "bg-orange-500", label: "Complaint" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
            <span className="text-[11px] font-medium text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Sheet — Entity Details */}
      <div className={cn(
        "absolute bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[500] bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl transition-all duration-500",
        isSheetExpanded ? "max-h-[70vh] overflow-y-auto" : ""
      )}>
        {/* Drag handle */}
        <button
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          className="w-full flex items-center justify-center py-3"
          aria-label={isSheetExpanded ? "Collapse details" : "Expand details"}
        >
          <div className="w-8 h-1 bg-border rounded-full" />
        </button>

        <div className="px-5 pb-5">
          {/* Bin details */}
          {selectedEntity.type === "bin" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <Badge className={cn("text-xs border-none rounded-xl px-3 py-1 font-semibold",
                  statusColor[selectedEntity.status as keyof typeof statusColor]?.badge
                )}>
                  {statusColor[selectedEntity.status as keyof typeof statusColor]?.label}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{selectedEntity.address}</span>
              </div>

              {/* Fill level visual */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Fill Level</span>
                  <span className="text-sm font-bold text-foreground">{selectedEntity.fill}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all",
                    selectedEntity.status === "low" ? "bg-emerald-500" :
                      selectedEntity.status === "medium" ? "bg-amber-500" : "bg-red-500"
                  )} style={{ width: `${selectedEntity.fill}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-muted/40 rounded-2xl">
                  <Clock size={13} className="text-muted-foreground mb-1.5" />
                  <p className="text-[11px] text-muted-foreground">Last Cleaned</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.lastCleaned}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-2xl">
                  <Truck size={13} className="text-muted-foreground mb-1.5" />
                  <p className="text-[11px] text-muted-foreground">Next Pickup</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.nextPickup}</p>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-2xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 focus-ring">
                <Navigation size={14} /> Get Directions
              </button>
            </>
          )}

          {/* Vehicle details */}
          {selectedEntity.type === "vehicle" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Truck size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{selectedEntity.address}</p>
                  <p className="text-xs text-muted-foreground">{selectedEntity.route}</p>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <p className="text-xs text-muted-foreground">{t("map_eta")}</p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{selectedEntity.eta}</p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">📍 Approximate location shown for privacy.</p>
            </div>
          )}

          {/* Complaint details */}
          {selectedEntity.type === "complaint" && (
            <div>
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-none mb-3">In Progress</Badge>
              <p className="text-sm font-bold text-foreground mb-2">{selectedEntity.address}</p>
              <button className="w-full border border-orange-500/30 text-orange-600 dark:text-orange-400 py-2.5 rounded-2xl text-xs font-bold hover:bg-orange-500/10 transition-all focus-ring">
                View Complaint Details →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transparency mode overlay */}
      {showTransparency && (
        <div className="absolute top-[4.5rem] md:top-4 left-4 z-[500] bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3 shadow-lg">
          <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">{t("map_layer_heatmap")}</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              9 bins — good condition
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              2 bins — needs attention
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              1 bin — pickup required
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
