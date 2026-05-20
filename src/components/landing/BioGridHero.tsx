"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { ArrowRight, Leaf, Zap, Cpu } from "lucide-react"

import Link from "next/link"

export function BioGridHero() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            <span className="animate-pulse">Project SMART-BioGRID Live</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                {t('hero_title_1')}
              </span>
              <span className="text-foreground ml-4">
                {t('hero_title_2')}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto">
              {t('hero_subtitle')}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-gray-400 md:text-lg"
          >
            {t('hero_desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link href="/admin">
              <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                {t('hero_btn_explore')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="/farmer">
              <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-md px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {t('hero_btn_farmer')}
                <Leaf className="ml-2 h-4 w-4 text-green-500" />
              </button>
            </Link>
          </motion.div>

          {/* Value Props */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-border/50 w-full max-w-5xl"
          >
            {[
              { icon: Leaf, label: "Agri-Waste", value: "Input" },
              { icon: Cpu, label: "AI Prediction", value: "Logistics" },
              { icon: Zap, label: "Bio-CNG", value: "Energy" },
              { icon: ArrowRight, label: "Carbon Credits", value: "Economy" }
            ].map((prop, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                <prop.icon className="h-8 w-8 text-primary mb-3" />
                <div className="text-sm text-muted-foreground">{prop.value}</div>
                <div className="font-bold">{prop.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  )
}
