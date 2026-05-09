"use client"

import { 
  AlertTriangle,
  Clock,
  History,
  MapPin,
  CheckCircle2,
  Bell,
  Navigation,
  Eye,
  Wallet,
  Zap,
  TrendingUp,
  ShieldCheck
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLanguage } from "@/components/shared/LanguageProvider"

const nearbyBins = [
  { id: 1, location: "Main Gate, Sector 14", status: "Clean", capacity: "20%", lastCleaned: "2 hours ago" },
  { id: 2, location: "Park Entrance", status: "Medium", capacity: "65%", lastCleaned: "5 hours ago" },
]

const recentActivity = [
  { id: 1, type: "Cleaned", item: "Street Sweeping", location: "Sector 14 Main Road", time: "Today, 6:00 AM", icon: CheckCircle2, status: "success" },
  { id: 2, type: "Reported", item: "Overflowing Bin", location: "Market Area", time: "2 hours ago", icon: AlertTriangle, status: "pending" },
  { id: 3, type: "Resolved", item: "Illegal Dumping", location: "Behind Metro Station", time: "Yesterday", icon: CheckCircle2, status: "success" },
]

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="p-6 pb-32 lg:p-10 space-y-10 animate-in fade-in duration-1000 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            {t("dashboard_title").split(' ')[0]} <span className="text-primary">{t("dashboard_title").split(' ')[1] || ""}</span>
          </h1>
          <p className="text-muted-foreground font-bold flex items-center gap-2 uppercase text-[10px] tracking-widest">
            <ShieldCheck size={14} className="text-primary" /> {t("dashboard_subtitle")} • Sector 14
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-105 shadow-xl">
            <Bell size={22} strokeWidth={2.5} />
          </button>
          <div className="w-12 h-12 rounded-2xl border-2 border-primary/20 p-0.5 shadow-xl bg-card overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="rounded-xl w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Hero Stats: Area Status & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Status Card */}
        <Card className="lg:col-span-2 card-premium relative group border-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"></div>
          <CardContent className="p-8 space-y-8 relative z-10">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t("dashboard_status_live")}</span>
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter">Sector 14</h2>
               </div>
               <Badge className="bg-emerald-500 text-white px-5 py-2 rounded-xl font-black border-none text-xs shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                  {t("dashboard_status_optimal")}
               </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="ultra-glass p-5 rounded-2xl border border-foreground/10 space-y-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block opacity-60">{t("dashboard_cleanliness")}</span>
                  <div className="flex items-center gap-3">
                     <p className="text-2xl font-black tabular-nums">98.4%</p>
                     <div className="flex items-center text-emerald-500 text-[10px] font-black">
                        <TrendingUp size={12} className="mr-1" /> +2.1%
                     </div>
                  </div>
               </div>
               <div className="ultra-glass p-5 rounded-2xl border border-foreground/10 space-y-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block opacity-60">{t("dashboard_next_collection")}</span>
                  <div className="flex items-center gap-2">
                     <Clock size={16} className="text-primary" />
                     <p className="text-xl font-black">06:00 AM</p>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Holographic Card */}
        <Card className="lg:col-span-1 card-premium bg-slate-900 text-white dark:bg-slate-900 relative group overflow-hidden border-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-50"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
          <CardContent className="p-8 relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-foreground/20">
                  <Zap className="text-primary" size={24} fill="currentColor" />
                </div>
                <Badge variant="outline" className="border-foreground/20 text-white/60 text-[10px] font-black tracking-widest">VISA PARTNER</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{t("dashboard_wallet_balance")}</p>
                <p className="text-4xl font-black tracking-tight tabular-nums text-white">₹1,240.50</p>
              </div>
            </div>
            <Link href="/shop" className="mt-8 block">
              <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-[0_15px_30px_rgba(16,185,129,0.3)]">
                {t("dashboard_redeem")}
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Bins Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
             <MapPin size={24} className="text-primary" />
             {t("dashboard_nearby_facilities")}
          </h2>
          <Link href="/map" className="text-[10px] font-black text-primary hover:underline flex items-center gap-2 uppercase tracking-widest ultra-glass px-4 py-2 rounded-full border border-white/10">
             {t("dashboard_open_map")} <Navigation size={12} strokeWidth={3} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {nearbyBins.map((bin) => (
              <div key={bin.id} className="p-6 card-premium border-none ultra-glass flex items-center justify-between group cursor-pointer hover:bg-foreground/5 transition-all">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Zap size={20} />
                    </div>
                    <div>
                       <h4 className="text-base font-black tracking-tight">{bin.location}</h4>
                       <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Status: {bin.lastCleaned}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className={cn(
                       "w-3 h-3 rounded-full ml-auto mb-2",
                       bin.status === "Clean" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    )}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{bin.status}</span>
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-6 pb-10">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
            <History size={24} className="text-primary" />
            {t("dashboard_area_activity")}
          </h2>
        </div>
        <div className="space-y-4">
          {recentActivity.map((act) => (
            <div key={act.id} className="group p-5 card-premium border-none ultra-glass flex items-center justify-between hover:bg-foreground/5 transition-all">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0",
                  act.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                )}>
                  <act.icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-base font-black tracking-tight">{act.item}</h4>
                  <p className="text-[10px] text-muted-foreground font-black flex items-center gap-2 mt-1 uppercase tracking-widest">
                     <MapPin size={12} className="text-primary" /> {act.location}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-3">
                 <Badge variant="outline" className={cn(
                   "text-[9px] font-black uppercase px-3 py-1 border-none rounded-full",
                   act.status === 'success' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                 )}>
                   {act.type}
                 </Badge>
                 <span className="text-[10px] font-black text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-tighter">
                    <Clock size={12} /> {act.time}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
