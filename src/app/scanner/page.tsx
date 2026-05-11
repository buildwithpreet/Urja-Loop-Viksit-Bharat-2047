"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  X, Zap, Info, Camera, 
  RefreshCw, History, ArrowLeft, CheckCircle2,
  AlertCircle, Sparkles, ShoppingBag, Wind,
  QrCode, FlipHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type ScannerMode = "waste" | "qr" | "complaint"
type ScanState = "idle" | "searching" | "identifying" | "success" | "error"

import { Suspense } from "react"

function ScannerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = (searchParams.get("mode") as ScannerMode) || "waste"
  
  const [state, setState] = useState<ScanState>("searching")
  const [progress, setProgress] = useState(0)
  const [identifiedObject, setIdentifiedObject] = useState<any>(null)
  const [hasPermission, setHasPermission] = useState<boolean|null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  // 1. ACTUAL CAMERA ACCESS
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" },
          audio: false 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setHasPermission(true)
        }
      } catch (err) {
        console.error("Camera access denied:", err)
        setHasPermission(false)
      }
    }

    if (mode !== "qr") {
      startCamera()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [mode])

  // STOP CAMERA ON SUCCESS
  useEffect(() => {
    if (state === "success" && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [state])

  // 2. SIMULATED AI LOGIC (TRIGGERED BY FEED)
  useEffect(() => {
    if (state === "searching" && hasPermission) {
      const timer = setTimeout(() => {
        setState("identifying")
      }, 2000)
      return () => clearTimeout(timer)
    }

    if (state === "identifying") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setState("success")
            if (mode === "waste") {
              setIdentifiedObject({
                name: "PET Plastic Bottle",
                category: "Recyclable",
                credits: 15,
                impact: "0.2kg CO2 Saved",
                confidence: "98.4%",
                instructions: "Remove the cap and flatten before disposal."
              })
            } else if (mode === "complaint") {
              setIdentifiedObject({
                name: "Issue Captured",
                category: "Complaint",
                credits: 0,
                impact: "Reporting helps the community",
                confidence: "Ready",
                instructions: "Confirm the location and details on the next screen."
              })
            }
            return 100
          }
          return prev + 5
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [state, hasPermission, mode])

  const resetScan = () => {
    setState("searching")
    setProgress(0)
    setIdentifiedObject(null)
  }

  // --- QR GENERATION MODE ---
  if (mode === "qr") {
    return (
      <div className="h-screen w-full relative bg-[#0d0f12] text-white flex flex-col items-center justify-center p-8">
        <button onClick={() => router.back()} className="absolute top-8 left-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        
        <div className="space-y-2 text-center mb-12">
           <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Your Unique QR</h2>
           <p className="text-white/40 text-sm">Scan this at any UrjaNode to authenticate</p>
        </div>

        <div className="relative p-8 bg-white rounded-[3rem] shadow-[0_0_80px_rgba(255,255,255,0.1)]">
           <div className="w-64 h-64 bg-black flex items-center justify-center rounded-2xl overflow-hidden p-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=USER_${Math.random().toString(36).substring(7)}&bgcolor=ffffff&color=000000`} 
                alt="Your QR Code"
                className="w-full h-full"
              />
           </div>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
              Verified Identity
           </div>
        </div>

        <div className="mt-16 w-full max-w-xs space-y-4">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
              <Zap className="text-emerald-400" size={20} />
              <div>
                 <p className="text-xs font-bold">Fast Authentication</p>
                 <p className="text-[10px] text-white/30">Instantly unlocks smart bins</p>
              </div>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black text-white">
      
      {/* CAMERA VIEWPORT */}
      <div className="absolute inset-0 z-0">
         {hasPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0f12] p-8 text-center z-50">
               <AlertCircle size={48} className="text-red-500 mb-4" />
               <h3 className="text-xl font-bold mb-2">Camera Access Required</h3>
               <p className="text-sm text-white/40 mb-8 leading-relaxed">Please enable camera permissions in your browser settings to use the waste scanner.</p>
               <button onClick={() => window.location.reload()} className="px-8 py-4 bg-white text-black font-black rounded-2xl uppercase text-xs">Retry Access</button>
            </div>
         )}
         
         <video 
           ref={videoRef} 
           autoPlay 
           playsInline 
           className="w-full h-full object-cover grayscale brightness-75"
         />
         
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
         
         {/* Scanning Reticle */}
         <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className={cn(
              "relative w-72 h-72 border-2 rounded-[3rem] transition-all",
              state === "searching" ? "border-white/20 scale-100" : 
              state === "identifying" ? "border-emerald-500/50 scale-105" :
              "border-emerald-500 scale-110 bg-emerald-500/5"
            )}>
               {state === "identifying" && (
                 <div className="absolute left-4 right-4 h-[1px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-scan top-0" />
               )}

               <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl" />
               <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl" />
               <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl" />
               <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl" />

               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                     {state === "searching" ? "Scanning..." : 
                      state === "identifying" ? `Analyzing... ${progress}%` : 
                      mode === "complaint" ? "Location Tagged" : "Object Identified"}
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* HUD */}
      <div className="absolute top-8 left-6 right-6 z-40 flex items-center justify-between">
         <button onClick={() => router.back()} className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/60">
            <ArrowLeft size={20} />
         </button>
         <Badge className="bg-emerald-500 text-black border-none font-black px-4 py-1.5 rounded-full uppercase text-[10px]">
            {mode === "complaint" ? "Reporting Mode" : "AI Waste ID"}
         </Badge>
      </div>

      {/* RESULTS SHEET */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 z-50 bg-[#1a1c1e] rounded-t-[3rem] px-8 pt-4 pb-12 transition-transform",
        state === "success" ? "translate-y-0" : "translate-y-full"
      )}>
         <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
         
         {identifiedObject && (
            <div className="space-y-6 max-w-xl mx-auto">
               <div className="flex items-start justify-between">
                  <div>
                     <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[10px] font-black uppercase tracking-widest mb-1">
                        {identifiedObject.category}
                     </Badge>
                     <h2 className="text-2xl font-bold text-white">{identifiedObject.name}</h2>
                  </div>
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                     <CheckCircle2 size={28} />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Benefit</p>
                     <p className="text-xl font-bold">+{identifiedObject.credits} Credits</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Impact</p>
                     <p className="text-xl font-bold">{identifiedObject.impact}</p>
                  </div>
               </div>

               <button 
                 onClick={() => mode === "complaint" ? router.push("/complaints?step=2") : router.back()}
                 className="w-full h-16 bg-emerald-500 text-black font-black rounded-2xl uppercase tracking-widest text-xs"
               >
                  {mode === "complaint" ? "Continue Report" : "Confirm Disposal"}
               </button>
            </div>
         )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white/40 font-black uppercase tracking-widest text-xs">Initializing AI...</div>}>
      <ScannerContent />
    </Suspense>
  )
}
