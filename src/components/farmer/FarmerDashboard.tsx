"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { MapPin, Sprout, Brain, Calendar, ArrowRight, IndianRupee, Flame } from "lucide-react"

export function FarmerDashboard() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isPredicting, setIsPredicting] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)

  const handlePredict = () => {
    setIsPredicting(true)
    setTimeout(() => {
      setPrediction({
        wasteKg: 4500,
        methaneM3: 210,
        fertilizerKg: 850,
        earnings: 12400
      })
      setIsPredicting(false)
      setStep(3)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
          <Sprout className="text-primary" /> 
          Farmer Intelligence Portal
        </h1>
        <p className="text-muted-foreground">Register land, schedule harvests, and get AI-powered value predictions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Land Registration */}
          <div className={`glass-panel p-6 border ${step === 1 ? 'border-primary' : 'border-white/10'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-black">1</span>
                Land Registration
              </h2>
              {step > 1 && <span className="text-emerald-400 text-sm font-bold">✓ Complete</span>}
            </div>
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">State</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-primary">
                      <option>Punjab</option>
                      <option>Haryana</option>
                      <option>Uttar Pradesh</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">District</label>
                    <input type="text" placeholder="e.g. Ludhiana" className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Area (in Acres)</label>
                  <input type="number" defaultValue={5} className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
                </div>

                <div className="h-48 bg-neutral-900 rounded-lg border border-white/10 flex flex-col items-center justify-center text-muted-foreground relative overflow-hidden">
                  {/* Fake Map */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=30.900965,75.857277&zoom=12&size=600x300&maptype=satellite&key=YOUR_API_KEY')] bg-cover bg-center" />
                  <MapPin className="mb-2 text-primary z-10" size={32} />
                  <p className="z-10 text-sm">Pinpoint Land on GIS Map</p>
                </div>

                <button onClick={() => setStep(2)} className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  Save Land Profile <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>

          {/* Step 2: Harvest Scheduling */}
          <div className={`glass-panel p-6 border ${step === 2 ? 'border-primary' : 'border-white/10'} ${step < 2 && 'opacity-50 pointer-events-none'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-black">2</span>
                Harvest Details
              </h2>
              {step > 2 && <span className="text-emerald-400 text-sm font-bold">✓ Analyzed</span>}
            </div>

            {step === 2 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Crop Type</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-primary">
                      <option>Paddy (Rice)</option>
                      <option>Wheat</option>
                      <option>Sugarcane</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Expected Harvest Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <input type="date" className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 pl-10 text-sm outline-none focus:border-primary [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePredict} 
                  disabled={isPredicting}
                  className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/50 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-500/30 transition-colors mt-6"
                >
                  {isPredicting ? (
                    <span className="flex items-center gap-2"><Brain className="animate-pulse" size={18} /> AI is analyzing crop data...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Brain size={18} /> Run AI Prediction Engine</span>
                  )}
                </button>
              </motion.div>
            )}
          </div>

        </div>

        {/* Right Column: AI Insights */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 border border-purple-500/30 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <h3 className="text-lg font-black text-purple-400 flex items-center gap-2 mb-6">
              <Brain size={20} /> AI Value Prediction
            </h3>

            {!prediction ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <Brain size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Complete Step 2 to generate AI insights on your agricultural waste.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Estimated Biomass Waste</p>
                  <p className="text-3xl font-black text-white">{prediction.wasteKg.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">kg</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <Flame className="text-cyan-400 mb-2" size={20} />
                    <p className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">Methane Potential</p>
                    <p className="text-xl font-bold text-white">{prediction.methaneM3} <span className="text-xs font-normal">m³</span></p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <Sprout className="text-emerald-400 mb-2" size={20} />
                    <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Fertilizer Output</p>
                    <p className="text-xl font-bold text-white">{prediction.fertilizerKg} <span className="text-xs font-normal">kg</span></p>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-xl border border-primary/30 mt-4">
                  <p className="text-xs text-primary mb-1 uppercase tracking-wider flex items-center gap-2">
                    <IndianRupee size={14} /> Estimated Earnings
                  </p>
                  <p className="text-4xl font-black text-primary">₹{prediction.earnings.toLocaleString()}</p>
                </div>

                <button className="w-full bg-primary text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mt-4">
                  Schedule Pickup
                </button>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
