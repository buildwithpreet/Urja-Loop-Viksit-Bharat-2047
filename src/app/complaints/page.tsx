"use client"

import { useState } from "react"
import { 
  MapPin, 
  Clock, 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const initialComplaints = [
  {
    id: "CMP-4021",
    issue: "Large overflow at main gate",
    location: "Sector 5, Market Area",
    date: "May 02, 2026",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400",
    description: "Bin #12 is completely full and trash is spilling onto the sidewalk."
  },
  {
    id: "CMP-3982",
    issue: "Illegal dumping behind park",
    location: "Green Ridge, Phase 2",
    date: "Apr 28, 2026",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400",
    description: "Construction debris dumped overnight near the children's playground."
  },
  {
    id: "CMP-3845",
    issue: "Smart bin sensor malfunction",
    location: "Railway Station, Exit 4",
    date: "Apr 20, 2026",
    status: "Resolved",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
    description: "The sensor shows 100% full but the bin was emptied this morning."
  }
]

export default function Complaints() {
  const [filter, setFilter] = useState("All")

  const filteredComplaints = filter === "All" 
    ? initialComplaints 
    : initialComplaints.filter(c => c.status === filter)

  return (
    <div className="p-8 pb-32 lg:p-12 space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gradient tracking-tight">Support & Tracking</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">Manage and monitor your reports</p>
        </div>
        <Tabs defaultValue="All" onValueChange={setFilter} className="w-full md:w-auto">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1.5 h-14 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-full grid grid-cols-4 gap-1">
            {["All", "Pending", "In Progress", "Resolved"].map((t) => (
              <TabsTrigger 
                key={t} 
                value={t} 
                className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-600 data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-wider transition-all"
              >
                {t === "In Progress" ? "ACTIVE" : t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Complaint List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((comp) => (
            <div key={comp.id} className="card-premium group overflow-hidden flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={comp.image} 
                  alt={comp.issue} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={
                    comp.status === "Pending" ? "bg-amber-500 border-none shadow-lg shadow-amber-500/20" :
                    comp.status === "In Progress" ? "bg-blue-500 border-none shadow-lg shadow-blue-500/20" :
                    "bg-emerald-500 border-none shadow-lg shadow-emerald-500/20"
                  }>
                    {comp.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{comp.id}</p>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{comp.issue}</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-slate-500 text-xs font-bold">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner">
                      <MapPin size={14} />
                    </div>
                    {comp.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-inner">
                      <Clock size={14} />
                    </div>
                    Reported on {comp.date}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-auto flex gap-3">
                  <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl text-xs font-black hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95">
                    TRACK CASE
                  </button>
                  <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:text-slate-900 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center space-y-6 bg-white rounded-4xl border border-dashed border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 shadow-inner">
              <Search size={48} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">No records found</p>
              <p className="text-slate-500 font-medium max-w-xs">There are no reports matching your current filter settings.</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Report Button */}
      <button className="md:hidden fixed bottom-32 right-8 w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/40 active:scale-90 transition-all border-4 border-white">
        <Camera size={28} />
      </button>
    </div>
  )
}
