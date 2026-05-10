"use client"

import { 
  AlertTriangle, Clock, MapPin, CheckCircle2, Bell,
  Navigation, Zap, TrendingUp, ShieldCheck, Wind,
  Droplets, Eye, ArrowRight, Users, Recycle,
  BrainCircuit, Truck, ChevronRight, Leaf
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralHome } from "@/components/rural/RuralHome"
import { useState, useEffect } from "react"

const INITIAL_BINS = [
  { id: 1, location: "Main Gate, Sector 14", fill: 18, status: "low", lastCleaned: "2h ago", next: "6:00 AM" },
  { id: 2, location: "Park Entrance", fill: 67, status: "medium", lastCleaned: "5h ago", next: "4:00 PM" },
  { id: 3, location: "Market Complex", fill: 91, status: "high", lastCleaned: "12h ago", next: "ASAP" },
]

const aiInsights = [
  { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", title: "Overflow Risk", desc: "Bin at Market Complex likely to overflow in ~2 hours. Collection requested.", badge: "Alert" },
  { icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10", title: "Collection Vehicle Nearby", desc: "Truck #402 is 1.2km away, estimated arrival in 18 minutes.", badge: "Live" },
  { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", title: "Weekly Trend", desc: "Your area recycling rate improved by 12% this week. Keep it up!", badge: "Insight" },
]

const recentActivity = [
  { id: 1, item: "Street Sweeping Completed", location: "Sector 14 Main Road", time: "Today, 6:00 AM", icon: CheckCircle2, status: "success", type: "Cleaned" },
  { id: 2, item: "Overflowing Bin Reported", location: "Market Area", time: "2 hours ago", icon: AlertTriangle, status: "pending", type: "Reported" },
  { id: 3, item: "Illegal Dumping Resolved", location: "Behind Metro Station", time: "Yesterday", icon: CheckCircle2, status: "success", type: "Resolved" },
]

export default function Home() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [currentTime, setCurrentTime] = useState("")
  const [greeting, setGreeting] = useState("")
  const [bins, setBins] = useState(INITIAL_BINS)

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
    setCurrentTime(now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }))

    // Live IoT Simulation
    const interval = setInterval(() => {
      setBins(currentBins => currentBins.map(bin => {
        // Only increase fill by 0 to 2% randomly
        const increase = Math.floor(Math.random() * 3)
        let newFill = bin.fill + increase
        if (newFill > 100) newFill = 100 // Cap at 100%

        let newStatus = bin.status
        if (newFill < 50) newStatus = "low"
        else if (newFill < 85) newStatus = "medium"
        else newStatus = "high"

        return { ...bin, fill: newFill, status: newStatus }
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (mode === "rural") {
    return <RuralHome />
  }

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-8 animate-in fade-in duration-700 min-h-screen">
      
      {/* Personalized Header */}
      <div className="flex items-start justify-between pt-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{currentTime}</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {greeting}, <span className="text-primary">Alex</span> 👋
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">Sector 14 · New Delhi</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-card rounded-2xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-2xl border-2 border-primary/30 overflow-hidden shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Weather + Cleanliness Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Status Hero Card */}
        <Card className="lg:col-span-2 border border-border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden relative rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Status · Sector 14</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Area Cleanliness</h2>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-xl font-semibold text-xs">
                ✓ Good Condition
              </Badge>
            </div>
            
            {/* Cleanliness Score Visual */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Cleanliness Index</span>
                <span className="text-sm font-bold text-foreground">98.4 / 100</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: "98.4%" }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Next Pickup", value: "6:00 AM", icon: Clock, color: "text-blue-500" },
                { label: "Bins Nearby", value: "3 Active", icon: Recycle, color: "text-emerald-500" },
                { label: "Complaints", value: "1 Open", icon: AlertTriangle, color: "text-amber-500" },
              ].map((stat) => (
                <div key={stat.label} className="p-3 bg-muted/40 rounded-2xl">
                  <stat.icon size={14} className={cn("mb-1.5", stat.color)} />
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather + Eco Credits */}
        <div className="flex flex-col gap-4">
          {/* Weather */}
          <Card className="border border-border bg-card shadow-sm rounded-3xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Weather · Delhi</span>
                <Eye size={14} className="text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">☀️</span>
                <div>
                  <p className="text-2xl font-bold text-foreground">32°C</p>
                  <p className="text-xs text-muted-foreground">Sunny, Clear Skies</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Droplets size={12} className="text-blue-500" />52% Humidity
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wind size={12} className="text-blue-400" />12 km/h Wind
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eco Credits */}
          <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-emerald-500/5 shadow-sm rounded-3xl flex-1">
            <CardContent className="p-5 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-primary" fill="currentColor" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Eco Credits</span>
                </div>
                <ShieldCheck size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1,240</p>
                <p className="text-xs text-muted-foreground mt-0.5">≈ ₹1,240.00 value</p>
              </div>
              <Link href="/shop">
                <button className="w-full mt-4 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95">
                  Redeem Credits →
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">AI Insights</h2>
            <Badge className="bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5 rounded-full font-semibold">Live</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, i) => (
            <div key={i} className="p-5 bg-card border border-border rounded-3xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", insight.bg)}>
                  <insight.icon size={18} className={insight.color} />
                </div>
                <Badge className={cn("text-[10px] border-none rounded-full px-2 py-0.5 font-semibold", insight.bg, insight.color)}>
                  {insight.badge}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{insight.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Widget */}
      <Card className="border border-border bg-card shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Area Transparency</h2>
            </div>
            <Link href="/map" className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View Map <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Nearby Complaints", value: "3", sub: "2 active · 1 resolved", color: "text-amber-500", bg: "bg-amber-500/10" },
              { label: "Active Smart Bins", value: "12", sub: "9 operational", color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Waste Collected", value: "2.4T", sub: "This week nearby", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            ].map((item) => (
              <div key={item.label} className={cn("p-4 rounded-2xl", item.bg)}>
                <p className={cn("text-2xl font-bold", item.color)}>{item.value}</p>
                <p className="text-xs text-foreground font-semibold mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Bins */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Nearby Smart Bins</h2>
          </div>
          <Link href="/map" className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Open Map <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {bins.map((bin) => (
            <div key={bin.id} className="p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center",
                  bin.status === "low" ? "bg-emerald-500/10 text-emerald-500" :
                  bin.status === "medium" ? "bg-amber-500/10 text-amber-500" :
                  "bg-red-500/10 text-red-500"
                )}>
                  <Recycle size={16} />
                </div>
                <Badge className={cn("text-[10px] border-none rounded-full px-2 py-0.5 font-semibold",
                  bin.status === "low" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  bin.status === "medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  "bg-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  {bin.fill}% Full
                </Badge>
              </div>
              <p className="text-sm font-bold text-foreground">{bin.location}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Cleaned {bin.lastCleaned} · Next: {bin.next}</p>
              {/* Fill bar */}
              <div className="h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
                <div className={cn("h-full rounded-full transition-all",
                  bin.status === "low" ? "bg-emerald-500" :
                  bin.status === "medium" ? "bg-amber-500" : "bg-red-500"
                )} style={{ width: `${bin.fill}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-4 pb-6">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground">Area Activity Feed</h2>
        </div>
        <div className="space-y-3">
          {recentActivity.map((act) => (
            <div key={act.id} className="p-4 bg-card border border-border rounded-2xl flex items-center gap-4 hover:border-primary/30 hover:bg-card/80 transition-all">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0",
                act.status === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                <act.icon size={18} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{act.item}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin size={10} className="text-primary flex-shrink-0" />
                  <p className="text-[11px] text-muted-foreground truncate">{act.location}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge className={cn("text-[10px] border-none rounded-full px-2 py-0.5 font-semibold mb-1 block",
                  act.status === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}>
                  {act.type}
                </Badge>
                <p className="text-[10px] text-muted-foreground">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
