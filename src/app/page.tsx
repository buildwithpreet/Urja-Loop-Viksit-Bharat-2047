"use client"

import { HeroSection } from "@/components/landing/HeroSection"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { SmartBinDetailed } from "@/components/landing/SmartBinDetailed"
import { AppExperience } from "@/components/landing/AppExperience"
import { RewardsEconomy } from "@/components/landing/RewardsEconomy"
import { TargetAudience } from "@/components/landing/TargetAudience"
import { SmartCityVision } from "@/components/landing/SmartCityVision"
import { LandingFooter } from "@/components/landing/LandingFooter"
import { LandingHeader } from "@/components/landing/LandingHeader"
import { LandingAccordion } from "@/components/landing/LandingAccordion"
import { ArchitectureSection } from "@/components/landing/ArchitectureSection"
import { ImpactMetrics } from "@/components/landing/ImpactMetrics"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      
      <LandingHeader />

      <main>
        <HeroSection />
        
        {/* New: Impact Quick Metrics */}
        <div id="impact">
           <ImpactMetrics />
        </div>

        <div id="problem">
          <ProblemSection />
        </div>

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <div id="hardware">
          <SmartBinDetailed />
        </div>

        {/* New: Openable Technical Sections */}
        <div id="blueprint">
           <LandingAccordion />
        </div>

        <div id="architecture">
           <ArchitectureSection />
        </div>

        <div id="software">
          <AppExperience />
        </div>

        <div id="economy">
          <RewardsEconomy />
        </div>

        <div id="community">
          <TargetAudience />
        </div>

        <div id="vision">
          <SmartCityVision />
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
