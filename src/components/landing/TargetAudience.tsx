import { Home, Wheat, Building2 } from "lucide-react"

export function TargetAudience() {
  const audiences = [
    {
      icon: Home,
      title: "Citizens",
      desc: "Turn your household waste into digital currency with every correct disposal at an UrjaLoop bin."
    },
    {
      icon: Wheat,
      title: "Farmers",
      desc: "Convert crop residue into biofuel and revenue, while accessing subsidized organic compost for your fields."
    },
    {
      icon: Building2,
      title: "Municipalities",
      desc: "Reduce collection costs by 30% and meet 2047 sustainability targets with real-time infrastructure data."
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="mb-20">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">Stakeholders</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            A unified infrastructure for all.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {audiences.map((audience, i) => (
            <div key={i} className="bg-card p-10 rounded-[2rem] border border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 text-primary mb-6">
                <audience.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">{audience.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{audience.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
