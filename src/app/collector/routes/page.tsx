"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation2, MapPin, Truck, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function CollectorRoutes() {
  const [isNavigating, setIsNavigating] = useState(true)

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-160px)] pb-24 md:pb-0 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Live Routing</h1>
          <p className="text-xs font-medium text-muted-foreground">Optimal paths and vehicle tracking.</p>
        </div>
        <button 
          onClick={() => setIsNavigating(!isNavigating)}
          className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
            isNavigating 
              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20" 
              : "bg-primary text-primary-foreground hover:scale-105"
          }`}
        >
          {isNavigating ? "End Route" : "Start Route"}
        </button>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 rounded-[2rem] overflow-hidden border border-border group bg-[#0d0f12]">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Mock Map Image */}
        <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/dataviz-dark/256/0/0/0.png')] bg-cover bg-center opacity-40 mix-blend-screen transition-transform duration-[20s] ease-linear hover:scale-110" />

        {/* Map Elements Overlay */}
        {isNavigating && (
          <>
            {/* Mock Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <motion.path
                d="M 100 300 Q 200 250 300 300 T 500 200 T 700 250"
                fill="transparent"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="10 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Vehicle Marker */}
            <motion.div 
              className="absolute left-[300px] top-[300px] z-20"
              animate={{ 
                x: [0, 50, 100],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-background">
                  <Truck size={20} className="drop-shadow-md" />
                </div>
              </div>
            </motion.div>

            {/* Bin Markers */}
            <div className="absolute left-[500px] top-[200px] z-10 group/marker cursor-pointer">
              <div className="w-8 h-8 bg-amber-500/20 border border-amber-500 rounded-full flex items-center justify-center">
                <MapPin size={16} className="text-amber-500" />
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-card border border-border p-2 rounded-xl text-xs font-bold w-32 text-center opacity-0 group-hover/marker:opacity-100 transition-opacity">
                BIN-12B <br/> <span className="text-muted-foreground font-medium text-[10px]">Medium Priority</span>
              </div>
            </div>

            <div className="absolute left-[700px] top-[250px] z-10 group/marker cursor-pointer">
              <div className="w-8 h-8 bg-rose-500/20 border border-rose-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle size={16} className="text-rose-500" />
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-card border border-border p-2 rounded-xl text-xs font-bold w-32 text-center opacity-0 group-hover/marker:opacity-100 transition-opacity">
                BIN-74A <br/> <span className="text-rose-500 font-black text-[10px] uppercase">Critical Overflow</span>
              </div>
            </div>
          </>
        )}

        {/* Floating UI Elements */}
        {isNavigating && (
          <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            {/* Next Stop Info */}
            <div className="bg-background/80 backdrop-blur-md border border-border p-4 rounded-2xl pointer-events-auto max-w-[200px]">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Next Stop</p>
              <h3 className="text-sm font-black text-foreground truncate">BIN-12B (Green Park)</h3>
              <p className="text-xl font-black text-primary mt-2">2.4 km</p>
              <p className="text-xs text-muted-foreground font-medium">ETA: 6 mins</p>
            </div>

            {/* Nav Controls */}
            <div className="flex flex-col gap-2 pointer-events-auto">
              <button className="w-12 h-12 bg-background/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                <Navigation2 size={20} />
              </button>
            </div>
          </div>
        )}

        {!isNavigating && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-30">
            <div className="text-center">
              <Navigation2 size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-lg font-bold text-white uppercase tracking-widest">Route Offline</p>
              <p className="text-sm text-white/50 mb-6">Start your route to view live navigation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
