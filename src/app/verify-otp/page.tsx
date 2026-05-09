"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, ShieldCheck, Timer, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VerifyOtpScreen() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(30)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return 

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1) 
    setOtp(newOtp)

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "")
    
    if (pastedData) {
      const newOtp = [...otp]
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) newOtp[i] = pastedData[i]
      }
      setOtp(newOtp)
      const focusIndex = Math.min(pastedData.length, 5)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const handleVerify = () => {
    const otpValue = otp.join("")
    if (otpValue.length === 6) {
      setIsVerifying(true)
      setTimeout(() => {
        setIsVerifying(false)
        setIsSuccess(true)
        setTimeout(() => {
          router.push("/setup-profile")
        }, 2000)
      }, 1500)
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-mesh animate-in fade-in duration-1000">
        <div className="relative">
          <div className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-primary/40 animate-in zoom-in duration-1000 fill-mode-both relative z-10">
            <CheckCircle2 size={64} strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-3xl -z-10 scale-150 animate-pulse"></div>
        </div>
        <div className="mt-12 text-center space-y-3">
          <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter animate-in slide-in-from-bottom-8 duration-700 delay-300">
            Identity Verified
          </h2>
          <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] opacity-80 animate-in slide-in-from-bottom-4 duration-700 delay-500">
            Synchronizing Neural Profile...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden bg-mesh p-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Header Strategy */}
      <div className="w-full max-w-lg mx-auto py-8 flex items-center justify-between z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
        <button 
          onClick={() => router.back()}
          className="w-14 h-14 ultra-glass border border-foreground/10 rounded-2xl flex items-center justify-center text-foreground hover:border-primary/30 transition-all active:scale-90"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="w-14 h-14 ultra-glass border border-foreground/10 rounded-2xl flex items-center justify-center text-primary">
          <Cpu size={24} strokeWidth={2.5} className="animate-pulse" />
        </div>
      </div>

      {/* Main Tactical Area */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-lg mx-auto space-y-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
        <div className="text-center space-y-3 w-full">
           <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Enter Auth Code</h1>
           <div className="flex items-center justify-center flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
              <span className="text-muted-foreground">Transmitted to</span>
              <span className="text-primary font-black">+91 98765 43210</span>
              <button onClick={() => router.back()} className="text-white hover:text-primary underline-offset-4 underline decoration-primary/30">
                Change Node
              </button>
           </div>
        </div>

        {/* OTP Input Matrix */}
        <div className="flex justify-between w-full gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={cn(
                "w-full h-20 text-center text-3xl font-black rounded-2xl border transition-all focus:outline-none ultra-glass",
                digit 
                  ? "border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/10 scale-105" 
                  : "border-foreground/10 bg-foreground/5 text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
              )}
            />
          ))}
        </div>

        {/* Temporal Counter */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="ultra-glass border border-foreground/10 px-8 py-4 rounded-2xl flex items-center gap-4">
            <Timer size={18} className={cn("text-primary", timer < 10 && "animate-pulse text-red-500")} strokeWidth={2.5} />
            {timer > 0 ? (
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                Protocol expires in <span className="text-foreground tabular-nums">{timer}s</span>
              </p>
            ) : (
              <button 
                onClick={() => setTimer(30)}
                className="text-[11px] font-black text-primary hover:underline uppercase tracking-widest"
              >
                Request New Code
              </button>
            )}
          </div>

          <div className="w-full flex items-center gap-4 text-muted-foreground/30 px-4">
             <div className="h-px flex-1 bg-foreground/5"></div>
             <ShieldCheck size={16} />
             <div className="h-px flex-1 bg-foreground/5"></div>
          </div>

          <button
            onClick={handleVerify}
            disabled={!isComplete || isVerifying}
            className={cn(
              "w-full h-20 rounded-3xl font-black text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 relative overflow-hidden",
              isComplete
                ? "btn-premium shadow-primary/30 active:scale-95" 
                : "bg-foreground/5 text-muted-foreground opacity-40 cursor-not-allowed grayscale"
            )}
          >
            {isVerifying ? (
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Authorize Session"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
