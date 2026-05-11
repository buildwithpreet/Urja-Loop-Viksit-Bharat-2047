"use client"

import { 
  Settings, ChevronRight, LogOut, Camera, Bell, ShieldCheck,
  MapPin, Moon, History, Recycle, Leaf, Trophy, QrCode, 
  Globe, Edit2, CheckCircle2, Wallet, Menu, X, Info, 
  UserCircle, Smartphone, Eye, Activity as ActivityIcon, 
  Zap, Clock, ChevronDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralProfile } from "@/components/rural/RuralProfile"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { LanguageToggle } from "@/components/shared/LanguageToggle"

const userActivityFallback = [
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
  const { mode, setMode } = useMode()
  const isFarmer = mode === "rural"
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          if (profileData) setProfile(profileData)

          const { data: logData } = await supabase
            .from('activity_log')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(10)
          
          if (logData && logData.length > 0) {
            setActivities(logData.map(l => ({
              id: l.id,
              action: l.action,
              detail: l.description,
              time: new Date(l.created_at).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : new Date(l.created_at).toLocaleDateString(),
              icon: l.action.includes("Scan") ? Zap : l.action.includes("Purchase") ? Recycle : ActivityIcon,
              credit: (l.points_earned > 0 ? "+ " : "- ") + Math.abs(l.points_earned) + " credits",
              positive: l.points_earned >= 0
            })))
          }
        }
      } catch (e) {
         console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Logged out successfully")
      window.location.href = "/login"
    }
  }

  const handleSaveProfile = async () => {
    setIsEditing(false)
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          role: profile.role
        })
        .eq('id', session.user.id)
      
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Profile updated")
        if (profile.role === "rural") setMode("rural")
        else setMode("urban")
      }
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  if (mode === "rural") {
    return <RuralProfile />
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 p-4 pb-32 lg:p-8 space-y-4 relative overflow-x-hidden">
      
      {/* 1. SETTINGS DRAWER */}
      <div className={cn(
        "fixed inset-0 z-[100] transition-all duration-500",
        isSettingsOpen ? "visible" : "invisible"
      )}>
         <div 
           className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500", isSettingsOpen ? "opacity-100" : "opacity-0")}
           onClick={() => setIsSettingsOpen(false)}
         />
         <div className={cn(
           "absolute top-0 right-0 h-full w-80 bg-card border-l border-border shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto",
           isSettingsOpen ? "translate-x-0" : "translate-x-full"
         )}>
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-xl font-bold uppercase tracking-tight">Settings</h2>
               <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>

            <div className="space-y-8">
               <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sector Mode</p>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-2xl">
                     <button onClick={() => setMode("urban")} className={cn("py-2 px-3 rounded-xl text-[11px] font-bold transition-all", mode === "urban" ? "bg-background text-primary shadow-sm" : "text-muted-foreground")}>Urban</button>
                     <button onClick={() => setMode("rural")} className={cn("py-2 px-3 rounded-xl text-[11px] font-bold transition-all", mode === "rural" ? "bg-background text-primary shadow-sm" : "text-muted-foreground")}>Rural</button>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">System</p>
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Globe size={16} className="text-primary" /><span className="text-xs font-bold">Language</span></div><LanguageToggle /></div>
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Moon size={16} className="text-primary" /><span className="text-xs font-bold">Appearance</span></div><ThemeToggle /></div>
               </div>

               <div className="pt-8">
                  <button onClick={handleLogout} className="w-full p-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-600 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors">
                     <LogOut size={16} /> Log Out
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-2">
         <h1 className="text-2xl font-black uppercase tracking-widest text-foreground/80">Account</h1>
         <button onClick={() => setIsSettingsOpen(true)} className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-foreground hover:bg-muted shadow-sm"><Menu size={24} /></button>
      </div>

      {/* Profile Card */}
      <div className="relative bg-card border border-border rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl border-2 border-border overflow-hidden shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.full_name || (isFarmer ? 'Ram' : 'Alex')}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-sm"><Camera size={14} strokeWidth={2.5} /></button>
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{profile?.full_name || (isFarmer ? "Ram Singh" : "Alex Harrison")}</h1>
              <div className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Verified Citizen</span>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary" />
              {profile?.location || (isFarmer ? "Ludhiana · Punjab" : "Sector 14 · New Delhi")}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Waste Processed", value: (profile?.waste_processed || 124) + "kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "CO₂ Saved", value: (profile?.co2_saved || 18.2) + "kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Urja Credits", value: (profile?.eco_credits || 1240).toLocaleString(), icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-card border border-border rounded-2xl shadow-sm">
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", stat.bg)}><stat.icon size={16} className={stat.color} /></div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={16} className="text-primary" />
            <h2 className="text-sm font-bold text-foreground">Activity History</h2>
          </div>
        </div>
        <div className="divide-y divide-border">
          {(activities.length > 0 ? activities : userActivityFallback).map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-all">
              <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0", item.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground")}>
                <item.icon size={16} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{item.action}</p>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{item.detail}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={cn("text-xs font-bold", item.positive && item.credit.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>{item.credit}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground text-center pb-8 opacity-30 uppercase font-black tracking-[0.4em]">UrjaLoop · Viksit Bharat 2047</p>
    </div>
  )
}
