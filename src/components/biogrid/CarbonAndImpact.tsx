"use client"

import { Leaf, TrendingDown, DollarSign, Globe2 } from "lucide-react"

export function CarbonAndImpact() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <Globe2 className="text-emerald-400" size={24} />
          National Impact & Carbon
        </h3>
        <p className="text-white/50 text-xs tracking-widest mt-1">ESG METRICS & ECONOMIC SAVINGS</p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Leaf size={100} />
          </div>
          <p className="text-xs text-emerald-400/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Leaf size={14} /> Carbon Credits
          </p>
          <p className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            12,450 <span className="text-sm text-emerald-400 font-normal">CR</span>
          </p>
          <p className="text-[10px] text-white/40 mt-2">+450 this month</p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingDown size={100} />
          </div>
          <p className="text-xs text-cyan-400/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            <TrendingDown size={14} /> Emissions Reduced
          </p>
          <p className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            45.2 <span className="text-sm text-cyan-400 font-normal">kT CO₂e</span>
          </p>
          <p className="text-[10px] text-white/40 mt-2">Methane capture efficiency 98%</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <DollarSign size={100} />
          </div>
          <p className="text-xs text-yellow-400/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            <DollarSign size={14} /> LPG Substitution
          </p>
          <p className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
            ₹8.5M <span className="text-sm text-yellow-400 font-normal">Saved</span>
          </p>
          <p className="text-[10px] text-white/40 mt-2">Rural fuel cost offset</p>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Globe2 size={100} />
          </div>
          <p className="text-xs text-primary/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Globe2 size={14} /> Fertilizer Import
          </p>
          <p className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            -15% <span className="text-sm text-primary font-normal">Dependency</span>
          </p>
          <p className="text-[10px] text-white/40 mt-2">Organic manure supplied</p>
        </div>
      </div>
    </div>
  )
}
