"use client"

import { useState } from "react"
import { Zap, AlertOctagon, RotateCcw, Truck, BrainCircuit, Loader2 } from "lucide-react"
import { demoApi } from "@/lib/api"

export function DemoSimulationControls({ onTrigger }: { onTrigger?: (type: string) => void }) {
  const [loading, setLoading] = useState<string | null>(null);

  const triggerEvent = async (type: string) => {
    if (onTrigger) {
      onTrigger(type);
      return;
    }

    setLoading(type);
    try {
      switch (type) {
        case "overflow":
          await demoApi.simulateOverflow();
          break;
        case "ai_analysis":
          await demoApi.simulateAiScan();
          break;
        case "assign_collector":
          await demoApi.simulateDispatch();
          break;
        case "reset":
          await demoApi.simulatePickup(); // Reset essentially clears the bin via pickup
          break;
      }
    } catch (err) {
      console.error(`Simulation ${type} failed:`, err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="glass-panel border-red-500/20 bg-red-500/5 p-6 h-full flex flex-col">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-red-400">
        <Zap size={18} className="animate-pulse" />
        Simulation Controls
      </h3>

      <div className="grid grid-cols-2 gap-3 flex-1">
        <button 
          onClick={() => triggerEvent("overflow")} 
          disabled={!!loading}
          className="p-3 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-50 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading === "overflow" ? <Loader2 size={20} className="text-red-500 animate-spin" /> : <AlertOctagon size={20} className="text-red-500" />}
          <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">Trigger Overflow</span>
        </button>
        
        <button 
          onClick={() => triggerEvent("ai_analysis")} 
          disabled={!!loading}
          className="p-3 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 border border-primary/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading === "ai_analysis" ? <Loader2 size={20} className="text-primary animate-spin" /> : <BrainCircuit size={20} className="text-primary" />}
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary text-center">Force AI Scan</span>
        </button>

        <button 
          onClick={() => triggerEvent("assign_collector")} 
          disabled={!!loading}
          className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-50 border border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading === "assign_collector" ? <Loader2 size={20} className="text-cyan-400 animate-spin" /> : <Truck size={20} className="text-cyan-400" />}
          <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 text-center">Assign Collector</span>
        </button>

        <button 
          onClick={() => triggerEvent("reset")} 
          disabled={!!loading}
          className="p-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading === "reset" ? <Loader2 size={20} className="text-white/40 animate-spin" /> : <RotateCcw size={20} className="text-white/40" />}
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 text-center">Simulate Pickup</span>
        </button>
      </div>
    </div>
  )
}
