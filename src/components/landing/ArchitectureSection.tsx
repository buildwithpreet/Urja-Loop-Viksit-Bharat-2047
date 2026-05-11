import { Cloud, Cpu, Server, Smartphone, Network } from "lucide-react"

export function ArchitectureSection() {
  return (
    <section className="py-32 bg-white dark:bg-[#010d0a] relative border-b border-neutral-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      {/* Background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1F7A3D] dark:text-blue-400 mb-4">System Architecture</h2>
          <h3 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
            AI + IoT Cloud Infrastructure
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 relative max-w-5xl mx-auto">
           
           {/* Connection Lines (Desktop) */}
           <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-neutral-100 dark:bg-white/10 -translate-y-1/2 -z-10" />

           {/* Node 1: Edge (App) */}
           <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-6 rounded-3xl w-full lg:w-48 text-center hover:border-blue-500/50 transition-colors shadow-xl dark:shadow-2xl group">
             <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
               <Smartphone size={32} strokeWidth={1.5} />
             </div>
             <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Citizen App</h4>
             <p className="text-[10px] text-neutral-500 dark:text-white/50 uppercase tracking-widest">QR Auth & Wallet</p>
           </div>

           {/* Node 2: Hardware */}
           <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-6 rounded-3xl w-full lg:w-48 text-center hover:border-blue-500/50 transition-colors shadow-xl dark:shadow-2xl group relative">
             <div className="hidden lg:block absolute top-1/2 -left-12 w-12 h-px bg-blue-500/30 dark:bg-blue-500" />
             <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
               <Cpu size={32} strokeWidth={1.5} />
             </div>
             <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Smart Bin</h4>
             <p className="text-[10px] text-neutral-500 dark:text-white/50 uppercase tracking-widest">IoT Sensors & AI</p>
           </div>

           {/* Node 3: Cloud Core */}
           <div className="bg-neutral-50 dark:bg-[#02182b] border border-blue-200 dark:border-blue-500/30 p-8 rounded-[2.5rem] w-full lg:w-64 text-center hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all group relative z-10 scale-105">
             <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-[2.5rem] animate-pulse pointer-events-none" />
             <div className="w-20 h-20 mx-auto bg-blue-500 flex items-center justify-center text-white rounded-[1.5rem] mb-6 shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
               <Cloud size={40} strokeWidth={2} />
             </div>
             <h4 className="text-xl font-black text-neutral-900 dark:text-white mb-2">Cloud Backend</h4>
             <p className="text-[10px] text-blue-800 dark:text-blue-200/60 uppercase tracking-widest leading-relaxed">Verification • Analytics<br/>Route Optimization</p>
           </div>

           {/* Node 4: Admin */}
           <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-6 rounded-3xl w-full lg:w-48 text-center hover:border-blue-500/50 transition-colors shadow-xl dark:shadow-2xl group relative">
             <div className="hidden lg:block absolute top-1/2 -left-12 w-12 h-px bg-blue-500/30 dark:bg-blue-500" />
             <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
               <Server size={32} strokeWidth={1.5} />
             </div>
             <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Admin Panel</h4>
             <p className="text-[10px] text-neutral-500 dark:text-white/50 uppercase tracking-widest">Govt / Municipal</p>
           </div>

           {/* Node 5: Integrations */}
           <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-6 rounded-3xl w-full lg:w-48 text-center hover:border-blue-500/50 transition-colors shadow-xl dark:shadow-2xl group relative">
             <div className="hidden lg:block absolute top-1/2 -left-12 w-12 h-px bg-blue-500/30 dark:bg-blue-500" />
             <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
               <Network size={32} strokeWidth={1.5} />
             </div>
             <h4 className="font-bold text-neutral-900 dark:text-white mb-1">API Hub</h4>
             <p className="text-[10px] text-neutral-500 dark:text-white/50 uppercase tracking-widest">3rd Party Partners</p>
           </div>

        </div>
      </div>
    </section>
  )
}
