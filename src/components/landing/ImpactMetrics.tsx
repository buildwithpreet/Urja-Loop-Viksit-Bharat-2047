import { Activity, Flame, Users, Leaf } from "lucide-react"

export function ImpactMetrics() {
  const metrics = [
    { value: "4.8M", label: "Tonnes Processed", icon: Activity, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
    { value: "125K+", label: "Active Citizens", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
    { value: "1.2M", label: "CO₂ Prevented", icon: Leaf, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
    { value: "850K", label: "kWh Energy Saved", icon: Flame, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10" },
  ]

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#010806] border-b border-neutral-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${metric.bg} ${metric.color}`}>
                  <metric.icon size={28} strokeWidth={2} />
               </div>
               <h4 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">{metric.value}</h4>
               <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 dark:text-white/50">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
