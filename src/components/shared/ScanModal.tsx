"use client"

import { useState } from "react"
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
  X,
  ChevronLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ScanModalProps {
  isOpen: boolean
  onClose: () => void
}

type ScanView = "main" | "qr" | "identify" | "report"

export function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const [view, setView] = useState<ScanView>("main")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleAction = (actionView: ScanView) => {
    setView(actionView)
    setStatus("loading")
    
    // Simulate processing
    setTimeout(() => {
      setStatus("success")
    }, 1500)
  }

  const resetModal = () => {
    setView("main")
    setStatus("idle")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md rounded-t-[2.5rem] sm:rounded-3xl border-none p-0 overflow-hidden bg-white">
        <div className="p-6">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 mb-6">
            <div className="flex items-center gap-2">
              {view !== "main" && (
                <button onClick={() => setView("main")} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronLeft size={20} />
                </button>
              )}
              <DialogTitle className="text-xl font-black text-slate-900">
                {view === "main" && "Scan & Action"}
                {view === "qr" && "QR Scanner"}
                {view === "identify" && "AI Waste ID"}
                {view === "report" && "Report Issue"}
              </DialogTitle>
            </div>
          </DialogHeader>

          {view === "main" && (
            <div className="grid gap-4">
              <button
                onClick={() => handleAction("qr")}
                className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <QrCode size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Scan QR</h3>
                  <p className="text-xs text-slate-500 font-medium">Drop-off at Smart Bin & earn rewards</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("identify")}
                className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group"
              >
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
                  <Search size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Identify Waste</h3>
                  <p className="text-xs text-slate-500 font-medium">AI powered real-time classification</p>
                </div>
              </button>

              <button
                onClick={() => handleAction("report")}
                className="flex items-center gap-4 p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] text-left group"
              >
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-100">
                  <AlertCircle size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Report Dumping</h3>
                  <p className="text-xs text-slate-500 font-medium">Capture photo & auto-detect location</p>
                </div>
              </button>
            </div>
          )}

          {/* QR View Content */}
          {view === "qr" && (
            <div className="flex flex-col items-center justify-center py-10 gap-6 text-center animate-in zoom-in-95 duration-300">
              {status === "loading" ? (
                <>
                  <div className="w-48 h-48 border-4 border-blue-100 rounded-3xl relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50 animate-pulse"></div>
                    <div className="w-full h-1 bg-blue-500 absolute top-0 animate-[scan_2s_infinite]"></div>
                    <QrCode size={64} className="text-blue-300 opacity-50" />
                  </div>
                  <p className="text-slate-500 font-bold animate-pulse">Scanning Bin QR Code...</p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Success!</h2>
                    <p className="text-slate-500 font-medium">Bin #402 opened successfully</p>
                  </div>
                  <Card className="w-full bg-emerald-50 border-emerald-100 shadow-none p-4 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 font-bold text-sm">Reward Earned</span>
                      <span className="text-xl font-black text-emerald-600">+10 Credits</span>
                    </div>
                  </Card>
                  <button onClick={resetModal} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-transform">
                    DONE
                  </button>
                </>
              )}
            </div>
          )}

          {/* Identify View Content */}
          {view === "identify" && (
            <div className="flex flex-col items-center justify-center py-6 gap-6 text-center animate-in slide-in-from-right-4 duration-300">
              {status === "loading" ? (
                <>
                  <div className="w-full aspect-square bg-slate-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <Camera size={48} className="text-slate-300" />
                    <div className="absolute inset-0 border-2 border-emerald-500/20 m-4 rounded-2xl animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-600">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="font-bold">AI Analyzing Material...</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full aspect-square bg-slate-100 rounded-3xl relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" className="object-cover w-full h-full" alt="Waste" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-500 border-none shadow-lg px-3 py-1 font-black">98% CONFIDENCE</Badge>
                    </div>
                  </div>
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center text-left">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 uppercase">Plastic Bottle</h2>
                        <p className="text-sm text-slate-500 font-medium">Classification: <span className="text-emerald-600 font-bold">DRY WASTE</span></p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none h-10 px-4 font-black">RECYCLABLE</Badge>
                    </div>
                    <button onClick={resetModal} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-100 active:scale-95 transition-transform">
                      VIEW DISPOSAL STEPS
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Report View Content */}
          {view === "report" && (
            <div className="flex flex-col items-center justify-center py-6 gap-6 text-left animate-in slide-in-from-right-4 duration-300">
              <div className="w-full space-y-6">
                <div className="w-full aspect-[4/3] bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-300 transition-colors cursor-pointer group">
                  <div className="text-center space-y-2">
                    <Camera size={32} className="mx-auto text-slate-400 group-hover:text-amber-500 transition-colors" />
                    <p className="text-xs font-bold text-slate-500">TAP TO CAPTURE PHOTO</p>
                  </div>
                </div>
                
                <Card className="border-none bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-amber-500 mt-0.5" size={18} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Auto-detected Location</h4>
                      <p className="text-xs text-slate-500 font-medium">Sector 5 Market, Near Metro Pillar 142</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-[8px] h-4 border-amber-200 text-amber-600 px-1 font-black">ACCURATE</Badge>
                  </div>
                </Card>

                <div className="space-y-3">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Describe Issue (Optional)</p>
                   <textarea className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none h-24" placeholder="Briefly describe the dumping problem..."></textarea>
                </div>

                <button onClick={() => { alert("Report submitted successfully!"); resetModal(); }} className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black shadow-xl shadow-amber-100 active:scale-95 transition-transform">
                  SUBMIT COMPLAINT
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </Dialog>
  )
}
