"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, User, Building2, MapPin, Briefcase, Zap, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SetupProfileScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    role: "Citizen",
    location: "",
    organization: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roles = ["Citizen", "Collector", "Admin"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.location) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/permissions")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden bg-mesh p-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header Strategy */}
      <div className="w-full max-w-lg mx-auto pt-10 pb-6 z-10 animate-in slide-in-from-top-6 fade-in duration-1000">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-10 h-10 ultra-glass border border-foreground/10 rounded-xl flex items-center justify-center text-primary shadow-xl">
              <User size={20} strokeWidth={2.5} />
           </div>
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Profile Manifest</span>
        </div>
        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Initialize Identity</h1>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40 mt-2">Configure your node parameters for network access</p>
      </div>

      {/* Main Tactical Deck */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-lg mx-auto animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both pb-24">
        
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Neural Avatar Interface */}
          <div className="flex justify-center py-6">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-[2.5rem] ultra-glass border border-foreground/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 shadow-2xl relative z-10">
                <User size={56} className="text-primary/40" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/40 border-4 border-background group-hover:scale-110 transition-transform z-20">
                <Camera size={20} strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl -z-10 scale-125 animate-pulse"></div>
            </div>
          </div>

          <div className="ultra-glass border border-foreground/10 rounded-[2.5rem] p-10 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10"></div>
            
            {/* Operator Designation */}
            <div className="space-y-4 relative z-10">
              <label htmlFor="name" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <User size={14} className="text-primary" strokeWidth={2.5} /> Primary Identifier
              </label>
              <div className="relative group/input">
                 <input
                   id="name"
                   type="text"
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   placeholder="ENTER FULL NAME"
                   className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase"
                 />
              </div>
            </div>

            {/* Network Authority Mapping */}
            <div className="space-y-4 relative z-10">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                <Briefcase size={14} className="text-primary" strokeWidth={2.5} /> Sector Designation
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
                        ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-105"
                        : "ultra-glass border-foreground/10 text-muted-foreground opacity-60 hover:opacity-100 hover:border-primary/30"
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
                <MapPin size={14} className="text-primary" strokeWidth={2.5} /> Deployment Zone
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="CITY / VILLAGE NAME"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase"
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
                className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl h-16 px-6 font-black text-[13px] tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 uppercase"
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
