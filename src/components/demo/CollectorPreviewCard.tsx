"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Navigation, MapPin, Truck, CheckCircle2, ShieldCheck, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollectorPreviewCardProps {
  phase: string
  onAccept: () => void
  onVerify: () => void
}

export function CollectorPreviewCard({ phase, onAccept, onVerify }: CollectorPreviewCardProps) {
  const isIdle = phase === "IDLE" || phase === "DETECTING" || phase === "AI_ANALYZING"
  const isAlerting = phase === "ALERTING_COLLECTOR"
  const isCollecting = phase === "COLLECTING" || phase === "REPORTING"
  const isVerified = phase === "REPORTING"

  return (
    <div className="relative p-6 rounded-[2.5rem] bg-card border border-border overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-500">
          <Truck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-foreground">Fleet Command Panel</h2>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            Unit EV-402 · Active
          </p>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col p-4 mb-6">
        {/* Fake Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
           {/* SVG Route Line simulation */}
           {(isAlerting || isCollecting) && (
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <motion.path 
                 d="M 20 20 Q 100 150 250 80 T 400 200" 
                 fill="none" 
                 stroke="#3b82f6" 
                 strokeWidth="3" 
                 strokeDasharray="5 5"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
               {/* Animated vehicle dot */}
               {isCollecting && !isVerified && (
                  <motion.circle 
                    r="6" 
                    fill="#3b82f6"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ offsetPath: "path('M 20 20 Q 100 150 250 80 T 400 200')" } as any}
                  />
               )}
             </svg>
           )}
        </div>

        {/* Content Overlays */}
        <div className="relative z-10 flex-1 flex flex-col justify-end">
           <AnimatePresence mode="wait">
             {isIdle && (
               <motion.div 
                 key="idle"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="text-center p-6"
               >
                 <MapPin size={32} className="mx-auto mb-2 text-white/20" />
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Patrol Route Active</p>
                 <p className="text-[10px] text-white/30 mt-1">Waiting for dispatch...</p>
               </motion.div>
             )}

             {isAlerting && (
               <motion.div 
                 key="alert"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-card/90 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 shadow-2xl"
               >
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-red-500">High Priority Dispatch</span>
                 </div>
                 <h3 className="text-lg font-black text-white leading-none mb-1">Overflow at Sector 14</h3>
                 <p className="text-xs text-muted-foreground mb-4">ETA: 4 mins · Plastic / Mixed</p>
                 <button 
                   onClick={onAccept}
                   className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                 >
                   Accept Task
                 </button>
               </motion.div>
             )}

             {isCollecting && !isVerified && (
               <motion.div 
                 key="collecting"
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 20 }}
                 className="bg-card/90 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 shadow-2xl text-center"
               >
                 <Navigation size={24} className="mx-auto mb-2 text-blue-500 animate-pulse" />
                 <h3 className="text-sm font-black text-white mb-1">En Route to Destination</h3>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Arriving in 1 min</p>
                 <button 
                   onClick={onVerify}
                   className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                 >
                   <Camera size={14} /> Scan & Verify Pickup
                 </button>
               </motion.div>
             )}

             {isVerified && (
               <motion.div 
                 key="verified"
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                 className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 shadow-2xl text-center"
               >
                 <ShieldCheck size={32} className="mx-auto mb-2 text-emerald-500" />
                 <h3 className="text-sm font-black text-emerald-500 mb-1">Collection Verified</h3>
                 <p className="text-[10px] text-emerald-500/70 uppercase tracking-widest">Weight Logged: 14.2kg</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
