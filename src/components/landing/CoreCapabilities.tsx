import { BrainCircuit, Globe, Recycle, ShieldCheck, QrCode, Wallet, BatteryCharging, AlertCircle } from "lucide-react"

export function CoreCapabilities() {
  const capabilities = [
    {
      title: "AI Waste Detection",
      desc: "Computer vision models classify wet, dry, recyclable, and hazardous waste with 99% accuracy in real-time.",
      icon: BrainCircuit,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      borderHover: "hover:border-emerald-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
    },
    {
      title: "Smart QR Identity",
      desc: "Universal QR-based citizen identity system linking waste deposits directly to user accounts for tracking.",
      icon: QrCode,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      borderHover: "hover:border-blue-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    },
    {
      title: "Reward Wallet",
      desc: "Instant cryptographic credit allocation for proper segregation. Track and redeem Urja Credits natively.",
      icon: Wallet,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      borderHover: "hover:border-amber-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
    },
    {
      title: "Live Transparency Map",
      desc: "Geospatial dashboard tracking bin fill levels, collection routes, and anomaly detection across the grid.",
      icon: Globe,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      borderHover: "hover:border-indigo-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
    },
    {
      title: "Waste-to-Energy Analytics",
      desc: "Predictive modeling showing potential bio-fuel yield from collected organic and agricultural waste.",
      icon: BatteryCharging,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
      borderHover: "hover:border-rose-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
    },
    {
      title: "Civic Reporting Node",
      desc: "Crowdsourced reporting system for illegal dumping. Verified reports earn bounties to keep streets clean.",
      icon: AlertCircle,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-500/10",
      borderHover: "hover:border-orange-500/50",
      shadowHover: "hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
    }
  ]

  return (
    <section id="capabilities" className="py-32 bg-white dark:bg-[#010d0a] relative border-b border-neutral-200 dark:border-white/5 transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
            An End-to-End Smart Ecosystem
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className={`p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 transition-all duration-500 group shadow-sm dark:shadow-none ${cap.borderHover} ${cap.shadowHover}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${cap.bg} ${cap.color}`}>
                <cap.icon size={32} strokeWidth={2} />
              </div>
              <h4 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mb-3">{cap.title}</h4>
              <p className="text-sm text-neutral-500 dark:text-white/50 leading-relaxed font-medium">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
