"use client"

import { 
  Leaf, 
  Trophy, 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  Wallet,
  Zap,
  BarChart3,
  BrainCircuit,
  Clock,
  History,
  AlertTriangle,
  PieChart as PieChartIcon,
  ChevronRight,
  Bell,
  TreePine,
  Recycle,
  Sparkles,
  Search,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { cn } from "@/lib/utils"

const areaData = [
  { day: "Mon", value: 400 },
  { day: "Tue", value: 300 },
  { day: "Wed", value: 600 },
  { day: "Thu", value: 800 },
  { day: "Fri", value: 500 },
  { day: "Sat", value: 900 },
  { day: "Sun", value: 700 },
]

const pieData = [
  { name: "Organic", value: 45, color: "#10b981" },
  { name: "Plastic", value: 25, color: "#3b82f6" },
  { name: "Paper", value: 20, color: "#f59e0b" },
  { name: "Glass", value: 10, color: "#8b5cf6" },
]

const activities = [
  { id: 1, type: "Waste Scanned", item: "Plastic Bottle", credits: "+5", time: "2m ago", status: "success", icon: Recycle },
  { id: 2, type: "Complaint", item: "Illegal Dumping Zone B", credits: "+20", time: "1h ago", status: "pending", icon: AlertTriangle },
  { id: 3, type: "Rewards", item: "Redeemed Amazon Voucher", credits: "-500", time: "3h ago", status: "success", icon: Trophy },
  { id: 4, type: "Waste Scanned", item: "Compost Bin Full", credits: "+12", time: "5h ago", status: "success", icon: CheckCircle2 },
]

export default function Home() {
  return (
    <div className="p-8 pb-32 lg:p-12 space-y-12 animate-in fade-in duration-1000">
      {/* Premium Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gradient tracking-tight">Welcome, Alex</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">Here's your sustainability impact for today.</p>
        </div>
        <div className="flex gap-4">
          <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-colors shadow-sm">
            <Bell size={22} />
          </button>
          <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-premium overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
          </div>
        </div>
      </div>

      {/* Hero Section: AI Insights & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Card */}
        <Card className="lg:col-span-1 bg-slate-900 border-none shadow-2xl relative overflow-hidden group rounded-[2.5rem]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-1000 translate-x-1/2 -translate-y-1/2"></div>
          <CardContent className="p-10 text-white relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 glass rounded-3xl flex items-center justify-center border border-white/10 shadow-glow">
                <Wallet className="text-emerald-400" size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Urja Credits</p>
                <p className="text-4xl font-black tabular-nums tracking-tighter">₹1,240.50</p>
              </div>
            </div>
            <button className="mt-8 w-full bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Zap size={20} fill="white" />
              REDEEM NOW
            </button>
          </CardContent>
        </Card>

        {/* AI Advanced Insights Card */}
        <Card className="lg:col-span-2 border-none shadow-premium bg-emerald-50/50 dark:bg-emerald-500/5 rounded-[2.5rem] overflow-hidden relative group">
          <div className="absolute top-4 right-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-emerald-100">
               <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Engine</span>
             </div>
          </div>
          <CardContent className="p-10 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-emerald-500 group-hover:rotate-12 transition-transform duration-500">
                <BrainCircuit size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Predictions</h3>
                <p className="text-slate-500 font-semibold text-sm">Smart waste forecasting for your area</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white flex flex-col gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-amber-500">
                  <AlertTriangle size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Congestion Alert</span>
                </div>
                <p className="text-sm font-bold text-slate-700">High waste detected in <span className="text-slate-900 font-black underline decoration-amber-300">Zone A (Sector 4)</span></p>
                <p className="text-[10px] text-slate-400 font-medium italic">Likely due to weekend market activity</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white flex flex-col gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 text-blue-500">
                  <Clock size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Next Milestone</span>
                </div>
                <p className="text-sm font-bold text-slate-700">Next smart bin overflow predicted in <span className="text-slate-900 font-black underline decoration-blue-300">5 hours</span></p>
                <p className="text-[10px] text-slate-400 font-medium italic">Schedule a drop-off before 4 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact Cards */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black text-slate-900">Environmental Impact</h2>
          <Badge className="bg-blue-500/10 text-blue-600 border-none px-4 py-1.5 font-black text-xs">MONTHLY REPORT</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "CO2 Reduced", value: "128.4 kg", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50", detail: "≈ 15% better than last month" },
            { label: "Trees Equivalent", value: "6.2 Trees", icon: TreePine, color: "text-emerald-500", bg: "bg-emerald-50", detail: "Oxygen for 12 humans/day" },
            { label: "Waste Processed", value: "1.2 Tons", icon: Recycle, color: "text-purple-500", bg: "bg-purple-50", detail: "From all tracked sources" },
          ].map((impact, i) => (
            <Card key={i} className="border-none shadow-premium rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${impact.bg} ${impact.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                  <impact.icon size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{impact.label}</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">{impact.value}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{impact.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="space-y-8">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black text-slate-900">Analytics & Trends</h2>
          <div className="flex gap-2">
            <button className="text-[10px] font-black text-slate-400 px-4 py-2 hover:text-slate-900 transition-colors uppercase">Daily</button>
            <button className="text-[10px] font-black text-emerald-600 px-4 py-2 bg-emerald-50 rounded-xl uppercase tracking-widest">Weekly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trend Chart */}
          <div className="card-premium p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black flex items-center gap-3 text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <BarChart3 size={18} />
                </div>
                Collection Trend
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> WASTE VOLUME</div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '20px', 
                      border: 'none', 
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      padding: '12px 16px'
                    }} 
                    itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={5} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="card-premium p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black flex items-center gap-3 text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <PieChartIcon size={18} />
                </div>
                Waste Breakdown
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="h-48 w-48 flex-shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={12} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-2xl font-black text-slate-900">42kg</p>
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 w-full sm:flex-1">
                {pieData.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-black text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <History size={20} />
            </div>
            Recent Activity
          </h2>
          <button className="text-xs font-black text-emerald-600 hover:underline">View History</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => (
            <div key={act.id} className="group p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-premium hover:border-emerald-100 transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  act.status === 'success' ? 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                  <act.icon size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{act.type}</h4>
                  <p className="text-xs text-slate-500 font-medium">{act.item} • {act.time}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-black text-base ${act.credits.startsWith('+') ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {act.credits}
                </div>
                <Badge variant="outline" className={cn(
                  "text-[8px] font-black uppercase px-2 py-0 h-4 border-none",
                  act.status === 'success' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                )}>
                  {act.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action FAB (Desktop only preview) */}
      <div className="hidden lg:flex fixed bottom-12 right-12 flex-col gap-4 z-40">
         <button className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group">
            <Zap size={24} className="group-hover:animate-pulse" />
         </button>
      </div>
    </div>
  )
}
