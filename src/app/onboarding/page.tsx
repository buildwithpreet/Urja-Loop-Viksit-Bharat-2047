"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronRight, 
  ChevronLeft,
  Leaf, 
  Cpu, 
  Globe, 
  Wallet, 
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  QrCode,
  Scan,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    headline: "Turn Waste Into Digital Value.",
    subtext: "AI-powered smart waste infrastructure for cleaner cities and sustainable communities.",
    icon: Leaf,
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-500",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="relative w-48 h-80 bg-white dark:bg-emerald-950/20 border border-emerald-500/30 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col items-center p-6">
           {/* Smart Bin Simulation */}
           <div className="w-full h-12 bg-emerald-500 rounded-full mb-8 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-1/2 h-1 bg-white/30 rounded-full" />
           </div>
           <div className="flex-1 w-full flex flex-col gap-4">
              <div className="w-full h-24 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center">
                 <Scan className="text-emerald-500 animate-pulse" size={32} />
              </div>
              <div className="w-full h-32 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex flex-col p-4 gap-2">
                 <div className="w-1/2 h-2 bg-emerald-500/20 rounded-full" />
                 <div className="w-3/4 h-2 bg-emerald-500/10 rounded-full" />
              </div>
           </div>
           <div className="mt-auto flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">AI Verified</span>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    headline: "Scan. Sort. Reward.",
    subtext: "AI automatically identifies waste type and helps citizens dispose responsibly.",
    icon: Cpu,
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-500",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm px-6">
           <div className="aspect-square rounded-3xl bg-white dark:bg-white/5 border border-white/10 shadow-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                 <Leaf size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Organic</span>
           </div>
           <div className="aspect-square rounded-3xl bg-white dark:bg-white/5 border border-white/10 shadow-xl p-6 flex flex-col items-center justify-center gap-4 border-blue-500/30">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                 <Zap size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Dry Waste</span>
           </div>
           <div className="col-span-2 p-6 rounded-3xl bg-white dark:bg-white/5 border border-white/10 shadow-xl flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-muted">
                 <div className="absolute inset-0 border-2 border-emerald-500/50 animate-pulse" />
                 <div className="w-full h-full bg-gradient-to-tr from-emerald-500/20 to-transparent" />
              </div>
              <div>
                 <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Detected</p>
                 <p className="text-sm font-medium">PET Plastic Bottle</p>
              </div>
              <div className="ml-auto text-emerald-500 font-black text-xs">+12C</div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    headline: "Your City. Cleaner Every Day.",
    subtext: "Track environmental impact, nearby cleanup activity, and smart collection points in real time.",
    icon: Globe,
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
        <div className="relative w-full max-w-md aspect-video bg-white dark:bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
           {/* Map Simulation */}
           <div className="absolute inset-0 opacity-20" style={{
             backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
             backgroundSize: "24px 24px"
           }} />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
                 <MapPin className="text-primary relative z-10" size={32} />
              </div>
           </div>
           <div className="absolute top-6 left-6 p-3 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Active Bins: 142</span>
           </div>
           <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-primary text-primary-foreground flex flex-col gap-1 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">CO2 Offset</span>
              <span className="text-xl font-black">1.2 Tons</span>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    headline: "Earn Urja Credits.",
    subtext: "Get rewarded for responsible waste disposal and sustainable participation.",
    icon: Wallet,
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-500",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="relative w-64 h-40 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-500">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Leaf className="text-white" size={20} />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Balance</p>
                    <p className="text-2xl font-black text-white leading-none">2,450</p>
                 </div>
              </div>
              <div>
                 <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase">Urja Eco Wallet</p>
                 <div className="flex justify-between items-end mt-2">
                    <div className="flex gap-1">
                       {[1,2,3,4].map(i => <div key={i} className="w-6 h-1 bg-white/20 rounded-full" />)}
                    </div>
                    <div className="w-8 h-5 bg-white/10 rounded-md border border-white/20" />
                 </div>
              </div>
           </div>
        </div>
        
        {/* Floating Reward Icons */}
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-white dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
           <Zap className="text-emerald-500" size={20} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-white dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
           <RefreshCw className="text-blue-500" size={16} />
        </div>
      </div>
    )
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      router.push("/setup-profile")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Background Ambient Glow */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] transition-colors duration-1000 blur-[150px] opacity-20 pointer-events-none z-0",
        step.color.split(' ')[0]
      )} />

      {/* Header / Progress */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
               <Leaf size={16} strokeWidth={3} />
            </div>
            <span className="font-bold tracking-tight text-lg">UrjaLoop</span>
         </div>
         
         <button 
           onClick={() => router.push("/setup-profile")}
           className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
         >
           Skip
         </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-center max-w-6xl mx-auto px-6 gap-12 lg:gap-20 pt-10 pb-40">
         
         {/* Visual Side */}
         <div className="flex-1 w-full max-w-lg aspect-square relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            {step.visual}
         </div>

         {/* Text Side */}
         <div className="flex-1 w-full max-w-lg flex flex-col pt-10 lg:pt-0">
            <div className="space-y-6 text-center lg:text-left">
               <div className="min-h-[280px] lg:min-h-[320px] flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1] text-foreground mb-8">
                     {step.headline}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                     {step.subtext}
                  </p>
               </div>
            </div>
         </div>

      </main>

      {/* FIXED BOTTOM NAVIGATION - Ensures buttons NEVER move */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-border/50">
         <div className="max-w-6xl mx-auto px-6 h-32 flex items-center justify-between gap-4">
            
            {/* Back Button Slot */}
            <div className="flex-1 flex justify-start">
               {currentStep > 0 && (
                 <button 
                   onClick={handleBack}
                   className="h-14 px-6 text-muted-foreground font-semibold hover:text-foreground transition-all flex items-center gap-2 group"
                 >
                   <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                   <span className="hidden sm:inline">Previous</span>
                 </button>
               )}
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2.5">
               {steps.map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "h-1.5 rounded-full transition-all duration-500",
                     i === currentStep ? "w-10 bg-primary shadow-[0_0_10px_rgba(41,195,106,0.3)]" : "w-3 bg-muted hover:bg-muted-foreground/30 cursor-pointer"
                   )}
                   onClick={() => setCurrentStep(i)}
                 />
               ))}
            </div>

            {/* Continue Button Slot - FIXED POSITION */}
            <div className="flex-1 flex justify-end">
               <button 
                 onClick={handleNext}
                 className="h-16 px-10 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 min-w-[180px]"
               >
                 <span>{currentStep === steps.length - 1 ? "Get Started" : "Continue"}</span>
                 <ArrowRight size={20} />
               </button>
            </div>

         </div>
      </nav>

      {/* Footer Branding - Hidden on small screens to save space for the nav */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 h-20 hidden lg:flex items-center justify-start border-t border-border/50 mb-32">
         <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Verified</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Viksit Bharat 2047</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Eco-Economy</span>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}} />

    </div>
  )
}

