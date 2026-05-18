"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Server, Database, Globe, RefreshCw, Power } from "lucide-react"

import { SmartBinCard } from "@/components/demo/SmartBinCard"
import { AIEngineCard } from "@/components/demo/AIEngineCard"
import { CollectorPreviewCard } from "@/components/demo/CollectorPreviewCard"
import { AdminPreviewCard } from "@/components/demo/AdminPreviewCard"
import { DataFlowLines } from "@/components/demo/DataFlowLines"

type Phase = "IDLE" | "DETECTING" | "AI_ANALYZING" | "ALERTING_COLLECTOR" | "COLLECTING" | "REPORTING"

export default function DemoPage() {
  const [phase, setPhase] = useState<Phase>("IDLE")

  // Sequence Handlers
  const triggerSimulation = () => {
    setPhase("DETECTING")
    setTimeout(() => {
      setPhase("AI_ANALYZING")
      setTimeout(() => {
        setPhase("ALERTING_COLLECTOR")
      }, 3000) // AI Analysis takes 3 seconds
    }, 2000) // Bin overflow visual plays for 2 seconds
  }

  const acceptTask = () => {
    setPhase("COLLECTING")
  }

  const verifyCollection = () => {
    setPhase("REPORTING")
    setTimeout(() => {
      setPhase("IDLE") // Reset after reporting
    }, 4000)
  }

  const forceReset = () => {
    setPhase("IDLE")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground p-4 md:p-8 overflow-hidden relative selection:bg-primary/30">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Header & Controls */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Real-Time Smart Waste Flow System
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">
            Live AI + IoT Communication Between Smart Bins, Collectors & Admin
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={forceReset}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} /> Reset Flow
          </button>
          <button 
            onClick={triggerSimulation}
            disabled={phase !== "IDLE"}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <Power size={14} /> Start Demo Sequence
          </button>
        </div>
      </div>

      {/* Tech Stack Bar */}
      <div className="relative z-20 flex flex-wrap gap-3 mb-8">
        <TechBadge icon={Cpu} label="ESP32 + Sensors" />
        <TechBadge icon={Globe} label="Socket.IO Real-time" />
        <TechBadge icon={Server} label="Node.js + Next.js" />
        <TechBadge icon={Database} label="MongoDB + Supabase" />
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
        
        {/* SVG Flow Lines (Desktop Only) */}
        <DataFlowLines phase={phase} />

        {/* Top Left: Smart Bin */}
        <div className="relative z-10">
          <SmartBinCard phase={phase} onSimulate={triggerSimulation} />
        </div>

        {/* Top Right: AI Engine */}
        <div className="relative z-10">
          <AIEngineCard phase={phase} />
        </div>

        {/* Bottom Left: Collector */}
        <div className="relative z-10">
          <CollectorPreviewCard phase={phase} onAccept={acceptTask} onVerify={verifyCollection} />
        </div>

        {/* Bottom Right: Admin */}
        <div className="relative z-10">
          <AdminPreviewCard phase={phase} />
        </div>

      </div>
    </div>
  )
}

function TechBadge({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/10 transition-colors cursor-default">
      <Icon size={12} className="text-primary" /> {label}
    </div>
  )
}
