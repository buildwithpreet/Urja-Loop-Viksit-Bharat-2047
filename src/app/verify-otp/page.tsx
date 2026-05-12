"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, ShieldCheck, Timer, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function VerifyOtpScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || "+91 98765 43210"
  
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
    if (!searchParams.get("phone")) {
      toast.error("No phone number provided")
      router.push("/login")
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

  const handleVerify = async () => {
    const otpValue = otp.join("")
    const isDemo = searchParams.get("demo") === "true"

    if (otpValue.length === 6 && phone) {
      setIsVerifying(true)
      
      let user = null
      let error = null

      if (isDemo) {
        // --- HACKATHON DEMO BYPASS ---
        // Simulate successful login for any OTP in demo mode
        await new Promise(r => setTimeout(r, 1000))
        const { data: demoData } = await supabase.auth.getSession()
        user = demoData.session?.user || { id: "demo-user-id", email: "demo@urjaloop.com" }
        localStorage.setItem("urjaloop_demo_session", "true")
      } else {
        const { data: authData, error: authError } = await supabase.auth.verifyOtp({
          phone,
          token: otpValue,
          type: 'sms'
        })
        user = authData?.user
        error = authError
      }

      if (error) {
        toast.error(error.message)
        setIsVerifying(false)
      } else {
        // Successfully verified
        
        // Check if user has a profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single()

        setIsVerifying(false)
        setIsSuccess(true)
        
        setTimeout(() => {
          if (profile && profile.full_name) {
            router.push("/dashboard")
          } else {
            router.push("/onboarding")
          }
        }, 1500)
      }
    }
  }

  const handleResend = async () => {
    if (timer > 0) return
    const { error } = await supabase.auth.signInWithOtp({ phone })
    if (error) toast.error(error.message)
    else {
      toast.success("Code resent!")
      setTimer(30)
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center transition-colors duration-300">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground shadow-2xl animate-in zoom-in duration-700">
            <CheckCircle2 size={48} strokeWidth={2} />
          </div>
          <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl -z-10 scale-150 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-medium text-foreground tracking-tight">Verified</h2>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Accessing Infrastructure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden p-6 transition-colors duration-300">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-md mx-auto py-8 z-10">
        <button 
          onClick={() => router.back()}
          className="w-12 h-12 bg-muted/50 border border-border rounded-xl flex items-center justify-center text-foreground hover:bg-muted transition-all"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-md mx-auto space-y-12">
        <div className="text-center space-y-4 w-full">
           <h1 className="text-3xl font-medium text-foreground tracking-tight">Enter Verification Code</h1>
           <div className="flex flex-col items-center gap-2">
               <p className="text-sm text-muted-foreground font-medium">Sent to {phone}</p>
              <button onClick={() => router.back()} className="text-xs text-primary hover:underline font-semibold transition-colors">
                Change Number
              </button>
           </div>
        </div>

        {/* OTP Inputs */}
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
                "w-full h-16 text-center text-2xl font-medium rounded-2xl border transition-all focus:outline-none",
                digit 
                  ? "border-primary bg-primary/5 text-foreground shadow-[0_0_15px_rgba(52,211,153,0.1)]" 
                  : "border-border bg-muted/30 text-foreground focus:border-primary/50"
              )}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="w-full space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3 text-xs font-medium">
              <Timer size={14} className={cn("text-primary", timer < 10 && "text-red-500 animate-pulse")} />
              {timer > 0 ? (
                <p className="text-muted-foreground">
                  Expires in <span className="text-foreground tabular-nums font-bold">{timer}s</span>
                </p>
              ) : (
                <button 
                  onClick={() => setTimer(30)}
                  className="text-primary hover:underline font-semibold"
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying}
              className={cn(
                "w-full h-14 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-3",
                isComplete && !isVerifying
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(31,122,61,0.2)] active:scale-95" 
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              )}
            >
              {isVerifying ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Authorize Session <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/40 uppercase font-bold tracking-[0.2em]">
            <ShieldCheck size={14} className="text-primary/40" />
            End-to-End Encrypted
          </div>
        </div>
      </div>
    </div>
  )
}
