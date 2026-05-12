"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { 
  QrCode, Search, AlertCircle, Camera, MapPin,
  CheckCircle2, Loader2, ChevronLeft, ScanLine,
  Zap, Target, Leaf, ShieldCheck, Download, Expand,
  Recycle, Navigation, Tractor, Wheat
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface ScanModalProps {
  isOpen: boolean
  onClose: () => void
}

type ScanView = "main" | "myqr" | "identify" | "report" | "checkin" | "agri" | "pickup"

const URBAN_ACTIONS = [
  {
    id: "myqr" as ScanView,
    title: "My Smart QR",
    desc: "Show to smart bin to submit waste & earn credits",
    icon: QrCode,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    id: "identify" as ScanView,
    title: "Identify Waste",
    desc: "AI-assisted material classification in seconds",
    icon: Search,
    color: "bg-primary",
    shadow: "shadow-primary/20",
  },
  {
    id: "report" as ScanView,
    title: "Report Open Dumping",
    desc: "Flag illegal waste with photo + GPS evidence",
    icon: AlertCircle,
    color: "bg-amber-500",
    shadow: "shadow-amber-500/20",
  },
  {
    id: "checkin" as ScanView,
    title: "Collection Center Check-in",
    desc: "Verify drop-off at registered collection points",
    icon: Navigation,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
]

const RURAL_ACTIONS = [
  {
    id: "myqr" as ScanView,
    title: "Farmer QR",
    desc: "Show at processing units to log waste & earn",
    icon: QrCode,
    color: "bg-amber-500",
    shadow: "shadow-amber-500/20",
  },
  {
    id: "agri" as ScanView,
    title: "Upload Agri Waste",
    desc: "AI identifies crop residue & estimates value",
    icon: Wheat,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    id: "pickup" as ScanView,
    title: "Request Pickup",
    desc: "Schedule transport for large agricultural waste",
    icon: Tractor,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    id: "checkin" as ScanView,
    title: "Center Check-in",
    desc: "Verify drop-off at rural collection hubs",
    icon: Navigation,
    color: "bg-primary",
    shadow: "shadow-primary/20",
  },
]

const WASTE_RESULTS = [
  { type: "Plastic PET", subtype: "Recyclable Polymer", confidence: 94, disposal: "Yellow bin — Dry Waste", icon: Recycle, tip: "Rinse before disposal for higher credit value." },
  { type: "Organic Waste", subtype: "Biodegradable", confidence: 88, disposal: "Green bin — Wet Waste", icon: Leaf, tip: "Can be composted. High value for Eco Credits." },
  { type: "Glass Container", subtype: "Non-hazardous", confidence: 91, disposal: "Blue bin — Glass Waste", icon: Recycle, tip: "Remove lids before disposal." },
]

export function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const { mode } = useMode()
  const [view, setView] = useState<ScanView>("main")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [wasteResult, setWasteResult] = useState<any>(null)

  const startCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setCameraError("Camera access denied. Please enable camera permissions.")
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }

  useEffect(() => {
    if (isOpen && (view === "identify" || view === "report" || view === "agri") && status === "idle") {
      startCamera()
    } else {
      stopCamera()
    }
    return () => stopCamera()
  }, [isOpen, view, status])

  const handleCapture = async () => {
    setStatus("loading")
    
    // For Demo: Capture a frame (simulate)
    const { data: { session } } = await supabase.auth.getSession()

    if (view === "identify" || view === "agri") {
      try {
        const response = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            imageUrl: "mock-capture-url", 
            userId: session?.user.id || 'demo-user' 
          })
        })
        const result = await response.json()
        if (result.success) {
          setWasteResult(result.data)
          setStatus("success")
        } else {
          toast.error("AI Analysis failed")
          setStatus("idle")
        }
      } catch (err) {
        toast.error("Connection error")
        setStatus("idle")
      }
    } else if (view === "report") {
      // Existing report logic...
      if (session) {
        await supabase.from('complaints').insert({
          id: `CMP-${Math.floor(Math.random() * 9000) + 1000}`,
          user_id: session.user.id,
          type: "Illegal / Open Dumping",
          location_name: "Sector 14 Market · Block C · New Delhi",
          severity: "High",
          description: "Citizen reported illegal dumping via AI Scan.",
          status: "Submitted",
          status_idx: 0,
          ai_validated: true
        })
      }
      setTimeout(() => setStatus("success"), 2000)
    }
    
    stopCamera()
  }

  const reset = () => {
    setView("main")
    setStatus("idle")
    setCameraError(null)
    setWasteResult(null)
    onClose()
  }

  const back = () => {
    setView("main")
    setStatus("idle")
    setCameraError(null)
    setWasteResult(null)
  }

  const titles: Record<ScanView, string> = {
    main: "Scan Center",
    myqr: mode === "rural" ? "Farmer QR" : "My Smart QR",
    identify: "Identify Waste",
    report: "Report Dumping",
    checkin: "Collection Check-in",
    agri: "Upload Agri Waste",
    pickup: "Request Pickup",
  }

  const currentActions = mode === "rural" ? RURAL_ACTIONS : URBAN_ACTIONS

  return (
    <Dialog open={isOpen} onOpenChange={reset}>
      <DialogContent className="sm:max-w-sm rounded-t-3xl sm:rounded-3xl border border-border bg-card p-0 overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-5 py-4 flex items-center gap-3">
          {view !== "main" && (
            <button onClick={back} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-all">
              <ChevronLeft size={18} className="text-muted-foreground" />
            </button>
          )}
          <DialogTitle className="text-base font-bold text-foreground">{titles[view]}</DialogTitle>
          {view === "main" && (
            <Badge className="ml-auto bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5 font-semibold rounded-full">4 Actions</Badge>
          )}
        </div>

        <div className="p-5">

          {/* === MAIN VIEW === */}
          {view === "main" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-4">Select an action to get started. All submissions are AI-verified.</p>
              {currentActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => { setView(action.id); setStatus("idle") }}
                  className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all group text-left"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg", action.color, action.shadow)}>
                    <action.icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{action.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* === MY SMART QR VIEW === */}
          {view === "myqr" && (
            <div className="flex flex-col items-center gap-5 py-2">
              {/* Instruction */}
              <div className="w-full p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Show this QR code to the smart bin scanner to submit your waste and earn Eco Credits.</p>
              </div>

              {/* QR Code */}
              <div className="relative p-4 bg-white rounded-3xl shadow-xl">
                <div className="w-52 h-52 bg-white">
                  {/* Simulated QR pattern */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* QR corner squares */}
                    <rect x="10" y="10" width="50" height="50" fill="none" stroke="#111" strokeWidth="8" rx="4" />
                    <rect x="20" y="20" width="30" height="30" fill="#111" rx="2" />
                    <rect x="140" y="10" width="50" height="50" fill="none" stroke="#111" strokeWidth="8" rx="4" />
                    <rect x="150" y="20" width="30" height="30" fill="#111" rx="2" />
                    <rect x="10" y="140" width="50" height="50" fill="none" stroke="#111" strokeWidth="8" rx="4" />
                    <rect x="20" y="150" width="30" height="30" fill="#111" rx="2" />
                    {/* Data dots pattern */}
                    {[70,80,90,100,110,120,130].map((x) =>
                      [70,80,90,100,110,120,130].map((y) =>
                        Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="#111" rx="1" /> : null
                      )
                    )}
                    {/* Center logo */}
                    <rect x="85" y="85" width="30" height="30" fill="white" rx="4" />
                    <text x="100" y="106" textAnchor="middle" fontSize="18" fill="#10b981">♻</text>
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-3xl ring-2 ring-primary/20" />
              </div>

              {/* Eco ID */}
              <div className="w-full p-4 bg-muted border border-border rounded-2xl">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Your Eco ID</p>
                <p className="text-sm font-bold text-foreground tracking-widest">URJA-9821-DL14-AXH</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <ShieldCheck size={12} className="text-primary" />
                  <span className="text-[11px] text-primary font-semibold">AI Verification Enabled</span>
                </div>
              </div>

              {/* How the bin works */}
              <div className="w-full space-y-2">
                <p className="text-xs font-bold text-foreground">How it works</p>
                {[
                  "User shows this QR to the smart bin scanner",
                  "Bin authenticates your Eco ID",
                  "Waste slot unlocks for deposit",
                  "AI camera identifies waste type",
                  "Weight sensor measures quantity",
                  "Eco Credits awarded after verification",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs text-muted-foreground">{step}</p>
                  </div>
                ))}
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-2 px-1">⚠️ Credits awarded only after AI + sensor verification. Minimum measurable quantity required.</p>
              </div>

              <div className="flex gap-3 w-full">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted border border-border rounded-2xl text-xs font-bold text-foreground hover:bg-muted/80 transition-all">
                  <Download size={14} /> Save QR
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-2xl text-xs font-bold hover:opacity-90 transition-all">
                  <Expand size={14} /> Expand
                </button>
              </div>
            </div>
          )}

          {/* === IDENTIFY WASTE VIEW === */}
          {view === "identify" && (
            <div className="flex flex-col gap-5">
              {status === "idle" && (
                <>
                  {/* Camera */}
                  <div className="aspect-square w-full rounded-3xl overflow-hidden bg-black relative">
                    {cameraError ? (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <p className="text-red-400 text-sm text-center">{cameraError}</p>
                      </div>
                    ) : (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    )}
                    {/* AI scan overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-40 h-40 border-2 border-primary rounded-2xl relative">
                        {/* Corner accents */}
                        {[["top-0 left-0", "-translate-x-1 -translate-y-1"], ["top-0 right-0", "translate-x-1 -translate-y-1"], ["bottom-0 left-0", "-translate-x-1 translate-y-1"], ["bottom-0 right-0", "translate-x-1 translate-y-1"]].map(([pos, tr], i) => (
                          <div key={i} className={cn("absolute w-4 h-4 border-t-2 border-l-2 border-primary", pos)} />
                        ))}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/60 animate-[scan_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary/90 text-primary-foreground text-[10px] border-none">AI-Assisted Classification · Real-time Analysis</Badge>
                    </div>
                  </div>
                  
                  <button onClick={handleCapture} disabled={!!cameraError}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-40">
                    <Camera size={18} /> Capture & Identify
                  </button>
                </>
              )}

              {status === "loading" && (
                <div className="py-16 flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 border-3 border-primary border-t-transparent rounded-full animate-spin border-[3px]" />
                    <Search size={20} className="absolute inset-0 m-auto text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground animate-pulse">Neural processing...</p>
                  <p className="text-xs text-muted-foreground text-center">Classifying material and calculating circular value.</p>
                </div>
              )}

              {status === "success" && wasteResult && (
                <div className="space-y-4">
                  {/* Result Card */}
                  <div className="p-5 bg-primary/5 border border-primary/20 rounded-3xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Detected Material</p>
                        <p className="text-xl font-bold text-foreground">{wasteResult.type}</p>
                        <p className="text-xs text-muted-foreground">{wasteResult.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{Math.round(wasteResult.confidence * 100)}%</div>
                        <p className="text-[10px] text-muted-foreground">AI Confidence</p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${wasteResult.confidence * 100}%` }} />
                    </div>
                  </div>

                  {/* Disposal guidance */}
                  <div className="p-4 bg-muted border border-border rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-foreground">Economic Impact</p>
                      <Badge className="bg-emerald-500 text-white border-none text-[10px]">+ {wasteResult.credits} Credits</Badge>
                    </div>
                    <p className="text-sm font-semibold text-primary">{wasteResult.message}</p>
                    <p className="text-xs text-muted-foreground">CO2 Offset: {wasteResult.co2}kg · Value Verified</p>
                  </div>

                  <p className="text-[10px] text-muted-foreground text-center italic">Rewards have been automatically added to your wallet.</p>
                  
                  <button onClick={() => { setStatus("idle"); startCamera() }}
                    className="w-full border border-border py-3 rounded-2xl text-xs font-bold text-foreground hover:bg-muted transition-all">
                    Scan Another Item
                  </button>
                  <button onClick={reset}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all"
                  >
                    Finish & View Wallet
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === REPORT DUMPING VIEW === */}
          {view === "report" && (
            <div className="flex flex-col gap-4">
              {status === "idle" && (
                <>
                  <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black relative">
                    {cameraError ? (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <p className="text-red-400 text-sm text-center">{cameraError}</p>
                      </div>
                    ) : (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 border-2 border-amber-500/40 m-4 rounded-2xl pointer-events-none">
                      <Badge className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] border-none">Live GPS Active</Badge>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <MapPin size={16} className="text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Location Detected</p>
                      <p className="text-[11px] text-muted-foreground">Sector 14 Market · Block C · New Delhi</p>
                    </div>
                  </div>

                  {/* Severity */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Severity Level</p>
                    <div className="flex gap-2">
                      {["Low", "Medium", "High"].map((l) => (
                        <button key={l} className={cn("flex-1 py-2 rounded-xl text-xs font-bold border",
                          l === "High" ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400" :
                          l === "Medium" ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                          "border-border bg-muted text-muted-foreground"
                        )}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleCapture} disabled={!!cameraError}
                    className="w-full bg-amber-500 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-40">
                    <Camera size={18} /> Submit Evidence
                  </button>
                </>
              )}

              {status === "loading" && (
                <div className="py-16 flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-amber-500" strokeWidth={2.5} />
                  <p className="text-sm font-semibold text-muted-foreground animate-pulse">Submitting report...</p>
                </div>
              )}

              {status === "success" && (
                <div className="py-8 flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Report Submitted</h3>
                    <p className="text-xs text-muted-foreground mt-1">Reference: CMP-{Math.floor(Math.random() * 9000) + 1000}</p>
                  </div>
                  <div className="w-full p-4 bg-muted border border-border rounded-2xl text-left space-y-1">
                    <p className="text-xs font-semibold text-foreground">What happens next?</p>
                    <p className="text-xs text-muted-foreground">Your report has been logged in our system. It will be AI-validated and assigned to the nearest response team. You can track this in the Complaint Center.</p>
                  </div>
                  <button onClick={reset} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all">
                    Track in Complaint Center →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === UPLOAD AGRI WASTE VIEW === */}
          {view === "agri" && (
            <div className="flex flex-col gap-5">
              {status === "idle" && (
                <>
                  <div className="aspect-square w-full rounded-3xl overflow-hidden bg-black relative">
                    {cameraError ? (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <p className="text-red-400 text-sm text-center">{cameraError}</p>
                      </div>
                    ) : (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-40 h-40 border-2 border-emerald-500 rounded-2xl relative">
                        {[["top-0 left-0", "-translate-x-1 -translate-y-1"], ["top-0 right-0", "translate-x-1 -translate-y-1"], ["bottom-0 left-0", "-translate-x-1 translate-y-1"], ["bottom-0 right-0", "translate-x-1 translate-y-1"]].map(([pos, tr], i) => (
                          <div key={i} className={cn("absolute w-4 h-4 border-t-2 border-l-2 border-emerald-500", pos)} />
                        ))}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500/60 animate-[scan_2s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleCapture} disabled={!!cameraError} className="w-full bg-emerald-500 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-40">
                    <ScanLine size={18} /> Analyze Agri-Waste
                  </button>
                </>
              )}

              {status === "loading" && (
                <div className="py-16 flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-emerald-500" strokeWidth={2.5} />
                  <p className="text-sm font-semibold text-muted-foreground animate-pulse">AI identifying crop residue...</p>
                </div>
              )}

              {status === "success" && (
                <div className="py-4 space-y-4 fade-in animate-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Rice Straw (Prali)</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Identified via AI Vision</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 rounded-full text-xs font-bold font-mono">
                      96% Match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-2xl border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Estimated Value</p>
                      <p className="text-sm font-bold text-emerald-500 flex items-center gap-1">₹1,200 - ₹1,500 / ton</p>
                    </div>
                    <div className="p-3 bg-muted rounded-2xl border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Best Processing</p>
                      <p className="text-sm font-bold text-foreground flex items-center gap-1">Biofuel Briquettes</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full mt-4">
                    <button onClick={reset} className="flex-1 py-3 bg-muted border border-border rounded-2xl text-xs font-bold text-foreground hover:bg-muted/80 transition-all">
                      Cancel
                    </button>
                    <button 
                      onClick={async () => {
                        const { data: { session } } = await supabase.auth.getSession()
                        if (session) {
                          const earned = 250 // Higher value for agri waste
                          const { data: profile } = await supabase.from('profiles').select('eco_credits').eq('id', session.user.id).single()
                          if (profile) {
                            await supabase.from('profiles').update({ eco_credits: profile.eco_credits + earned }).eq('id', session.user.id)
                            await supabase.from('activity_log').insert({
                              user_id: session.user.id,
                              action: "Agri Waste Identified",
                              description: "Rice Straw (Prali) classified",
                              points_earned: earned
                            })
                            toast.success(`+${earned} Credits for Agri-Waste!`)
                          }
                        }
                        setView("pickup")
                      }}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-2xl text-xs font-bold hover:bg-blue-600 transition-all"
                    >
                      Claim & Request Pickup
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === REQUEST PICKUP VIEW === */}
          {view === "pickup" && (
            <div className="flex flex-col gap-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Select Waste Quantity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["< 1 Ton", "1 - 5 Tons", "5+ Tons"].map((qty, i) => (
                      <button key={i} className={cn("py-2.5 rounded-xl border text-xs font-bold transition-all", i === 1 ? "border-blue-500 bg-blue-500/10 text-blue-500" : "border-border bg-card text-muted-foreground hover:border-border/80")}>
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Select Waste Type</label>
                  <select className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none text-foreground appearance-none">
                    <option>Rice Straw (Prali)</option>
                    <option>Wheat Husk</option>
                    <option>Sugarcane Bagasse</option>
                    <option>Mixed Biomass</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Pickup Location</label>
                  <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-xl">
                    <MapPin size={16} className="text-blue-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">Farm ID #PB-4029</p>
                      <p className="text-[10px] text-muted-foreground truncate">Ludhiana, Punjab</p>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setStatus("success")} className="w-full bg-blue-500 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all mt-2">
                Schedule Pickup
              </button>

              {status === "success" && (
                <div className="absolute inset-0 bg-card z-20 flex flex-col justify-center items-center p-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <Tractor size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Pickup Scheduled!</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-6">Transport Vehicle #12 has been assigned. Estimated arrival: Tomorrow, 10:00 AM.</p>
                  <button onClick={reset} className="w-full bg-blue-500 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all">
                    Done
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === COLLECTION CHECK-IN VIEW === */}
          {view === "checkin" && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Verify your waste drop-off at registered collection centers to earn verified Eco Credits.</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground">Nearby Collection Centers</p>
                {[
                  { name: "Sector 14 Smart Hub", distance: "0.3 km", type: "All Waste Types", open: true },
                  { name: "Green Valley Recycler", distance: "1.1 km", type: "Dry Waste Only", open: true },
                  { name: "Municipal Compost Center", distance: "2.4 km", type: "Organic Waste", open: false },
                ].map((center, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      if(center.open) {
                        toast.success(`Checking in to ${center.name}...`)
                      } else {
                        toast.error(`${center.name} is currently closed.`)
                      }
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all text-left"
                  >
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                      center.open ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                    )}>
                      <Recycle size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{center.name}</p>
                      <p className="text-[11px] text-muted-foreground">{center.type} · {center.distance}</p>
                    </div>
                    <Badge className={cn("text-[10px] border-none rounded-full px-2 flex-shrink-0",
                      center.open ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                    )}>
                      {center.open ? "Open" : "Closed"}
                    </Badge>
                  </button>
                ))}
              </div>

              <button onClick={reset} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Navigation size={14} /> Get Directions
              </button>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}
