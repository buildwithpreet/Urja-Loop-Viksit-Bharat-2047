import { Globe, Building2, Landmark, Recycle, ShieldCheck, Zap } from "lucide-react"

const PARTNERS = [
  { name: "Smart Cities Mission", category: "Govt of India", icon: Building2 },
  { name: "SBM 2.0", category: "National Policy", icon: Recycle },
  { name: "Digital India", category: "Infrastructure", icon: Zap },
  { name: "World Bank", category: "Sustainability", icon: Globe },
  { name: "Municipal Corps", category: "Implementation", icon: Landmark },
  { name: "Green Tech Hub", category: "Innovation", icon: ShieldCheck },
]

export function LandingEcosystem() {
  return (
    <section className="py-24 px-6 md:px-10 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div className="max-w-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Ecosystem Partners</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9]">Collaborating for a <span className="text-primary italic">Cleaner Bharat.</span></h2>
           </div>
           <p className="text-sm text-muted-foreground max-w-xs font-medium">
             UrjaLoop is built in alignment with national standards and global sustainability frameworks.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {PARTNERS.map((partner) => (
             <div key={partner.name} className="group p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                   <partner.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground leading-tight">{partner.name}</h3>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight mt-1">{partner.category}</p>
             </div>
           ))}
        </div>

        {/* Scrolling Banner / Brand Row */}
        <div className="mt-20 py-10 border-t border-border flex flex-wrap items-center justify-between gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {["NIC", "MEITY", "CPCB", "ISO 14001", "GBCI", "LEED"].map((brand) => (
             <span key={brand} className="text-lg font-black tracking-[0.2em]">{brand}</span>
           ))}
        </div>
      </div>
    </section>
  )
}
