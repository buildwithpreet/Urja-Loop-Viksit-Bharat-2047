"use client"

import { motion } from "framer-motion"
import { Truck, Battery, Gauge, Thermometer, ShieldCheck, Settings, AlertTriangle, Activity } from "lucide-react"

export default function VehicleStatusPage() {
  const stats = [
    { label: "Battery Level", value: "88%", icon: Battery, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Current Load", value: "2.4 / 5.0 T", icon: Gauge, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "System Temp", value: "42°C", icon: Thermometer, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Neural link", value: "Active", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
  ]

  const healthCheck = [
    { system: "Drive Train", status: "Optimal", health: 98 },
    { system: "Hydraulics", status: "Optimal", health: 94 },
    { system: "Waste Compactor", status: "Optimal", health: 91 },
    { system: "Sensor Array", status: "Degraded", health: 76, warning: "Dust on lens B4" },
  ]

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Vehicle Telemetry</h1>
          <p className="text-sm font-medium text-muted-foreground">Real-time diagnostics for Unit EV-402.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-muted border border-border rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-card transition-colors flex items-center gap-2">
            <Settings size={14} /> Config
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Run Full Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vehicle Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-[3rem] bg-card/40 border border-border overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Truck size={160} className="text-primary/20 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]" />
                </motion.div>
                {/* Scanner Line Effect */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-primary/50 shadow-[0_0_15px_var(--primary)] z-20"
                />
              </div>
            </div>
            
            {/* Overlay Info */}
            <div className="absolute top-8 left-8 space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Unit Designation</p>
              <h3 className="text-2xl font-black text-white italic tracking-tighter">EV-URJA-402</h3>
            </div>
            
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Plate Number</p>
                <p className="text-sm font-black text-white uppercase">DL 1C AA 0001</p>
              </div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-5 hover:bg-card/80 transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 border", stat.bg, stat.color.replace('text-', 'border-').replace('500', '500/20'))}>
                  <stat.icon size={20} />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-foreground tracking-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Health Column */}
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/50">System Health</h2>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">Secure</span>
            </div>

            <div className="space-y-6">
              {healthCheck.map((item) => (
                <div key={item.system} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-foreground mb-0.5">{item.system}</p>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", item.health > 80 ? "text-emerald-500" : "text-amber-500")}>
                        {item.status}
                      </p>
                    </div>
                    <p className="text-xs font-black text-muted-foreground">{item.health}%</p>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.health}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={cn("h-full rounded-full", item.health > 80 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]")} 
                    />
                  </div>
                  {item.warning && (
                    <div className="flex items-center gap-2 p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                      <AlertTriangle size={10} className="text-amber-500" />
                      <p className="text-[9px] font-bold text-amber-500/70 uppercase tracking-wider">{item.warning}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-muted border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-background transition-colors flex items-center justify-center gap-2 group">
              Full Maintenance Log <Activity size={12} className="group-hover:animate-pulse" />
            </button>
          </div>

          <div className="p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 space-y-3">
             <div className="flex items-center gap-2 text-rose-500">
                <AlertTriangle size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Urgent Notice</span>
             </div>
             <p className="text-xs font-medium text-rose-500/70 leading-relaxed">
               Next scheduled service in 340 km. Rear compactor pressure sensors require calibration.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
