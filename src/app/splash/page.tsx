"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Globe, Zap, ShieldCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function SplashScreen() {
  const router = useRouter()
  const [phase, setPhase] = useState(0) // 0: boot, 1: logo, 2: text, 3: complete

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => setPhase(3), 1800)
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setTimeout(() => {
        if (session) {
          router.push("/dashboard")
        } else {
          router.push("/onboarding")
        }
      }, 3200)
    }
    
    checkSession()
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Strategic Background Elements handled by Layout */}
      
      {/* Primary Glow Orb */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse pointer-events-none"></div>

      {/* Tactical Grid Overlay */}

      {/* Core Boot Sequence */}
      <div className="flex flex-col items-center space-y-16 z-10 relative">
        
        {/* Brand Mark */}
        <div className={`relative transition-all duration-1000 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          {/* Outer Tactical Ring */}
          <div className="absolute -inset-10 rounded-[4rem] border border-primary/20 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute -inset-16 rounded-[5rem] border border-foreground/5 animate-[spin_30s_linear_infinite_reverse]"></div>

          {/* Core Logo */}
          <div className="w-36 h-36 bg-primary rounded-[3rem] flex items-center justify-center shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <Globe className="text-white w-20 h-20 relative z-10 drop-shadow-2xl" strokeWidth={1.5} />
          </div>

          {/* Status Indicator */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-background flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-pulse z-20">
            <Zap size={16} fill="white" className="text-white" />
          </div>
        </div>

        {/* Brand Identity */}
        <div className={`text-center space-y-5 transition-all duration-1000 delay-200 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-2">
            <h1 className="text-6xl font-black text-foreground tracking-tighter sm:text-7xl">
              Urja<span className="text-primary">Loop</span>
            </h1>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] opacity-80">
              Neural Waste Intelligence Platform
            </p>
          </div>

          {/* Credential Bar */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="h-px flex-1 bg-foreground/5"></div>
            <div className="flex items-center gap-2 text-muted-foreground/30">
              <ShieldCheck size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">Viksit Bharat 2047</span>
            </div>
            <div className="h-px flex-1 bg-foreground/5"></div>
          </div>
        </div>

        {/* Boot Progress */}
        <div className={`space-y-6 w-64 transition-all duration-1000 delay-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Segmented Progress Bar */}
          <div className="flex gap-2">
            {[0,1,2,3,4].map((i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-primary/20 overflow-hidden"
              >
                <div
                  className="h-full bg-primary rounded-full animate-[grow_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 120}ms`, width: '0%' }}
                ></div>
              </div>
            ))}
          </div>
          <p className="text-center text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-40 animate-pulse">
            Synchronizing Network...
          </p>
        </div>
      </div>

      {/* Footer Mission Statement */}
      <div className={`absolute bottom-16 text-center transition-all duration-1000 delay-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="ultra-glass px-8 py-3 rounded-full border border-foreground/10 shadow-xl">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.35em]">
            Powered by AI • Built for Bharat
          </p>
        </div>
      </div>

    </div>
  )
}
