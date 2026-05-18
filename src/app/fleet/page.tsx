"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Truck, MapPin, CheckCircle2, AlertTriangle, 
  Activity, Battery, Navigation2, Zap, Factory, 
  Radio, Globe, Server, ShieldAlert, Cpu, Leaf, BarChart3, Users,
  LogOut
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"

const DEFAULT_BINS = [
  { id: "BIN-001", location: "Sector 14 Market", fillLevel: 85, status: "critical", battery: 42, aiPredicted: "Overflow in 2 hrs" },
  { id: "BIN-002", location: "Cyber Hub Square", fillLevel: 45, status: "normal", battery: 89, aiPredicted: "Stable" },
  { id: "BIN-003", location: "Metro Station Exit", fillLevel: 92, status: "critical", battery: 15, aiPredicted: "Immediate Dispatch Required" },
  { id: "BIN-004", location: "Residential Block C", fillLevel: 20, status: "normal", battery: 95, aiPredicted: "Stable" },
]

const DEFAULT_FLEET = [
  { id: "UV-01", type: "Electric UrjaVan", driver: "Rajesh K.", status: "on_route", destination: "Sector 14 Market", eta: "12 mins" },
  { id: "UV-02", type: "Heavy EV Truck", driver: "Suresh S.", status: "charging", destination: "Okhla Hub", eta: "-" },
]

export default function SmartCityOperationsCenter() {
  const [bins, setBins] = useState(DEFAULT_BINS)
  const [fleet, setFleet] = useState(DEFAULT_FLEET)
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = async () => {
    toast.success("Operations Terminated. Returning to Landing Page...")
    try {
      localStorage.removeItem("urjaloop_demo_session")
      localStorage.removeItem("urjaloop_mode")
      await supabase.auth.signOut().catch(() => {})
    } catch (e) {
      console.warn("Sign out cleanup warning:", e)
    }
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  }

  const triggerOverflowAlert = () => {
    const updatedBins = bins.map(bin => {
      if (bin.id === "BIN-002") {
        return {
          ...bin,
          fillLevel: 98,
          status: "critical",
          aiPredicted: "Critical Overflow! Dispatch Fleet immediately."
        }
      }
      return bin
    })
    setBins(updatedBins)
    toast.error("CRITICAL: BIN-002 (Cyber Hub Square) is overflowing! Dispatch request sent to Fleet.", {
      description: "Sensor reading: 98% Capacity reached. Immediate response advised.",
      duration: 5000,
    })
  }

  const forceAIAnalysis = () => {
    toast.loading("Analyzing active grid clusters...")
    setTimeout(() => {
      const updatedBins = bins.map(bin => {
        if (bin.id === "BIN-004") {
          return {
            ...bin,
            aiPredicted: "Predicted overflow in 45 mins. Dynamic routing recommended."
          }
        }
        return bin
      })
      setBins(updatedBins)
      toast.dismiss()
      toast.success("AI Analysis Complete: Dynamic route suggestions updated in Overview.", {
        description: "Optimized route dispatch UV-01 to Cyber Hub Square and Sector 14.",
        duration: 4000
      })
    }, 1500)
  }

  // Simulate real-time data pulses
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  } as const

  return (
    <div className="min-h-screen bg-[#0a0e10] text-foreground p-4 lg:p-8 overflow-hidden relative selection:bg-primary/30 font-sans">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-6 max-w-[1600px] mx-auto pb-24"
      >
        {/* Top Navigation Bar */}
        <motion.div variants={itemVariants} className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center neon-glow-primary">
              <Globe className="text-primary animate-pulse-ring" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase neon-text-glow">UrjaOS Central Command</h1>
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live System Link Active
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex gap-2">
              {["overview", "map"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                    activeTab === tab 
                      ? "bg-primary text-[#0a0e10] shadow-[0_0_15px_rgba(0,255,157,0.4)]" 
                      : "bg-white/5 hover:bg-white/10 text-white/70"
                  )}
                >
                  {tab.replace("_", " ")}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            <button 
              onClick={handleLogout}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              <LogOut size={14} />
              Terminate Session
            </button>

            <ProfileSettingsMenu />
          </div>
        </motion.div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Left Column: Quick Stats & AI */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-panel p-6 neon-glow-secondary relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-cyan-500/20"><Cpu size={100} /></div>
                  <h3 className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={14} /> System Health
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white/70">Network Load</span>
                        <span className="text-cyan-400 font-mono">42%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyan-500" 
                          animate={{ width: pulse ? "45%" : "42%" }} 
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white/70">IoT Sensor Uptime</span>
                        <span className="text-primary font-mono">99.8%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[99.8%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 border-l-4 border-l-amber-500">
                  <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} /> Neural Insights
                  </h3>
                  <p className="text-sm font-medium text-white/80 mb-4 leading-relaxed">
                    AI detected a 40% surge in plastic waste generation at <span className="text-white font-bold">Sector 14 Market</span> over the last 3 hours. Re-routing UrjaVan-01.
                  </p>
                  <button className="w-full py-2 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-500/20 transition-colors">
                    View AI Report
                  </button>
                </div>
              </div>

              {/* Center Column: Live Bin Telemetry */}
              <div className="lg:col-span-2 glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
                    <Radio size={14} className={pulse ? "text-primary" : "text-white/30"} /> Live Telemetry Feed
                  </h3>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                    {bins.length} Active Nodes
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bins.map((bin, i) => (
                    <motion.div 
                      key={bin.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                        bin.fillLevel > 80 ? "bg-red-500/5 border-red-500/30 neon-glow-destructive" : "bg-white/[0.02] border-white/10 hover:border-primary/30"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <p className="font-bold text-lg leading-none mb-1">{bin.id}</p>
                          <p className="text-[10px] text-white/50 font-medium uppercase tracking-widest"><MapPin size={10} className="inline mr-1"/>{bin.location}</p>
                        </div>
                        <div className={cn("text-2xl font-black font-mono", bin.fillLevel > 80 ? "text-red-500" : "text-primary")}>
                          {bin.fillLevel}%
                        </div>
                      </div>

                      <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden mb-4 relative z-10">
                        <motion.div 
                          className={cn("h-full rounded-full", bin.fillLevel > 80 ? "bg-red-500" : "bg-primary")}
                          initial={{ width: 0 }}
                          animate={{ width: `${bin.fillLevel}%` }}
                          transition={{ duration: 1.5, type: "spring" }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40 relative z-10">
                        <span className="flex items-center gap-1"><Battery size={12} className={bin.battery < 20 ? "text-red-500" : "text-primary"}/> {bin.battery}%</span>
                        <span className="text-right">{bin.aiPredicted}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Fleet & Actions */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="text-xs font-black text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Truck size={14} /> Active Fleet
                  </h3>
                  <div className="space-y-3">
                    {fleet.map(v => (
                      <div key={v.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <Truck size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{v.id} - {v.driver}</p>
                          <p className="text-[10px] text-white/50 truncate mt-0.5">Dest: {v.destination}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 border border-primary/20 neon-glow-primary">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldAlert size={14} /> Hackathon Controls
                  </h3>
                  <div className="space-y-2">
                    <button 
                      onClick={triggerOverflowAlert}
                      className="w-full py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      Trigger Overflow Alert
                    </button>
                    <button 
                      onClick={forceAIAnalysis}
                      className="w-full py-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold uppercase hover:bg-cyan-500 hover:text-[#0a0e10] transition-all active:scale-95"
                    >
                      Force AI Analysis
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "map" && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[600px] glass-panel rounded-3xl flex items-center justify-center border-primary/30 neon-glow-primary relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=12&size=1600x800&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x000000&style=feature:landscape|element:geometry|color:0x0a0e10&style=feature:road|element:geometry|color:0x1a2327&style=feature:poi|visibility:off&sensor=false')] bg-cover bg-center opacity-40 mix-blend-screen" />
              
              {/* Fake Map Markers */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(0,255,157,1)]" 
              />
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)]" 
              />

              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 flex justify-between items-center bg-[#0a0e10]/80">
                <p className="text-sm font-bold font-mono text-primary">MAP_DATA_STREAM_CONNECTED_OK</p>
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Normal Bins</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical Overflow</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> Fleet Active</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  )
}
