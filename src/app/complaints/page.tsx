"use client"

import { useState } from "react"
import { 
  AlertTriangle,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  Clock,
  Navigation,
  ShieldCheck,
  Truck,
  Zap,
  Target,
  History,
  Filter
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const myComplaints = [
  { 
    id: "CMP-001", 
    type: "Overflowing Bin", 
    location: "Sector 14 Market", 
    time: "2 hours ago", 
    status: "In Progress",
    assignedTo: "Team Alpha (Truck #402)",
    expectedResolution: "Today, 4:00 PM",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "CMP-002", 
    type: "Illegal Dumping", 
    location: "Behind Metro Station", 
    time: "Yesterday", 
    status: "Resolved",
    assignedTo: "Rapid Response Team",
    expectedResolution: "Resolved at 10:30 AM",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "CMP-003", 
    type: "Damaged Bin", 
    location: "Park Entrance", 
    time: "10 mins ago", 
    status: "Pending",
    assignedTo: "Awaiting Assignment",
    expectedResolution: "To be determined",
    image: null
  },
]

export default function Complaints() {
  return (
    <div className="p-8 pb-32 lg:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header Section */}
      <div className="relative p-10 ultra-glass rounded-[3rem] overflow-hidden border border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8 group">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase">Incident Control</h1>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em] opacity-70">Log, Track & Resolve Community Concerns</p>
        </div>
        
        <div className="relative z-10 ultra-glass border border-foreground/10 px-8 py-4 rounded-3xl flex items-center gap-5 shadow-2xl">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
             <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
          <div>
             <p className="text-sm font-black text-foreground uppercase tracking-tight">System Validated</p>
             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Real-time Accountability</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* New Complaint Form */}
        <div className="lg:col-span-4 space-y-8">
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4">
             <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary">
                <AlertTriangle size={20} strokeWidth={2.5} />
             </div>
             New Report
          </h2>
          <Card className="border-none ultra-glass rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-8 space-y-8 relative z-10">
              <div className="space-y-6">
                {/* Photo Upload */}
                <div className="w-full aspect-[4/3] border-2 border-dashed border-foreground/10 rounded-[2rem] bg-foreground/5 flex flex-col items-center justify-center text-muted-foreground hover:bg-foreground/10 hover:border-primary/50 transition-all cursor-pointer group/upload overflow-hidden relative">
                   <div className="absolute inset-0 bg-mesh opacity-10"></div>
                   <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center shadow-inner group-hover/upload:scale-110 transition-transform mb-4 border border-foreground/10">
                    <Camera size={32} className="text-primary" strokeWidth={2.5} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-foreground">Initiate Capture</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest mt-2 opacity-50">Photographic Evidence Required</span>
                </div>

                {/* Location Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Geolocation Data</label>
                  <div className="flex gap-3">
                    <div className="flex-1 ultra-glass border border-foreground/10 rounded-2xl p-4 flex items-center gap-4 group/input">
                      <MapPin size={20} className="text-primary shrink-0 transition-transform group-hover/input:scale-110" strokeWidth={2.5} />
                      <input 
                        type="text" 
                        placeholder="Detecting Coordinates..." 
                        className="bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest text-foreground w-full placeholder:opacity-40"
                        defaultValue="Sector 14 • Block A • New Delhi"
                      />
                    </div>
                    <button className="w-14 h-14 ultra-glass border border-foreground/10 text-primary rounded-2xl flex items-center justify-center hover:bg-foreground/5 transition-all active:scale-90 shrink-0 shadow-lg">
                      <Target size={24} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Issue Type */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Classification</label>
                  <div className="relative">
                    <select className="w-full ultra-glass border border-foreground/10 rounded-2xl p-4 text-[11px] font-black uppercase tracking-widest text-foreground outline-none focus:border-primary/50 appearance-none cursor-pointer">
                      <option>Overflowing Smart Bin</option>
                      <option>Unauthorized Dumping</option>
                      <option>Infrastructure Damage</option>
                      <option>Bio-Hazard Detected</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                       <Clock size={16} />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button className="w-full btn-premium py-5 text-[11px] uppercase tracking-[0.2em] mt-4 shadow-primary/20 flex items-center justify-center gap-4">
                  <Upload size={20} strokeWidth={3} />
                  Transmit Report
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Tracking List */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-foreground/5 pb-6">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-4">
                <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary">
                    <History size={20} strokeWidth={2.5} />
                </div>
                Active Manifest
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                 {[
                   { label: "Pending", color: "bg-amber-500" },
                   { label: "Processing", color: "bg-blue-500" },
                   { label: "Resolved", color: "bg-emerald-500" }
                 ].map((s) => (
                    <span key={s.label} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <div className={cn("w-2 h-2 rounded-full shadow-sm", s.color)}></div>
                      {s.label}
                    </span>
                 ))}
              </div>
           </div>

           <div className="grid gap-6">
              {myComplaints.map((complaint) => (
                 <Card key={complaint.id} className="border-none ultra-glass rounded-[2.5rem] shadow-xl overflow-hidden group hover:bg-foreground/5 transition-all duration-500">
                    <CardContent className="p-0 flex flex-col xl:flex-row">
                       {/* Image */}
                       <div className="w-full xl:w-64 h-64 xl:h-auto shrink-0 bg-foreground/5 relative overflow-hidden">
                          {complaint.image ? (
                             <img src={complaint.image} alt="Issue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                          ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
                                <Camera size={32} strokeWidth={1} />
                                <span className="text-[10px] font-black uppercase tracking-widest mt-2">No Visual Log</span>
                             </div>
                          )}
                          <div className="absolute top-4 left-4 ultra-glass border border-foreground/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground">
                             {complaint.id}
                          </div>
                       </div>

                       {/* Details */}
                       <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="flex justify-between items-start gap-4">
                             <div className="space-y-1">
                                <h3 className="text-2xl font-black text-foreground tracking-tight uppercase">{complaint.type}</h3>
                                <div className="flex items-center gap-2">
                                   <MapPin size={14} className="text-primary" />
                                   <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Location: {complaint.location}</p>
                                </div>
                             </div>
                             <Badge className={cn(
                                "px-5 py-2 font-black border-none text-[10px] tracking-[0.15em] uppercase rounded-xl shadow-xl",
                                complaint.status === "Pending" ? "bg-amber-500/10 text-amber-500 shadow-amber-500/10" :
                                complaint.status === "In Progress" ? "bg-blue-500/10 text-blue-500 shadow-blue-500/10" :
                                "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/10"
                             )}>
                                {complaint.status}
                             </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="p-5 rounded-2xl bg-foreground/5 border border-foreground/5 space-y-3">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] block opacity-50">Logistics Deployment</span>
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl ultra-glass flex items-center justify-center text-primary">
                                      {complaint.status !== "Pending" ? <Truck size={20} strokeWidth={2.5} /> : <Clock size={20} strokeWidth={2.5} />}
                                   </div>
                                   <span className="text-[11px] font-black text-foreground uppercase tracking-tight">
                                      {complaint.assignedTo}
                                   </span>
                                </div>
                             </div>
                             <div className="p-5 rounded-2xl bg-foreground/5 border border-foreground/5 space-y-3">
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] block opacity-50">System Estimation</span>
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl ultra-glass flex items-center justify-center text-primary">
                                      {complaint.status === "Resolved" ? <CheckCircle2 size={20} strokeWidth={2.5} className="text-emerald-500" /> : <Clock size={20} strokeWidth={2.5} />}
                                   </div>
                                   <span className="text-[11px] font-black text-foreground uppercase tracking-tight">
                                      {complaint.expectedResolution}
                                   </span>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                             <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-40">
                                <Clock size={14} /> Reported {complaint.time}
                             </div>
                             <button className="text-[10px] font-black text-primary hover:text-primary/80 flex items-center gap-2 uppercase tracking-widest transition-all group/link">
                                Monitor Real-time <Navigation size={14} strokeWidth={3} className="group-hover/link:translate-x-1 transition-transform" />
                             </button>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              ))}
           </div>
        </div>

      </div>
    </div>
  )
}
