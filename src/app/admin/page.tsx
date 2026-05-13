"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Shield, Activity, Users, Recycle, AlertTriangle, Truck,
  CheckCircle2, Clock, MapPin, ShoppingCart, ScanLine,
  User, ChevronRight, Zap, RefreshCw, LogOut, Bell,
  TrendingUp, Leaf, Eye, Radio
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { DEMO_EVENTS, DEMO_COMPLAINTS, DEMO_BINS, DEMO_VEHICLES } from "./demo-data"

interface LiveEvent {
  id: number
  action: string
  user: string
  location: string
  credits: number
  icon: string
  color: string
  time: string
}

const iconMap: Record<string, any> = {
  scan: ScanLine, alert: AlertTriangle, bin: Recycle,
  cart: ShoppingCart, user: User, truck: Truck, check: CheckCircle2,
}
const colorMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}
const severityColor: Record<string, string> = {
  High: "bg-red-500/10 text-red-400", Medium: "bg-amber-500/10 text-amber-400", Low: "bg-emerald-500/10 text-emerald-400",
}
const statusColor: Record<string, string> = {
  Submitted: "text-amber-400", "Under Review": "text-blue-400", Assigned: "text-purple-400",
  "In Progress": "text-sky-400", Resolved: "text-emerald-400",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([])
  const [eventCounter, setEventCounter] = useState(0)
  const [kpis, setKpis] = useState({ citizens: 1247, bins: 24, complaints: 8, co2: 4820 })
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS)
  const [bins, setBins] = useState(DEMO_BINS)
  const [vehicles, setVehicles] = useState(DEMO_VEHICLES)
  const [isLive, setIsLive] = useState(true)
  const [selectedTab, setSelectedTab] = useState<"feed" | "complaints" | "bins" | "fleet">("feed")

  // Simulate real-time events
  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      const event = DEMO_EVENTS[Math.floor(Math.random() * DEMO_EVENTS.length)]
      const now = new Date()
      const newEvent: LiveEvent = {
        ...event,
        id: Date.now(),
        time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      }
      setLiveEvents(prev => [newEvent, ...prev].slice(0, 50))
      setEventCounter(prev => prev + 1)

      // Randomly update KPIs
      setKpis(prev => ({
        citizens: prev.citizens + (event.icon === "user" ? 1 : 0),
        bins: prev.bins,
        complaints: prev.complaints + (event.icon === "alert" ? 1 : event.icon === "check" ? -1 : 0),
        co2: prev.co2 + Math.floor(Math.random() * 5),
      }))

      // Randomly update bin fills
      setBins(prev => prev.map(b => ({
        ...b,
        fill: Math.max(0, Math.min(100, b.fill + Math.floor(Math.random() * 7) - 2)),
      })))
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [isLive])

  // Try real Supabase subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activity_log" }, (payload) => {
        const d = payload.new as any
        setLiveEvents(prev => [{
          id: Date.now(), action: d.action || "Activity", user: "Citizen",
          location: d.description || "", credits: d.points_earned || 0,
          icon: "scan", color: "emerald",
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        }, ...prev].slice(0, 50))
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "complaints" }, (payload) => {
        if (payload.eventType === "INSERT") {
          const c = payload.new as any
          setComplaints(prev => [{ id: c.id, type: c.type, location: c.location_name, severity: c.severity, status: c.status, time: "Just now" }, ...prev].slice(0, 20))
        }
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "smart_bins" }, (payload) => {
        const b = payload.new as any
        setBins(prev => prev.map(bin => bin.id === b.id ? { ...bin, fill: b.fill_level, status: b.status } : bin))
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const EventIcon = ({ type }: { type: string }) => {
    const Icon = iconMap[type] || Activity
    return <Icon size={16} />
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white" style={{ fontFamily: "'Inter Tight',system-ui,sans-serif" }}>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-[#0a0c10]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-black" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider">UrjaLoop Admin</h1>
              <p className="text-[10px] text-white/30 font-medium">Command Center · Viksit Bharat 2047</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
              <span className="text-[10px] text-emerald-400/60 font-mono">{eventCounter}</span>
            </div>
            <button onClick={() => setIsLive(!isLive)}
              className={cn("w-9 h-9 rounded-xl flex items-center justify-center border transition-all",
                isLive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-white/30"
              )}>
              <Radio size={16} />
            </button>
            <button onClick={() => router.push("/dashboard")}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">

        {/* ===== KPI CARDS ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total Citizens", value: kpis.citizens.toLocaleString(), icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+12 today" },
            { label: "Active Smart Bins", value: kpis.bins.toString(), icon: Recycle, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: `${bins.filter(b => b.fill > 80).length} critical` },
            { label: "Open Complaints", value: kpis.complaints.toString(), icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", trend: "3 urgent" },
            { label: "CO₂ Prevented", value: `${(kpis.co2 / 1000).toFixed(1)}T`, icon: Leaf, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "+48kg today" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", kpi.bg, kpi.color)}>
                  <kpi.icon size={20} />
                </div>
                <TrendingUp size={14} className="text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-2xl font-black tracking-tight">{kpi.value}</p>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{kpi.label}</p>
              <p className="text-[10px] text-emerald-400/60 mt-1">{kpi.trend}</p>
            </div>
          ))}
        </div>

        {/* ===== TAB SWITCHER ===== */}
        <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-2xl">
          {[
            { id: "feed" as const, label: "Live Feed", icon: Activity },
            { id: "complaints" as const, label: "Complaints", icon: AlertTriangle },
            { id: "bins" as const, label: "Smart Bins", icon: Recycle },
            { id: "fleet" as const, label: "Fleet", icon: Truck },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setSelectedTab(tab.id)}
              className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                selectedTab === tab.id ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "text-white/30 hover:text-white/60"
              )}>
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ===== LIVE ACTIVITY FEED ===== */}
        {selectedTab === "feed" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Real-Time Activity Stream</p>
              <p className="text-[10px] text-white/20 font-mono">{liveEvents.length} events</p>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {liveEvents.length === 0 ? (
                <div className="py-20 text-center">
                  <Activity size={32} className="text-white/10 mx-auto mb-3" />
                  <p className="text-sm text-white/20">Waiting for activity...</p>
                  <p className="text-xs text-white/10 mt-1">Events will appear here in real-time</p>
                </div>
              ) : liveEvents.map((event, i) => (
                <div key={event.id}
                  className={cn("flex items-center gap-4 p-3.5 rounded-2xl border transition-all",
                    i === 0 ? "bg-white/[0.05] border-white/10 animate-in slide-in-from-right-5 duration-500" : "bg-white/[0.02] border-white/5"
                  )}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0", colorMap[event.color])}>
                    <EventIcon type={event.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white/90 truncate">{event.action}</p>
                    <p className="text-[11px] text-white/30 truncate">{event.user} · {event.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {event.credits !== 0 && (
                      <p className={cn("text-xs font-bold", event.credits > 0 ? "text-emerald-400" : "text-amber-400")}>
                        {event.credits > 0 ? "+" : ""}{event.credits}
                      </p>
                    )}
                    <p className="text-[10px] text-white/20 font-mono">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== COMPLAINTS TABLE ===== */}
        {selectedTab === "complaints" && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-1">Complaint Management</p>
            <div className="space-y-2">
              {complaints.map((c) => (
                <div key={c.id} className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", severityColor[c.severity])}>
                    <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-white/20 font-mono">{c.id}</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", severityColor[c.severity])}>{c.severity}</span>
                    </div>
                    <p className="text-sm font-bold text-white/90">{c.type}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin size={10} className="text-white/20" />
                      <p className="text-[11px] text-white/30">{c.location}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={cn("text-xs font-bold", statusColor[c.status])}>{c.status}</p>
                    <p className="text-[10px] text-white/20 mt-0.5">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SMART BINS GRID ===== */}
        {selectedTab === "bins" && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-1">Infrastructure Health</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bins.map((bin) => {
                const fillColor = bin.fill > 80 ? "bg-red-500" : bin.fill > 50 ? "bg-amber-500" : "bg-emerald-500"
                const fillText = bin.fill > 80 ? "text-red-400" : bin.fill > 50 ? "text-amber-400" : "text-emerald-400"
                const fillBorder = bin.fill > 80 ? "border-red-500/30" : bin.fill > 50 ? "border-amber-500/20" : "border-white/5"
                return (
                  <div key={bin.id} className={cn("p-4 bg-white/[0.03] border rounded-2xl transition-all hover:bg-white/[0.05]", fillBorder)}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-white/90">{bin.name}</p>
                        <p className="text-[11px] text-white/30">{bin.location}</p>
                      </div>
                      <div className={cn("text-xl font-black", fillText)}>{bin.fill}%</div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", fillColor)} style={{ width: `${bin.fill}%` }} />
                    </div>
                    {bin.fill > 80 && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <AlertTriangle size={12} className="text-red-400" />
                        <span className="text-[10px] text-red-400 font-bold">Pickup Required</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ===== FLEET MONITOR ===== */}
        {selectedTab === "fleet" && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-1">Fleet Status</p>
            <div className="space-y-2">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    v.status === "on_route" ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-white/30"
                  )}>
                    <Truck size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white/90">{v.plate}</p>
                    <p className="text-[11px] text-white/30">{v.type} · {v.driver}</p>
                  </div>
                  <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    v.status === "on_route" ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-white/30"
                  )}>
                    {v.status === "on_route" && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />}
                    {v.status === "on_route" ? "En Route" : "Idle"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
