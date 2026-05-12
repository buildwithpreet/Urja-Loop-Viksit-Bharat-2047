"use client"

import { History, CheckCircle2, Zap, Trophy, Recycle, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const activityList = [
  { id: 1, type: "drop", title: "Waste drop completed", desc: "2.4kg Plastic at Sector 14", time: "2h ago", credits: "+24", status: "Verified" },
  { id: 2, type: "bonus", title: "Weekly Streak Bonus", desc: "4 drops this week", time: "Yesterday", credits: "+50", status: "Verified" },
  { id: 3, type: "drop", title: "Biomass collection", desc: "400kg Rice Straw", time: "2 days ago", credits: "+450", status: "Verified" },
  { id: 4, type: "drop", title: "Metal Scrap drop", desc: "0.8kg Aluminum", time: "3 days ago", credits: "+12", status: "Verified" },
]

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-bold tracking-tight">Activity History</h1>
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <History size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activityList.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-3xl p-5 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                item.type === "drop" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
              )}>
                {item.type === "drop" ? <Recycle size={20} /> : <Zap size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-bold text-foreground truncate">{item.title}</h3>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{item.credits}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{item.desc}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.time}</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded-full">
                    <CheckCircle2 size={8} className="text-emerald-500" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full p-4 rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
        Load More Activity <ArrowUpRight size={14} />
      </button>
    </div>
  )
}
