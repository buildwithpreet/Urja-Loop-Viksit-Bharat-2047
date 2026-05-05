"use client"

import { 
  Trophy, 
  Recycle, 
  Leaf, 
  Settings, 
  ChevronRight, 
  LogOut, 
  Camera, 
  Bell, 
  ShieldCheck, 
  MapPin,
  Zap,
  Moon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function Profile() {
  return (
    <div className="p-8 pb-32 lg:p-12 space-y-12 animate-in fade-in duration-1000">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group">
          <div className="w-40 h-40 rounded-4xl border-4 border-white dark:border-slate-800 shadow-premium overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-90 transition-all border-4 border-slate-50 dark:border-slate-900">
            <Camera size={20} />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl font-black text-gradient tracking-tight">Alex Harrison</h1>
            <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1 flex items-center justify-center md:justify-start gap-2">
              <MapPin size={16} className="text-emerald-500" />
              Green Valley, Block C-12
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-4 py-1.5 font-black text-xs rounded-xl">GOLD MEMBER</Badge>
            <Badge className="bg-blue-500/10 text-blue-600 border-none px-4 py-1.5 font-black text-xs rounded-xl">TOP CONTRIBUTOR</Badge>
          </div>
        </div>
        <button className="glass px-8 py-4 rounded-2xl text-sm font-black text-slate-900 dark:text-white shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-3">
          <Settings size={20} />
          EDIT PROFILE
        </button>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Waste Contributed", value: "248kg", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "CO2 Saved", value: "84.2kg", icon: Leaf, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Rewards Earned", value: "1,240", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="card-premium p-8 space-y-6">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} dark:bg-emerald-500/10 ${stat.color} flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Activity */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recent Activity</h2>
          <div className="card-premium divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Zap size={22} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900 dark:text-white">Waste Drop-off Reward</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sector 5 Smart Bin • 2.4kg Plastic</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-600">+ ₹24.00</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">2h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Preferences */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quick Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Theme Toggle Card */}
            <div className="card-premium p-6 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Moon size={22} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-black text-slate-900 dark:text-white">Appearance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Switch between light and dark</p>
              </div>
              <ThemeToggle />
            </div>

            {[
              { label: "Notification Settings", icon: Bell, desc: "Manage alert preferences" },
              { label: "Privacy & Security", icon: ShieldCheck, desc: "Control your data sharing" },
            ].map((item, i) => (
              <button key={i} className="card-premium p-6 flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-slate-700 transition-all flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-all" />
              </button>
            ))}
          </div>
          <button className="w-full py-5 rounded-3xl bg-red-50 dark:bg-red-500/10 text-red-500 font-black text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-3">
            <LogOut size={18} />
            LOGOUT ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )
}
