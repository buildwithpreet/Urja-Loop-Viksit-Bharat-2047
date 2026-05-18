"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Info, ShieldAlert } from "lucide-react"

export function LiveAlertCenter({ alerts }: { alerts: any[] }) {
  return (
    <div className="glass-panel border-white/5 p-6 h-full flex flex-col">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
        <ShieldAlert size={18} className="text-red-500 animate-pulse" />
        Live Alert Center
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <div className="text-center text-white/20 text-xs font-bold uppercase tracking-widest py-10">
              No active alerts
            </div>
          ) : (
            alerts.map((alert, i) => (
              <motion.div 
                key={alert.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-3 border rounded-2xl flex items-start gap-3
                  ${alert.severity === 'Critical' ? 'bg-red-500/10 border-red-500/30' : 
                    alert.severity === 'High' ? 'bg-amber-500/10 border-amber-500/30' : 
                    'bg-white/5 border-white/10'}`}
              >
                <div className={`p-1.5 rounded-lg ${alert.severity === 'Critical' ? 'text-red-400 bg-red-500/20' : 'text-amber-400 bg-amber-500/20'}`}>
                  <AlertTriangle size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white/90 truncate">{alert.type}</p>
                  <p className="text-[9px] text-white/50">{alert.location}</p>
                </div>
                <span className="text-[9px] font-mono text-white/30">{alert.time}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
