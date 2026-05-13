"use client"

import { 
  Wheat, Tractor, TrendingUp, AlertCircle, 
  MapPin, CheckCircle2, Leaf, Sprout,
  Users, Activity, Sparkles, Award,
  Flame, Droplets, Wind, ChevronRight,
  Plus, ArrowUpRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

export function RuralDashboard() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
        setProfile(data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="p-4 pb-36 md:p-8 space-y-10 animate-in fade-in duration-700 min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-foreground">
      
      {/* ── RURAL HERO ── */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-800 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none py-1 px-3">
              <Sprout size={14} className="mr-2" /> {t("rural_badge_verified")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Transforming <span className="text-emerald-200">Waste</span> <br />into Rural <span className="text-teal-200">Wealth.</span>
            </h1>
            <p className="text-emerald-50/80 text-lg max-w-md font-medium">
              Don't burn your future. Convert crop residue into Urja Credits and high-quality bio-products.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/bot">
                <button className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-emerald-50 transition-all flex items-center gap-2">
                  <Plus size={18} /> Log Agri Waste
                </button>
              </Link>
              <Link href="/map">
                <button className="bg-emerald-500/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                   Track Pickup <ArrowUpRight size={18} />
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Urja Credits", value: profile?.eco_credits?.toLocaleString() || "4,820", sub: "≈ ₹4,820", icon: Award },
              { label: "Waste Sold", value: "2.4 Tons", sub: "This Season", icon: Wheat },
              { label: "CO2 Offset", value: "450kg", sub: "Impact Score", icon: Wind },
              { label: "Villages Active", value: "142", sub: "Regional Network", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/15 transition-all">
                <stat.icon size={20} className="mb-4 text-emerald-200" />
                <p className="text-[10px] uppercase font-black tracking-widest text-emerald-100/60 leading-none">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-[11px] font-medium text-emerald-100/40 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK RURAL ACTIONS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-8 bg-card border border-border rounded-[2.5rem] flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
               <Wheat size={28} />
            </div>
            <div>
               <h3 className="text-xl font-bold mb-2">Sell Crop Residue</h3>
               <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Turn your Rice Straw (Prali) or Husk into instant credits for biofuel processing.</p>
               <button className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold text-xs hover:opacity-90 transition-all">Sell Waste →</button>
            </div>
         </div>

         <div className="p-8 bg-card border border-border rounded-[2.5rem] flex flex-col justify-between group hover:border-blue-500/30 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
               <Tractor size={28} />
            </div>
            <div>
               <h3 className="text-xl font-bold mb-2">Request Logistics</h3>
               <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Need help transporting waste? Schedule an UrjaVan to pick up biomass from your farm.</p>
               <button className="w-full py-3 bg-blue-500 text-white rounded-2xl font-bold text-xs hover:opacity-90 transition-all">Book Pickup →</button>
            </div>
         </div>

         <div className="p-8 bg-card border border-border rounded-[2.5rem] flex flex-col justify-between group hover:border-amber-500/30 transition-all">
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
               <Sprout size={28} />
            </div>
            <div>
               <h3 className="text-xl font-bold mb-2">Marketplace</h3>
               <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Redeem your credits for Bio-Fertilizers, Seeds, and premium Agricultural tools.</p>
               <Link href="/shop"><button className="w-full py-3 bg-amber-500 text-white rounded-2xl font-bold text-xs hover:opacity-90 transition-all">Open Shop →</button></Link>
            </div>
         </div>
      </div>

      {/* ── IMPACT & INFRASTRUCTURE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold flex items-center gap-2"><Activity size={20} className="text-emerald-500" /> Infrastructure Health</h2>
               <button className="text-xs font-bold text-emerald-600 hover:underline">View All Centers</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                  { name: "Ludhiana Biomass Hub", status: "Operating", capacity: "82% Full", lat: "30.9010° N", lng: "75.8573° E", color: "bg-emerald-500" },
                  { name: "Moga Processing Unit", status: "Maintenance", capacity: "45% Full", lat: "30.8172° N", lng: "75.1717° E", color: "bg-amber-500" },
               ].map((unit, i) => (
                  <div key={i} className="p-6 bg-card border border-border rounded-3xl relative overflow-hidden group">
                     <div className={cn("absolute top-0 right-0 w-1 h-full", unit.color)} />
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <p className="text-lg font-bold">{unit.name}</p>
                           <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={10} /> {unit.lat} · {unit.lng}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-black border-border">{unit.status}</Badge>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                           <span>Current Load</span>
                           <span>{unit.capacity}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                           <div className={cn("h-full rounded-full transition-all duration-1000", unit.color)} style={{ width: unit.capacity }} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Flame size={20} className="text-amber-500" /> Stubble Burning Prevention</h2>
            <div className="p-8 bg-gradient-to-br from-amber-500/10 to-red-500/5 border border-amber-500/20 rounded-[2.5rem] relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-sm font-bold text-amber-600 mb-2 uppercase tracking-widest">Regional Alert</p>
                  <p className="text-3xl font-bold mb-4">Zero Fire Incidents</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                     Great news! In your block, stubble burning has dropped to zero this week thanks to collective conversion effort.
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">U{i}</div>
                        ))}
                     </div>
                     <p className="text-xs font-bold text-foreground">+42 Farmers Joined Today</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
