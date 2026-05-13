"use client"

import { useRouter } from "next/navigation"
import { MapPin, Camera, Bell, ShieldCheck, Check, Zap, Eye, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"

const PERMISSIONS = [
  {
    id: "location",
    title: "Geospatial Navigation",
    description: "Map real-time waste nodes and synchronize with nearby disposal terminals.",
    icon: Navigation,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "camera",
    title: "Neural Vision Core",
    description: "Initialize hyperspectral scanning for automated material identification.",
    icon: Eye,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "notifications",
    title: "System Telemetry",
    description: "Receive critical network alerts, reward pulses, and status verification updates.",
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
]

export default function PermissionsScreen() {
  const router = useRouter()
  const { refreshMode } = useMode()

  const handleAllowAll = () => {
    localStorage.setItem("urjaloop_onboarded", "true")
    refreshMode()
    const mode = localStorage.getItem("urjaloop_mode")
    if (mode === "collector") {
      router.push("/collector")
    } else {
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    localStorage.setItem("urjaloop_onboarded", "true")
    refreshMode()
    const mode = localStorage.getItem("urjaloop_mode")
    if (mode === "collector") {
      router.push("/collector")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden p-6 transition-colors duration-300">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Strategic Header */}
      <div className="w-full max-w-lg mx-auto pt-12 pb-10 z-10 animate-in slide-in-from-top-6 fade-in duration-1000">
        <div className="flex items-center gap-4 mb-6">
           <div className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-primary shadow-2xl animate-pulse">
              <ShieldCheck size={28} strokeWidth={2.5} />
           </div>
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Access Protocol</span>
        </div>
        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Authorize Matrix</h1>
        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40 mt-3 max-w-[32ch] leading-relaxed">
          UrjaLoop requires high-level system permissions for optimal network synchronization.
        </p>
      </div>

      {/* Neural Permission Matrix */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-lg mx-auto space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both pb-40">
        {PERMISSIONS.map((perm) => (
          <div key={perm.id} className="ultra-glass rounded-[2rem] p-8 flex gap-6 items-center transition-all hover:bg-foreground/5 hover:border-primary/20 group">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-transform duration-500 group-hover:scale-110",
              perm.bg,
              perm.color
            )}>
              <perm.icon size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{perm.title}</h3>
              <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-widest opacity-60">{perm.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Control Deck */}
      <div className="fixed bottom-0 left-0 right-0 p-8 lg:p-12 z-30 pb-16">
        <div className="max-w-lg mx-auto space-y-6">
          <button
            onClick={handleAllowAll}
            className="w-full h-20 btn-premium rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center justify-center gap-4 group"
          >
            Authorize All Systems
            <Zap size={20} strokeWidth={3} className="group-hover:animate-pulse" />
          </button>
          <button
            onClick={handleSkip}
            className="w-full h-14 rounded-2xl font-black text-[10px] text-muted-foreground/60 hover:text-foreground uppercase tracking-[0.4em] transition-all active:scale-95"
          >
            Decline All Protocols
          </button>
        </div>
      </div>
    </div>
  )
}
