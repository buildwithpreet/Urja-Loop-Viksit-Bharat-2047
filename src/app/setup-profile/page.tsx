"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, User, Building2, MapPin, Briefcase, Zap, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { LanguageToggle } from "@/components/shared/LanguageToggle"
import { useLanguage } from "@/components/shared/LanguageProvider"

export default function SetupProfileScreen() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    role: "Citizen",
    areaType: "urban",
    location: "",
    organization: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roles = ["Citizen", "Collector", "Admin"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.location) {
      setIsSubmitting(true)
      
      const finalMode = formData.role === "Collector" ? "collector" : formData.areaType

      try {
        const { data: { user } } = await supabase.auth.getUser()
        const isDemoSession = localStorage.getItem("urjaloop_demo_session") === "true"
        
        if (!user && !isDemoSession) {
          toast.error("User not found. Please log in again.")
          router.push("/login")
          return
        }

        if (isDemoSession) {
          // --- HACKATHON DEMO BYPASS ---
          await new Promise(r => setTimeout(r, 1000)) // Artificial delay
          localStorage.setItem("urjaloop_mode", finalMode)
          localStorage.setItem("urjaloop_profile", JSON.stringify({
            full_name: formData.name,
            role: finalMode,
            location: formData.location
          }))
          toast.success("Demo Profile Initialized!")
          router.push("/permissions")
          return
        }

        if (!user) return

        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user!.id,
            full_name: formData.name,
            role: finalMode, // Use urban/rural/collector as primary role for mode
            user_type: formData.role.toLowerCase(), // Collector/Admin/Citizen
            location: formData.location,
            phone: user!.phone,
            eco_credits: 500, // Welcome bonus
            waste_processed: 0,
            co2_saved: 0
          })

        if (error) {
          toast.error(error.message)
        } else {
          localStorage.setItem("urjaloop_mode", finalMode)
          toast.success("Profile initialized successfully! Enjoy 500 welcome credits.")
          router.push("/permissions")
        }
      } catch (err) {
        toast.error("An unexpected error occurred")
        console.error(err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden p-6 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header Strategy */}
      <div className="w-full max-w-lg mx-auto pt-10 pb-6 z-10 animate-in slide-in-from-top-6 fade-in duration-1000">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary shadow-xl">
                <User size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Profile Manifest</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setFormData({...formData, name: "Alex Harrison", location: "Sector 14 · New Delhi"})}
              className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Quick Fill Demo
            </button>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">{t("setup_title")}</h1>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40 mt-2">{t("setup_subtitle")}</p>
      </div>

      {/* Main Tactical Deck */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-lg mx-auto animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both pb-24">
        
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Neural Avatar Interface */}
          <div className="flex justify-center py-6">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-[2.5rem] ultra-glass flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 shadow-2xl relative z-10">
                <User size={56} className="text-primary/40" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 border-4 border-background group-hover:scale-110 transition-transform z-20">
                <Camera size={20} strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl -z-10 scale-125 animate-pulse"></div>
            </div>
          </div>

          <div className="ultra-glass rounded-[2.5rem] p-10 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10"></div>
            
            {/* Operator Designation */}
            <div className="space-y-4 relative z-10">
              <label htmlFor="name" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <User size={14} className="text-primary" strokeWidth={2.5} /> {t("setup_name_label")}
              </label>
              <div className="relative group/input">
                 <input
                   id="name"
                   type="text"
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   placeholder={t("setup_name_placeholder")}
                   className={cn(
                     "w-full bg-foreground/5 border border-border rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase",
                     !formData.name && "animate-pulse border-primary/30"
                   )}
                 />
              </div>
            </div>

            {/* Area Type Selection */}
            <div className="space-y-4 relative z-10">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <MapPin size={14} className="text-primary" strokeWidth={2.5} /> Living Environment
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "urban", label: "Urban City", desc: "Access Smart Bins" },
                  { id: "rural", label: "Rural Farm", desc: "Agri-Waste Focus" }
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setFormData({...formData, areaType: area.id})}
                    className={cn(
                      "p-4 rounded-2xl text-left transition-all border group/btn",
                      formData.areaType === area.id
                        ? "bg-primary/10 border-primary shadow-lg"
                        : "ultra-glass border-border/50 opacity-60 hover:opacity-100"
                    )}
                  >
                    <p className={cn("text-[11px] font-black uppercase tracking-widest mb-1", 
                      formData.areaType === area.id ? "text-primary" : "text-foreground"
                    )}>{area.label}</p>
                    <p className="text-[9px] text-muted-foreground font-medium leading-tight">{area.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Network Authority Mapping */}
            <div className="space-y-4 relative z-10">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <Briefcase size={14} className="text-primary" strokeWidth={2.5} /> Operational Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    className={cn(
                      "h-14 rounded-xl text-[10px] font-black transition-all border uppercase tracking-widest",
                      formData.role === role
                        ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/30 scale-105"
                        : "ultra-glass text-muted-foreground opacity-60 hover:opacity-100 hover:border-primary/30"
                    )}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographical Anchor */}
            <div className="space-y-4 relative z-10">
              <label htmlFor="location" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <MapPin size={14} className="text-primary" strokeWidth={2.5} /> {t("setup_loc_label")}
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder={t("setup_loc_placeholder")}
                className={cn(
                  "w-full bg-foreground/5 border border-border rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase",
                  !formData.location && "animate-pulse border-primary/30"
                )}
              />
            </div>

            {/* Affiliated Collective */}
            <div className="space-y-4 relative z-10">
              <label htmlFor="organization" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center justify-between">
                <span className="flex items-center gap-3"><Building2 size={14} className="text-primary" strokeWidth={2.5} /> Collective Entity</span>
                <span className="text-[8px] opacity-40 lowercase normal-case tracking-widest">(Optional Integration)</span>
              </label>
              <input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                placeholder="NGO / GOVERNMENT / COMPANY"
                className="w-full bg-foreground/5 border border-border rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase"
              />
            </div>
          </div>

          {/* Verification Protocol Execution */}
          <div className="space-y-6">
            <button
              type="submit"
              disabled={!formData.name || !formData.location || isSubmitting}
              className={cn(
                "w-full h-20 rounded-3xl font-black text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 relative overflow-hidden",
                formData.name && formData.location
                  ? "btn-premium shadow-primary/30 active:scale-95" 
                  : "bg-foreground/5 text-muted-foreground opacity-40 cursor-not-allowed grayscale"
              )}
            >
              {isSubmitting ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Commit Neural Profile
                  <Zap size={20} strokeWidth={2.5} className="group-hover:animate-pulse" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-3 text-muted-foreground/30">
               <ShieldCheck size={16} strokeWidth={2.5} />
               <span className="text-[9px] font-black uppercase tracking-[0.3em]">Identity Protocol Encrypted</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
