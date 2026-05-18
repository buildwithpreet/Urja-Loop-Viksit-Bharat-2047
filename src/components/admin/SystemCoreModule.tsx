"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, ShieldAlert, Cpu, Power, RefreshCw, Layers } from "lucide-react"

export function SystemCoreModule() {
  const [nodes, setNodes] = useState([
    { id: "NODE-A", name: "Sector 14 IoT Gateway", status: "Online", load: "42%", enabled: true },
    { id: "NODE-B", name: "AI Visual Engine Relay", status: "Online", load: "78%", enabled: true },
    { id: "NODE-C", name: "Geospatial Routing Processor", status: "Online", load: "12%", enabled: true },
    { id: "NODE-D", name: "Supabase Synclink Mainframe", status: "Online", load: "5%", enabled: true },
  ])

  const toggleNode = (id: string) => {
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, enabled: !n.enabled, status: n.enabled ? "Offline" : "Online", load: n.enabled ? "0%" : "35%" } : n
    ))
  }

  return (
    <div className="glass-panel border-primary/20 p-8 h-full bg-gradient-to-br from-primary/5 to-transparent space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-primary rounded-xl">
            <Zap size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest text-primary">System Core Operations</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Mainframe Node Controls & Power Allocation</p>
          </div>
        </div>
        <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          CORE V1.4.2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.01 }}
            className={`p-6 border rounded-3xl transition-all duration-300 relative overflow-hidden
              ${node.enabled ? "bg-black/60 border-primary/20" : "bg-red-950/10 border-red-500/20"}`}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono text-white/30 font-bold uppercase tracking-widest">{node.id}</span>
                <h4 className="text-sm font-black text-white uppercase tracking-wider mt-1">{node.name}</h4>
              </div>
              <button
                onClick={() => toggleNode(node.id)}
                className={`p-3 rounded-2xl flex items-center justify-center transition-all border
                  ${node.enabled 
                    ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30" 
                    : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"}`}
              >
                <Power size={18} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${node.enabled ? "bg-primary animate-pulse" : "bg-red-500"}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${node.enabled ? "text-primary" : "text-red-400"}`}>
                  {node.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block">Operational Load</span>
                <span className="text-sm font-mono font-black text-white/90">{node.load}</span>
              </div>
            </div>
            
            {node.enabled && (
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-cyan-400" style={{ width: node.load }} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-6 border-white/5 rounded-3xl bg-black/40 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <Cpu className="text-cyan-400" size={24} />
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wide">Mainframe Calibration</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Optimize garbage allocation algorithms across active grids</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2">
          <RefreshCw size={12} className="animate-spin" />
          Run Auto-Calibration
        </button>
      </div>
    </div>
  )
}
