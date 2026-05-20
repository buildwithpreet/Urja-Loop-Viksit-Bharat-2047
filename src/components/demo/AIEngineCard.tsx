"use client"

import { motion } from "framer-motion"
import { Cpu, Scan, CheckCircle2, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface AIEngineCardProps {
  phase: string
}

export function AIEngineCard({ phase }: AIEngineCardProps) {
  const isAnalyzing = phase === "AI_ANALYZING"
  const hasResult = phase === "ALERTING_COLLECTOR" || phase === "COLLECTING" || phase === "REPORTING"
  const isIdle = phase === "IDLE" || phase === "DETECTING"

  return (
    <div className={cn("relative p-6 glass-panel overflow-hidden flex flex-col h-full transition-all duration-500", isAnalyzing ? "neon-glow-secondary border-cyan-500/50" : "border-white/10")}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("p-2 rounded-xl", isAnalyzing ? "bg-primary/20 text-primary animate-pulse" : "bg-muted text-muted-foreground")}>
          <Cpu size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-foreground">Neural Vision Core</h2>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            {isIdle && "Awaiting Data..."}
            {isAnalyzing && "Processing Hyperspectral Feed..."}
            {hasResult && "Classification Complete"}
          </p>
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 relative bg-black/40 rounded-3xl border border-white/10 overflow-hidden mb-6 flex flex-col items-center justify-center min-h-[200px]">
        {isIdle && (
          <div className="text-center opacity-30">
             <Scan size={48} className="mx-auto mb-2" />
             <span className="text-[10px] uppercase font-black tracking-[0.2em]">Standby Mode</span>
          </div>
        )}

        {(isAnalyzing || hasResult) && (
          <div className="absolute inset-0">
             {/* Simulated Waste Image Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
             
             {isAnalyzing && (
               <>
                 {/* Scanning Grid overlay */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                 
                 {/* Laser Scanner Line */}
                 <motion.div 
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_var(--primary)] z-10"
                 />
                 
                 {/* Bounding Boxes animating */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: [0, 1, 0.5], scale: [0.8, 1.1, 1], x: [0, 20, -10], y: [0, -20, 10] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="absolute top-1/3 left-1/4 w-24 h-32 border-2 border-primary/50 bg-primary/10 rounded-lg"
                 />
               </>
             )}

             {hasResult && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                  <div className="w-full space-y-4">
                     <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Classification</span>
                        <span className="text-lg font-black text-white uppercase tracking-wider">Plastic Bottle (PET)</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Confidence</span>
                        <span className="text-lg font-black text-primary uppercase tracking-wider">98.4%</span>
                     </div>
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Category</span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-bold uppercase">Recyclable</span>
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className={cn(
        "p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-colors",
        isIdle && "bg-muted text-muted-foreground",
        isAnalyzing && "bg-primary/20 text-primary animate-pulse",
        hasResult && "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
      )}>
        {isIdle && "System Ready"}
        {isAnalyzing && "Analyzing..."}
        {hasResult && <><CheckCircle2 size={16} /> Analysis Complete</>}
      </div>
    </div>
  )
}
