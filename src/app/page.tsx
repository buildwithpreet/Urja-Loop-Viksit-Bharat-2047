"use client"

import Link from "next/link"
import { Leaf, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { LanguageToggle } from "@/components/shared/LanguageToggle"
import { useLanguage } from "@/components/shared/LanguageProvider"

import { HeroSection } from "@/components/landing/HeroSection"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { SmartBinDetailed } from "@/components/landing/SmartBinDetailed"
import { AppExperience } from "@/components/landing/AppExperience"
import { RewardsEconomy } from "@/components/landing/RewardsEconomy"
import { TargetAudience } from "@/components/landing/TargetAudience"
import { SmartCityVision } from "@/components/landing/SmartCityVision"
import { LandingFooter } from "@/components/landing/LandingFooter"

export default function LandingPage() {
  const { t } = useLanguage()
  
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      
      {/* STICKY HEADER - MINIMALIST */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
              <Leaf size={16} strokeWidth={2} />
            </div>
            <span className="font-semibold text-lg tracking-tight">UrjaLoop</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
             <a href="#hardware" className="hover:text-foreground transition-colors">{t("landing_nav_bin")}</a>
             <a href="#software" className="hover:text-foreground transition-colors">{t("landing_nav_app")}</a>
             <a href="#economy" className="hover:text-foreground transition-colors">{t("landing_nav_rewards")}</a>
          </nav>

          <div className="flex items-center gap-4">
             <ThemeToggle />
             <LanguageToggle />
             <Link href="/login" className="hidden md:block">
               <button className="text-sm font-medium hover:text-primary transition-colors px-4 py-2">
                 {t("landing_login")}
               </button>
             </Link>
             <Link href="/login">
               <button className="bg-foreground text-background text-sm font-medium px-5 py-2 rounded-full hover:bg-foreground/90 transition-colors shadow-sm">
                 {t("landing_start")}
               </button>
             </Link>
             <button className="md:hidden text-foreground">
               <Menu size={24} />
             </button>
          </div>
          
        </div>
      </header>

      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorks />
        <SmartBinDetailed />
        <AppExperience />
        <RewardsEconomy />
        <TargetAudience />
        <SmartCityVision />
      </main>

      <LandingFooter />
    </div>
  )
}
