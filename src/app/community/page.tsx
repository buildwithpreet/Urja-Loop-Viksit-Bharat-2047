"use client"

import { useState, useEffect } from "react"
import { 
  Users, MapPin, CheckCircle2, AlertTriangle, 
  Clock, TrendingUp, Globe, Zap, Activity, Award
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"


const recentActivities = [
  { id: 1, type: "cleanup", location: "Sector 14 Market Hub", time: "2 hours ago", users: 12, impact: "450kg Carbon Offset" },
  { id: 2, type: "report", location: "Green View Terminal", time: "5 hours ago", users: 3, status: "System Processing" },
  { id: 3, type: "resolved", location: "Industrial Sector Alpha", time: "1 day ago", impact: "Facility Restored" },
]

export default function Community() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [impactStats, setImpactStats] = useState({ totalWaste: 0, totalCO2: 0, activeUsers: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Fetch Leaderboard
      const { data: leaders } = await supabase
        .from('profiles')
        .select('id, full_name, eco_credits, role')
        .order('eco_credits', { ascending: false })
        .limit(5)
      
      if (leaders) setLeaderboard(leaders)

      // Fetch Impact Stats
      const { data: allProfiles } = await supabase
        .from('profiles')
        .select('waste_processed, co2_saved')
      
      if (allProfiles) {
        const waste = allProfiles.reduce((acc, p) => acc + (p.waste_processed || 0), 0)
        const co2 = allProfiles.reduce((acc, p) => acc + (p.co2_saved || 0), 0)
        setImpactStats({ 
          totalWaste: waste, 
          totalCO2: co2, 
          activeUsers: allProfiles.length 
        })
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="p-8 pb-32 lg:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header Section */}
      <div className="relative p-12 ultra-glass rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10 group">
        <div className="relative z-10 space-y-3 text-center md:text-left max-w-2xl">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
             <div className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-primary shadow-2xl">
                <Globe size={28} strokeWidth={2.5} className="animate-spin-slow" />
             </div>
             <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 font-black text-[10px] tracking-[0.2em] uppercase rounded-xl">
                Live Network Feed
             </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-none">Social Impact</h1>
          <p className="text-muted-foreground text-xs md:text-sm font-black uppercase tracking-[0.2em] opacity-60">Quantifying collective action for a cleaner tomorrow</p>
        </div>
        
        <div className="relative z-10 ultra-glass p-8 rounded-[2.5rem] flex items-center gap-6 shadow-2xl hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/30">
             <Activity size={32} strokeWidth={2.5} />
          </div>
          <div>
             <p className="text-2xl font-black text-foreground tracking-tighter">{impactStats.activeUsers}</p>
             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Active Nodes</p>
          </div>
        </div>
      </div>

      {/* Area Cleanliness Tactical Intel */}
      <Card className="border-none ultra-glass rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Territory Analysis</p>
               <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter">Sector 14 Terminal</h2>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-6 py-2.5 font-black text-[11px] tracking-[0.2em] uppercase rounded-2xl shadow-xl shadow-emerald-500/10">
                Optimal Cleanliness
              </Badge>
              <div className="flex items-center gap-3 ultra-glass border border-foreground/5 px-5 py-2 rounded-xl">
                <TrendingUp size={18} className="text-emerald-500" strokeWidth={2.5} />
                <span className="text-[11px] font-black text-foreground uppercase tracking-widest opacity-80">Top 5% Network-wide</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
              <div className="w-48 h-48 rounded-[2.5rem] ultra-glass border-8 border-emerald-500/10 flex items-center justify-center shadow-2xl">
                <div className="text-center space-y-1">
                  <span className="text-6xl font-black text-foreground tracking-tighter">{Math.round(impactStats.totalCO2)}</span>
                  <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40">CO₂ SAVED (KG)</span>
                </div>
              </div>
             <div className="absolute -top-4 -right-4 w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 animate-bounce">
                <Award size={28} strokeWidth={2.5} />
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Community Intelligence */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-foreground/5 pb-8">
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter flex items-center gap-6">
            <div className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-primary">
               <Users size={24} strokeWidth={2.5} />
            </div>
            Intelligence Matrix
          </h2>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
             View All Logistics
          </button>
        </div>

        <div className="grid gap-6">
          {leaderboard.map((user, i) => (
            <Card key={user.id} className="border-none ultra-glass rounded-[2.5rem] shadow-xl hover:bg-foreground/5 transition-all duration-500 group overflow-hidden">
              <CardContent className="p-8 flex flex-col sm:flex-row gap-8 sm:items-center justify-between relative z-10">
                <div className="flex items-start sm:items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl border border-foreground/10 text-2xl font-black",
                    i === 0 ? "bg-amber-500/10 text-amber-500 shadow-amber-500/10" :
                    i === 1 ? "bg-slate-400/10 text-slate-400 shadow-slate-400/10" :
                    i === 2 ? "bg-orange-400/10 text-orange-400 shadow-orange-400/10" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight">
                      {user.full_name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em] flex items-center gap-2 opacity-60">
                      <Badge variant="outline" className="text-[9px] border-border uppercase font-black">{user.role}</Badge>
                    </p>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 pl-20 sm:pl-0">
                  <div className="ultra-glass border border-emerald-500/10 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest text-emerald-500 shadow-lg">
                    {user.eco_credits?.toLocaleString()} Credits
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Mission Logistics</h2>
        <div className="grid gap-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 rounded-2xl border border-border bg-card/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Zap size={14} />
                </div>
                <p className="text-xs font-bold">{activity.location}</p>
              </div>
              <Badge className="bg-muted text-muted-foreground text-[9px]">{activity.time}</Badge>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
