import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6", className)}>
      <div className="w-16 h-16 bg-muted rounded-3xl flex items-center justify-center mb-5">
        <Icon size={28} className="text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-bold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-premium text-xs gap-2 focus-ring"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
