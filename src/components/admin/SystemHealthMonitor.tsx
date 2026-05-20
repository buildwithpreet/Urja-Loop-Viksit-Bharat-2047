"use client"

import { Server, Activity, Database, Wifi } from "lucide-react"

export function SystemHealthMonitor() {
  const metrics = [
    { name: "Core API", status: "Operational", ping: "12ms", icon: Server, color: "emerald" },
    { name: "IoT Gateway", status: "High Load", ping: "45ms", icon: Wifi, color: "amber" },
    { name: "AI Engine", status: "Operational", ping: "8ms", icon: Activity, color: "emerald" },
    { name: "Database", status: "Operational", ping: "15ms", icon: Database, color: "emerald" },
  ]

  return (
    <div className="glass-panel border-white/5 p-6 h-full flex flex-col">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-white/90">
        <Server size={18} className="text-primary" />
        System Health
      </h3>

      <div className="space-y-4 flex-1">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-${m.color}-500/10 text-${m.color}-400`}>
                <m.icon size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/90">{m.name}</p>
                <p className={`text-[9px] font-bold uppercase tracking-widest text-${m.color}-500`}>{m.status}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 bg-black/50 px-2 py-1 rounded-lg">{m.ping}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
