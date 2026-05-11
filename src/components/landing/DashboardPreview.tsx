import { LayoutDashboard, Play } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-32 bg-white dark:bg-[#010806] relative border-b border-neutral-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100 dark:from-emerald-900/20 via-white dark:via-[#010806] to-white dark:to-[#010806] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1F7A3D] dark:text-emerald-500/80 mb-4">Live Software</h2>
        <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-16">
          Premium App & Dashboard
        </h3>

        {/* Abstract Dashboard Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative floating elements */}
          <div className="absolute -left-12 top-10 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl rotate-12 blur-xl" />
          <div className="absolute -right-8 bottom-20 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl" />

          {/* Main Mockup Window */}
          <div className="rounded-[2rem] border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative z-10">
            {/* Window header */}
            <div className="h-12 border-b border-neutral-100 dark:border-white/5 flex items-center px-6 gap-2 bg-neutral-50/50 dark:bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 flex items-center gap-2 opacity-50">
                <LayoutDashboard size={14} className="text-neutral-900 dark:text-white" />
                <span className="text-[10px] font-mono text-neutral-900 dark:text-white">urjaloop-dashboard.exe</span>
              </div>
            </div>
            
            {/* Mockup Body */}
            <div className="aspect-[16/9] bg-neutral-50 dark:bg-[#02110c] relative p-8 flex flex-col justify-center items-center group cursor-pointer">
              {/* Fake UI grids */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-4 p-8 opacity-20 pointer-events-none">
                 <div className="col-span-1 row-span-3 rounded-xl bg-neutral-300 dark:bg-white/10 border border-neutral-400 dark:border-white/20" />
                 <div className="col-span-2 row-span-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30" />
                 <div className="col-span-1 row-span-1 rounded-xl bg-neutral-300 dark:bg-white/10 border border-neutral-400 dark:border-white/20" />
                 <div className="col-span-1 row-span-1 rounded-xl bg-blue-500/20 border border-blue-500/30" />
                 <div className="col-span-3 row-span-1 rounded-xl bg-neutral-300 dark:bg-white/10 border border-neutral-400 dark:border-white/20" />
              </div>

              {/* Play Button Overlay */}
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:scale-110 group-hover:bg-emerald-400 transition-all z-20">
                <Play size={32} fill="currentColor" className="ml-2" />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-200/80 z-20">Watch Platform Demo</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
