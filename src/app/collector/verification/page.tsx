"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, Camera, Scale, CheckCircle2, UploadCloud, ChevronRight, Check } from "lucide-react"

export default function VerificationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1) // 1: QR, 2: Photo, 3: Weight, 4: Success
  const [isScanning, setIsScanning] = useState(false)
  const [weight, setWeight] = useState("")

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setStep(2)
    }, 2000)
  }

  const handlePhoto = () => {
    setStep(3)
  }

  const handleSubmit = () => {
    if (!weight) return
    setStep(4)
  }

  return (
    <div className="max-w-md mx-auto pb-24 md:pb-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Pickup Verification</h1>
        <p className="text-sm font-medium text-muted-foreground">Verify and log bin collection.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between px-2 mb-8 relative">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -z-10" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {step > s ? <Check size={14} strokeWidth={3} /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto relative">
                {isScanning && <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping" />}
                <QrCode size={36} className={isScanning ? "animate-pulse" : ""} />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Scan Bin QR</h2>
                <p className="text-xs text-muted-foreground mt-1">Point your camera at the QR code on the bin to verify location.</p>
              </div>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[0.98] transition-transform active:scale-95 disabled:opacity-50"
              >
                {isScanning ? "Scanning..." : "Open Scanner"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-4">
              <CheckCircle2 className="text-emerald-500" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Bin Verified</p>
                <p className="text-sm font-bold text-foreground">BIN-12B (Green Park)</p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Camera size={36} />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Waste Status Photo</h2>
                <p className="text-xs text-muted-foreground mt-1">Take a clear picture of the collected waste for AI verification.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handlePhoto}
                  className="py-4 bg-card border border-border rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud size={20} /> Upload
                </button>
                <button 
                  onClick={handlePhoto}
                  className="py-4 bg-blue-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <Camera size={20} /> Camera
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-blue-500" />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-500">AI Verified</p>
                  <p className="text-sm font-bold text-foreground">Organic Waste Detected</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-black/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
                {/* Mock thumbnail placeholder */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b')] bg-cover bg-center" />
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                <Scale size={36} />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Log Weight</h2>
                <p className="text-xs text-muted-foreground mt-1">Enter the total collected weight.</p>
              </div>
              
              <div className="relative">
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border border-border rounded-2xl p-4 text-center text-2xl font-black focus:outline-none focus:border-amber-500 transition-colors placeholder:text-muted-foreground/30"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">KG</span>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!weight}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[0.98] transition-transform active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                Submit Report <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-[2rem] p-8 text-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-foreground">Collection Logged</h2>
              <p className="text-sm text-muted-foreground mt-2">BIN-12B has been successfully collected and verified.</p>
            </div>
            
            <div className="p-4 bg-background rounded-xl border border-border space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Type</span>
                <span className="text-foreground">Organic</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Weight</span>
                <span className="text-foreground">{weight} KG</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button 
              onClick={() => { setStep(1); setWeight("") }}
              className="w-full py-4 bg-muted text-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-colors"
            >
              Next Pickup
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
