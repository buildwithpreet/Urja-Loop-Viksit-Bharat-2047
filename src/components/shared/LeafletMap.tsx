"use client"

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { cn } from "@/lib/utils"

// Fix default marker icons in Next.js
const createIcon = (color: string) => new L.DivIcon({
  className: "custom-marker",
  html: `<div style="
    width: 36px; height: 36px;
    background: ${color};
    border: 3px solid white;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px ${color}55;
    color: white; font-size: 16px;
  ">♻</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
})

const binIcon = (status: string) => {
  const colors: Record<string, string> = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  }
  return createIcon(colors[status] || "#10b981")
}

const vehicleIcon = createIcon("#3b82f6")
const complaintIcon = createIcon("#f97316")

interface MapLocation {
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

interface LeafletMapProps {
  locations: MapLocation[]
  selectedEntity: MapLocation
  onSelectEntity: (loc: MapLocation) => void
  showHeatmap: boolean
}

export function LeafletMap({ locations, selectedEntity, onSelectEntity, showHeatmap }: LeafletMapProps) {
  return (
    <MapContainer
      center={[28.6139, 77.2090]} // New Delhi
      zoom={14}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
      style={{ background: "var(--background)" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Heatmap circles */}
      {showHeatmap && locations.filter(l => l.type === "bin").map((loc) => (
        <Circle
          key={`heat-${loc.id}`}
          center={[loc.lat, loc.lng]}
          radius={300}
          pathOptions={{
            color: "transparent",
            fillColor: (loc.fill ?? 0) > 80 ? "#ef4444" : (loc.fill ?? 0) > 50 ? "#f59e0b" : "#10b981",
            fillOpacity: 0.2,
          }}
        />
      ))}

      {/* Markers */}
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={
            loc.type === "bin" ? binIcon(loc.status || "low") :
            loc.type === "vehicle" ? vehicleIcon :
            complaintIcon
          }
          eventHandlers={{ click: () => onSelectEntity(loc) }}
        >
          <Popup>
            <div className="text-sm font-semibold">{loc.address}</div>
            {loc.type === "bin" && (
              <div className="text-xs mt-1">Fill: {loc.fill}% · {loc.status}</div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
