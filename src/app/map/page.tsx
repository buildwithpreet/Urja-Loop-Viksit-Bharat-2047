"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  Search, Navigation2, Filter, AlertTriangle, X, Zap, Clock, Truck, 
  Recycle, Scan, ArrowRight, Camera, CheckCircle2, Layers, 
  MapPin, Wind, Cpu, Map as MapIcon, MapPinned, Eye, RefreshCw
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralMap } from "@/components/rural/RuralMap"
import { GoogleMap, useJsApiLoader, OverlayViewF, PolylineF } from "@react-google-maps/api"
import { supabase } from "@/lib/supabase"

type MapState = "browsing" | "selected" | "scanning" | "reporting"
type NodeKind = "station" | "bin" | "ewaste" | "compost" | "plastic" | "van" | "complaint" | "cleanup" | "hub"

interface Node {
   id: string; kind: NodeKind; name: string; lat: number; lng: number
   fill?: number; status: "available" | "nearly-full" | "urgent" | "moving" | "active"
   wasteTypes: string[]; context: string; lastPickup: string
   openTill?: string; wet?: number; dry?: number; plastic?: number; ewaste?: number
   distance?: string; trustBadge?: string
}

const STATIC_NODES: Node[] = [
   { id: "gp-st", kind: "station", name: "LOOP STATION 01", lat: 28.5584, lng: 77.2066, fill: 44, status: "available", wasteTypes: ["dry", "plastic", "ewaste"], context: "Metro Station · High Footfall", lastPickup: "1h ago", openTill: "10 PM", wet: 10, dry: 50, plastic: 30, ewaste: 10, distance: "160m", trustBadge: "Municipal Verified" },
   { id: "hk-st", kind: "cleanup", name: "CLEANUP ZONE", lat: 28.5494, lng: 77.1903, fill: 0, status: "active", wasteTypes: ["organic"], context: "Market Zone · Community Drive", lastPickup: "Live", distance: "920m", trustBadge: "Community Active" },
   { id: "hub-01", kind: "hub", name: "COLLECTION HUB", lat: 28.5524, lng: 77.2153, fill: 62, status: "available", wasteTypes: ["plastic", "dry"], context: "Regional Center", lastPickup: "2h ago", openTill: "10 PM", distance: "1.2km", trustBadge: "Certified Hub" },
   { id: "dp-bin", kind: "bin", name: "SMART BIN 04", lat: 28.5524, lng: 77.1953, fill: 14, status: "available", wasteTypes: ["dry", "organic"], context: "Recreational Zone · Park", lastPickup: "20m ago", openTill: "9 PM", wet: 40, dry: 60, plastic: 0, ewaste: 0, distance: "540m", trustBadge: "Recently Serviced" },
   { id: "sda-bin", kind: "bin", name: "SMART BIN 07", lat: 28.5454, lng: 77.2003, fill: 93, status: "urgent", wasteTypes: ["dry", "plastic"], context: "Market · Pickup Required", lastPickup: "9h ago", openTill: "10 PM", wet: 5, dry: 30, plastic: 65, ewaste: 0, distance: "380m" },
   { id: "van1", kind: "van", name: "URJAVAN #402", lat: 28.5520, lng: 77.2080, fill: 0, status: "moving", wasteTypes: [], context: "En Route · Sector 14 Loop", lastPickup: "Active", distance: "Live" },
]

const STORY_BADGES = [
   { text: "Sector 14 cleanliness up 18% ↑", color: "text-emerald-400" },
   { text: "3 complaints resolved nearby", color: "text-blue-400" },
   { text: "Organic recycling active in GK", color: "text-amber-400" },
]

const MAP_STYLE = [
   { elementType: "geometry", stylers: [{ color: "#0d0f12" }] },
   { elementType: "labels.text.stroke", stylers: [{ color: "#0d0f12" }] },
   { elementType: "labels.text.fill", stylers: [{ color: "#5a626a" }] },
   { featureType: "road", elementType: "geometry", stylers: [{ color: "#1a1d21" }] },
   { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#24282d" }] },
   { featureType: "water", elementType: "geometry", stylers: [{ color: "#080a0c" }] },
   { featureType: "poi", stylers: [{ visibility: "off" }] },
   { featureType: "transit", stylers: [{ visibility: "off" }] },
]

const kindColor: Record<NodeKind, string> = {
   station: "border-emerald-500", bin: "border-white/10", ewaste: "border-blue-500",
   compost: "border-amber-500", plastic: "border-sky-400", van: "border-blue-400",
   complaint: "border-red-500", cleanup: "border-emerald-400", hub: "border-blue-500"
}
const kindBg: Record<NodeKind, string> = {
   station: "bg-emerald-500/10", bin: "bg-white/5", ewaste: "bg-blue-500/10",
   compost: "bg-amber-500/10", plastic: "bg-sky-400/10", van: "bg-blue-500",
   complaint: "bg-red-500/10", cleanup: "bg-emerald-500/20", hub: "bg-blue-600/20"
}
const kindGlow: Record<string, string> = {
   station: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
   bin: "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
   cleanup: "shadow-[0_0_25px_rgba(16,185,129,0.5)]",
   hub: "shadow-[0_0_25px_rgba(37,99,235,0.5)]",
   van: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
   urgent: "shadow-[0_0_25px_rgba(239,68,68,0.5)]"
}

const KindIcon = ({ kind, size = 16 }: { kind: NodeKind; size?: number }) => {
   if (kind === "station" || kind === "cleanup") return <Zap size={size} className="text-emerald-400" />
   if (kind === "bin") return <Recycle size={size} className="text-white/60" />
   if (kind === "ewaste") return <Cpu size={size} className="text-blue-400" />
   if (kind === "compost") return <Wind size={size} className="text-amber-400" />
   if (kind === "plastic") return <Layers size={size} className="text-sky-400" />
   if (kind === "van") return <Truck size={size} className="text-white" />
   if (kind === "hub") return <MapIcon size={size} className="text-blue-400" />
   return <AlertTriangle size={size} className="text-red-400" />
}

function FillRing({ fill = 0, status }: { fill?: number; status: string }) {
   const color = status === "urgent" ? "#ef4444" : status === "nearly-full" ? "#f59e0b" : "#10b981"
   const r = 22, c = 25, circ = 2 * Math.PI * r // Fixed center/radius for 50x50 viewBox
   return (
      <svg width="50" height="50" className="absolute inset-0">
         <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
         <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(fill / 100) * circ} ${circ}`} strokeLinecap="round"
            transform="rotate(-90 25 25)" style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
   )
}

export default function MapPage() {
   const router = useRouter()
   const { mode } = useMode()
   const [mapState, setMapState] = useState<MapState>("browsing")
   const [selected, setSelected] = useState<Node | null>(null)
   const [query, setQuery] = useState("")
   const [vanPos, setVanPos] = useState({ lat: 28.5520, lng: 77.2080 })
   const [activeLayer, setActiveLayer] = useState<string | null>(null)
   const [storyIdx, setStoryIdx] = useState(0)
   const [dynamicNodes, setDynamicNodes] = useState<Node[]>([])
   const [loading, setLoading] = useState(false)

   const fetchBins = useCallback(async () => {
      setLoading(true)
      try {
         const { data: bins } = await supabase.from('smart_bins').select('*')
         if (bins) {
            const mapped = bins.map(b => ({
               id: b.id,
               kind: "bin" as NodeKind,
               name: b.location_name || "Smart Bin",
               lat: b.lat_geo || 28.5524 + (Math.random() - 0.5) * 0.02,
               lng: b.lng_geo || 77.2003 + (Math.random() - 0.5) * 0.02,
               fill: b.fill_level || 0,
               status: (b.fill_level > 80 ? "urgent" : b.fill_level > 50 ? "nearly-full" : "available") as any,
               wasteTypes: ["dry", "organic"],
               context: b.location_name || "City Sector",
               lastPickup: "2h ago",
               trustBadge: "AI Verified"
            }))
            setDynamicNodes(mapped)
         }
      } catch (err) {
         console.error("Fetch error:", err)
      } finally {
         setLoading(false)
      }
   }, [])

   useEffect(() => {
      fetchBins()
      const i = setInterval(() => setVanPos(p => ({ lat: p.lat + 0.00009, lng: p.lng + 0.00004 })), 4000)
      const storyTimer = setInterval(() => setStoryIdx(p => (p + 1) % STORY_BADGES.length), 4000)
      return () => { clearInterval(i); clearInterval(storyTimer); }
   }, [fetchBins])

   const allNodes = useMemo(() => [...STATIC_NODES, ...dynamicNodes], [dynamicNodes])

   const filtered = useMemo(() => {
      if (!query) return allNodes
      const q = query.toLowerCase()
      return allNodes.filter(n =>
         n.name.toLowerCase().includes(q) ||
         n.wasteTypes.some(w => w.toLowerCase().includes(q)) ||
         n.context.toLowerCase().includes(q)
      )
   }, [query, allNodes])

   const { isLoaded } = useJsApiLoader({
      id: "urjaloop-google-maps",
      googleMapsApiKey: "AIzaSyAaoPl-hmbJyViPAY02ktYEIkVTDV_HVq4",
      libraries: []
   })

   if (mode === "rural") return <RuralMap />

   const sheetH = mapState === "browsing" ? "h-28" : mapState === "selected" ? "h-[58vh]" : "h-screen"

   return (
      <div className="h-screen w-full relative overflow-hidden bg-[#111315] text-white" style={{ fontFamily: "'Inter Tight',system-ui,sans-serif" }}>

         {/* MAP SURFACE */}
         <div className={cn("absolute inset-0 z-0 transition-all duration-700", mapState === "scanning" ? "brightness-[0.15]" : "")}>
            {isLoaded ? (
               <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: 28.5524, lng: 77.2003 }} zoom={14}
                  options={{ disableDefaultUI: true, styles: MAP_STYLE, backgroundColor: "#111315" }}>

                  {filtered.map(node => (
                     <OverlayViewF key={node.id}
                        position={node.kind === "van" ? vanPos : { lat: node.lat, lng: node.lng }}
                        mapPaneName="overlayMouseTarget">
                        <button onClick={() => { setSelected(node); setMapState("selected") }}
                           className="relative -translate-x-1/2 -translate-y-1/2 group outline-none">
                           <div className="flex flex-col items-center gap-3">
                              <div className={cn("relative flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl",
                                 node.kind === "station" ? "w-12 h-12 rounded-2xl" : "w-10 h-10 rounded-full",
                                 kindBg[node.kind], `border-2 ${kindColor[node.kind]}`,
                                 kindGlow[node.status === "urgent" ? "urgent" : node.kind]
                              )}>
                                 {node.fill !== undefined && node.fill > 0 && <FillRing fill={node.fill} status={node.status} />}
                                 <div className="relative z-10"><KindIcon kind={node.kind} size={node.kind === "station" ? 20 : 16} /></div>
                                 {node.status === "urgent" && <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-30" />}
                              </div>
                              <div className="px-3 py-1 bg-black/90 backdrop-blur-md rounded-full border border-white/5 shadow-2xl transition-all group-hover:bg-emerald-500 group-hover:text-black">
                                 <p className="text-[10px] font-black text-white group-hover:text-black whitespace-nowrap tracking-wider uppercase">{node.name}</p>
                              </div>
                           </div>
                        </button>
                     </OverlayViewF>
                  ))}

                  {mapState === "selected" && selected && (
                     <PolylineF path={[{ lat: 28.5524, lng: 77.2003 }, { lat: selected.lat, lng: selected.lng }]}
                        options={{
                           strokeColor: "#10b981", strokeOpacity: 0.5, strokeWeight: 3,
                           icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 }, offset: "0", repeat: "18px" }]
                        }} />
                  )}
               </GoogleMap>
            ) : (
               <div className="w-full h-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
               </div>
            )}
         </div>

         {/* REFRESH CONTROL */}
         <div className="absolute top-24 right-4 z-[70]">
             <button onClick={fetchBins} className="w-10 h-10 rounded-xl bg-[#191b1e]/95 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-500 shadow-2xl transition-all">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
             </button>
         </div>

         {/* AMBIENT STORY TICKER */}
         {mapState === "browsing" && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[70]">
               <div className="bg-[#191b1e]/90 backdrop-blur-2xl border border-white/8 rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className={cn("text-[11px] font-semibold transition-all duration-700", STORY_BADGES[storyIdx].color)}>
                     {STORY_BADGES[storyIdx].text}
                  </p>
               </div>
            </div>
         )}

         {/* SEARCH BAR */}
         {mapState !== "scanning" && (
            <div className="absolute top-20 left-4 right-4 z-[70] max-w-lg mx-auto pr-12">
               <div className="bg-[#191b1e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 h-14 flex items-center gap-3 shadow-2xl">
                  <Search size={18} className="text-white/20 shrink-0" />
                  <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                     onFocus={() => setMapState("browsing")}
                     placeholder="plastic station · e-waste · nearest bin..."
                     className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/20" />
                  {query && <button onClick={() => setQuery("")}><X size={16} className="text-white/30" /></button>}
               </div>
               {!query && (
                  <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-none pb-1">
                     {["Plastic", "E-Waste", "Organic", "Compost", "Glass"].map(t => (
                        <button key={t} onClick={() => setQuery(t)}
                           className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap shrink-0">
                           {t}
                        </button>
                     ))}
                  </div>
               )}
            </div>
         )}

         {/* ADAPTIVE BOTTOM SHEET */}
         <div className={cn("absolute bottom-0 left-0 right-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]", sheetH)}>
            <div className="h-full bg-[#181a1c]/98 backdrop-blur-[40px] border-t border-white/8 rounded-t-[28px] flex flex-col overflow-hidden shadow-[0_-16px_60px_rgba(0,0,0,0.6)]">
               <div className="flex justify-center pt-3 pb-1 shrink-0">
                  <div className="w-10 h-1 bg-white/10 rounded-full" />
               </div>

               {/* BROWSING STATE */}
               {mapState === "browsing" && (
                  <div className="px-6 flex items-center justify-between animate-in fade-in duration-300 pb-24 md:pb-0">
                     <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20">Live Network</p>
                        <p className="text-sm font-semibold text-white/80 mt-0.5">
                           {filtered.filter(n => n.kind !== "van" && n.kind !== "complaint").length} nodes nearby · {filtered.some(n => n.status === "urgent") ? "1 urgent" : "Clear"}
                        </p>
                     </div>
                     <button onClick={() => router.push("/scanner?mode=waste")}
                        className="w-14 h-14 bg-emerald-500 text-black rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform">
                        <Scan size={22} />
                     </button>
                  </div>
               )}

               {/* SELECTED STATE */}
               {mapState === "selected" && selected && (
                  <div className="flex-1 overflow-y-auto px-6 pb-40 md:pb-8 space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                     <div className="flex items-start justify-between pt-1">
                        <div className="flex-1 pr-4">
                           <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={cn("text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border",
                                 selected.status === "urgent" ? "border-red-500/40 text-red-400 bg-red-500/10" :
                                    selected.status === "nearly-full" ? "border-amber-500/40 text-amber-400 bg-amber-500/10" :
                                       "border-emerald-500/30 text-emerald-400 bg-emerald-500/10")}>
                                 {selected.status === "urgent" ? "Pickup Required" : selected.status === "nearly-full" ? "Nearly Full" : "Available"}
                              </span>
                              {selected.trustBadge && (
                                 <span className="flex items-center gap-1 text-[9px] font-bold text-white/30">
                                    <CheckCircle2 size={10} className="text-emerald-500" />{selected.trustBadge}
                                 </span>
                              )}
                           </div>
                           <h2 className="text-2xl font-semibold tracking-tight text-white leading-tight">{selected.name}</h2>
                           <p className="text-xs text-white/30 mt-1">{selected.context}</p>
                           <div className="flex items-center gap-4 mt-2 text-[11px] text-white/30 font-medium">
                              <span className="flex items-center gap-1"><Clock size={11} /> {selected.lastPickup}</span>
                              {selected.openTill && <span className="flex items-center gap-1"><MapPin size={11} /> {selected.openTill}</span>}
                              {selected.distance && <span>{selected.distance} away</span>}
                           </div>
                        </div>
                        <button onClick={() => setMapState("browsing")} className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center text-white/20 shrink-0">
                           <X size={16} />
                        </button>
                     </div>

                     {selected.fill !== undefined && selected.fill > 0 && (
                        <div className="space-y-3">
                           <div className="flex items-center justify-between">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/25">Bin Fill Level</p>
                              <span className={cn("text-sm font-bold", selected.fill > 80 ? "text-red-400" : selected.fill > 60 ? "text-amber-400" : "text-emerald-400")}>{selected.fill}%</span>
                           </div>
                           <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full transition-all duration-1000", selected.fill > 80 ? "bg-red-500" : selected.fill > 60 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${selected.fill}%` }} />
                           </div>
                        </div>
                     )}

                     <div className="flex gap-3 pt-2">
                        <button onClick={() => {
                            const url = `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`
                            window.open(url, '_blank')
                        }} className="flex-[3] h-14 bg-emerald-500 text-black font-bold rounded-2xl flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-sm shadow-lg shadow-emerald-500/10">
                           <Navigation2 size={18} />Navigate via Eco-Path
                        </button>
                        <button onClick={() => router.push("/scanner?mode=waste")}
                           className="flex-1 h-14 bg-white/5 border border-white/8 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 active:scale-[0.98] transition-all">
                           <Scan size={18} />
                        </button>
                     </div>
                  </div>
               )}

               {/* REPORTING STATE */}
               {mapState === "reporting" && (
                  <div className="flex-1 overflow-y-auto px-6 pb-44 md:pb-8 pt-2 space-y-5 animate-in fade-in duration-300">
                     <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Report Illegal Dumping</h2>
                        <button onClick={() => setMapState("browsing")} className="p-2.5 bg-white/5 rounded-full"><X size={18} /></button>
                     </div>
                     <div onClick={() => router.push("/scanner?mode=complaint")} className="w-full h-32 bg-white/[0.03] border border-white/8 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 text-white/20 cursor-pointer">
                        <Camera size={24} /><p className="text-xs">Tap to open camera</p>
                     </div>
                     <textarea className="w-full h-24 bg-white/[0.03] border border-white/8 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 outline-none resize-none" placeholder="Describe the issue..." />
                     <button className="w-full h-14 bg-red-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                        <AlertTriangle size={18} />Submit Report
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
