"use client"

import { motion } from "framer-motion"
import { Trash2, Brain, FlaskConical, Flame, Sprout, Leaf } from "lucide-react"

export function WasteToEnergyPipeline() {
  const nodes = [
    { id: "waste", icon: Trash2, label: "Collection", color: "text-neutral-400", bg: "bg-neutral-500/20", delay: 0 },
    { id: "ai", icon: Brain, label: "AI Sort", color: "text-purple-400", bg: "bg-purple-500/20", delay: 1 },
    { id: "digester", icon: FlaskConical, label: "Digester", color: "text-cyan-400", bg: "bg-cyan-500/20", delay: 2 },
    { id: "methane", icon: Flame, label: "Bio-CNG", color: "text-primary", bg: "bg-primary/20", delay: 3 },
    { id: "fertilizer", icon: Sprout, label: "Fertilizer", color: "text-emerald-400", bg: "bg-emerald-500/20", delay: 4 },
    { id: "carbon", icon: Leaf, label: "Credits", color: "text-yellow-400", bg: "bg-yellow-500/20", delay: 5 },
  ]

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-black uppercase tracking-widest text-white">Value Chain</h3>
        <p className="text-white/50 text-xs tracking-widest mt-1">WASTE TO ENERGY PIPELINE</p>
      </div>

      <div className="flex-1 flex items-center justify-between relative px-4">
        {/* Animated Connecting Line */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Flow particles */}
        <motion.div 
          className="absolute top-1/2 left-10 w-4 h-1 rounded-full bg-primary shadow-[0_0_10px_#10b981] z-0 -translate-y-1/2"
          animate={{ left: ["10%", "90%"], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {nodes.map((node, index) => (
          <div key={node.id} className="relative z-10 flex flex-col items-center gap-3">
            <motion.div 
              className={`w-14 h-14 rounded-2xl ${node.bg} border border-white/10 flex items-center justify-center backdrop-blur-md`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring" }}
            >
              <node.icon className={node.color} size={24} />
              
              {/* Pulse effect */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl border-2 ${node.color.replace('text-', 'border-')}`}
                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: node.delay * 0.5 }}
              />
            </motion.div>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
