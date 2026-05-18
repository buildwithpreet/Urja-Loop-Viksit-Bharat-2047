"use client"

import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, TrendingUp, Users, PackageCheck, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

const initialData = [
  { name: '08:00', total: 12 },
  { name: '09:00', total: 25 },
  { name: '10:00', total: 18 },
  { name: '11:00', total: 32 },
  { name: '12:00', total: 28 },
]

interface AdminPreviewCardProps {
  phase: string
}

export function AdminPreviewCard({ phase }: AdminPreviewCardProps) {
  const isReporting = phase === "REPORTING"
  
  // Animate numbers up when reporting finishes
  const [stats, setStats] = useState({
    collections: 142,
    weight: 845,
    efficiency: 92
  })
  const [chartData, setChartData] = useState(initialData)

  useEffect(() => {
    if (isReporting) {
      const timer = setTimeout(() => {
        setStats(prev => ({
          collections: prev.collections + 1,
          weight: prev.weight + 14,
          efficiency: 94
        }))
        setChartData([...initialData, { name: '12:05', total: 45 }])
      }, 1000)
      return () => clearTimeout(timer)
    } else if (phase === "IDLE") {
      const timer = setTimeout(() => {
        setStats({ collections: 142, weight: 845, efficiency: 92 })
        setChartData(initialData)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isReporting, phase])

  return (
    <div className={cn("relative p-6 glass-panel overflow-hidden flex flex-col h-full transition-all duration-500", isReporting ? "neon-glow-primary border-primary/50" : "neon-glow-secondary border-cyan-500/30")}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-500">
          <BarChart3 size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-foreground">City Overview</h2>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            Live Central Analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatBox label="Today's Pickups" value={stats.collections} icon={PackageCheck} highlight={isReporting} />
        <StatBox label="Total Weight" value={`${stats.weight}kg`} icon={TrendingUp} highlight={isReporting} />
        <StatBox label="Fleet Efficiency" value={`${stats.efficiency}%`} icon={Users} highlight={isReporting} />
      </div>

      {/* Micro Chart */}
      <div className="flex-1 min-h-[100px] w-full bg-black/20 rounded-2xl p-4 border border-white/5 relative">
         <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground absolute top-4 left-4 z-10">Collection Volume</span>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                isAnimationActive={true}
              />
            </AreaChart>
         </ResponsiveContainer>
      </div>

      {/* Live Event Log */}
      <div className="mt-4 h-16 relative overflow-hidden rounded-xl bg-black/40 border border-white/5">
        <AnimatePresence mode="popLayout">
          {isReporting ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 p-3 flex items-center gap-3 border-l-2 border-emerald-500 bg-emerald-500/5"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Log: Verified Collection Event</p>
                <p className="text-[10px] text-emerald-500/70 font-mono">BIN-ALPHA • 14.2kg • +45XP</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-3 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Listening for incoming data streams...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function StatBox({ label, value, icon: Icon, highlight }: { label: string, value: string | number, icon: any, highlight: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center relative overflow-hidden">
      {highlight && (
         <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5 }}
           className="absolute inset-0 bg-primary/20 pointer-events-none"
         />
      )}
      <Icon size={16} className="text-muted-foreground mb-2" />
      <motion.p 
        key={value}
        initial={{ scale: 1.2, color: "#10b981" }}
        animate={{ scale: 1, color: "var(--foreground)" }}
        className="text-lg font-black tracking-tight"
      >
        {value}
      </motion.p>
      <p className="text-[9px] uppercase font-bold text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
