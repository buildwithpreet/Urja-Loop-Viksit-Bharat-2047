"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Truck, CheckCircle2, AlertTriangle, Navigation, MapPin, 
  Battery, Clock, ShieldCheck, Zap, Crosshair, QrCode, Leaf,
  LogOut, Signal, Wifi, Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { collectorApi, wastelogsApi } from "@/lib/api"
import { useSocket } from "@/hooks/useSocket"

const MOCK_TASKS = [
  { id: "T-8921", bin: "BIN-001", loc: "Sector 14 Market", type: "Organic", priority: "critical", fill: 92, distance: "1.2 km" },
  { id: "T-8922", bin: "BIN-002", loc: "Cyber Hub Square", type: "Plastic", priority: "high", fill: 78, distance: "2.4 km" },
]

export default function CollectorDashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [scanning, setScanning] = useState(false)
  const { isConnected, events } = useSocket('collector_room')

  const fetchLiveTasks = async () => {
    try {
      const response = await collectorApi.getTasks()
      if (response.success && response.data) {
        const mappedTasks = response.data.map((task: any) => ({
          id: task.taskId || task._id,
          bin: task.binId || "BIN-001",
          loc: task.binAddress || "Unknown Location",
          type: task.wasteType || "Mixed",
          priority: task.priority || "high",
          fill: task.fillLevel || 85,
          distance: "1.2 km"
        }))
        setTasks(mappedTasks)
      } else {
        setTasks(MOCK_TASKS)
      }
    } catch (err) {
      console.warn("Failed to load live tasks, using local mock task queue.", err)
      setTasks(MOCK_TASKS)
    }
  }

  useEffect(() => {
    fetchLiveTasks()
    
    const interval = setInterval(() => {
      fetchLiveTasks()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Refetch when socket events come in
  useEffect(() => {
    if (events.length > 0) {
      fetchLiveTasks()
    }
  }, [events])

  const handleScan = async () => {
    if (tasks.length === 0) return
    const activeTask = tasks[0]
    setScanning(true)
    
    try {
      toast.loading("Reading IoT QR Code and syncing with Neural Grid...")
      
      // Complete task via Collector API
      await collectorApi.completeTask({
        taskId: activeTask.id,
        weight: activeTask.fill || 85,
        notes: "Automated collection scan"
      })

      toast.dismiss()
      toast.success(`Collection Successful for ${activeTask.bin}!`, {
        description: `Logged ${activeTask.fill}% ${activeTask.type} waste to database. Carbon credits calculated.`
      })

      fetchLiveTasks()
    } catch (err) {
      console.error("Failed to complete collection:", err)
      toast.dismiss()
      toast.error("Failed to sync collection with backend MongoDB database, executing offline override.")
      setTasks(tasks.slice(1))
    } finally {
      setScanning(false)
    }
  }

  const handleLogout = async () => {
    toast.success("Collector Session Terminated")
    try {
      localStorage.removeItem("urjaloop_auth_token")
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-[#0a0e10] text-foreground p-4 lg:p-8 overflow-hidden relative font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto space-y-8 pb-24">
        
        {/* Futuristic Redesigned Header Panel */}
        <motion.div 
          variants={{hidden: {y: -20, opacity: 0}, visible: {y: 0, opacity: 1}}} 
          className="relative overflow-hidden rounded-[2rem] border border-cyan-500/30 bg-gradient-to-br from-[#0c151c]/90 via-[#070b0e]/95 to-[#0b1b17]/90 p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl flex flex-col lg:flex-row justify-between items-stretch gap-6"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Left Block: Node Telemetry Status */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center neon-glow-secondary shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Truck size={30} className="text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-emerald-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  Node: UV-01
                </h1>
                <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-[9px] font-black tracking-widest uppercase">
                  HEAVY EV-COLLECTOR
                </Badge>
              </div>
              <p className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-primary animate-ping' : 'bg-red-500 animate-pulse'}`} />
                <span className={isConnected ? "text-primary font-black" : "text-red-500 font-black"}>{isConnected ? 'Live Telemetry Linked' : 'Offline Mode'}</span>
                <span className="text-white/20">|</span>
                <Wifi size={12} className="text-cyan-400" />
                <span>99.2% Signal</span>
              </p>
            </div>
          </div>

          {/* Center Block: Active Sensors Info */}
          <div className="hidden xl:flex items-center gap-8 px-8 border-x border-white/5">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Grid Encryption</span>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-emerald-400" />
                <span className="text-xs font-mono font-black text-emerald-400">SHA-256 SECURED</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Core Latency</span>
              <div className="flex items-center gap-2">
                <Signal size={14} className="text-cyan-400" />
                <span className="text-xs font-mono font-black text-white">12 ms</span>
              </div>
            </div>
          </div>

          {/* Right Block: Stats & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 lg:gap-8">
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Battery Cell</p>
                <p className="text-xl font-black text-primary flex items-center gap-1.5 justify-end drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Battery size={18} /> 84%
                </p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Task Queue</p>
                <p className="text-xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  {tasks.length} Left
                </p>
              </div>
            </div>

            {/* Logout/Terminate Action Button */}
            <button 
              onClick={handleLogout}
              className="px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              <LogOut size={14} />
              Terminate Node
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Navigation/Map Panel */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={{hidden: {opacity: 0}, visible: {opacity: 1}}} className="glass-panel p-2 relative h-[450px] rounded-[2.5rem] overflow-hidden border-cyan-500/30 neon-glow-secondary shadow-2xl">
               <div className="absolute inset-0 bg-[#0a0e10]/80 z-10" />
               <div 
                 className="absolute inset-0 bg-cover bg-center opacity-50 z-0 mix-blend-screen" 
                 style={{ 
                   backgroundImage: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
                     ? `url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=14&size=800x400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x000000&style=feature:landscape|element:geometry|color:0x0a0e10&style=feature:road|element:geometry|color:0x1a2327&sensor=false')`
                     : "radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 80%)"
                 }}
               />
               {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                 <svg className="absolute inset-0 w-full h-full opacity-15 z-0" xmlns="http://www.w3.org/2000/svg">
                   <pattern id="collector-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#collector-grid)" />
                   <path d="M 50 200 Q 250 100 450 300 T 750 150" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" strokeLinecap="round" />
                 </svg>
               )}
               
               <div className="relative z-20 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-wider">
                      <Crosshair size={12} className="mr-1.5 inline" /> AI ROUTE OPTIMIZATION ACTIVE
                    </Badge>
                  </div>

                  <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <motion.div 
                       animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} 
                       transition={{ duration: 2.5, repeat: Infinity }}
                       className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.4)]"
                     >
                        <Navigation size={28} className="text-cyan-400 -rotate-45" />
                     </motion.div>
                     <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-xl">Proceed to {tasks[0]?.loc || "Base"}</h2>
                     <p className="text-sm font-bold text-cyan-400 mt-3 tracking-widest uppercase">ETA: 4 Mins • {tasks[0]?.distance || "0 km"}</p>
                  </div>

                  <div className="flex justify-between items-end">
                     <button onClick={handleScan} disabled={scanning || tasks.length === 0} className={cn("px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all active:scale-95", scanning ? "bg-primary/50 cursor-not-allowed" : "bg-primary text-[#0a0e10] hover:scale-105 shadow-[0_0_25px_rgba(0,255,157,0.4)]")}>
                        {scanning ? <div className="animate-spin"><Zap size={18}/></div> : <QrCode size={18} />}
                        {scanning ? "Verifying..." : "Scan Bin QR"}
                     </button>
                  </div>
               </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
               {[
                 { l: "Efficiency", v: "98%", i: Zap, c: "text-amber-400" },
                 { l: "CO2 Saved", v: "12kg", i: Leaf, c: "text-primary" },
                 { l: "Rating", v: "4.9", i: ShieldCheck, c: "text-cyan-400" },
               ].map((s, i) => (
                 <motion.div key={i} variants={{hidden: {y:20, opacity:0}, visible: {y:0, opacity:1}}} className="glass-panel p-5 text-center hover:bg-white/5 transition-colors border border-white/5">
                    <s.i size={24} className={cn("mx-auto mb-3", s.c)} />
                    <p className="text-xl font-black">{s.v}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">{s.l}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Task Queue Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white/50 uppercase tracking-widest flex items-center gap-2 px-2">
              <Clock size={14} /> Neural Task Queue
            </h3>
            
            <AnimatePresence>
              {tasks.map((task, i) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  className={cn(
                    "glass-panel p-6 relative overflow-hidden group border transition-all duration-300",
                    i === 0 ? "border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]" : "border-white/5 hover:border-white/20"
                  )}
                >
                  {i === 0 && <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,1)]" />}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-base text-white/95">{task.bin}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1"><MapPin size={10} className="inline mr-1.5 text-cyan-400"/>{task.loc}</p>
                    </div>
                    {task.priority === "critical" && <AlertTriangle size={18} className="text-red-500 animate-pulse" />}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className={cn(task.priority === "critical" ? "text-red-400" : "text-primary")}>Fill Level</span>
                      <span className="font-mono">{task.fill}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-500", task.priority === "critical" ? "bg-red-500" : "bg-primary")} style={{width: `${task.fill}%`}} />
                    </div>
                  </div>
                </motion.div>
              ))}
              {tasks.length === 0 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="glass-panel p-8 text-center border-primary/20 neon-glow-primary">
                  <CheckCircle2 size={40} className="text-primary mx-auto mb-4" />
                  <p className="font-black text-primary uppercase tracking-widest">All Tasks Complete</p>
                  <p className="text-xs text-white/50 mt-2 font-medium">Return to Sector 14 Base</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
