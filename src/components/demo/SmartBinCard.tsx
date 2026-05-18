"use client"

import { motion } from "framer-motion"
import { Trash2, Wifi, Activity, Battery, Thermometer, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmartBinCardProps {
  phase: string
  onSimulate: () => void
}

export function SmartBinCard({ phase, onSimulate }: SmartBinCardProps) {
  const isOverflowing = phase !== "IDLE" && phase !== "REPORTING"
  const fillLevel = isOverflowing ? 92 : 24
  
  return (
    <div className="relative p-6 rounded-[2.5rem] bg-card border border-border overflow-hidden group">
      {/* Background glow if overflowing */}
      {isOverflowing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-500/10 pointer-events-none"
        />
      )}

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-foreground">Smart Bin Alpha</h2>
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-2 mt-1">
            <Wifi size={12} className="text-emerald-500" /> Sector 14, Main Road
          </p>
        </div>
        <div className="flex gap-2">
           <Badge icon={Battery} text="98%" />
           <Badge icon={Thermometer} text="28°C" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        {/* Visualizer */}
        <div className="relative aspect-square bg-black/40 rounded-3xl border border-white/10 overflow-hidden flex items-end justify-center pb-4">
          <Trash2 size={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 z-0" />
          
          {/* Liquid Fill */}
          <motion.div 
            className={cn("absolute bottom-0 left-0 right-0 z-10", isOverflowing ? "bg-red-500/50" : "bg-emerald-500/50")}
            animate={{ height: `${fillLevel}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {/* Wave effect overlay */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 blur-sm rounded-full" />
          </motion.div>

          <span className="relative z-20 text-3xl font-black drop-shadow-md text-white">
            {fillLevel}%
          </span>
        </div>

        {/* Live Data */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <DataRow label="Waste Type" value="Mixed / Unknown" />
            <DataRow label="Weight" value={isOverflowing ? "14.2 kg" : "3.1 kg"} />
            <DataRow label="Status" value={isOverflowing ? "CRITICAL" : "OPTIMAL"} highlight={isOverflowing} />
          </div>

          <button 
            onClick={onSimulate}
            disabled={phase !== "IDLE"}
            className={cn(
              "w-full py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
              phase === "IDLE" 
                ? "bg-primary text-primary-foreground hover:scale-105 shadow-lg shadow-primary/20" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Simulate Detection
          </button>
        </div>
      </div>

      {isOverflowing && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-xs font-bold shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20"
        >
          <AlertTriangle size={14} /> OVERFLOW DETECTED
        </motion.div>
      )}
    </div>
  )
}

function Badge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-muted-foreground">
      <Icon size={10} /> {text}
    </div>
  )
}

function DataRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-[10px] uppercase font-bold text-muted-foreground">{label}</span>
      <span className={cn("text-xs font-black", highlight ? "text-red-500" : "text-foreground")}>{value}</span>
    </div>
  )
}
