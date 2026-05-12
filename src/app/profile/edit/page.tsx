"use client"

import { 
  ChevronLeft, Camera, ShieldCheck, QrCode, 
  MapPin, Phone, Mail, User, Check,
  Leaf, Tractor, Wheat, Truck, Landmark, CreditCard,
  Bell, Zap, Globe, ChevronRight, Recycle, Moon, Wallet
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"

export default function EditProfilePage() {
  const router = useRouter()
  const { mode, setMode } = useMode()
  
  const [role, setRole] = useState<"Citizen" | "Farmer">(mode === "rural" ? "Farmer" : "Citizen")
  const [formData, setFormData] = useState({
    name: mode === "rural" ? "Ram Singh" : "Alex Harrison",
    phone: "+91 98765 43210",
    email: mode === "rural" ? "ram.singh@farm.com" : "alex.h@gmail.com",
    city: mode === "rural" ? "Ludhiana" : "New Delhi",
    state: mode === "rural" ? "Punjab" : "Delhi",
    farmType: "Crop Farming",
    biomassCategory: "Rice Straw",
    pickupMethod: "Pickup",
    interests: ["Plastic", "Organic"],
    notifications: {
      pickup: true,
      rewards: true,
      darkMode: true
    }
  })

  const interestOptions = ["Plastic", "Organic", "Biomass", "E-Waste", "Metal", "Paper"]

  const toggleInterest = (type: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(type)
        ? prev.interests.filter(t => t !== type)
        : [...prev.interests, type]
    }))
  }

  const handleSave = () => {
    if (role === "Farmer") setMode("rural")
    else setMode("urban")
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-sm font-bold tracking-tight">Edit Profile</h1>
          </div>
          <button 
            onClick={handleSave}
            className="px-4 py-1.5 bg-emerald-500 text-white rounded-full font-bold text-[11px] uppercase tracking-wider hover:bg-emerald-400 transition-colors"
          >
            Save
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-8 pb-40 space-y-12">
        
        {/* Identity Section */}
        <section className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-[2rem] bg-[#1A1A1A] border border-white/10 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role === 'Farmer' ? 'Ram' : 'Alex'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover grayscale-[0.2]" 
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#252525] text-white/80 rounded-xl flex items-center justify-center border border-white/10 hover:bg-[#333] transition-colors shadow-xl">
              <Camera size={14} />
            </button>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-transparent border-none text-2xl font-bold p-0 focus:ring-0 w-full sm:w-auto placeholder:text-white/20"
                placeholder="Full Name"
              />
              <div className="flex items-center justify-center sm:justify-start gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit mx-auto sm:mx-0">
                <ShieldCheck size={10} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Verified</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[10px] font-bold text-white/40 uppercase tracking-[0.1em]">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-white/20" />
                {formData.city}, {formData.state}
              </div>
              <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
                <QrCode size={12} className="text-white/20" />
                QR Preview
              </button>
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="space-y-6">
          <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-0.5">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-medium focus:border-emerald-500/50 transition-colors outline-none placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-0.5">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-medium focus:border-emerald-500/50 transition-colors outline-none placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-0.5">City / Village</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-medium focus:border-emerald-500/50 transition-colors outline-none placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-0.5">State</label>
              <input 
                type="text" 
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-medium focus:border-emerald-500/50 transition-colors outline-none placeholder:text-white/10"
              />
            </div>
          </div>
        </section>

        {/* Role Selection */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
             <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Contribution Type</h2>
             <div className="flex p-1 bg-[#1A1A1A] rounded-full border border-white/5">
                <button 
                  onClick={() => setRole("Citizen")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    role === "Citizen" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                  )}
                >
                  Citizen
                </button>
                <button 
                  onClick={() => setRole("Farmer")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    role === "Farmer" ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white/60"
                  )}
                >
                  Farmer
                </button>
             </div>
          </div>

          {role === "Farmer" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Farm Type</label>
                <select 
                  value={formData.farmType}
                  onChange={(e) => setFormData({...formData, farmType: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 pb-2 text-xs font-bold appearance-none outline-none focus:border-emerald-500/50"
                >
                  <option className="bg-[#1A1A1A]">Crop Farming</option>
                  <option className="bg-[#1A1A1A]">Dairy</option>
                  <option className="bg-[#1A1A1A]">Mixed Farming</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Biomass Category</label>
                <select 
                  value={formData.biomassCategory}
                  onChange={(e) => setFormData({...formData, biomassCategory: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 pb-2 text-xs font-bold appearance-none outline-none focus:border-emerald-500/50"
                >
                  <option className="bg-[#1A1A1A]">Rice Straw</option>
                  <option className="bg-[#1A1A1A]">Wheat Residue</option>
                  <option className="bg-[#1A1A1A]">Organic Waste</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pickup Method</label>
                <select 
                  value={formData.pickupMethod}
                  onChange={(e) => setFormData({...formData, pickupMethod: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 pb-2 text-xs font-bold appearance-none outline-none focus:border-emerald-500/50"
                >
                  <option className="bg-[#1A1A1A]">Pickup</option>
                  <option className="bg-[#1A1A1A]">Self Delivery</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* Contribution Interests */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(type => (
              <button
                key={type}
                onClick={() => toggleInterest(type)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                  formData.interests.includes(type) 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Preferences</h2>
          <div className="bg-[#1A1A1A]/40 rounded-2xl border border-white/5 overflow-hidden">
            {[
              { id: 'pickup', label: 'Pickup Alerts', icon: Bell },
              { id: 'rewards', label: 'Reward Updates', icon: Zap },
              { id: 'darkMode', label: 'Dark Mode', icon: Moon },
            ].map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3 text-white/80">
                  <item.icon size={14} className="text-white/20" />
                  <span className="text-xs font-bold">{item.label}</span>
                </div>
                <button 
                  onClick={() => setFormData({
                    ...formData, 
                    notifications: { ...formData.notifications, [item.id]: !formData.notifications[item.id as keyof typeof formData.notifications] }
                  })}
                  className={cn(
                    "w-8 h-4 rounded-full transition-all relative shrink-0",
                    formData.notifications[item.id as keyof typeof formData.notifications] ? "bg-emerald-500" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform",
                    formData.notifications[item.id as keyof typeof formData.notifications] ? "translate-x-4" : "translate-x-0"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Rewards & Banking */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="group p-4 bg-[#1A1A1A]/40 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-[#1A1A1A]/60 transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-colors">
                <Landmark size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/80">Bank / UPI</p>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5 group-hover:text-white/40 transition-colors">Linked</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-white/10 group-hover:text-white/30 transition-colors" />
          </button>
          <button className="group p-4 bg-[#1A1A1A]/40 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-[#1A1A1A]/60 transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white/80 transition-colors">
                <Wallet size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/80">Rewards Wallet</p>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5 group-hover:text-white/40 transition-colors">₹4,200 Available</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-white/10 group-hover:text-white/30 transition-colors" />
          </button>
        </section>

      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 h-24 flex flex-col items-center justify-center gap-2">
          <button 
            onClick={handleSave}
            className="w-full h-12 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-[0.98]"
          >
            Save Changes
          </button>
          <button 
            onClick={() => router.back()}
            className="text-[10px] font-black text-white/30 hover:text-white/60 transition-colors uppercase tracking-[0.2em]"
          >
            Cancel
          </button>
        </div>
      </footer>
    </div>
  )
}
