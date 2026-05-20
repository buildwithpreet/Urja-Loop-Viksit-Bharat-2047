"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, LayoutDashboard, Globe, Zap, Settings, LogOut, Trees, Building } from "lucide-react"

// Import new BioGRID components
import { BioCngDashboard } from "@/components/biogrid/BioCngDashboard"
import { SmartDigester } from "@/components/biogrid/SmartDigester"
import { WasteToEnergyPipeline } from "@/components/biogrid/WasteToEnergyPipeline"
import { CarbonAndImpact } from "@/components/biogrid/CarbonAndImpact"
import { AIEngine } from "@/components/biogrid/AIEngine"
import { SdgAndInvestorPanel } from "@/components/biogrid/SdgAndInvestorPanel"

// Import existing modules that still apply to other tabs
import { LiveCityMap } from "@/components/admin/LiveCityMap"
import { SystemCoreModule } from "@/components/admin/SystemCoreModule"
import { ConfigurationModule } from "@/components/admin/ConfigurationModule"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"

import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useSocket } from "@/hooks/useSocket"

export default function SmartBioGridOperationsCenter() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [ecosystemMode, setEcosystemMode] = useState<'rural' | 'urban'>('rural')
  
  // Real-time socket hook
  const { isConnected, events: socketEvents } = useSocket('admin_room')

  const handleLogout = async () => {
    toast.success("Logged out successfully")
    try {
      localStorage.removeItem("urjaloop_auth_token")
      await supabase.auth.signOut().catch(() => {})
    } catch (e) {
      console.warn("Sign out cleanup warning:", e)
    }
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "BioGRID Control" },
    { id: "map", icon: Globe, label: "Live City Map" },
    { id: "system", icon: Zap, label: "System Core" },
    { id: "settings", icon: Settings, label: "Configuration" },
  ]

  return (
    <div className="min-h-screen bg-[#020504] text-white overflow-hidden flex font-sans selection:bg-primary/30">
      
      {/* ── MISSION CONTROL SIDEBAR ── */}
      <aside className="w-20 xl:w-72 border-r border-primary/10 bg-[#030806]/80 backdrop-blur-3xl flex flex-col items-center xl:items-start py-10 px-6 gap-10 z-50">
        <div className="flex items-center gap-4 w-full justify-center xl:justify-start">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            <Shield size={26} className="text-black" />
          </div>
          <div className="hidden xl:block">
            <h1 className="text-lg font-black uppercase tracking-tighter leading-none text-white">SMART-BioGRID</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Operations Center</p>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-4 mt-6">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 group relative
                ${activeTab === item.id ? "bg-primary/10 text-primary neon-glow-primary scale-105" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              <item.icon size={22} className={activeTab === item.id ? "" : "group-hover:scale-110 transition-transform"} />
              <span className="hidden xl:block text-sm font-bold uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-[-24px] w-1.5 h-10 bg-primary rounded-r-full shadow-[0_0_20px_rgba(16,185,129,0.9)]" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="w-full pt-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-5 p-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={22} />
            <span className="hidden xl:block text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN DASHBOARD GRID ── */}
      <main className="flex-1 h-screen overflow-y-auto p-6 xl:p-12 custom-scrollbar relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[2000px] mx-auto space-y-8 relative z-10 pb-20">
          
          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center gap-4">
                National BioGRID
                {/* RURAL / URBAN TOGGLE */}
                <div className="bg-black/50 border border-white/10 rounded-full p-1 flex items-center text-sm ml-4">
                  <button 
                    onClick={() => setEcosystemMode('rural')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${ecosystemMode === 'rural' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-white/40 hover:text-white'}`}
                  >
                    <Trees size={16} /> RURAL
                  </button>
                  <button 
                    onClick={() => setEcosystemMode('urban')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${ecosystemMode === 'urban' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-white/40 hover:text-white'}`}
                  >
                    <Building size={16} /> URBAN
                  </button>
                </div>
              </h2>
              <div className="flex items-center gap-3 mt-3">
                <div className={`w-2.5 h-2.5 ${isConnected ? 'bg-primary shadow-[0_0_12px_#10b981]' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'} rounded-full animate-pulse`} />
                <span className={`text-xs font-bold ${isConnected ? 'text-primary' : 'text-red-500'} uppercase tracking-widest`}>
                  {isConnected ? 'Telemetry Sync Active' : 'Waiting for telemetry...'}
                </span>
                <span className="text-xs text-white/30 ml-4 tracking-widest">
                  MODE: {ecosystemMode === 'rural' ? 'AGRI & DUNG WASTE' : 'HOTEL & MANDI WASTE'}
                </span>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <div className="glass-panel px-8 py-4 flex items-center gap-8 rounded-3xl">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Total Active Digesters</p>
                  <p className="text-2xl font-black text-white">482</p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Network Efficiency</p>
                  <p className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">98.4%</p>
                </div>
              </div>
              <ProfileSettingsMenu />
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* Top Row: Smart Digester & Waste Pipeline */}
                <div className="lg:col-span-7 min-h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                  <SmartDigester mode={ecosystemMode} />
                </div>
                <div className="lg:col-span-5 min-h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                  <WasteToEnergyPipeline />
                </div>

                {/* Middle Row: Bio-CNG Production & AI Engine */}
                <div className="lg:col-span-7 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <BioCngDashboard />
                </div>
                <div className="lg:col-span-5 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <AIEngine />
                </div>

                {/* Bottom Row: Carbon Impact & Investor Panel */}
                <div className="lg:col-span-6 min-h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                  <CarbonAndImpact />
                </div>
                <div className="lg:col-span-6 min-h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                  <SdgAndInvestorPanel />
                </div>
              </motion.div>
            )}

            {activeTab === "map" && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-[800px] rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
              >
                <LiveCityMap events={socketEvents} />
              </motion.div>
            )}

            {activeTab === "system" && (
              <motion.div 
                key="system"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <SystemCoreModule />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <ConfigurationModule />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
