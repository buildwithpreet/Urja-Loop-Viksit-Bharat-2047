"use client"

import { 
  MapPin, 
  Search, 
  Navigation, 
  Layers, 
  Maximize2, 
  ChevronRight,
  Filter,
  Info,
  Clock,
  Trash2,
  AlertCircle,
  MoreVertical
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"

const bins = [
  { id: 1, lat: "40%", lng: "30%", status: "empty", capacity: "12%", type: "Organic", address: "Sector 14 Main Rd" },
  { id: 2, lat: "55%", lng: "45%", status: "half", capacity: "54%", type: "Plastic", address: "City Center Mall" },
  { id: 3, lat: "25%", lng: "60%", status: "full", capacity: "92%", type: "Paper", address: "Green View Colony" },
  { id: 4, lat: "70%", lng: "25%", status: "empty", capacity: "8%", type: "Metal", address: "Industrial Area Ph 1" },
  { id: 5, lat: "45%", lng: "75%", status: "full", capacity: "98%", type: "Glass", address: "Railway Station" },
]

export default function MapPage() {
  const [selectedBin, setSelectedBin] = useState(bins[2])

  return (
    <div className="h-screen w-full relative overflow-hidden bg-slate-50">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.2090,28.6139,12/1200x800?access_token=YOUR_TOKEN')] bg-cover opacity-80 mix-blend-multiply transition-all duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5"></div>
        
        {/* Grid Overlay for "Tech" look */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-30"></div>

        {/* Route Lines Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path 
            d="M 400 300 Q 550 450 600 250 T 800 450" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3" 
            strokeDasharray="10 6" 
            className="animate-[dash_20s_linear_infinite]"
          />
        </svg>

        {/* Markers */}
        {bins.map((bin) => (
          <button
            key={bin.id}
            onClick={() => setSelectedBin(bin)}
            style={{ top: bin.lat, left: bin.lng }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-500 hover:scale-125 z-10"
          >
            <div className="relative">
              {/* Pulse effect for full bins */}
              {bin.status === 'full' && (
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20 scale-150"></div>
              )}
              
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl transition-all border-2 border-white",
                bin.status === 'empty' ? "bg-emerald-500 text-white" : 
                bin.status === 'half' ? "bg-amber-500 text-white" : 
                "bg-red-500 text-white"
              )}>
                <MapPin size={20} fill="currentColor" fillOpacity={0.2} />
              </div>

              {/* Status Label on Hover */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                  {bin.type} • <span className={cn(
                    bin.status === 'empty' ? "text-emerald-500" : 
                    bin.status === 'half' ? "text-amber-500" : 
                    "text-red-500"
                  )}>{bin.capacity}</span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-8 left-8 right-8 md:left-12 md:right-auto md:w-[400px] z-20">
        <div className="glass rounded-[2rem] p-3 shadow-premium ring-1 ring-black/5 flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search smart bins..." 
            className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-slate-700 placeholder:text-slate-400"
          />
          <button className="w-10 h-10 text-slate-400 hover:text-slate-900 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Right Floating Controls */}
      <div className="absolute right-8 top-8 flex flex-col gap-4 z-20">
        {[
          { icon: Layers, label: "Layers" },
          { icon: Navigation, label: "Center" },
          { icon: Maximize2, label: "Fullscreen" }
        ].map((btn, i) => (
          <button key={i} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all shadow-premium group">
            <btn.icon size={22} />
          </button>
        ))}
      </div>

      {/* Selected Bin Card (Bottom) */}
      <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-auto md:w-[420px] z-20 animate-in slide-in-from-bottom-12 duration-700">
        <Card className="rounded-[2.5rem] border-none shadow-premium overflow-hidden">
          <CardContent className="p-0">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge className={cn(
                    "px-3 py-1 font-black text-[10px] tracking-widest border-none",
                    selectedBin.status === 'empty' ? "bg-emerald-500/10 text-emerald-600" : 
                    selectedBin.status === 'half' ? "bg-amber-500/10 text-amber-600" : 
                    "bg-red-500/10 text-red-600"
                  )}>
                    {selectedBin.status.toUpperCase()} ({selectedBin.capacity})
                  </Badge>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedBin.address}</h3>
                </div>
                <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-slate-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                    <Trash2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Waste Type</p>
                    <p className="text-sm font-bold text-slate-900">{selectedBin.type}</p>
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-slate-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Last Pickup</p>
                    <p className="text-sm font-bold text-slate-900">2h ago</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Navigation size={20} fill="white" />
                  DIRECTIONS
                </button>
                <button className="w-16 h-16 glass rounded-[1.5rem] flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all">
                  <Info size={24} />
                </button>
              </div>
            </div>
            
            {/* Action Alert for full bins */}
            {selectedBin.status === 'full' && (
              <div className="bg-red-500 p-4 flex items-center justify-center gap-2">
                <AlertCircle size={16} className="text-white animate-bounce" />
                <span className="text-white text-xs font-black uppercase tracking-widest">Immediate Pickup Required</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Map Key */}
      <div className="hidden lg:flex absolute bottom-12 right-12 glass rounded-3xl p-5 shadow-premium items-center gap-8 z-20 ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-xs font-black text-slate-500 uppercase">Available</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-xs font-black text-slate-500 uppercase">Filling</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs font-black text-slate-500 uppercase">Full</span>
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
