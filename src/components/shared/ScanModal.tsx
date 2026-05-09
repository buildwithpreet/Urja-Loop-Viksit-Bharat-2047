"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  QrCode, 
  Search, 
  AlertCircle, 
  Camera, 
  MapPin, 
  CheckCircle2, 
  Loader2,
  ChevronLeft,
  ScanLine,
  Zap,
  Target,
  Leaf,
  ShieldAlert,
  Fingerprint
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ScanModalProps {
  isOpen: boolean
  onClose: () => void
}

type ScanView = "main" | "qr" | "identify" | "report"

export function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const [view, setView] = useState<ScanView>("main")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  
  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const startCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setCameraError("Camera access denied or unavailable.")
      console.error(err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  useEffect(() => {
    if (isOpen && view !== "main" && status === "idle") {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [isOpen, view, status])

  const handleAction = (actionView: ScanView) => {
    setView(actionView)
    setStatus("idle")
  }

  const handleCapture = () => {
    setStatus("loading")
    stopCamera()
    
    setTimeout(() => {
      setStatus("success")
    }, 1800)
  }

  const resetModal = () => {
    setView("main")
    setStatus("idle")
    setCameraError(null)
    onClose()
  }

  const handleBack = () => {
    setView("main")
    setStatus("idle")
    setCameraError(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md rounded-t-[3rem] sm:rounded-[3rem] border-none p-0 overflow-hidden ultra-glass shadow-2xl">
        <div className="p-8">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 mb-8">
            <div className="flex items-center gap-3">
              {view !== "main" && (
                <button onClick={handleBack} className="p-2.5 rounded-xl ultra-glass text-muted-foreground hover:text-primary transition-all active:scale-90">
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              )}
              <DialogTitle className="text-2xl font-black text-foreground tracking-tighter">
                {view === "main" && "Action Center"}
                {view === "qr" && "Terminal Scan"}
                {view === "identify" && "Neural ID"}
                {view === "report" && "Incident Log"}
              </DialogTitle>
            </div>
          </DialogHeader>

          {view === "main" && (
            <div className="grid gap-4">
              <button
                onClick={() => handleAction("qr")}
                className="flex items-center gap-5 p-5 rounded-3xl border-none ultra-glass bg-foreground/5 hover:bg-foreground/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group shadow-xl"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                  <QrCode size={28} strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-black text-foreground text-lg tracking-tight group-hover:text-blue-500 transition-colors uppercase text-sm">Scan QR Code</h3>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Authorize bin access & earn</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("identify")}
                className="flex items-center gap-5 p-5 rounded-3xl border-none ultra-glass bg-foreground/5 hover:bg-foreground/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group shadow-xl"
              >
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                  <Search size={28} strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-black text-foreground text-lg tracking-tight group-hover:text-primary transition-colors uppercase text-sm">Analyze Material</h3>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">AI classification in real-time</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("report")}
                className="flex items-center gap-5 p-5 rounded-3xl border-none ultra-glass bg-foreground/5 hover:bg-foreground/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group shadow-xl"
              >
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 group-hover:rotate-6 transition-transform">
                  <AlertCircle size={28} strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-black text-foreground text-lg tracking-tight group-hover:text-amber-500 transition-colors uppercase text-sm">Report Dumping</h3>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Flag violations & tag location</p>
                </div>
              </button>
            </div>
          )}

          {/* QR View Content */}
          {view === "qr" && (
            <div className="flex flex-col items-center justify-center gap-8 text-center animate-in fade-in duration-500">
              {status === "idle" && (
                <>
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative bg-slate-950 flex items-center justify-center shadow-2xl border-4 border-foreground/5">
                    {cameraError ? (
                      <div className="text-red-400 text-sm font-bold p-6">{cameraError}</div>
                    ) : (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80"></video>
                    )}
                    {/* Scanner Overlay */}
                    <div className="absolute inset-0 border-[60px] border-black/60 pointer-events-none z-10 flex items-center justify-center">
                       <div className="w-full h-full border-2 border-blue-500 rounded-2xl relative">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_4px_rgba(59,130,246,0.6)] animate-[scan_2s_ease-in-out_infinite]"></div>
                       </div>
                    </div>
                  </div>
                  <button onClick={handleCapture} disabled={!!cameraError} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-xs">
                    <ScanLine size={20} strokeWidth={3} /> Authorize Bin
                  </button>
                </>
              )}

              {status === "loading" && (
                 <div className="py-20 flex flex-col items-center gap-6">
                    <div className="relative">
                      <Loader2 className="w-16 h-16 animate-spin text-blue-500" strokeWidth={3} />
                      <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full animate-pulse"></div>
                    </div>
                    <p className="font-black text-muted-foreground uppercase tracking-widest animate-pulse text-xs">Connecting Securely...</p>
                 </div>
              )}

              {status === "success" && (
                <div className="py-6 w-full flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">
                  <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10 rotate-6">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black text-foreground tracking-tighter mb-2">Access Granted</h2>
                  <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-8">Bin #402 Unlock Sequence Complete</p>
                  
                  <div className="w-full bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl mb-8 flex justify-between items-center group overflow-hidden relative">
                    <div className="absolute inset-0 shimmer opacity-10"></div>
                    <div className="text-left relative z-10">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Incentive Added</p>
                      <p className="text-2xl font-black text-emerald-600 tabular-nums">+10.00 Credits</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white relative z-10">
                       <Zap size={24} fill="currentColor" />
                    </div>
                  </div>
                  
                  <button onClick={resetModal} className="w-full btn-premium py-5 text-xs tracking-widest uppercase">
                    Back to Terminal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Identify View Content */}
          {view === "identify" && (
            <div className="flex flex-col items-center justify-center gap-8 text-center animate-in fade-in duration-500">
              {status === "idle" && (
                <>
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative bg-slate-950 flex items-center justify-center shadow-2xl border-4 border-foreground/5">
                    {cameraError ? (
                      <div className="text-red-400 text-sm font-bold p-6">{cameraError}</div>
                    ) : (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80"></video>
                    )}
                    {/* AI Target Overlay */}
                    <div className="absolute inset-12 border-2 border-foreground/10 rounded-full pointer-events-none z-10 animate-[pulse_2s_infinite]">
                       <Target className="absolute inset-0 m-auto text-primary opacity-40" size={48} strokeWidth={1} />
                    </div>
                    <div className="absolute inset-0 border-[60px] border-black/40 pointer-events-none z-10"></div>
                  </div>
                  <button onClick={handleCapture} disabled={!!cameraError} className="w-full btn-premium py-5 text-xs tracking-widest uppercase">
                    <Camera size={20} strokeWidth={3} /> Process Image
                  </button>
                </>
              )}

              {status === "loading" && (
                 <div className="py-20 flex flex-col items-center gap-6 text-primary">
                   <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Search size={24} />
                      </div>
                   </div>
                   <p className="font-black uppercase tracking-widest animate-pulse text-xs">Neural Network Analysis...</p>
                 </div>
              )}

              {status === "success" && (
                <div className="py-2 w-full flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">
                  <div className="w-full h-56 bg-muted rounded-[2rem] relative overflow-hidden group mb-8 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-1000" alt="Waste" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground border-none shadow-xl px-4 py-2 font-black text-[10px] tracking-widest uppercase">98% CONFIDENCE</Badge>
                    </div>
                  </div>
                  
                  <div className="w-full space-y-6">
                    <div className="flex justify-between items-center text-left ultra-glass p-6 rounded-3xl border border-foreground/10 shadow-xl">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-black tracking-tight text-foreground">Plastic PET</h2>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Type: Recyclable</p>
                        </div>
                      </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                         <Leaf size={24} strokeWidth={2.5} />
                    </div>
                    </div>
                    
                    <button onClick={resetModal} className="w-full bg-foreground text-background py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-2xl active:scale-95 transition-all">
                      Open Disposal Protocol
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Report View Content */}
          {view === "report" && (
            <div className="flex flex-col items-center justify-center gap-8 text-left animate-in fade-in duration-500">
              {status === "idle" && (
                 <>
                   <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-slate-950 flex items-center justify-center shadow-2xl border-4 border-foreground/5">
                     {cameraError ? (
                       <div className="text-red-400 text-sm font-bold p-6">{cameraError}</div>
                     ) : (
                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80"></video>
                     )}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center border-dashed animate-[spin_10s_linear_infinite]">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        </div>
                     </div>
                   </div>
                   
                   <div className="w-full ultra-glass p-5 rounded-3xl border border-foreground/10 flex items-start gap-4">
                     <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                        <MapPin size={20} strokeWidth={2.5} />
                     </div>
                     <div>
                       <h4 className="text-xs font-black text-foreground uppercase tracking-widest">Geolocation Active</h4>
                       <p className="text-[10px] text-muted-foreground font-bold mt-1">Sector 14 Market • Block C • Entry Point</p>
                     </div>
                   </div>

                   <button onClick={handleCapture} disabled={!!cameraError} className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-2xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-3">
                     <Camera size={20} strokeWidth={3} /> Submit Evidence
                   </button>
                 </>
              )}

              {status === "loading" && (
                 <div className="py-20 flex flex-col items-center gap-6 w-full">
                   <div className="relative">
                      <Loader2 className="w-14 h-14 animate-spin text-amber-500" strokeWidth={3} />
                      <div className="absolute inset-0 blur-xl bg-amber-500/20 rounded-full animate-pulse"></div>
                   </div>
                   <p className="font-black text-muted-foreground uppercase tracking-widest animate-pulse text-xs">Syncing with Authorities...</p>
                 </div>
              )}

              {status === "success" && (
                 <div className="py-8 w-full flex flex-col items-center text-center animate-in slide-in-from-bottom-8 duration-700">
                   <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-amber-500/10 rotate-6">
                     <CheckCircle2 size={48} strokeWidth={2.5} />
                   </div>
                   <h2 className="text-3xl font-black text-foreground tracking-tighter mb-2">Report Logged</h2>
                   <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-10 max-w-[280px]">
                     Environmental protection unit has been dispatched for verification.
                   </p>
                   <button onClick={resetModal} className="w-full bg-foreground text-background py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-2xl active:scale-95 transition-all">
                     Return to Dashboard
                   </button>
                 </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
