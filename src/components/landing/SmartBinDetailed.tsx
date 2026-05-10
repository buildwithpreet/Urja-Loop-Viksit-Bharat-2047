import { Camera, Settings, Scale, Lock, Wifi, Box } from "lucide-react"
import { SmartBinAnimation } from "@/components/shared/SmartBinAnimation"

export function SmartBinDetailed() {
  const specs = [
    { icon: Camera, title: "Neural Vision", desc: "Edge-AI material identification." },
    { icon: Settings, title: "Auto-Sorting", desc: "Motorized internal segregation." },
    { icon: Scale, title: "Precision Weighing", desc: "Industrial-grade load cells." },
    { icon: Lock, title: "Fraud Proof", desc: "Secure session authentication." },
    { icon: Wifi, title: "Live Telemetry", desc: "Real-time municipal sync." },
    { icon: Box, title: "Modular Build", desc: "Rapid collection hardware." },
  ]

  return (
    <section id="hardware" className="py-24 bg-card border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text & Specs */}
          <div className="flex-1 space-y-12 z-10">
            <div>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">Hardware</p>
              <h2 className="text-4xl font-medium tracking-tight text-foreground mb-6">
                Engineered for public spaces.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The UrjaLoop Smart Bin is a ruggedized IoT endpoint designed for high-traffic urban environments. It operates autonomously, syncing real-time capacity and diagnostic data directly to municipal dashboards.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
               {specs.map((spec, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 text-primary">
                      <spec.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">{spec.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{spec.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* 3D Visual */}
          <div className="flex-1 w-full bg-background rounded-[3rem] p-12 flex justify-center items-center border border-border">
             <div className="scale-110 md:scale-125 transform-gpu transition-transform duration-1000 hover:scale-150">
               <SmartBinAnimation />
             </div>
          </div>

        </div>

      </div>
    </section>
  )
}
