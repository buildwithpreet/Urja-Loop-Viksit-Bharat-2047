import { QrCode, Cpu, Recycle, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: QrCode,
      title: "1. Scan",
      desc: "Instant mobile authentication at any UrjaLoop bin via our mobile app."
    },
    {
      icon: Cpu,
      title: "2. Drop",
      desc: "Edge-AI cameras verify material type while load cells weigh your deposit in real-time."
    },
    {
      icon: Recycle,
      title: "3. Earn",
      desc: "Receive Urja Credits immediately in your digital wallet for every gram of clean waste."
    }
  ]

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        <div className="mb-20">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">The Workflow</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            A frictionless ecosystem.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 md:gap-12 relative">
           
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-border -z-10" />

           {steps.map((step, index) => (
             <div key={index} className="flex-1 flex flex-col items-center text-center bg-card p-8 rounded-[2rem] border border-border shadow-sm">
                <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center mb-6">
                  <step.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
             </div>
           ))}

        </div>

      </div>
    </section>
  )
}
