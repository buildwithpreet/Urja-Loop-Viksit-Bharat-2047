import { Smartphone, LogIn, BrainCircuit, BoxSelect, Coins, Zap } from "lucide-react"

export function UserJourney() {
  const steps = [
    { icon: Smartphone, label: "Scan QR", delay: "0s" },
    { icon: LogIn, label: "Deposit Waste", delay: "1s" },
    { icon: BrainCircuit, label: "AI Verification", delay: "2s" },
    { icon: BoxSelect, label: "Smart Segregation", delay: "3s" },
    { icon: Coins, label: "Rewards Added", delay: "4s" },
    { icon: Zap, label: "Energy Processed", delay: "5s" },
  ]

  return (
    <section id="workflow" className="py-32 bg-white dark:bg-[#010806] relative border-b border-neutral-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        perspective: "1000px",
        transform: "rotateX(60deg) scale(2)",
        transformOrigin: "top center"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1F7A3D] dark:text-emerald-500/80 mb-4">The User Journey</h2>
          <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
            Seamless Citizen Experience
          </h3>
        </div>

        {/* Horizontal Flow */}
        <div className="relative max-w-5xl mx-auto">
           {/* Connecting Line */}
           <div className="absolute top-12 left-0 w-full h-1 bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden hidden md:block">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-full animate-[shimmer_3s_infinite]" 
                   style={{ transform: "translateX(-100%)", animation: "flowLine 6s linear infinite" }} />
           </div>

           <style dangerouslySetInnerHTML={{__html: `
             @keyframes flowLine {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(100%); }
             }
             @keyframes pulseGlow {
               0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
               50% { box-shadow: 0 0 20px 10px rgba(16,185,129,0); }
             }
           `}} />

           <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#021f16] border border-emerald-500/30 flex items-center justify-center mb-6 relative transform transition-transform duration-500 group-hover:-translate-y-2 shadow-xl dark:shadow-2xl"
                        style={{ animation: `pulseGlow 3s infinite ${step.delay}` }}>
                      <step.icon size={32} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                      <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black border-4 border-white dark:border-[#010806]">
                        {i + 1}
                      </div>
                   </div>
                   <h5 className="font-bold text-neutral-900 dark:text-white text-sm uppercase tracking-widest">{step.label}</h5>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  )
}
