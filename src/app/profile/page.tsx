"use client"

import { 
  Settings, 
  ChevronRight, 
  LogOut, 
  Camera, 
  Bell, 
  ShieldCheck, 
  MapPin,
  Moon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  History,
  Recycle,
  Leaf,
  Trophy,
  Zap,
  Star,
  Shield
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"

export default function Profile() {
  const { t } = useLanguage()
  const userActivity = [
    { id: 1, action: t("Waste Drop-off Reward"), detail: t("Sector 5 Smart Bin • 2.4kg Plastic"), time: t("2 hours ago"), icon: Zap, status: "+ ₹24.00" },
    { id: 2, action: t("Compost Purchased"), detail: t("Marketplace • 25kg Organic"), time: t("Yesterday"), icon: CheckCircle2, status: "- ₹450.00" },
    { id: 3, action: t("AI Scan Bonus"), detail: t("Correctly Segregated Glass"), time: t("3 days ago"), icon: Zap, status: "+ ₹5.00" },
  ]

  return (
    <div className="p-8 pb-32 lg:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Profile Header */}
      <div className="relative p-10 ultra-glass rounded-[3rem] overflow-hidden border border-foreground/10 flex flex-col md:flex-row items-center md:items-start gap-12 group">
        <div className="absolute inset-0 bg-mesh opacity-30 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 group">
          <div className="w-48 h-48 rounded-[2.5rem] border-8 border-background/20 shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-700">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover scale-110" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-90 transition-all border-4 border-background z-20">
            <Camera size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6 relative z-10 pt-2">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-center md:justify-start">
              <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase">Alex Harrison</h1>
              <Badge className="w-fit bg-primary text-primary-foreground border-none px-4 py-1.5 font-black text-[10px] tracking-widest rounded-xl shadow-lg shadow-primary/20 uppercase mx-auto md:mx-0">
                <Star size={12} className="mr-1.5 fill-current" /> {t("profile_platinum")}
              </Badge>
            </div>
            <p className="text-muted-foreground font-black text-xs tracking-widest uppercase flex items-center justify-center md:justify-start gap-2 opacity-70">
              <MapPin size={14} className="text-primary" />
              Green Valley • Block C-12 • New Delhi
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <div className="px-5 py-2.5 rounded-2xl ultra-glass border border-foreground/5 flex items-center gap-2 shadow-sm">
                <Shield size={14} className="text-primary" strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Verified ID</span>
             </div>
             <button className="px-5 py-2.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 text-[10px] font-black uppercase tracking-widest text-foreground transition-all flex items-center gap-2">
                <Settings size={14} strokeWidth={3} />
                Manage Account
             </button>
          </div>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: t("profile_total_waste"), value: "248kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-500/10", suffix: "+12% this month" },
          { label: t("profile_carbon"), value: "84.2kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-500/10", suffix: "Eco-Guardian Tier" },
          { label: t("profile_credits"), value: "1,240", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10", suffix: "≈ ₹1,240.00" },
        ].map((stat, i) => (
          <div key={i} className="ultra-glass p-8 rounded-[2.5rem] border border-foreground/5 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
              <p className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-primary tracking-widest uppercase pt-2 opacity-60">{stat.suffix}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Activity */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4">
             <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary">
                <History size={20} strokeWidth={2.5} />
             </div>
             {t("profile_activity")}
          </h2>
          <div className="ultra-glass rounded-[2.5rem] border border-foreground/5 overflow-hidden divide-y divide-white/5">
            {userActivity.map((item) => (
              <div key={item.id} className="p-8 flex items-center gap-8 hover:bg-foreground/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500 border border-foreground/5">
                  <item.icon size={26} strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-black text-foreground uppercase tracking-tight">{item.action}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.detail}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-lg font-black tabular-nums",
                    item.status.startsWith('+') ? "text-primary" : "text-foreground"
                  )}>
                    {item.status}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.15em] mt-1 opacity-60">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Preferences */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4">
             <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary">
                <Settings size={20} strokeWidth={2.5} />
             </div>
             {t("profile_settings")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Theme Toggle Card */}
            <div className="ultra-glass p-8 rounded-[2rem] border border-foreground/5 flex items-center gap-8 group">
              <div className="w-14 h-14 rounded-2xl bg-foreground/5 text-primary flex items-center justify-center flex-shrink-0 border border-foreground/5 shadow-inner">
                <Moon size={26} strokeWidth={2.5} />
              </div>
              <div className="flex-1 text-left space-y-1">
                <p className="text-sm font-black text-foreground uppercase tracking-tight">Dark Interface</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Optimize visual experience</p>
              </div>
              <ThemeToggle />
            </div>

            {[
              { label: "Notification Hub", icon: Bell, desc: "Alert protocols & signals" },
              { label: "Privacy Protocol", icon: ShieldCheck, desc: "Data encryption & security" },
            ].map((item, i) => (
              <button key={i} className="ultra-glass p-8 rounded-[2rem] border border-foreground/5 flex items-center gap-8 group hover:bg-foreground/5 transition-all text-left">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all flex items-center justify-center flex-shrink-0 border border-foreground/5">
                  <item.icon size={26} strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-black text-foreground uppercase tracking-tight">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">{item.desc}</p>
                </div>
                <ChevronRight size={20} strokeWidth={3} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("urjaloop_onboarded")
              window.location.href = "/splash"
            }}
            className="w-full py-4 rounded-[1.5rem] bg-amber-500/10 text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500/20 transition-all flex items-center justify-center gap-4 border border-amber-500/20 active:scale-[0.98] mb-4"
          >
            <History size={16} strokeWidth={3} />
            Reset Onboarding Node
          </button>
          <button className="w-full py-6 rounded-[2rem] bg-destructive/10 text-destructive font-black text-[11px] uppercase tracking-[0.2em] hover:bg-destructive/20 transition-all flex items-center justify-center gap-4 border border-destructive/20 active:scale-[0.98]">
            <LogOut size={18} strokeWidth={3} />
            {t("profile_logout")}
          </button>
        </div>
      </div>
    </div>
  )
}
