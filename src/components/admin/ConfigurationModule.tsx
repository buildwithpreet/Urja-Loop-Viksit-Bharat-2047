"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Shield, Bell, HelpCircle, ToggleLeft, ToggleRight, Radio, Volume2 } from "lucide-react"

export function ConfigurationModule() {
  const [configs, setConfigs] = useState({
    autoDispatch: true,
    aiVerify: false,
    alertSms: true,
    soundFx: true,
    carbonCreditMultiplier: "1.5x",
    maxFillThreshold: 80,
  })

  const toggleConfig = (key: "autoDispatch" | "aiVerify" | "alertSms" | "soundFx") => {
    setConfigs(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="glass-panel border-white/10 p-8 h-full bg-[#040605] space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <Settings size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest text-white">Platform Settings & Toggles</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Configure Smart City Orchestration Thresholds</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: General Orchestration toggles */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-500/20 pb-2 flex items-center gap-2">
            <Radio size={14} /> Automation Engine
          </h4>
          
          <div className="space-y-4">
            {[
              { key: "autoDispatch", label: "Auto-Dispatch Drivers", desc: "Instantly deploy vehicle routes when a smart bin breaches the fill threshold." },
              { key: "aiVerify", label: "AI Classification Check", desc: "Double-check citizen deposits via cloud visual model before awarding credits." },
              { key: "alertSms", label: "SMS Incident Alerts", desc: "Ping area municipal supervisors on high-priority sensor or overflow alerts." },
              { key: "soundFx", label: "Mission Sound Effects", desc: "Enable audio telemetry alerts on terminal console simulation triggers." },
            ].map((cfg) => {
              const active = configs[cfg.key as keyof typeof configs]
              return (
                <div key={cfg.key} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                  <div className="max-w-[80%]">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{cfg.label}</p>
                    <p className="text-[10px] text-white/40 mt-1 leading-normal">{cfg.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleConfig(cfg.key as any)}
                    className={`transition-colors duration-300 p-2 rounded-xl border
                      ${active 
                        ? "text-primary border-primary/30 bg-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                        : "text-white/20 border-white/10 bg-white/5"}`}
                  >
                    {active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Operational Metrics & Threshold Controls */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-2 flex items-center gap-2">
            <Shield size={14} /> Safety & Incentives
          </h4>

          <div className="space-y-6">
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Max Fill Threshold</span>
                <span className="text-sm font-mono font-black text-primary">{configs.maxFillThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="95" 
                value={configs.maxFillThreshold}
                onChange={(e) => setConfigs(prev => ({ ...prev, maxFillThreshold: Number(e.target.value) }))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-[9px] text-white/30 uppercase tracking-widest mt-2">Trigger critical incident notification when nodes hit this level</p>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">Carbon Credit Multiplier</span>
              <p className="text-[10px] text-white/40 mb-4">Bonus scaling for circular economy recycling ratio boosts</p>
              <div className="flex gap-2">
                {["1.0x", "1.5x", "2.0x", "3.0x"].map(mult => (
                  <button 
                    key={mult}
                    onClick={() => setConfigs(prev => ({ ...prev, carbonCreditMultiplier: mult }))}
                    className={`flex-1 py-2 text-xs font-black rounded-xl border transition-all
                      ${configs.carbonCreditMultiplier === mult 
                        ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                        : "bg-white/5 text-white/50 border-white/10 hover:text-white"}`}
                  >
                    {mult}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-[#080d09] border border-primary/20 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Volume2 className="text-primary animate-bounce" size={20} />
                <div>
                  <p className="text-[10px] font-black uppercase text-white tracking-widest">Active Sound Protocol</p>
                  <p className="text-[9px] text-primary/70 font-bold uppercase tracking-wider mt-0.5">Tactile Audio Feedback Active</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
