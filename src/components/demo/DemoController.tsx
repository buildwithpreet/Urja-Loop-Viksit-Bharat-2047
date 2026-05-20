"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Settings2, Database, Zap, Truck, FlaskConical, IndianRupee, Brain } from "lucide-react"

export function DemoController() {
  const [activeStage, setActiveStage] = useState(0)

  const handleRunSimulation = () => {
    setActiveStage(1) // Harvest
    setTimeout(() => setActiveStage(2), 2000) // AI Predict
    setTimeout(() => setActiveStage(3), 4000) // Collect
    setTimeout(() => setActiveStage(4), 7000) // Digester
    setTimeout(() => setActiveStage(5), 9000) // Monetize
    setTimeout(() => setActiveStage(0), 12000) // Reset
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
          <Settings2 className="text-primary" size={40} />
          Hackathon Demo Controller
        </h1>
        <p className="text-muted-foreground text-lg">Master control panel to trigger the end-to-end SMART-BioGRID simulation for judges.</p>
      </div>

      <div className="glass-panel p-8 border border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-12 relative z-10">
          <button 
            onClick={handleRunSimulation}
            disabled={activeStage !== 0}
            className="bg-primary text-black px-12 py-4 rounded-full text-xl font-black shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Play fill="currentColor" /> {activeStage === 0 ? "RUN FULL SIMULATION" : "SIMULATION RUNNING..."}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          
          {/* Stage 1 */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${activeStage >= 1 ? 'bg-primary/20 border-primary/50 text-white' : 'bg-black/50 border-white/10 text-white/50'}`}>
            <Database className="mb-3" size={32} />
            <h3 className="font-bold mb-1">1. Harvest</h3>
            <p className="text-[10px] uppercase">Simulate Farmer Input</p>
            {activeStage === 1 && <span className="mt-2 text-xs font-bold text-primary animate-pulse">Running...</span>}
          </div>

          {/* Stage 2 */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${activeStage >= 2 ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-black/50 border-white/10 text-white/50'}`}>
            <Brain className="mb-3" size={32} />
            <h3 className="font-bold mb-1">2. Predict</h3>
            <p className="text-[10px] uppercase">AI Value Estimation</p>
            {activeStage === 2 && <span className="mt-2 text-xs font-bold text-purple-400 animate-pulse">Analyzing...</span>}
          </div>

          {/* Stage 3 */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${activeStage >= 3 ? 'bg-cyan-500/20 border-cyan-500/50 text-white' : 'bg-black/50 border-white/10 text-white/50'}`}>
            <Truck className="mb-3" size={32} />
            <h3 className="font-bold mb-1">3. Collect</h3>
            <p className="text-[10px] uppercase">AI Route Dispatch</p>
            {activeStage === 3 && <span className="mt-2 text-xs font-bold text-cyan-400 animate-pulse">Routing...</span>}
          </div>

          {/* Stage 4 */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${activeStage >= 4 ? 'bg-orange-500/20 border-orange-500/50 text-white' : 'bg-black/50 border-white/10 text-white/50'}`}>
            <FlaskConical className="mb-3" size={32} />
            <h3 className="font-bold mb-1">4. Process</h3>
            <p className="text-[10px] uppercase">Digester Telemetry</p>
            {activeStage === 4 && <span className="mt-2 text-xs font-bold text-orange-400 animate-pulse">Processing...</span>}
          </div>

          {/* Stage 5 */}
          <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${activeStage >= 5 ? 'bg-yellow-500/20 border-yellow-500/50 text-white' : 'bg-black/50 border-white/10 text-white/50'}`}>
            <IndianRupee className="mb-3" size={32} />
            <h3 className="font-bold mb-1">5. Monetize</h3>
            <p className="text-[10px] uppercase">Credits & Marketplace</p>
            {activeStage === 5 && <span className="mt-2 text-xs font-bold text-yellow-400 animate-pulse">Disbursing...</span>}
          </div>

        </div>

        <div className="mt-12 p-6 bg-black/60 rounded-xl border border-white/10 font-mono text-sm text-green-400 h-48 overflow-y-auto">
          <p className="opacity-50">System Logs:</p>
          {activeStage >= 1 && <p>&gt; [SYS] Connecting to IoT Node: Farmer ID #9042...</p>}
          {activeStage >= 1 && <p>&gt; [SYS] 4,500kg of Paddy waste registered at coordinates (30.9, 75.8)</p>}
          {activeStage >= 2 && <p>&gt; [AI] Gemini Neural Engine calculating methane potential... 210m³ expected.</p>}
          {activeStage >= 3 && <p>&gt; [LOGISTICS] Dispatching EV-Truck 04. Optimization active (saving 14km).</p>}
          {activeStage >= 4 && <p>&gt; [IoT] Digester Alpha receiving load. Pressure spiking. Methane extraction started.</p>}
          {activeStage >= 5 && <p>&gt; [ECONOMY] Generating 45 Carbon Credits. Transferring ₹12,400 to Farmer Wallet.</p>}
          {activeStage >= 5 && <p className="text-white mt-2 font-bold">&gt; [SUCCESS] CYCLE COMPLETE.</p>}
        </div>
      </div>
    </div>
  )
}
