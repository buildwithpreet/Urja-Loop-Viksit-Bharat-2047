"use client"

import { Building2, Rocket, Landmark, Target } from "lucide-react"

export function SdgAndInvestorPanel() {
  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-2">
          <Landmark className="text-blue-400" size={24} />
          Government & Scale
        </h3>
        <p className="text-white/50 text-xs tracking-widest mt-1">SDG ALIGNMENT & INVESTOR SIMULATION</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Target className="text-blue-400" size={18} />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Aligned with</p>
            <p className="text-sm font-bold text-white">GOBARdhan Scheme</p>
          </div>
        </div>
        
        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Building2 className="text-indigo-400" size={18} />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Aligned with</p>
            <p className="text-sm font-bold text-white">SATAT Initiative</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col">
        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
          <Rocket className="text-primary" size={16} /> Investor Expansion Simulation
        </h4>
        
        <div className="space-y-4 flex-1">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/60">Projected Revenue (FY26)</span>
              <span className="text-primary font-bold">₹42.5 Cr</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary w-[75%] h-full" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/60">CAPEX Recovery</span>
              <span className="text-cyan-400 font-bold">3.2 Years</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 w-[60%] h-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/60">Carbon Market Opportunity</span>
              <span className="text-emerald-400 font-bold">$1.2M / yr</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 w-[85%] h-full" />
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all">
          Run 5-Year Scale Simulation
        </button>
      </div>
    </div>
  )
}
