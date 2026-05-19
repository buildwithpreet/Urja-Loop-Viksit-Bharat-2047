"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, ArrowRight, ShieldCheck, Phone, Lock, Mail, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { LanguageToggle } from "@/components/shared/LanguageToggle"
import { useLanguage } from "@/components/shared/LanguageProvider"

import { usersApi } from "@/lib/api"
import { toast } from "sonner"

export default function RegisterScreen() {
  const router = useRouter()
  const { t } = useLanguage()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || phone.length < 10 || !password) {
      toast.error("Please fill all fields correctly")
      return
    }
    if (!agreed) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)
    const fullPhone = phone.startsWith("+91") ? phone : `+91${phone}`
    
    try {
      const response = await usersApi.register({ email, password, fullName, phoneNumber: fullPhone, role: "citizen" })
      if (response && response.success && response.token) {
        localStorage.setItem("urjaloop_auth_token", response.token)
        toast.success("Account created successfully!")
        router.push("/dashboard")
      } else {
        toast.error("Registration failed. Please try again.")
      }
    } catch (err: any) {
      console.error("Registration Error:", err)
      toast.error(err.message || "Connection failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0C0B] relative overflow-hidden p-6 transition-colors duration-300">

      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1F7A3D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#34D399]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Toggles */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <div className="w-full max-w-md space-y-10 z-10">

        {/* Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="group relative">
            <div className="w-16 h-16 bg-[#1F7A3D] rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
              <Leaf className="text-white w-8 h-8" strokeWidth={2} fill="currentColor" />
            </div>
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Create Account</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] opacity-80">Join UrjaLoop Platform</p>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-neutral-200 dark:border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-4">
              <div className="relative flex items-center group/input">
                <div className="absolute left-6 text-foreground flex items-center pr-5 h-8">
                  <User size={18} className="text-primary opacity-60" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full h-16 ultra-glass border border-foreground/10 rounded-2xl pl-16 pr-6 text-lg font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-40 bg-foreground/5"
                />
              </div>

              <div className="relative flex items-center group/input">
                <div className="absolute left-6 text-foreground flex items-center pr-5 h-8">
                  <Mail size={18} className="text-primary opacity-60" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-16 ultra-glass border border-foreground/10 rounded-2xl pl-16 pr-6 text-lg font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-40 bg-foreground/5"
                />
              </div>

              <div className="relative flex items-center group/input">
                <div className="absolute left-6 font-black text-foreground flex items-center gap-3 border-r border-foreground/10 pr-4 h-8">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-[12px] text-muted-foreground opacity-60">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Phone Number"
                  className="w-full h-16 ultra-glass border border-foreground/10 rounded-2xl pl-24 pr-6 text-lg font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-40 bg-foreground/5"
                />
              </div>

              <div className="relative flex items-center group/input">
                <div className="absolute left-6 text-foreground flex items-center pr-5 h-8">
                  <Lock size={18} className="text-primary opacity-60" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Password"
                  className="w-full h-16 ultra-glass border border-foreground/10 rounded-2xl pl-16 pr-6 text-lg font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-40 bg-foreground/5"
                />
              </div>
            </div>

            {/* Protocol Agreement */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 group/terms cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <div className="pt-0.5">
                <div className={cn(
                  "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                  agreed ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" : "border-foreground/10 bg-foreground/5"
                )}>
                  {agreed && <ShieldCheck size={14} strokeWidth={3} />}
                </div>
              </div>
              <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-widest opacity-60 group-hover/terms:opacity-100 transition-opacity">
                I accept the <span className="text-primary hover:underline">Terms of Service</span> and <span className="text-primary hover:underline">Privacy Policy</span>.
              </p>
            </div>

            <button
              type="submit"
              disabled={phone.length < 10 || !password || !fullName || !email || !agreed || isSubmitting}
              className={cn(
                "w-full h-16 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 relative overflow-hidden group/btn",
                phone.length >= 10 && password && fullName && email && agreed
                  ? "btn-premium shadow-primary/30 active:scale-95"
                  : "bg-foreground/5 text-muted-foreground opacity-40 cursor-not-allowed grayscale"
              )}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center pt-2 flex flex-col gap-4">
              <Link href="/login" className="text-xs font-bold text-primary hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
