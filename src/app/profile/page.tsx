"use client"

import { 
  Settings, ChevronRight, LogOut, Camera, Bell, ShieldCheck,
  MapPin, Moon, AlertTriangle, CheckCircle2, Clock, History,
  Recycle, Leaf, Trophy, Zap, Star, Shield, QrCode, Info,
  HelpCircle, Globe, Lock, ChevronDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralProfile } from "@/components/rural/RuralProfile"
import { useState } from "react"
import Link from "next/link"

const userActivity = [
  { id: 1, action: "Waste Submitted", detail: "Smart Bin — Sector 14 Main Gate · 2.4kg Plastic", time: "2 hours ago", icon: Zap, credit: "+ 24 credits", positive: true },
  { id: 2, action: "Complaint Resolved", detail: "Illegal Dumping — Metro Station", time: "Yesterday", icon: CheckCircle2, credit: "Resolved", positive: true },
  { id: 3, action: "Marketplace Purchase", detail: "Organic Compost 25kg bag", time: "3 days ago", icon: Recycle, credit: "- 450 credits", positive: false },
]

const ecoCreditHistory = [
  { label: "Waste Submission Bonus", amount: "+24", status: "Verified", date: "Today" },
  { label: "Weekly Streak Bonus", amount: "+50", status: "Verified", date: "Mon" },
  { label: "Compost Purchase", amount: "-450", status: "Redeemed", date: "3 days ago" },
]

export default function Profile() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  if (mode === "rural") {
    return <RuralProfile />
  }

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700 min-h-screen">
      
      {/* Profile Card */}
      <div className="relative bg-card border border-border rounded-3xl p-5 shadow-sm overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
           <ProfileSettingsMenu />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl border-2 border-border overflow-hidden shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-sm hover:opacity-90 active:scale-90 transition-all">
              <Camera size={14} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-xl font-bold text-foreground">Alex Harrison</h1>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                <Star size={10} className="text-primary fill-primary" />
                <span className="text-[10px] font-bold text-primary">{t("profile_platinum")}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <MapPin size={12} className="text-primary" />
              Green Valley · Sector 14 · New Delhi
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Verified Citizen</span>
              </div>
              <Link href="/profile/qr" className="flex items-center gap-1 px-2 py-1 bg-muted border border-border rounded-full hover:border-primary/40 transition-all">
                <QrCode size={10} className="text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground">My QR</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("profile_total_waste"), value: "248kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: t("profile_carbon"), value: "84kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("profile_credits"), value: "1,240", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-card border border-border rounded-2xl shadow-sm">
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Eco Credits Detail */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <button onClick={() => toggleSection("credits")} className="w-full p-5 flex items-center justify-between hover:bg-muted/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Zap size={16} className="text-amber-500" fill="currentColor" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">Eco Credits</p>
              <p className="text-xs text-muted-foreground">1,240 credits · ≈ ₹1,240</p>
            </div>
          </div>
          <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", expandedSection === "credits" ? "rotate-180" : "")} />
        </button>
        {expandedSection === "credits" && (
          <div className="border-t border-border px-5 pb-5">
            <div className="pt-3 space-y-3">
              {ecoCreditHistory.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", item.amount.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>{item.amount}</p>
                    <Badge className={cn("text-[9px] border-none rounded-full px-1.5",
                      item.status === "Verified" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                    )}>{item.status}</Badge>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-muted-foreground">🔒 Credits awarded only after AI + weight sensor verification. Anti-fraud system active.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Feed */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={16} className="text-primary" />
            <h2 className="text-sm font-bold text-foreground">{t("profile_activity")}</h2>
          </div>
        </div>
        <div className="divide-y divide-border">
          {userActivity.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-all">
              <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0",
                item.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
              )}>
                <item.icon size={16} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{item.action}</p>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{item.detail}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={cn("text-xs font-bold", item.positive && item.credit.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                  {item.credit}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Support Section */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Support & Security</h2>
        </div>
        
        {[
          { label: "Privacy & Data Protection", icon: Shield },
          { label: "Community Guidelines", icon: Info },
          { label: "Help Center & FAQs", icon: HelpCircle },
        ].map((item) => (
          <button key={item.label} className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-all border-b border-border last:border-0">
            <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
              <item.icon size={16} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground flex-1 text-left">{item.label}</p>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Reset + Logout */}
      <div className="space-y-3">
        <button 
          onClick={() => { localStorage.removeItem("urjaloop_onboarded"); window.location.href = "/splash" }}
          className="w-full py-3 rounded-2xl border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2"
        >
          <History size={14} /> Reset Onboarding (Demo)
        </button>
        <button className="w-full py-3 rounded-2xl border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
          <LogOut size={14} /> {t("profile_logout")}
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center pb-4">
        UrjaLoop v1.0 · Built for Viksit Bharat 2047 · Open Source
      </p>
    </div>
  )
}
