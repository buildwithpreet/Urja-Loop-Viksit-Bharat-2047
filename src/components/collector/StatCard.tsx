import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color?: "emerald" | "blue" | "cyan" | "amber" | "rose" | "purple"
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  color = "emerald" 
}: StatCardProps) {
  
  const colorMap = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  }

  const selectedColor = colorMap[color]

  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-5 flex flex-col justify-between hover:bg-card/80 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className={cn("p-2 rounded-xl border", selectedColor)}>
          <Icon size={16} />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-black tracking-tighter text-foreground">
          {value}
        </p>
        
        {trend && (
          <p className={cn(
            "text-[10px] font-bold tracking-widest uppercase",
            trendUp ? "text-emerald-500" : "text-rose-500"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
    </div>
  )
}
