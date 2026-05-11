"use client"

import { 
  Settings, ChevronRight, LogOut, Camera, Bell, ShieldCheck,
  MapPin, Moon, AlertTriangle, CheckCircle2, Clock, History,
  Recycle, Leaf, Trophy, Zap, Star, Shield, QrCode, Info,
  HelpCircle, Globe, Lock, ChevronDown, Edit2
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
  const { mode, setMode } = useMode()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (profileData) setProfile(profileData)

        // Fetch Activities
        const { data: logData } = await supabase
          .from('activity_log')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(10)
        
        if (logData) {
          setActivities(logData.map(l => ({
            id: l.id,
            action: l.action,
            detail: l.description,
            time: new Date(l.created_at).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : new Date(l.created_at).toLocaleDateString(),
            icon: l.action.includes("Scan") ? Zap : l.action.includes("Purchase") ? Recycle : Activity,
            credit: (l.points_earned > 0 ? "+ " : "- ") + Math.abs(l.points_earned) + " credits",
            positive: l.points_earned >= 0
          })))
        }
      }
      setLoading(false)
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
    <div className="p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700 min-h-screen">
      
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <ProfileSettingsMenu />
      </div>

      {/* Profile Card */}
      <div className="relative bg-card border border-border rounded-3xl p-5 shadow-sm overflow-hidden">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-bold text-foreground">{profile?.full_name || "Alex Harrison"}</h1>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                  <Star size={10} className="text-primary fill-primary" />
                  <span className="text-[10px] font-bold text-primary">{t("profile_platinum")}</span>
                </div>
              </div>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger render={<button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground" />}>
                  <Edit2 size={16} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <input 
                        id="name" 
                        value={profile?.full_name || ""} 
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">I am a Farmer</label>
                        <p className="text-[10px] text-muted-foreground">Switch to rural farm management mode.</p>
                      </div>
                      <button 
                        onClick={() => setProfile({...profile, role: profile.role === "rural" ? "citizen" : "rural"})}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${profile?.role === "rural" ? 'bg-primary' : 'bg-input'}`}
                      >
                        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${profile?.role === "rural" ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                    <button onClick={handleSaveProfile} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all active:scale-95">Save Changes</button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <MapPin size={12} className="text-primary" />
              {profile?.location || "Sector 14 · New Delhi"}
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
          { label: t("profile_total_waste"), value: (profile?.waste_processed || 0) + "kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: t("profile_carbon"), value: (profile?.co2_saved || 0) + "kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("profile_credits"), value: profile?.eco_credits?.toLocaleString() || "0", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
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
              <p className="text-xs text-muted-foreground">{profile?.eco_credits?.toLocaleString() || "0"} credits · ≈ ₹{profile?.eco_credits?.toLocaleString() || "0"}</p>
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
          {(activities.length > 0 ? activities : userActivity).map((item) => (
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
        <button 
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={14} /> {t("profile_logout")}
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center pb-4">
        UrjaLoop v1.0 · Built for Viksit Bharat 2047 · Open Source
      </p>
    </div>
  )
}
