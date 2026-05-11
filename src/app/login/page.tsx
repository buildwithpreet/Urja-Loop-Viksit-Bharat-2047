"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, ArrowRight, ShieldCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginScreen() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 10 && agreed) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/verify-otp")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0C0B] relative overflow-hidden p-6 transition-colors duration-300">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1F7A3D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#34D399]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-12 z-10">
        
        {/* Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="group">
            <div className="w-16 h-16 bg-[#1F7A3D] rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
               <Leaf className="text-white w-8 h-8" strokeWidth={2} fill="currentColor" />
            </div>
          </Link>
          <div className="space-y-2">
             <h1 className="text-3xl font-medium text-neutral-900 dark:text-white tracking-tight">Access the Platform</h1>
             <p className="text-sm text-neutral-500 dark:text-[#A3A3A3] font-medium">India's Smart Waste Infrastructure</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-neutral-200 dark:border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-4">
              <label htmlFor="phone" className="block text-xs font-semibold text-neutral-500 dark:text-[#A3A3A3] uppercase tracking-wider ml-1">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-5 text-sm font-medium text-neutral-400 dark:text-white/40 border-r border-neutral-200 dark:border-white/10 pr-4 h-6 flex items-center">
                  +91
                </div>
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="000 000 0000"
                  className="w-full h-14 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-2xl pl-20 pr-5 text-lg font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-[#34D399]/50 transition-all placeholder:text-neutral-300 dark:placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 cursor-pointer group" onClick={() => setAgreed(!agreed)}>
              <div className={cn(
                "w-5 h-5 rounded-md border flex items-center justify-center transition-all mt-0.5",
                agreed ? "bg-[#34D399] border-[#34D399] text-black" : "border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5"
              )}>
                {agreed && <Check size={14} strokeWidth={4} />}
              </div>
              <p className="text-xs text-neutral-500 dark:text-[#A3A3A3] leading-relaxed font-medium">
                I agree to the <span className="text-[#1F7A3D] dark:text-[#34D399] hover:underline">Terms of Service</span> and <span className="text-[#1F7A3D] dark:text-[#34D399] hover:underline">Privacy Policy</span>.
              </p>
            </div>

            <button
              type="submit"
              disabled={phone.length < 10 || !agreed || isSubmitting}
              className={cn(
                "w-full h-14 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-3",
                phone.length >= 10 && agreed && !isSubmitting
                  ? "bg-[#34D399] text-black hover:bg-[#2BA855] shadow-[0_0_20px_rgba(52,211,153,0.2)] active:scale-95" 
                  : "bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-white/20 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="relative flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-neutral-200 dark:bg-white/5" />
              <span className="text-[10px] font-bold text-neutral-400 dark:text-white/20 uppercase tracking-widest">or</span>
              <div className="h-px flex-1 bg-neutral-200 dark:bg-white/5" />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitting(true)
                setTimeout(() => {
                  router.push("/onboarding")
                }, 1500)
              }}
              className="w-full h-14 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] flex items-center justify-center gap-3 text-sm font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-all active:scale-95 shadow-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-[10px] text-neutral-400 dark:text-white/20 uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#1F7A3D]/40 dark:text-[#34D399]/40" />
            Secure Municipal Access Node
          </p>
        </div>
      </div>
    </div>
  )
}
