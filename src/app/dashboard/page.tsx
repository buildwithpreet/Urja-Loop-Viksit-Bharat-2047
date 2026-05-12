"use client"

import { 
  AlertTriangle, Clock, MapPin, CheckCircle2, Bell,
  Zap, ShieldCheck, Wind,
  Droplets, Users, Recycle,
  ChevronRight, Leaf, ScanLine,
  Activity, Sparkles, Map as MapIcon,
  Award, Truck, ShoppingCart
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const communityMetrics = [
  { label: "Complaints Resolved", value: "14", sub: "This week in Sector 14", color: "text-primary", icon: CheckCircle2 },
  { label: "Waste Recycled", value: "842kg", sub: "Nearby this month", color: "text-blue-500", icon: Recycle },
  { label: "Participation", value: "68%", sub: "Active households", color: "text-purple-500", icon: Users },
  { label: "Loop Stations", value: "4", sub: "Active nearby", color: "text-amber-500", icon: MapIcon },
]

const communityActivity = [
  { id: 1, item: "Area Cleanup Completed", location: "Sector 14 Central Park", time: "Morning", date: "Today", icon: Sparkles, status: "success", type: "Cleanup", description: "The community park is now trash-free. Great job everyone!" },
  { id: 2, item: "Dumping Area Resolved", location: "Market Area Lane 4", time: "2h ago", date: "Today", icon: CheckCircle2, status: "success", type: "Resolved", description: "Reported waste has been successfully cleared by the municipal team." },
  { id: 3, item: "New Loop Station Active", location: "Metro Station Exit 2", time: "Yesterday", date: "9 May", icon: Zap, status: "info", type: "Update", description: "A new smart bin is now available for dry waste collection." },
]

const impactOutcomes = [
  { label: "Landfill Avoided", value: "18.4", unit: "kg", color: "var(--primary)", pct: 82, sub: "Direct contribution" },
  { label: "Energy Generated", value: "2.1", unit: "kWh", color: "var(--color-amber-500)", pct: 65, sub: "From organic waste" },
  { label: "CO₂ Offset", value: "4.2", unit: "kg", color: "var(--color-blue-500)", pct: 48, sub: "Community impact" },
]

const INITIAL_BINS = [
  { id: 1, location: "Main Gate, Sector 14", fill: 18, status: "low", lastCleaned: "2h ago", next: "6:00 AM" },
  { id: 2, location: "Park Entrance", fill: 67, status: "medium", lastCleaned: "5h ago", next: "4:00 PM" },
  { id: 3, location: "Market Complex", fill: 91, status: "high", lastCleaned: "12h ago", next: "ASAP" },
]

export default function DashboardPage() {
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState("")
  const [greeting, setGreeting] = useState("")
  const [bins, setBins] = useState(INITIAL_BINS)
  const [profile, setProfile] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const now = new Date()
      const hour = now.getHours()
      if (hour < 12) setGreeting("Good Morning")
      else if (hour < 17) setGreeting("Good Afternoon")
      else setGreeting("Good Evening")
      setCurrentTime(now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }))
    }, 0)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="p-4 pb-36 md:p-8 space-y-10 animate-in fade-in duration-700 min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* ── HEADER ── */}
      <div className="flex items-start justify-between pt-2">
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">{currentTime}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {greeting}, <span className="text-primary">{profile?.full_name || "Alex"}</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">{profile?.location || "Sector 14 · New Delhi"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all relative">
            <Bell size={16} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* ── COMMUNITY STATUS HERO ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Community Status Card */}
        <div className="lg:col-span-2 rounded-[2rem] border border-border bg-gradient-to-br from-card to-background p-8 relative overflow-hidden transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Community Status</span>
                </div>
                <h2 className="text-3xl font-medium tracking-tight leading-tight">
                  {profile?.location?.split('·')[0] || "Sector 14"} is <span className="text-primary">thriving.</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Cleanliness improved by <span className="text-foreground font-semibold">12%</span> this month. Your contributions are making a visible difference.
                </p>
              </div>
              
              {/* Score Circle */}
              <div className="flex items-center gap-4 bg-muted/30 border border-border p-4 rounded-3xl">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 28 * 92 / 100} ${2 * Math.PI * 28}`}
                      strokeLinecap="round" className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">92</span>
                  </div>
                </div>
                <div>
                   <p className="text-xs text-muted-foreground font-medium">Cleanliness Score</p>
                   <p className="text-sm font-semibold">Top 22% in Delhi</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Pickups Done", value: "100%", icon: Truck, color: "text-blue-500" },
                { label: "Community", value: "Active", icon: Users, color: "text-primary" },
                { label: "Stations", value: "4 Nearby", icon: MapIcon, color: "text-amber-500" },
                { label: "Next Visit", value: "Tomorrow", icon: Clock, color: "text-purple-500" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 bg-muted/20 rounded-2xl border border-border hover:bg-muted/40 transition-all group">
                  <stat.icon size={16} className={cn("mb-3 transition-transform group-hover:scale-110", stat.color)} />
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm font-semibold mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action / Quick Info column */}
        <div className="flex flex-col gap-6">
          {/* Rewards Card */}
          <div className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/5 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-primary" fill="currentColor" />
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Urja Rewards</span>
              </div>
              <h3 className="text-3xl font-semibold">{profile?.eco_credits?.toLocaleString() || "1,240"}</h3>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Earned through conscious disposal</p>
            </div>
            <Link href="/shop" className="relative z-10 mt-6">
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all active:scale-95 shadow-xl">
                Redeem for Eco-Products
              </button>
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 bg-card border border-border rounded-[1.5rem] flex flex-col justify-center">
                <Wind size={16} className="text-blue-500 mb-3" />
                <p className="text-lg font-semibold">32°C</p>
                <p className="text-[10px] text-muted-foreground font-medium">Fresh Air Quality</p>
             </div>
             <div className="p-5 bg-card border border-border rounded-[1.5rem] flex flex-col justify-center">
                <Droplets size={16} className="text-blue-500 mb-3" />
                <p className="text-lg font-semibold">52%</p>
                <p className="text-[10px] text-muted-foreground font-medium">Humidity Level</p>
             </div>
          </div>
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Scan & Dispose", icon: ScanLine, onClick: () => window.dispatchEvent(new CustomEvent("open-scan-modal")), color: "text-primary", bg: "bg-primary/10 border-primary/10" },
            { label: "Report Issue", icon: AlertTriangle, href: "/complaints", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/10" },
            { label: "Find Stations", icon: MapIcon, href: "/map", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/10" },
            { label: "Ask Urja AI", icon: Leaf, href: "/bot", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/10" },
          ].map((action) => {
            const innerContent = (
              <div className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-all hover:bg-muted/50", action.bg)}>
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", action.bg)}>
                  <action.icon size={20} className={action.color} />
                </div>
                <span className="text-[13px] font-semibold leading-tight">{action.label}</span>
              </div>
            )

            if (action.onClick) {
              return (
                <button key={action.label} onClick={action.onClick} className="group text-left">
                  {innerContent}
                </button>
              )
            }

            return (
              <Link key={action.label} href={action.href!} className="group">
                {innerContent}
              </Link>
            )
          })}
      </div>

      {/* ── COMMUNITY TRANSPARENCY ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary" />
            <h2 className="text-xl font-medium tracking-tight">Community Transparency</h2>
          </div>
          <Link href="/map" className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Open Map <ChevronRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {communityMetrics.map((item) => (
            <div key={item.label} className="p-6 bg-card border border-border rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <item.icon size={64} />
              </div>
              <p className={cn("text-3xl font-semibold mb-1", item.color)}>{item.value}</p>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Clean Mini Map Mockup */}
        <div className="w-full h-48 rounded-[2rem] bg-card border border-border relative overflow-hidden">
           {/* Mock Map Background */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at 50% 50%, var(--primary) 1px, transparent 0)`,
             backgroundSize: '24px 24px'
           }} />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                 {/* Map Indicators */}
                 <div className="absolute -top-10 -left-20 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] animate-pulse" />
                    <span className="text-[9px] font-bold text-white mt-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-tighter">Loop Station 01</span>
                 </div>
                 <div className="absolute top-5 left-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3B82F6] animate-pulse" />
                    <span className="text-[9px] font-bold text-white mt-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-tighter">Collection Hub</span>
                 </div>
                 <div className="absolute -bottom-5 -right-16 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] animate-pulse" />
                    <span className="text-[9px] font-bold text-white mt-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-tighter">Cleanup Zone</span>
                 </div>
              </div>
           </div>
           <div className="absolute bottom-4 left-6 bg-background/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl">
              <p className="text-[10px] font-semibold uppercase tracking-widest">Sector 14 Civic Network</p>
           </div>
        </div>
      </div>

      {/* ── ENVIRONMENTAL IMPACT ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="text-primary" />
          <h2 className="text-xl font-medium tracking-tight">Environmental Impact</h2>
        </div>
        <div className="rounded-[2.5rem] border border-border bg-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                label: "Landfill Avoided", 
                value: profile?.waste_processed || "18.4", 
                unit: "kg", 
                color: "var(--primary)", 
                pct: Math.min(Math.round((profile?.waste_processed || 18.4) / 50 * 100), 100), 
                sub: "Direct contribution" 
              },
              { 
                label: "Energy Generated", 
                value: ((profile?.waste_processed || 18.4) * 0.12).toFixed(1), 
                unit: "kWh", 
                color: "#f59e0b", 
                pct: 65, 
                sub: "From organic waste" 
              },
              { 
                label: "CO₂ Offset", 
                value: profile?.co2_saved || "4.2", 
                unit: "kg", 
                color: "#3b82f6", 
                pct: 48, 
                sub: "Community impact" 
              },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center group">
                {/* Elegant Ring */}
                <div className="relative w-24 h-24 mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/20" />
                    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 30 * stat.pct / 100} ${2 * Math.PI * 30}`}
                      strokeLinecap="round" className="transition-all duration-1000 group-hover:strokeWidth-6" style={{ color: stat.color }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold leading-none">{stat.pct}%</span>
                    <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-tighter">Impact</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold">{stat.value}<span className="text-xs text-muted-foreground ml-0.5">{stat.unit}</span></p>
                  <p className="text-sm font-semibold">{stat.label}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIVE COMMUNITY ACTIVITY ── */}
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <h2 className="text-xl font-medium tracking-tight">Live Community Activity</h2>
        </div>
        <div className="space-y-0 max-w-2xl">
          {(activities.length > 0 ? activities : communityActivity).map((act, i, arr) => (
            <div key={act.id} className="relative pl-10 group">
              {/* Timeline line */}
              {i < arr.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border group-hover:bg-primary/10 transition-colors" />
              )}
              {/* Icon Dot */}
              <div className={cn(
                "absolute left-0 top-1 w-6 h-6 rounded-lg flex items-center justify-center z-10 transition-all group-hover:scale-110",
                act.status === "success" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"
              )}>
                <act.icon size={14} />
              </div>
              <div className="mb-8">
                <div className="p-6 bg-card border border-border rounded-[2rem] hover:border-primary/10 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[15px] font-semibold">{act.item}</p>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{act.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <MapPin size={10} className="text-primary" />
                    {act.location}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;{act.description}&quot;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
