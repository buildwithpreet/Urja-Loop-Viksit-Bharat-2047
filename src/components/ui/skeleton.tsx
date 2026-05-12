import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-muted", className)}
      {...props}
    />
  )
}

function SkeletonCard() {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4 rounded-lg" />
          <Skeleton className="h-2.5 w-1/2 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  )
}

function SkeletonProductCard() {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden">
      <Skeleton className="aspect-[16/7] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-2/3 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-lg" />
        </div>
        <Skeleton className="h-3 w-1/2 rounded-lg" />
        <Skeleton className="h-10 w-full rounded-2xl" />
      </div>
    </div>
  )
}

function SkeletonStatRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-3 bg-card border border-border rounded-2xl space-y-2">
          <Skeleton className="w-8 h-8 rounded-xl" />
          <Skeleton className="h-5 w-12 rounded-lg" />
          <Skeleton className="h-2.5 w-16 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonProductCard, SkeletonStatRow }
