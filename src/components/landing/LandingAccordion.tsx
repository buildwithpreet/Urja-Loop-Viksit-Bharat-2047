"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ShieldCheck, Zap, Globe, Cpu, Wifi, Recycle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const SECTIONS = [
  {
    id: "hardware",
    title: "Smart Bin Specifications",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    content: [
      { label: "Sensors", desc: "Ultrasonic fill-level detection + LiDAR for depth mapping" },
      { label: "Processing", desc: "Edge AI (ESP32-S3) for real-time waste classification" },
      { label: "Connectivity", desc: "NB-IoT / LoRaWAN for long-range, low-power telemetry" },
      { label: "Power", desc: "Solar-harvesting lid with 5000mAh backup buffer" }
    ]
  },
  {
    id: "compliance",
    title: "Governance & Compliance",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    content: [
      { label: "CPCB Standards", desc: "Fully compliant with India's PWM 2024 regulations" },
      { label: "Data Sovereignty", desc: "End-to-end encrypted civic data hosted on NIC clouds" },
      { label: "Transparency", desc: "Immutable activity logs for municipal audit trails" }
    ]
  },
  {
    id: "roadmap",
    title: "Viksit Bharat 2047 Roadmap",
    icon: Globe,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    content: [
      { label: "Phase 1 (2025)", desc: "10,000 Smart Bin deployment across Tier-1 cities" },
      { label: "Phase 2 (2030)", desc: "Integration with 500+ Rural Agri-Waste hubs" },
      { label: "Vision 2047", desc: "Zero-landfill nationwide circular economy" }
    ]
  }
]

export function LandingAccordion() {
  const [openSection, setOpenSection] = useState<string | null>("hardware")

  return (
    <section className="py-24 px-6 md:px-10 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/20 text-primary uppercase tracking-[0.2em] font-bold text-[10px] px-4 py-1">
            Technical Blueprint
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Engine Behind the Loop</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Deep dive into the hardware, governance, and long-term vision of India&apos;s smartest waste infrastructure.
          </p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <div 
              key={section.id}
              className={cn(
                "group rounded-[2rem] border transition-all duration-500 overflow-hidden",
                openSection === section.id 
                  ? "bg-card border-border shadow-xl ring-1 ring-primary/5" 
                  : "bg-transparent border-border/40 hover:border-primary/20"
              )}
            >
              <button
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", section.bg)}>
                    <section.icon size={28} className={section.color} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight">{section.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 opacity-60">Technical Specifications & Integration</p>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-transform duration-500",
                  openSection === section.id ? "rotate-180" : ""
                )}>
                  <ChevronDown size={20} className="text-muted-foreground" />
                </div>
              </button>

              <div className={cn(
                "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                openSection === section.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}>
                <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.content.map((item) => (
                    <div key={item.label} className="p-5 rounded-2xl bg-muted/40 border border-border/20 group/item hover:bg-muted/60 transition-colors">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{item.label}</p>
                      <p className="text-sm text-foreground/80 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
