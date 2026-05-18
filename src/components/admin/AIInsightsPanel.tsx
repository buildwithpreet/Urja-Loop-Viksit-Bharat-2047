"use client"

import { motion } from "framer-motion"
import { Zap, BrainCircuit, Activity } from "lucide-react"

export function AIInsightsPanel() {
  const insights = [
    { title: "Predictive Overflow", desc: "Sector 14 Zone B bins predicted to overflow in 2 hours based on historical weekend foot traffic.", confidence: "94%" },
    { title: "Route Optimization", desc: "Collector Fleet 02 can save 1.4km by rerouting through Market Center.", confidence: "89%" }
  ]

  return (
    <div className="glass-panel border-primary/20 p-6 flex flex-col h-full bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 text-primary rounded-xl">
          <BrainCircuit size={20} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Neural Intelligence</h3>
      </div>

      <div className="space-y-4 flex-1">
        {insights.map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 bg-black/40 border border-primary/10 rounded-2xl hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider">{insight.title}</h4>
              <span className="text-[9px] font-black font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">{insight.confidence} ACC</span>
            </div>
            <p className="text-[11px] text-white/50 font-medium leading-relaxed">{insight.desc}</p>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all neon-glow-primary">
        Apply AI Recommendations
      </button>
    </div>
  )
}
