"use client"

import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Flame, Droplets, Zap } from "lucide-react"

const data = [
  { time: "00:00", methane: 400, gas: 240 },
  { time: "04:00", methane: 430, gas: 220 },
  { time: "08:00", methane: 550, gas: 310 },
  { time: "12:00", methane: 780, gas: 450 },
  { time: "16:00", methane: 820, gas: 500 },
  { time: "20:00", methane: 650, gas: 380 },
  { time: "24:00", methane: 450, gas: 260 },
]

export function BioCngDashboard() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background glowing orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-all duration-1000" />
      
      <div className="flex justify-between items-center mb-6 z-10">
        <div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Flame className="text-primary animate-pulse" size={24} />
            Bio-CNG Production
          </h3>
          <p className="text-white/50 text-xs tracking-widest mt-1">REAL-TIME ENERGY YIELD</p>
        </div>
        <div className="flex gap-2">
          <span className="badge-sm bg-primary/20 text-primary border border-primary/30">ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 z-10">
        <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
            <Droplets size={14} className="text-cyan-400" />
            METHANE VOL.
          </div>
          <div className="text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            820 <span className="text-sm text-white/30 font-normal">m³/h</span>
          </div>
        </div>
        <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
            <Zap size={14} className="text-primary" />
            GAS OUTPUT
          </div>
          <div className="text-3xl font-black text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            500 <span className="text-sm text-white/30 font-normal">kg/d</span>
          </div>
        </div>
        <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex flex-col justify-center items-center">
          <div className="text-white/50 text-xs mb-1">EFFICIENCY</div>
          <div className="text-2xl font-black text-white">94.2%</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "94.2%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMethane" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="time" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="methane" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorMethane)" />
            <Area type="monotone" dataKey="gas" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGas)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
