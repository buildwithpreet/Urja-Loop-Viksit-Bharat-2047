import { cn } from "@/lib/utils"
import { MapPin, Clock, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export type TaskStatus = "pending" | "in-progress" | "completed" | "urgent"

interface Task {
  id: string
  binId: string
  location: string
  wasteType: string[]
  priority: "low" | "medium" | "high" | "critical"
  eta: string
  status: TaskStatus
}

export function LiveStatusBadge({ status }: { status: TaskStatus }) {
  const config = {
    pending: { label: "Pending", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", icon: Clock },
    "in-progress": { label: "En Route", color: "text-blue-500 bg-blue-500/10 border-blue-500/20", icon: ArrowRight },
    completed: { label: "Completed", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
    urgent: { label: "Urgent", color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: AlertTriangle },
  }

  const { label, color, icon: Icon } = config[status]

  return (
    <div className={cn("px-2.5 py-1 rounded-full border flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest", color)}>
      <Icon size={10} strokeWidth={3} />
      {label}
    </div>
  )
}

export function TaskCard({ task }: { task: Task }) {
  const isCritical = task.priority === "critical" || task.status === "urgent"

  return (
    <div className={cn(
      "group relative bg-card/40 backdrop-blur-xl border rounded-3xl p-5 transition-all duration-300 hover:bg-card/80 overflow-hidden",
      isCritical ? "border-rose-500/30" : "border-border"
    )}>
      {isCritical && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-foreground">{task.binId}</h4>
            <LiveStatusBadge status={task.status} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MapPin size={12} className="text-primary" />
            {task.location}
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">ETA</p>
          <p className="text-sm font-black text-foreground">{task.eta}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {task.wasteType.map((type) => (
            <span key={type} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white/60">
              {type}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/collector/verification?taskId=${task.id}`}
          className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all"
        >
          <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
