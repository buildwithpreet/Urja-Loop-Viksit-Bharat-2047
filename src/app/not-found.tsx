import Link from "next/link"
import { Leaf, ArrowLeft, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-mesh p-6">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-8">
        {/* Icon */}
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
          <MapPin className="text-primary w-12 h-12" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-foreground tracking-tighter">404</h1>
          <p className="text-lg font-semibold text-foreground">Page Not Found</p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="btn-premium shadow-lg shadow-primary/20 gap-2 focus-ring"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Brand */}
        <div className="flex items-center gap-2 text-muted-foreground/50 pt-4">
          <Leaf size={14} className="text-primary/50" />
          <span className="text-[11px] font-semibold tracking-wider">UrjaLoop · Smart Waste Platform</span>
        </div>
      </div>
    </div>
  )
}
