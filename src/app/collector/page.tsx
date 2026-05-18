"use client"

import { motion } from "framer-motion"
import { Truck, CheckCircle2, AlertCircle, TrendingUp, MapPin, Navigation } from "lucide-react"
import { StatCard } from "@/components/collector/StatCard"
import { TaskCard, TaskStatus } from "@/components/collector/TaskCard"
import Link from "next/link"

const mockTasks = [
  {
    id: "t1",
    binId: "BIN-74A (Smart Overflow)",
    location: "Sector 14, Market Road",
    wasteType: ["Organic", "Plastic"],
    priority: "critical" as const,
    eta: "10 mins",
    status: "urgent" as TaskStatus
  },
  {
    id: "t2",
    binId: "BIN-12B (Regular Pickup)",
    location: "Green Park Extension",
    wasteType: ["Mixed"],
    priority: "medium" as const,
    eta: "25 mins",
    status: "in-progress" as TaskStatus
  },
  {
    id: "t3",
    binId: "BIN-89C (E-Waste Request)",
    location: "Tech Hub, Phase 2",
    wasteType: ["E-Waste"],
    priority: "high" as const,
    eta: "45 mins",
    status: "pending" as TaskStatus
  }
]

export default function CollectorDashboard() {
  return (
    <div className="space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Fleet Command</h1>
          <p className="text-sm font-medium text-muted-foreground">Real-time logistics &amp; active routes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Online</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Assigned Pickups" value="24" icon={Truck} color="blue" />
        <StatCard title="Completed Tasks" value="18" icon={CheckCircle2} color="emerald" trend="12% vs yesterday" trendUp={true} />
        <StatCard title="Pending / Urgent" value="6 / 1" icon={AlertCircle} color="rose" />
        <StatCard title="Efficiency Score" value="94%" icon={TrendingUp} color="cyan" trend="Top 5% of fleet" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Route Map Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-white/50">Active Route</h2>
            <Link href="/collector/routes" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
              View Full Map &rarr;
            </Link>
          </div>
          <div className="relative w-full h-[300px] rounded-[2rem] overflow-hidden border border-border group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[#0d0f12] opacity-80" />
            <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/dataviz-dark/256/0/0/0.png')] bg-cover bg-center opacity-30 mix-blend-screen" />
            
            {/* Mock Route Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 relative z-10">
                <Navigation className="w-12 h-12 mx-auto text-primary opacity-50" />
                <div>
                  <p className="text-lg font-black text-white uppercase tracking-wider drop-shadow-md">Route Optimization Active</p>
                  <p className="text-xs font-bold text-white/50 tracking-widest uppercase">Next stop in 2.4 km</p>
                </div>
                <Link 
                  href="/collector/routes"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <MapPin size={16} /> Open Navigator
                </Link>
              </div>
            </div>
            
            {/* Animated Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-white/50">Priority Queue</h2>
            <Link href="/collector/tasks" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
              View All &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            {mockTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
