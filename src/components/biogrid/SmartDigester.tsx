"use client"

import { motion } from "framer-motion"
import { Activity, Thermometer, Gauge } from "lucide-react"

export function SmartDigester({ mode }: { mode: 'rural' | 'urban' }) {
  // Bubbles animation config
  const bubbles = Array.from({ length: 15 })

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 z-10">
        <div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Activity className="text-cyan-400" size={24} />
            Smart Digester
          </h3>
          <p className="text-white/50 text-xs tracking-widest mt-1">TELEMETRY & FLOW STATUS</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 z-10">
        {/* Digester Tank Visualization */}
        <div className="relative w-1/3 flex items-end justify-center pb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent rounded-[40px] border-2 border-white/10" />
          
          {/* Animated Liquid Level */}
          <motion.div 
            className="absolute bottom-0 w-full bg-cyan-500/20 rounded-b-[40px] border-t border-cyan-400/50"
            initial={{ height: "40%" }}
            animate={{ height: ["40%", "45%", "42%", "48%", "40%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Bubbles */}
            {bubbles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: `${Math.random() * 80 + 10}%`, bottom: "-10px" }}
                animate={{ 
                  y: [-10, -150 - Math.random() * 100],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeIn"
                }}
              />
            ))}
          </motion.div>

          <div className="z-10 text-center font-black text-white/50 text-sm tracking-[0.2em] mb-4">
            TANK_01
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="w-2/3 grid grid-cols-1 gap-4">
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Thermometer size={18} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-widest">CORE TEMP</p>
                <p className="text-xl font-bold text-white">38.4°C</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-red-400 uppercase">Optimal</p>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Gauge size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-widest">PRESSURE</p>
                <p className="text-xl font-bold text-white">1.2 Bar</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-cyan-400 uppercase">Stable</p>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-primary/5"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Activity size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-widest">ACIDITY (pH)</p>
                <p className="text-xl font-bold text-white">7.2</p>
              </div>
            </div>
            <div className="text-right relative z-10">
              <p className="text-[10px] text-primary uppercase">Perfect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
