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
import { LandingEcosystem } from "@/components/landing/LandingEcosystem"
import { LandingTestimonials } from "@/components/landing/LandingTestimonials"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      
      <LandingHeader />

      <main>
        <HeroSection />
        
        {/* Quick Metrics */}
        <div id="impact">
           <ImpactMetrics />
        </div>

        {/* The Problem & Our Solution */}
        <div id="problem">
          <ProblemSection />
        </div>

        {/* Ecosystem Partners (NEW) */}
        <div id="ecosystem">
           <LandingEcosystem />
        </div>

        {/* Technical How it Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Hardware Deep Dive */}
        <div id="hardware">
          <SmartBinDetailed />
        </div>

        {/* Openable Technical Sections */}
        <div id="blueprint">
           <LandingAccordion />
        </div>

        {/* Cloud Architecture */}
        <div id="architecture">
           <ArchitectureSection />
        </div>

        {/* Software Experience */}
        <div id="software">
          <AppExperience />
        </div>

        {/* Economy & Rewards */}
        <div id="economy">
          <RewardsEconomy />
        </div>

        {/* Testimonials & Proof (NEW) */}
        <div id="proof">
           <LandingTestimonials />
        </div>

        {/* Target Segments */}
        <div id="community">
          <TargetAudience />
        </div>

        {/* Long Term Vision */}
        <div id="vision">
          <SmartCityVision />
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
