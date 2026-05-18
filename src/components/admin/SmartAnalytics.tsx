"use client"

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart3 } from "lucide-react"

const data = [
  { name: 'Mon', organic: 4000, plastic: 2400 },
  { name: 'Tue', organic: 3000, plastic: 1398 },
  { name: 'Wed', organic: 2000, plastic: 9800 },
  { name: 'Thu', organic: 2780, plastic: 3908 },
  { name: 'Fri', organic: 1890, plastic: 4800 },
  { name: 'Sat', organic: 2390, plastic: 3800 },
  { name: 'Sun', organic: 3490, plastic: 4300 },
]

export function SmartAnalytics() {
  return (
    <div className="glass-panel border-white/5 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <BarChart3 size={18} className="text-cyan-400" />
          Waste Collection Trends
        </h3>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">Weekly +12%</span>
      </div>

      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="organic" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOrganic)" />
            <Area type="monotone" dataKey="plastic" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorPlastic)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex gap-4 mt-4">
        <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Organic</p>
          <p className="text-lg font-black text-primary">64%</p>
        </div>
        <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Recyclable</p>
          <p className="text-lg font-black text-cyan-400">36%</p>
        </div>
      </div>
    </div>
  )
}
