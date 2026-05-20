"use client"

import { useLanguage } from "@/components/shared/LanguageProvider"
import { LandingHeader } from "@/components/landing/LandingHeader"
import { BioGridHero } from "@/components/landing/BioGridHero"
import { WasteToEnergyPipeline } from "@/components/biogrid/WasteToEnergyPipeline"
import { CarbonAndImpact } from "@/components/biogrid/CarbonAndImpact"
import { AIEngine } from "@/components/biogrid/AIEngine"
import { SmartDigester } from "@/components/biogrid/SmartDigester"
import { LandingFooter } from "@/components/landing/LandingFooter"
import { motion } from "framer-motion"

export default function LandingPage() {
  const { t } = useLanguage()
  
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <LandingHeader />

      <main>
        <BioGridHero />
        
        {/* BioGrid Dashboard Sneak Peek Section */}
        <section id="infrastructure" className="py-24 relative overflow-hidden bg-black/50">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Neural Infrastructure</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-time overview of the nation-wide SMART-BioGRID network. From harvest prediction to bio-energy generation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[250px]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 h-[250px]"
              >
                <WasteToEnergyPipeline />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-1 h-[500px] row-span-2"
              >
                <AIEngine />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 h-[250px]"
              >
                <CarbonAndImpact />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 h-[250px]"
              >
                <SmartDigester />
              </motion.div>
            </div>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </section>

      </main>

      <LandingFooter />
    </div>
  )
}
