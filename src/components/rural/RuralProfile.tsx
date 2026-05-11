"use client"

import { 
  User, QrCode, ShieldCheck, MapPin, 
  Settings, LogOut, ChevronRight, Leaf, History, 
  Store, Tractor, Wheat, ArrowRight, Globe, Edit2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { LanguageToggle } from "@/components/shared/LanguageToggle"
import { ProfileSettingsMenu } from "@/components/shared/ProfileSettingsMenu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMode } from "@/components/shared/ModeProvider"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const farmerStats = [
  { label: "Agri Waste Sold", value: "1,240 kg", icon: Wheat, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Sustainability", value: "Level 4", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Pickup History", value: "8", icon: Tractor, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Marketplace Activity", value: "12", icon: Store, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const recentActivity = [
  { id: 1, title: "Pickup Completed", desc: "400 kg Rice Straw collected", time: "2 days ago", icon: Tractor, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, title: "Marketplace Sale", desc: "Sold to Kisan Bio-Hub", time: "1 week ago", icon: Store, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 3, title: "Eco-Badge Earned", desc: "Zero Burning Champion", time: "2 weeks ago", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
]

export function RuralProfile() {
  const { mode, setMode } = useMode()
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
            title: l.action,
            desc: l.description,
            time: new Date(l.created_at).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : new Date(l.created_at).toLocaleDateString(),
            icon: l.action.includes("Scan") ? Wheat : l.action.includes("Pickup") ? Tractor : Store,
            color: l.points_earned >= 0 ? "text-emerald-500" : "text-amber-500",
            bg: l.points_earned >= 0 ? "bg-emerald-500/10" : "bg-amber-500/10"
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

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-foreground">My Farm Profile</h1>
        <ProfileSettingsMenu />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-card p-6 rounded-3xl border border-border relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl -translate-y-1/2 rounded-full pointer-events-none" />
        
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted border-4 border-background shadow-xl overflow-hidden relative z-10">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.full_name || "Ram"}`} alt={profile?.full_name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-background z-20">
            <ShieldCheck size={16} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 justify-center md:justify-start relative">
            <h1 className="text-2xl font-bold">{profile?.full_name || "Farmer"}</h1>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none mx-auto md:mx-0 w-fit">
              Verified Farmer
            </Badge>
            <div className="absolute right-0 top-0 md:static md:ml-auto">
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
                      <label htmlFor="name-rural" className="text-sm font-medium">Full Name</label>
                      <input 
                        id="name-rural" 
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
          </div>
          <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-1 text-sm mb-4">
            <MapPin size={14} /> Ludhiana, Punjab
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Badge variant="outline" className="border-border bg-background">Farm ID: #PB-{profile?.id?.slice(0, 4) || "4029"}</Badge>
            <Badge variant="outline" className="border-border bg-background">Joined: {profile?.created_at ? new Date(profile.created_at).getFullYear() : "2024"}</Badge>
          </div>
        </div>

        <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-colors shrink-0 z-10">
          <QrCode size={32} className="mb-2" />
          <span className="text-[10px] font-bold uppercase tracking-wider">My Smart QR</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Agri Waste Sold", value: (profile?.waste_processed || 0) + " kg", icon: Wheat, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Eco Credits", value: profile?.eco_credits?.toLocaleString() || "0", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Pickup History", value: "8", icon: Tractor, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Marketplace Activity", value: "12", icon: Store, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat) => (
          <Card key={stat.label} className="card-premium overflow-hidden group">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className={`p-3 rounded-2xl mb-3 transition-transform group-hover:scale-110 ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <h3 className="font-bold text-xl mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Activity Feed */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold">Recent Activity</h2>
            <button className="text-xs text-primary hover:underline font-bold">View All</button>
          </div>
          
          <div className="space-y-4">
            {(activities.length > 0 ? activities : recentActivity).map((activity) => (
              <div key={activity.id} className="flex gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                  <activity.icon size={18} className={activity.color} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold">{activity.title}</h4>
                    <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings & Links */}
        <div className="space-y-4">
          <div className="card-premium overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary"><MapPin size={16} /></div>
                <div>
                  <h3 className="text-sm font-bold">Nearby Centers</h3>
                  <p className="text-xs text-muted-foreground">Manage default processing units</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            
            <div className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary"><Settings size={16} /></div>
                <div>
                  <h3 className="text-sm font-bold">Account Settings</h3>
                  <p className="text-xs text-muted-foreground">Farm details, bank info, notifications</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>

            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted text-foreground"><Globe size={16} /></div>
                <div>
                  <h3 className="text-sm font-bold">Language</h3>
                  <p className="text-xs text-muted-foreground">English / Hindi</p>
                </div>
              </div>
              <LanguageToggle />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted text-foreground"><User size={16} /></div>
                <div>
                  <h3 className="text-sm font-bold">Theme</h3>
                  <p className="text-xs text-muted-foreground">Light / Dark</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors font-bold text-sm"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
