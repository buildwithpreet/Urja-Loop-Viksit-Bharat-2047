"use client"

import { useState } from "react"
import { TaskCard, TaskStatus } from "@/components/collector/TaskCard"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"

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
  },
  {
    id: "t4",
    binId: "BIN-21D (Glass Collection)",
    location: "Industrial Area, Block B",
    wasteType: ["Glass"],
    priority: "low" as const,
    eta: "1 hr 15 mins",
    status: "pending" as TaskStatus
  },
  {
    id: "t5",
    binId: "BIN-05E (Completed Pickup)",
    location: "Residential Zone 4",
    wasteType: ["Organic"],
    priority: "low" as const,
    eta: "Completed",
    status: "completed" as TaskStatus
  }
]

export default function CollectorTasks() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const filteredTasks = mockTasks.filter(task => {
    if (filter === "all") return true
    if (filter === "completed") return task.status === "completed"
    return task.status !== "completed"
  })

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Pickup Tasks</h1>
          <p className="text-sm font-medium text-muted-foreground">Manage your daily collection queue.</p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border border-border w-full max-w-[280px]">
          <button 
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("pending")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === "pending" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter("completed")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === "completed" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Showing {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
        </p>
        <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
          <Filter size={14} /> Filter & Sort
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task, index) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
