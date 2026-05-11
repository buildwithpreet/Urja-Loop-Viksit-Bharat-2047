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
