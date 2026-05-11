"use client"

import Link from "next/link"
import { ArrowRight, Play, ShieldCheck, Activity, Cpu, Globe, MousePointer2 } from "lucide-react"
import { SmartBinAnimation } from "@/components/shared/SmartBinAnimation"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-white dark:bg-[#0A0C0B] transition-colors duration-300">
      
      {/* Premium Background: Subtle Grid & Gradient */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #1F7A3D 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#1F7A3D]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1F7A3D]/10 dark:bg-[#1F7A3D]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* LEFT SIDE: Elegant Typography & CTAs */}
          <div className="flex-[1.2] space-y-10 text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F7A3D]/5 dark:bg-[#1F7A3D]/10 border border-[#1F7A3D]/10 dark:border-[#1F7A3D]/20 text-[#1F7A3D] dark:text-[#34D399] text-[11px] font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A3D] dark:bg-[#34D399] animate-pulse" />
              Smart India Infrastructure
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-[4.2rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Smart Waste Infrastructure <br className="hidden xl:block" />
                for <span className="text-[#1F7A3D] dark:text-[#34D399]">Modern India.</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-[#A3A3A3] leading-relaxed max-w-xl mx-auto lg:mx-0">
                A premium AI-powered ecosystem designed to bridge the gap between citizens, 
                farmers, and urban municipalities for a cleaner, circular economy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link href="/login">
                <button className="h-14 px-10 bg-[#34D399] text-black font-semibold rounded-full hover:bg-[#2BA855] transition-all active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                  Explore Platform
                </button>
              </Link>
              <button className="h-14 px-8 flex items-center gap-3 text-neutral-900 dark:text-white font-medium hover:text-[#1F7A3D] dark:hover:text-[#34D399] transition-colors group">
                <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center group-hover:border-[#1F7A3D]/30 dark:group-hover:border-[#34D399]/30 group-hover:bg-[#1F7A3D]/5 dark:group-hover:bg-[#34D399]/5 transition-all">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                See How It Works
              </button>
            </div>

            {/* Trust Bar */}
            <div className="pt-8 border-t border-neutral-100 dark:border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
               <div className="flex items-center gap-2 text-neutral-500 dark:text-[#666666] text-xs font-medium">
                  <ShieldCheck size={14} strokeWidth={2} /> AI Verified
               </div>
               <div className="flex items-center gap-2 text-neutral-500 dark:text-[#666666] text-xs font-medium">
                  <Activity size={14} strokeWidth={2} /> IoT Enabled
               </div>
               <div className="flex items-center gap-2 text-neutral-500 dark:text-[#666666] text-xs font-medium">
                  <Activity size={14} strokeWidth={2} /> Edge Processing
               </div>
               <div className="flex items-center gap-2 text-neutral-500 dark:text-[#666666] text-xs font-medium">
                  <Globe size={14} strokeWidth={2} /> Viksit Bharat 2047
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: Product Visuals */}
          <div className="flex-1 w-full relative">
            
            {/* Grounding Environment */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F7A3D]/10 to-transparent blur-3xl opacity-40 rounded-[100%] scale-110 pointer-events-none" />

            <div className="relative flex justify-center items-center">
              
              {/* Main Product Render Container */}
              <div className="relative scale-110 md:scale-125 z-10 transition-transform duration-700 hover:scale-135">
                 <SmartBinAnimation />
                 
                 {/* Floating UI Elements around the bin */}
                 <div className="absolute top-10 -right-20 animate-bounce" style={{ animationDuration: '4s' }}>
                    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <MousePointer2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                       </div>
                       <div className="pr-2">
                          <p className="text-[10px] text-neutral-400 dark:text-white/40 uppercase font-bold tracking-widest">Active Scan</p>
                          <p className="text-[11px] text-neutral-900 dark:text-white font-medium">User #0482 verified</p>
                       </div>
                    </div>
                 </div>

                 <div className="absolute -bottom-10 -left-16 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                    <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-[#1F7A3D]/20 dark:bg-[#34D399]/20 flex items-center justify-center">
                          <ShieldCheck size={14} className="text-[#1F7A3D] dark:text-[#34D399]" />
                       </div>
                       <div className="pr-2">
                          <p className="text-[10px] text-neutral-400 dark:text-white/40 uppercase font-bold tracking-widest">Capacity</p>
                          <p className="text-[11px] text-neutral-900 dark:text-white font-medium">18% Filled · Stable</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Ecosystem Tags */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                 <span className="absolute top-1/4 -left-4 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[10px] text-neutral-600 dark:text-white/60 backdrop-blur-sm">Household</span>
                 <span className="absolute top-1/2 -right-8 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[10px] text-neutral-600 dark:text-white/60 backdrop-blur-sm">Farmers</span>
                 <span className="absolute bottom-1/4 -left-8 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[10px] text-neutral-600 dark:text-white/60 backdrop-blur-sm">Municipalities</span>
              </div>
            </div>

          </div>
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#1F7A3D]/50 dark:via-[#34D399]/50 to-transparent" />
           <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 dark:text-[#666666]">Scroll to Explore</span>
        </div>

      </div>
    </section>
  )
}
