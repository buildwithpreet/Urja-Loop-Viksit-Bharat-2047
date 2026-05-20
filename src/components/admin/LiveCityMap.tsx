"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Truck, AlertTriangle } from "lucide-react"

export function LiveCityMap({ events }: { events: any[] }) {
  // A mock interactive grid map
  const gridCells = Array.from({ length: 100 }, (_, i) => i)

  return (
    <div className="glass-panel border-primary/20 neon-glow-primary p-6 relative overflow-hidden h-full min-h-[400px]">
      <div className="absolute top-0 right-0 p-4 text-xs font-black uppercase tracking-widest text-primary/40">
        Live Geolocation
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Sector 14 Grid</h3>
      
      <div className="relative w-full h-[300px] border border-white/5 rounded-2xl bg-[#030504] overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-2 opacity-20">
          {gridCells.map(cell => (
            <div key={cell} className="bg-white/5 rounded-sm" />
          ))}
        </div>
        
        {/* Heatmap overlay */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />

        {/* Mock Smart Bins */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-[20%] left-[30%] text-primary"
        >
          <MapPin size={24} fill="currentColor" className="opacity-50" />
        </motion.div>

        <motion.div 
          className="absolute top-[60%] left-[70%] text-red-500"
        >
          <AlertTriangle size={20} className="animate-pulse" />
        </motion.div>

        {/* Mock Live Vehicles */}
        <motion.div 
          animate={{ 
            x: [0, 100, 100, 0, 0],
            y: [0, 0, 100, 100, 0]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-[10%] left-[10%] text-cyan-400 bg-cyan-500/20 p-2 rounded-full border border-cyan-500/50"
        >
          <Truck size={16} />
        </motion.div>

      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-[10px] font-bold uppercase tracking-widest text-white/50">
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-primary rounded-full" /> Online</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> Overflow</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-cyan-400 rounded-full" /> Active Fleet</div>
      </div>
    </div>
  )
}
