"use client"

import { Leaf, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-mesh p-6">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-8">
        {/* Icon */}
        <div className="w-24 h-24 bg-destructive/10 rounded-3xl flex items-center justify-center">
          <Leaf className="text-destructive w-12 h-12" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Something went wrong</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
            An unexpected error occurred. Our team has been notified. You can try again or head back to the dashboard.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="btn-premium gap-2 focus-ring"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-all focus-ring"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-2 text-muted-foreground/50 pt-4">
          <Leaf size={14} className="text-primary/50" />
          <span className="text-[11px] font-semibold tracking-wider">UrjaLoop · Smart Waste Platform</span>
        </div>
      </div>
    </div>
  )
}
