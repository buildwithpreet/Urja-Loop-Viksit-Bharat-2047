import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SmartCityVision() {
  return (
    <section className="py-32 bg-card border-t border-border relative overflow-hidden">
      
      {/* Very subtle background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(31, 122, 61, 0.1) 1px, transparent 0)",
        backgroundSize: "48px 48px"
      }} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 text-center">
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-8">
            The future of India <br />
            is <span className="text-primary">circular.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-medium">
            Building the intelligent infrastructure backbone for Viksit Bharat 2047.
          </p>

          <Link href="/login">
            <button className="btn-minimal inline-flex items-center gap-2 px-10 py-5 text-base">
              Initialize Platform <ArrowRight size={18} />
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  )
}
