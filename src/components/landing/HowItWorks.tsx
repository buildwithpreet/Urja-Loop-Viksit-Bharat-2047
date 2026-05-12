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
           <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

           {steps.map((step, index) => (
             <div key={index} className="flex-1 flex flex-col items-center text-center group bg-card/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                <div className="relative mb-8">
                  {/* Decorative Glow Background */}
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 bg-white dark:bg-muted border border-neutral-200 dark:border-white/10 text-primary rounded-2xl flex items-center justify-center shadow-sm transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon size={32} strokeWidth={1.5} className="relative z-10" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-foreground text-background rounded-full flex items-center justify-center text-[10px] font-black border-2 border-background shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
                  {step.title.includes(". ") ? step.title.split(". ")[1] : step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
             </div>
           ))}

        </div>

      </div>
    </section>
  )
}
