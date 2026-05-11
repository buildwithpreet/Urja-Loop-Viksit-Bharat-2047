"use client"

import { useState, useCallback } from "react"
import { 
  MapPin, Search, Navigation, Filter, 
  Tractor, Wheat, Factory, Sprout, ChevronUp, Leaf, X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"

// Real Coordinates near Ludhiana, Punjab
const locations = [
  { id: 1, type: "center", lat: 30.915, lng: 75.845, capacity: "Available", status: "open", name: "Kisan Bio-Hub", dist: "2.4 km" },
  { id: 2, type: "plant", lat: 30.925, lng: 75.875, capacity: "Full", status: "closed", name: "Agri-Waste Processor A", dist: "5.1 km" },
  { id: 3, type: "compost", lat: 30.890, lng: 75.860, capacity: "Available", status: "open", name: "Village Compost Unit", dist: "1.2 km" },
  { id: 4, type: "vehicle", lat: 30.905, lng: 75.830, name: "Transport Tractor #12", route: "Farm Route 4", eta: "~18 min away" },
]

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 30.9010,
  lng: 75.8573,
};

// Custom Eco-Agri Map Style
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db854f" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ],
};

export function RuralMap() {
  const [selectedEntity, setSelectedEntity] = useState<any>(locations[0])
  const [showRoutes, setShowRoutes] = useState(true)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAaoPl-hmbJyViPAY02ktYEIkVTDV_HVq4"
  })

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-card flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">Initializing Kisan Matrix...</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-0rem)] w-full relative overflow-hidden bg-background animate-in fade-in duration-700">
      
      {/* Real Google Map Integration */}
      <div className="absolute inset-0 z-0">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          options={mapOptions}
        >
          {locations.map((loc) => (
            <MarkerF
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              onClick={() => {
                setSelectedEntity(loc)
                setIsSheetExpanded(true)
              }}
              icon={{
                path: loc.type === "plant" ? "M3 21h18V8H3v13zm7-11h4v3h-4v-3zm0 5h4v3h-4v-3z" : google.maps.SymbolPath.CIRCLE,
                scale: loc.type === "plant" ? 1.5 : 10,
                fillColor: loc.type === "center" ? "#f59e0b" : loc.type === "plant" ? "#f43f5e" : loc.type === "compost" ? "#10b981" : "#3b82f6",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
              }}
            />
          ))}
        </GoogleMap>
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
              <button className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
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
