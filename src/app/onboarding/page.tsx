"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BrainCircuit, ScanLine, Trophy, Earth, ArrowRight, Check, Zap, Target, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"

export default function OnboardingScreen() {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)

  const ONBOARDING_STEPS = [
    {
      id: 1,
      title: t("onboarding_1_title"),
      description: t("onboarding_1_desc"),
      icon: BrainCircuit,
      color: "text-primary",
      bg: "bg-primary/10",
      gradient: "from-primary/20 to-transparent",
    },
    {
      id: 2,
      title: t("onboarding_2_title"),
      description: t("onboarding_2_desc"),
      icon: ScanLine,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      gradient: "from-blue-500/20 to-transparent",
    },
    {
      id: 3,
      title: t("onboarding_3_title"),
      description: t("onboarding_3_desc"),
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500/20 to-transparent",
    },
    {
      id: 4,
      title: t("onboarding_4_title"),
      description: t("onboarding_4_desc"),
      icon: Earth,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500/20 to-transparent",
    },
  ]

  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      router.push("/login")
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    router.push("/login")
  }

  const StepContent = ONBOARDING_STEPS[currentStep]

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden bg-mesh">
      {/* Strategic Background Gradient */}
      <div className={cn(
        "absolute inset-0 transition-all duration-1000 bg-gradient-to-b opacity-20",
        StepContent.gradient
      )}></div>

      {/* Premium Header */}
      <div className="w-full p-8 lg:p-12 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 group">
           <div className="w-12 h-12 ultra-glass border border-foreground/10 rounded-2xl flex items-center justify-center text-primary shadow-2xl group-hover:rotate-12 transition-transform">
              <Earth size={28} strokeWidth={2.5} />
           </div>
           <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase leading-none">Urja<span className="text-primary">Loop</span></span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Tactical Node</span>
           </div>
        </div>
        {!isLastStep && (
          <button 
            onClick={handleSkip}
            className="text-[10px] font-black text-muted-foreground hover:text-primary transition-all px-6 py-3 uppercase tracking-widest ultra-glass rounded-2xl border border-foreground/10"
          >
            {t("auth_skip")}
          </button>
        )}
      </div>

      {/* Immersive Tactical View */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 w-full max-w-lg mx-auto">
        <div 
          key={currentStep}
          className="w-full flex flex-col items-center animate-in slide-in-from-bottom-20 fade-in duration-1000 ease-out fill-mode-both"
        >
          {/* Central Neural Interface */}
          <div className="relative mb-20 group">
            <div className={cn(
              "w-64 h-64 lg:w-72 lg:h-72 rounded-[4rem] ultra-glass border border-foreground/10 flex items-center justify-center shadow-2xl transition-all duration-1000 rotate-6 group-hover:rotate-0 relative overflow-hidden",
              StepContent.bg
            )}>
              <div className="absolute inset-0 bg-mesh opacity-20 animate-pulse"></div>
              <StepContent.icon className={cn("w-32 h-32 lg:w-40 lg:h-40 drop-shadow-2xl", StepContent.color)} strokeWidth={1.5} />
            </div>
            
            {/* Tactical Decals */}
            <div className={cn(
              "absolute inset-[-20px] rounded-[5rem] border border-dashed opacity-10 animate-[spin_30s_linear_infinite]",
              StepContent.color.replace('text-', 'border-')
            )}></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 ultra-glass border border-foreground/10 rounded-2xl flex items-center justify-center text-primary shadow-2xl">
               <Zap size={24} strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center space-y-6 w-full">
            <div className="space-y-2">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Module 0{currentStep + 1}</p>
               <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter uppercase leading-none max-w-[10ch] mx-auto">
                 {StepContent.title}
               </h2>
            </div>
            <p className="text-sm lg:text-base font-bold text-muted-foreground/60 leading-relaxed max-w-[32ch] mx-auto uppercase tracking-wide">
              {StepContent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Control Deck */}
      <div className="w-full p-10 lg:p-12 z-20 max-w-lg mx-auto space-y-12 pb-20">
        {/* Progress Matrix */}
        <div className="flex justify-center items-center gap-4">
          {ONBOARDING_STEPS.map((step, idx) => (
            <div 
              key={step.id} 
              className={cn(
                "h-2 rounded-full transition-all duration-700",
                currentStep === idx 
                  ? "w-16 bg-primary shadow-2xl shadow-primary/40" 
                  : "w-4 bg-foreground/5 border border-foreground/5"
              )}
            />
          ))}
        </div>

        {/* Tactical Engagement Button */}
        <button
          onClick={handleNext}
          className={cn(
            "w-full flex items-center justify-center gap-4 h-20 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl group relative overflow-hidden",
            isLastStep 
              ? "btn-premium shadow-primary/30" 
              : "ultra-glass border border-foreground/10 text-foreground shadow-2xl"
          )}
        >
          {isLastStep ? t("auth_finish") : t("auth_next")}
          <div className="group-hover:translate-x-2 transition-transform">
             {isLastStep ? <ShieldCheck size={20} strokeWidth={3} /> : <ArrowRight size={20} strokeWidth={3} />}
          </div>
        </button>
      </div>
    </div>
  )
}
