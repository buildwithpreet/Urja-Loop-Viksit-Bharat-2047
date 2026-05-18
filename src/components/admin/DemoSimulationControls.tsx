"use client"

import { Zap, AlertOctagon, RotateCcw, Truck, BrainCircuit } from "lucide-react"

export function DemoSimulationControls({ onTrigger }: { onTrigger?: (type: string) => void }) {
  const triggerEvent = (type: string) => {
    if (onTrigger) {
      onTrigger(type);
    } else {
      console.log("Triggered simulation:", type);
    }
  }

  return (
    <div className="glass-panel border-red-500/20 bg-red-500/5 p-6 h-full flex flex-col">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-red-400">
        <Zap size={18} className="animate-pulse" />
        Simulation Controls
      </h3>

      <div className="grid grid-cols-2 gap-3 flex-1">
        <button onClick={() => triggerEvent("overflow")} className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
          <AlertOctagon size={20} className="text-red-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">Trigger Overflow</span>
        </button>
        
        <button onClick={() => triggerEvent("ai_analysis")} className="p-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
          <BrainCircuit size={20} className="text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary text-center">Force AI Scan</span>
        </button>

        <button onClick={() => triggerEvent("assign_collector")} className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
          <Truck size={20} className="text-cyan-400" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 text-center">Assign Collector</span>
        </button>

        <button onClick={() => triggerEvent("reset")} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95">
          <RotateCcw size={20} className="text-white/40" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 text-center">Reset State</span>
        </button>
      </div>
    </div>
  )
}
