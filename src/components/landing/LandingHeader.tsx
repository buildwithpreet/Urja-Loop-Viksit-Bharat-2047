"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, Menu, X, ChevronRight, Globe, ShieldCheck, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Hardware", href: "#hardware", desc: "The Smart Bin Engine" },
  { label: "Software", href: "#software", desc: "The Citizen Dashboard" },
  { label: "Economy", href: "#economy", desc: "Urja Credits & Marketplace" },
  { label: "Vision", href: "#vision", desc: "Viksit Bharat 2047" },
]

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-500",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Leaf size={18} strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight">Urja<span className="text-primary">Loop</span></span>
            <p className={cn("text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-opacity", isScrolled ? "opacity-0 h-0" : "opacity-60")}>Smart Infrastructure</p>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
           <div className="hidden sm:flex items-center gap-3 mr-2">
              <ThemeToggle />
           </div>
           
           <Link href="/login" className="hidden sm:block">
             <button className="text-xs font-black uppercase tracking-widest px-6 py-3 hover:text-primary transition-colors">
               Log In
             </button>
           </Link>
           
           <Link href="/login">
             <button className="bg-foreground text-background text-xs font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-foreground/90 transition-all shadow-xl shadow-foreground/10 active:scale-95">
               Get Started
             </button>
           </Link>

           <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted rounded-xl transition-colors"
           >
             <Menu size={24} />
           </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className={cn(
        "fixed inset-0 z-[110] transition-all duration-500",
        isMobileMenuOpen ? "visible" : "invisible"
      )}>
        <div 
          className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500", isMobileMenuOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={cn(
          "absolute top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Leaf size={16} />
              </div>
              <span className="font-bold text-lg">UrjaLoop</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-4 mb-6">Navigation</p>
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
              >
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{link.label}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium">{link.desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-border space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-widest">Interface Mode</span>
              <ThemeToggle />
            </div>
            <Link href="/login" className="block w-full">
              <button className="w-full bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl active:scale-95 transition-all">
                Access Platform
              </button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-primary/40 mb-2">
              <Zap size={10} />
              <p className="text-[8px] font-black uppercase tracking-widest">Viksit Bharat 2047 Protocol</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
