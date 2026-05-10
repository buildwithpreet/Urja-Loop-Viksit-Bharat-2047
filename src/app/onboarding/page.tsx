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
      router.push("/setup-profile")
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    router.push("/setup-profile")
  }

  const StepContent = ONBOARDING_STEPS[currentStep]

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glows */}
      <div className={cn(
        "absolute inset-0 transition-all duration-1000 opacity-20 dark:opacity-10 blur-[120px]",
        StepContent.bg.replace('/10', '/30')
      )} />

      {/* Header */}
      <div className="w-full p-8 md:p-12 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <Earth size={20} strokeWidth={2} />
           </div>
           <span className="font-medium text-lg text-foreground tracking-tight">UrjaLoop</span>
        </div>
        {!isLastStep && (
          <button 
            onClick={handleSkip}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 w-full max-w-2xl mx-auto">
        <div 
          key={currentStep}
          className="w-full flex flex-col items-center text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          {/* Visual Container */}
          <div className="relative">
            <div className={cn(
              "w-48 h-48 md:w-56 md:h-56 rounded-[2.5rem] bg-card border border-border flex items-center justify-center shadow-2xl relative z-10",
              StepContent.bg
            )}>
              <StepContent.icon className={cn("w-24 h-24 md:w-28 md:h-28", StepContent.color)} strokeWidth={1.5} />
            </div>
            
            {/* Subtle Aura */}
            <div className={cn(
              "absolute inset-[-20px] rounded-full blur-2xl opacity-20 animate-pulse",
              StepContent.bg
            )}></div>
          </div>

          <div className="space-y-4">
             <p className="text-[10px] font-bold text-primary dark:text-[#34D399] uppercase tracking-[0.2em]">Step {currentStep + 1} of 4</p>
             <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight">
               {StepContent.title}
             </h2>
             <p className="text-muted-foreground leading-relaxed max-w-md mx-auto text-lg">
               {StepContent.description}
             </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full p-10 md:p-12 z-20 max-w-md mx-auto space-y-10 pb-16">
        {/* Progress Dots */}
        <div className="flex justify-center items-center gap-3">
          {ONBOARDING_STEPS.map((step, idx) => (
            <div 
              key={step.id} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentStep === idx 
                  ? "w-8 bg-primary" 
                  : "w-1.5 bg-neutral-200 dark:bg-white/10"
              )}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className={cn(
            "w-full flex items-center justify-center gap-3 h-14 rounded-full font-semibold text-sm transition-all active:scale-95 shadow-xl group",
            isLastStep 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(31,122,61,0.2)]" 
              : "bg-muted/50 text-foreground border border-border hover:bg-muted"
          )}
        >
          {isLastStep ? "Complete Setup" : "Next Step"}
          <div className="group-hover:translate-x-1 transition-transform">
             {isLastStep ? <Check size={18} strokeWidth={3} /> : <ArrowRight size={18} strokeWidth={3} />}
          </div>
        </button>
      </div>
    </div>
  )
}
