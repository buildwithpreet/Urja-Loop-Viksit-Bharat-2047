"use client"

import { useState, useEffect } from "react"
import { QrCode, ArrowLeft, ShieldCheck, User, MapPin, Zap, Info, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export default function SmartQRPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      // Try real session first
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (data) setProfile(data)
      } else {
        // Fallback to demo session
        const demoSession = localStorage.getItem("urjaloop_demo_session")
        if (demoSession) {
          setProfile(JSON.parse(demoSession))
        }
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen bg-background p-4 pb-20 md:p-8 flex flex-col max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/profile" className="p-3 bg-muted rounded-2xl hover:bg-muted/80 transition-all active:scale-95">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">Smart Identity</h1>
        <div className="w-11" /> {/* Spacer */}
      </div>

      {/* Main Card */}
      <Card className="flex-1 border-border bg-card/50 backdrop-blur-xl rounded-[40px] p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 blur-[80px] -z-10 rounded-full" />
        
        {/* Profile Info */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 relative">
            <User size={32} className="text-primary" />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg border-2 border-card">
              <ShieldCheck size={12} />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{profile?.full_name || "Demo User"}</h2>
          <p className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-1 mt-1 uppercase tracking-wider">
            <MapPin size={10} /> {profile?.location || "New Delhi, India"}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="w-full aspect-square max-w-[280px] bg-white rounded-[32px] p-8 flex items-center justify-center shadow-inner mb-8 relative group">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-[32px] animate-pulse" />
          
          {/* Mock QR Code Pattern */}
          <div className="w-full h-full relative opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="grid grid-cols-5 gap-2 w-full h-full">
              {[...Array(25)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "rounded-sm transition-all duration-500",
                    (i % 3 === 0 || i % 7 === 0 || i < 4 || i > 20) ? "bg-black" : "bg-zinc-100"
                  )} 
                />
              ))}
            </div>
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-2 rounded-xl shadow-lg border border-border">
                <Zap size={20} className="text-primary fill-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-primary" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider">Verification ID</span>
            </div>
            <Badge className="bg-primary/20 text-primary border-none text-[10px] font-bold">
              #{profile?.id?.slice(0, 8).toUpperCase() || "DEMO-8821"}
            </Badge>
          </div>

          <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 flex items-start gap-3">
            <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium leading-relaxed uppercase tracking-tight">
              Scan this QR at any Smart Bin or Collection Hub to validate your identity and claim Eco-Credits.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="flex items-center justify-center gap-2 p-4 bg-muted rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-muted/80 transition-all active:scale-95">
          <Download size={16} /> Save
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* Security Note */}
      <p className="text-center text-[10px] text-muted-foreground mt-8 font-medium uppercase tracking-widest opacity-60">
        Secure Encryption Active · SSL/TLS 1.3
      </p>

    </div>
  )
}
