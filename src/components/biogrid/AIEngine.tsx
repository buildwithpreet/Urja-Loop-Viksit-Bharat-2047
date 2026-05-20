"use client"

import { motion } from "framer-motion"
import { BrainCircuit, AlertTriangle, CheckCircle2 } from "lucide-react"

export function AIEngine() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 z-10">
        <div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
            <BrainCircuit className="text-purple-400" size={24} />
            AI BioGrid Engine
          </h3>
          <p className="text-white/50 text-xs tracking-widest mt-1">PREDICTIVE HEALTH & OPTIMIZATION</p>
        </div>
        <div className="flex gap-2">
          <span className="badge-sm bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            SYNAPSES ACTIVE
          </span>
        </div>
      </div>

      <div className="space-y-4 flex-1 z-10 overflow-y-auto custom-scrollbar pr-2">
        {/* Recommendation 1 */}
        <div className="bg-black/40 border border-purple-500/20 rounded-2xl p-4 hover:bg-black/60 transition-colors">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <CheckCircle2 className="text-primary" size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Yield Optimization Successful</p>
              <p className="text-xs text-white/60 leading-relaxed">
                Feedstock ratio adjusted to 60% cow dung / 40% agri-waste. Methane yield increased by 12% over the last 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-4 hover:bg-red-900/20 transition-colors relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <AlertTriangle className="text-red-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-red-400 mb-1">Predictive Alert: Rising Acidity</p>
              <p className="text-xs text-white/60 leading-relaxed">
                Digester Tank 03 showing trend towards pH 6.8. Recommend halting citrus waste intake immediately to prevent methanogen collapse.
              </p>
              <button className="mt-3 text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors">
                Apply Neutralizer Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Future Prediction */}
        <div className="bg-black/40 border border-purple-500/20 rounded-2xl p-4 hover:bg-black/60 transition-colors">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <BrainCircuit className="text-purple-400" size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">7-Day Supply Forecast</p>
              <p className="text-xs text-white/60 leading-relaxed">
                Anticipating 20% drop in rural feedstock due to monsoon. Initiating automated routing for urban mandi waste to compensate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
