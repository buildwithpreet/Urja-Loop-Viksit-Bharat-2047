"use client"

import { 
  Tractor, Wheat, Sprout, Wind, MapPin, CheckCircle2,
  TrendingUp, Calendar, AlertTriangle, Truck, Eye, ArrowRight,
  Flame, CloudRain, Sun, BrainCircuit, ChevronRight
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { toast } from "sonner"

const NEARBY_CENTERS = [
  { id: 1, name: "Kisan Bio-Hub, Sector 4", capacity: "Available", status: "open", dist: "2.4 km", buyer: true },
  { id: 2, name: "Agri-Waste Processor A", capacity: "Full", status: "closed", dist: "5.1 km", buyer: false },
  { id: 3, name: "Village Compost Unit", capacity: "Available", status: "open", dist: "1.2 km", buyer: false },
]

export function RuralHome() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (data) setProfile(data)
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const RURAL_METRICS = [
    { label: t("rural_waste_sold"), value: `${profile?.waste_processed || "0"} kg`, icon: Wheat, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: t("rural_pickups"), value: "2", icon: Tractor, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Eco Credits", value: profile?.eco_credits?.toLocaleString() || "0", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "CO₂ Impact", value: `-${profile?.co2_saved || "0"} kg`, icon: Wind, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ]

  const AI_INSIGHTS = [
    { icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10", title: t("rural_stubble_alert"), desc: t("rural_stubble_desc"), badge: "Critical" },
    { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", title: t("rural_biomass_demand"), desc: t("rural_biomass_desc"), badge: "Market" },
    { icon: CloudRain, color: "text-blue-500", bg: "bg-blue-500/10", title: "Seasonal Insight", desc: "Upcoming rain in 2 days. Secure dry biomass storage to preserve market value.", badge: "Weather" },
  ]
  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* GREETING & WEATHER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-mesh p-6 rounded-3xl border border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold mb-3 border border-amber-500/20">
            <Wheat size={14} />
            <span>{t("rural_dashboard")}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{profile?.full_name || "Alex"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{profile?.location || "Ludhiana, Punjab"} · Farm ID: #PB-{profile?.id?.slice(0, 4) || "4029"}</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-sm">
          <Sun className="text-amber-500" size={24} />
          <div>
            <p className="text-sm font-bold">{t("rural_weather").split('•')[0]}</p>
            <p className="text-[10px] text-muted-foreground">{t("rural_weather").split('•')[1]}</p>
          </div>
        </div>
      </div>

      {/* RURAL METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {RURAL_METRICS.map((m) => (
          <Card key={m.label} className="card-premium overflow-hidden group">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", m.bg)}>
                  <m.icon size={16} className={m.color} />
                </div>
              </div>
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI INSIGHTS & SEASONAL ALERTS */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <BrainCircuit size={18} className="text-amber-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider">{t("rural_ai_insights")}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {AI_INSIGHTS.map((insight, i) => (
            <div key={i} className="glass p-4 rounded-2xl group cursor-default transition-all duration-300 hover:bg-muted/50">
              <div className="flex justify-between items-start mb-3">
                <div className={cn("p-2 rounded-xl", insight.bg)}>
                  <insight.icon size={16} className={insight.color} />
                </div>
                <Badge variant="outline" className={cn("text-[10px] uppercase font-bold", insight.color, `border-${insight.color.replace('text-', '')}/30`)}>
                  {insight.badge}
                </Badge>
              </div>
              <h3 className="font-bold text-sm mb-1">{insight.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NEARBY COLLECTION CENTERS */}
        <div className="card-premium p-5 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <h2 className="text-sm font-bold">{t("rural_near_hub")}</h2>
            </div>
            <Link href="/map" className="text-xs font-bold text-primary hover:underline flex items-center">
              {t("rural_view_map")} <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {NEARBY_CENTERS.map((center) => (
              <div key={center.id} className="p-3 rounded-2xl border border-border bg-card/50 transition-colors hover:bg-muted/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold">{center.name}</h3>
                  <Badge variant="secondary" className={cn(
                    "text-[10px] uppercase font-bold",
                    center.status === "open" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  )}>
                    {center.status === "open" ? "Open" : "Closed"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Tractor size={12} /> {center.dist}</span>
                    <span className="flex items-center gap-1">
                      {center.buyer ? <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Buyer</span> : <span>Processing</span>}
                    </span>
                  </div>
                  <span className={center.capacity === "Available" ? "text-emerald-500" : "text-rose-500"}>
                    {center.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT PICKUP REQUESTS */}
        <div className="card-premium p-5 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tractor size={16} className="text-blue-500" />
              <h2 className="text-sm font-bold">{t("rural_recent_pickups")}</h2>
            </div>
            <Link href="/complaints" className="text-xs font-bold text-primary hover:underline flex items-center">
              {t("rural_history")} <ChevronRight size={14} />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 border border-dashed border-border rounded-2xl bg-muted/30">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
              <Tractor size={24} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-bold mb-1">No Active Pickups</h3>
            <p className="text-xs text-muted-foreground mb-4">Request a transport vehicle to collect your agri-waste directly from your farm.</p>
            <button 
              onClick={() => toast.success("Pickup requested successfully! A tractor will be assigned soon.")}
              className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-xs font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              Request Pickup <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
