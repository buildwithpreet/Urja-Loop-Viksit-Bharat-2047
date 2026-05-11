"use client"

import { useState, useCallback, useMemo } from "react"
import { 
  MapPin, Search, Navigation, Filter, AlertCircle,
  Clock, Truck, Recycle, Info, ChevronUp, RefreshCw,
  Layers, Eye, ThumbsUp, AlertTriangle, X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralMap } from "@/components/rural/RuralMap"
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"

// Real Coordinates for New Delhi / NCR Area
const locations = [
  { id: 1, type: "bin", lat: 28.545, lng: 77.195, fill: 18, status: "low", address: "Sector 14 Main Gate", lastCleaned: "2h ago", nextPickup: "Tomorrow, 6 AM", capacity: "120L" },
  { id: 2, type: "bin", lat: 28.552, lng: 77.215, fill: 67, status: "medium", address: "City Center Park", lastCleaned: "5h ago", nextPickup: "Today, 4 PM", capacity: "120L" },
  { id: 3, type: "bin", lat: 28.560, lng: 77.230, fill: 91, status: "high", address: "Green View Market", lastCleaned: "12h ago", nextPickup: "ASAP", capacity: "120L" },
  { id: 4, type: "vehicle", lat: 28.538, lng: 77.210, address: "Collection Truck #402", route: "Sector 14 Route", eta: "~18 min away" },
  { id: 5, type: "complaint", lat: 28.542, lng: 77.240, address: "Illegal Dumping Reported", status: "in-progress" },
]

const statusColor = {
  low: { bg: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Low Fill" },
  medium: { bg: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Medium Fill" },
  high: { bg: "bg-red-500", text: "text-red-600 dark:text-red-400", badge: "bg-red-500/10 text-red-600 dark:text-red-400", label: "Needs Pickup" },
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 28.545,
  lng: 77.215,
};

// Custom Dark Map Style for UrjaLoop
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
};

export default function MapPage() {
  const { mode } = useMode()
  const [selectedEntity, setSelectedEntity] = useState<any>(locations[2])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showTransparency, setShowTransparency] = useState(true)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAaoPl-hmbJyViPAY02ktYEIkVTDV_HVq4"
  })

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null)
  }, [])

  if (mode === "rural") {
    return <RuralMap />
  }

  return (
    <div className="h-[calc(100vh-0rem)] w-full relative overflow-hidden bg-background animate-in fade-in duration-700">
      
      {/* Real Google Map Integration */}
      <div className="absolute inset-0 z-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {locations.map((loc) => (
              <MarkerF
                key={loc.id}
                position={{ lat: loc.lat, lng: loc.lng }}
                onClick={() => {
                  setSelectedEntity(loc)
                  setIsSheetExpanded(false)
                }}
                icon={
                  loc.type === "bin" 
                    ? {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 12,
                        fillColor: loc.status === "low" ? "#10b981" : loc.status === "medium" ? "#f59e0b" : "#ef4444",
                        fillOpacity: 1,
                        strokeWeight: 4,
                        strokeColor: "#ffffff",
                      }
                    : loc.type === "vehicle"
                    ? {
                        path: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-4.5h-2v-4.5h2V14z",
                        scale: 1,
                        fillColor: "#3b82f6",
                        fillOpacity: 1,
                        strokeWeight: 0,
                        anchor: new google.maps.Point(12, 12),
                      }
                    : {
                        path: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
                        scale: 1,
                        fillColor: "#f97316",
                        fillOpacity: 1,
                        strokeWeight: 0,
                        anchor: new google.maps.Point(12, 12),
                      }
                }
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-card flex flex-col items-center justify-center gap-4">
             <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
             <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Initializing Neural Map Core...</p>
          </div>
        )}
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-16 z-20">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search locations, bins, complaints..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all",
            showHeatmap ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
          title="Waste Density Heatmap"
        >
          <Layers size={16} />
        </button>
        <button
          onClick={() => setShowTransparency(!showTransparency)}
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all",
            showTransparency ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
          title="Transparency Mode"
        >
          <Eye size={16} />
        </button>
        <button className="w-10 h-10 rounded-2xl bg-card/95 backdrop-blur-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary shadow-lg transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-4 py-2 items-center gap-4">
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
        "absolute bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-20 bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl transition-all duration-500",
        isSheetExpanded ? "max-h-[70vh] overflow-y-auto" : ""
      )}>
        {/* Drag handle */}
        <button
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          className="w-full flex items-center justify-center py-3"
        >
          <div className="w-8 h-1 bg-border rounded-full" />
        </button>

        <div className="px-5 pb-5">
          {/* Status badge */}
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
                  <p className="text-[10px] text-muted-foreground">Last Cleaned</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.lastCleaned}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-2xl">
                  <Truck size={13} className="text-muted-foreground mb-1.5" />
                  <p className="text-[10px] text-muted-foreground">Next Pickup</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.nextPickup}</p>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-2xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Navigation size={14} /> Get Directions
              </button>
            </>
          )}

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
                <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{selectedEntity.eta}</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3">📍 Approximate location shown for privacy.</p>
            </div>
          )}

          {selectedEntity.type === "complaint" && (
            <div>
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-none mb-3">In Progress</Badge>
              <p className="text-sm font-bold text-foreground mb-2">{selectedEntity.address}</p>
              <button className="w-full border border-orange-500/30 text-orange-600 dark:text-orange-400 py-2.5 rounded-2xl text-xs font-bold hover:bg-orange-500/10 transition-all">
                View Complaint Details →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transparency mode overlay */}
      {showTransparency && (
        <div className="absolute top-[4.5rem] md:top-4 left-4 z-20 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3 shadow-lg">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Transparency Mode</p>
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
