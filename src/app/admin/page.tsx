"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, LayoutDashboard, Globe, Zap, BarChart3, Settings, LogOut } from "lucide-react"

// Import the newly created modular components
import { LiveCityMap } from "@/components/admin/LiveCityMap"
import { AIInsightsPanel } from "@/components/admin/AIInsightsPanel"
import { LiveAlertCenter } from "@/components/admin/LiveAlertCenter"
import { SmartAnalytics } from "@/components/admin/SmartAnalytics"
import { SystemHealthMonitor } from "@/components/admin/SystemHealthMonitor"
import { DemoSimulationControls } from "@/components/admin/DemoSimulationControls"
import { SystemCoreModule } from "@/components/admin/SystemCoreModule"
import { ConfigurationModule } from "@/components/admin/ConfigurationModule"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { alertsApi } from "@/lib/api"

export default function SmartCityAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = async () => {
    toast.success("Logged out successfully")
    try {
      localStorage.removeItem("urjaloop_demo_session")
      localStorage.removeItem("urjaloop_mode")
      await supabase.auth.signOut().catch(() => {})
    } catch (e) {
      console.warn("Sign out cleanup warning:", e)
    }
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }
  const [alerts, setAlerts] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])

  const fetchActiveAlerts = async () => {
    try {
      const data = await alertsApi.getAll()
      // Map API alerts format to the frontend view format
      const formattedAlerts = data.map((alert: any) => ({
        id: alert._id || alert.id,
        type: alert.type,
        location: alert.location,
        severity: alert.severity,
        time: alert.time || (alert.createdAt ? new Date(alert.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }))
      }))
      setAlerts(formattedAlerts)
    } catch (err) {
      console.warn("Failed to fetch alerts from backend database, continuing in fallback mode.", err)
    }
  }

  // Active database polling for Hackathon presentation
  useEffect(() => {
    fetchActiveAlerts()
    
    const interval = setInterval(() => {
      fetchActiveAlerts()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Handle Demo Control Triggers via Backend API
  const handleSimulationTrigger = async (type: string) => {
    try {
      if (type === "overflow") {
        await alertsApi.create({
          type: "Bin Overflow Predicted",
          location: `Sector ${Math.floor(Math.random() * 20) + 1}, Zone ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
          severity: "Critical",
          status: "Active"
        })
        toast.success("Critical Overflow Simulation logged in database!")
        fetchActiveAlerts()
      } else if (type === "ai_analysis") {
        await alertsApi.create({
          type: "AI Scan Completed",
          location: "Global Neural Net",
          severity: "Low",
          status: "Active"
        })
        toast.success("AI Log entry posted to backend!")
        fetchActiveAlerts()
      } else if (type === "assign_collector") {
        await alertsApi.create({
          type: "Fleet Dispatched",
          location: "Route Alpha",
          severity: "Medium",
          status: "Active"
        })
        toast.success("Fleet route alert generated in DB!")
        fetchActiveAlerts()
      } else if (type === "reset") {
        toast.info("Flushing simulation data...")
        setAlerts([])
      }
    } catch (err) {
      console.error("Simulation trigger failed:", err)
      toast.error("Failed to post simulation alert to backend MongoDB database.")
    }
  }

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Command Center" },
    { id: "map", icon: Globe, label: "Live City Map" },
    { id: "analytics", icon: BarChart3, label: "Analytics Hub" },
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
            <h1 className="text-lg font-black uppercase tracking-tighter leading-none text-white">UrjaLoop</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Mission Control</p>
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
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-lg">Smart City Operations</h2>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#10b981]" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Live Sync Active</span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="glass-panel px-8 py-4 flex items-center gap-8 rounded-3xl">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Total Active Nodes</p>
                  <p className="text-2xl font-black text-white">2,482</p>
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Main Map Area (Spans 8 columns on large screens) */}
                <div className="lg:col-span-8 min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <LiveCityMap events={events} />
                </div>

                {/* AI Insights & Controls (Spans 4 columns) */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <div className="flex-1 min-h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                    <AIInsightsPanel />
                  </div>
                  <div className="min-h-[220px] rounded-3xl overflow-hidden shadow-2xl">
                    <DemoSimulationControls onTrigger={handleSimulationTrigger} />
                  </div>
                </div>

                {/* Bottom Row: Analytics, Alerts, Health */}
                <div className="lg:col-span-5 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <SmartAnalytics />
                </div>

                <div className="lg:col-span-4 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <LiveAlertCenter alerts={alerts} />
                </div>

                <div className="lg:col-span-3 min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <SystemHealthMonitor />
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
                <LiveCityMap events={events} />
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div 
                key="analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-[800px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <SmartAnalytics />
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

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.3); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.6); }
      `}</style>
    </div>
  )
}
