"use client"

import { 
  Settings, ChevronRight, LogOut, Camera, Bell, ShieldCheck,
  MapPin, Moon, History, Recycle, Leaf, Trophy, QrCode, 
  Globe, Edit2, CheckCircle2, Wallet
} from "lucide-react"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { LanguageToggle } from "@/components/shared/LanguageToggle"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { useState } from "react"
import Link from "next/link"

export default function Profile() {
  const { mode } = useMode()
  const isFarmer = mode === "rural"

  const stats = isFarmer ? [
    { label: "Biomass Contributed", value: "1.2 Tons", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Carbon Saved", value: "240 kg", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Rewards Earned", value: "₹4,200", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  ] : [
    { label: "Waste Recycled", value: "48 kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "CO₂ Reduced", value: "124 kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Credits Earned", value: "1,240", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  const impactText = isFarmer 
    ? "You prevented open waste burning equivalent to 240kg CO₂"
    : "Your contributions helped recover 1.2 tons of recyclable waste"

  const activities = [
    { title: isFarmer ? "Biomass collection" : "Waste drop completed", desc: isFarmer ? "400kg Rice Straw" : "2.4kg Plastic at Sector 14", time: "2h ago", icon: CheckCircle2 },
    { title: "Credits earned", desc: "Verified by Smart Bin AI", time: "Yesterday", icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700">
      
      {/* Profile Header Card */}
      <div className="relative bg-card border border-border rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-[2rem] border-2 border-border overflow-hidden shadow-xl">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isFarmer ? 'Ram' : 'Alex'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover bg-muted" 
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Camera size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{isFarmer ? "Ram Singh" : "Alex Harrison"}</h1>
              <div className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {isFarmer ? "Verified Farmer" : "Verified User"}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin size={12} className="text-primary" />
                {isFarmer ? "Ludhiana, Punjab" : "Sector 14, New Delhi"}
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <History size={12} className="text-primary" />
                Joined {isFarmer ? "Mar 2024" : "Jan 2024"}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              <Link href="/profile/edit" className="p-2 bg-muted/50 hover:bg-border rounded-xl transition-colors text-muted-foreground hover:text-foreground">
                <Edit2 size={16} />
              </Link>
            </div>
          </div>

          <button className="w-full sm:w-28 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 hover:bg-emerald-500/10 transition-all group active:scale-95">
            <QrCode size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Smart QR</span>
          </button>
        </div>
      </div>

      {/* Impact Stats Section */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-3xl p-4 flex flex-col items-center text-center space-y-2 group hover:border-emerald-500/30 transition-colors">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg)}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className="space-y-0.5">
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-bold leading-tight uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Environmental Impact Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-125 transition-transform">
          <Leaf size={48} className="text-emerald-500" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 leading-tight">
            {impactText}
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2 opacity-60">
            <History size={14} className="text-primary" />
            Recent Activity
          </h2>
          <Link href="/activity" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
            View All History
          </Link>
        </div>
        <div className="bg-card border border-border rounded-3xl divide-y divide-border overflow-hidden">
          {activities.map((activity, idx) => (
            <div key={idx} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0">
                <activity.icon size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground">{activity.title}</h4>
                <p className="text-[10px] text-muted-foreground truncate font-medium">{activity.desc}</p>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground shrink-0 uppercase tracking-tighter">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2 px-1 opacity-60">
          <Settings size={14} className="text-primary" />
          Settings
        </h2>
        <div className="bg-card border border-border rounded-3xl divide-y divide-border overflow-hidden">
          {/* Nearby Centers */}
          <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Nearby Centers</p>
                <p className="text-[10px] text-muted-foreground font-medium">Manage processing units</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Payment Details */}
          <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <Wallet size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Payment / Bank Details</p>
                <p className="text-[10px] text-muted-foreground font-medium">Manage your earnings</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Notifications */}
          <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Notifications</p>
                <p className="text-[10px] text-muted-foreground font-medium">Smart alerts & updates</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Language */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted/50 text-muted-foreground flex items-center justify-center">
                <Globe size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Language</p>
                <p className="text-[10px] text-muted-foreground font-medium">Regional Support</p>
              </div>
            </div>
            <LanguageToggle />
          </div>

          {/* Theme */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted/50 text-muted-foreground flex items-center justify-center">
                <Moon size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Appearance</p>
                <p className="text-[10px] text-muted-foreground font-medium">System theme</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Logout */}
      <button className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-600 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] active:scale-[0.98]">
        <LogOut size={16} /> Log Out
      </button>

      <p className="text-[10px] text-muted-foreground text-center pb-8 opacity-30 uppercase font-black tracking-[0.4em]">
        UrjaLoop · Viksit Bharat 2047
      </p>
    </div>
  )
}
