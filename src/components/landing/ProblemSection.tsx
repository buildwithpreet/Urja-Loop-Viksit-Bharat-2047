import { AlertCircle, FileWarning, Factory } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        <div className="mb-20">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">India's Hidden Crisis</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground max-w-3xl leading-[1.1]">
            150,000 tonnes of waste daily. <br />
            <span className="text-muted-foreground">Most of it never reaches a recycling plant.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-16">
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
              <FileWarning size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-foreground">Waste Contamination</h3>
            <p className="text-muted-foreground leading-relaxed">
              Unsegregated waste ruins recyclables. We solve it at the source with AI-guided disposal that verifies every item.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center">
              <Factory size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-foreground">Toxic Smog</h3>
            <p className="text-muted-foreground leading-relaxed">
              Turning agricultural stubble into biofuel, providing farmers a lucrative and clean alternative to seasonal crop burning.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-foreground">Missing Incentives</h3>
            <p className="text-muted-foreground leading-relaxed">
              We replace apathy with rewards. Every gram of clean waste generates instant digital credits for citizens and businesses.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
