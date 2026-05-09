"use client"

import Link from "next/link"
import { 
  Leaf, Globe, Zap, BrainCircuit, Recycle, ShieldCheck,
  ArrowRight, Share2, Code2, Users, Camera,
  MapPin, Mail, TrendingUp, Wifi, Cpu
} from "lucide-react"

import { SmartBinAnimation } from "./SmartBinAnimation"

const FOOTER_LINKS = {
  platform: [
    { label: "Home Dashboard", href: "/" },
    { label: "Live Transparency Map", href: "/map" },
    { label: "AI Waste Scanner", href: "/bot" },
    { label: "Eco Marketplace", href: "/shop" },
    { label: "Complaint Center", href: "/complaints" },
    { label: "My Profile & QR", href: "/profile" },
  ],
  impact: [
    { label: "Smart Bin Network", href: "#" },
    { label: "Rural Collection Hubs", href: "#" },
    { label: "Agri-Waste Integration", href: "#" },
    { label: "Circular Economy Flow", href: "#" },
    { label: "Carbon Offset Tracking", href: "#" },
    { label: "Community Leaderboard", href: "#" },
  ],
  transparency: [
    { label: "How It Works", href: "#" },
    { label: "AI Verification Process", href: "#" },
    { label: "Data Privacy Policy", href: "#" },
    { label: "Open Source Code", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Viksit Bharat 2047", href: "#" },
  ],
}

const TECH_BADGES = [
  { label: "AI-Powered", icon: BrainCircuit, color: "#10b981" },
  { label: "IoT Enabled", icon: Wifi, color: "#3b82f6" },
  { label: "Circular Economy", icon: Recycle, color: "#10b981" },
  { label: "Real-Time Analytics", icon: Cpu, color: "#8b5cf6" },
]

const SOCIAL_LINKS = [
  { icon: Share2, href: "#", label: "Twitter / X" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Users, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
]

const IMPACT_STATS = [
  { value: "2.4T+", label: "Waste Processed", suffix: "This Month" },
  { value: "12K+", label: "Active Citizens", suffix: "Registered" },
  { value: "84T", label: "CO₂ Offset", suffix: "Carbon Credits" },
  { value: "98%", label: "Transparency", suffix: "AI Verified" },
]



export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden">
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #064e3b 100%)"
      }}>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #34d399, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(52,211,153,1) 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* LEFT — Text + CTAs */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-300 hover:scale-105 cursor-default"
                style={{ background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)" }}>
                <Leaf size={13} className="text-emerald-300" />
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Viksit Bharat 2047</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                Ready to Build<br />
                <span style={{ color: "#6ee7b7" }}>Cleaner, Smarter</span><br />
                <span className="text-white/90">&amp; Sustainable</span> Communities?
              </h2>
              <p className="text-emerald-200/70 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
                Join thousands of citizens, municipalities, and enterprises building India&apos;s most transparent smart waste ecosystem — powered by AI, IoT, and circular economy principles.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 mb-8">
                <Link href="/onboarding">
                  <button className="group px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "white",
                      boxShadow: "0 0 30px rgba(16,185,129,0.4), 0 4px 20px rgba(0,0,0,0.3)"
                    }}>
                    Get Started — It&apos;s Free
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </Link>
                <Link href="/map">
                  <button className="group px-7 py-3.5 rounded-2xl font-bold text-sm text-white/90 transition-all duration-300 hover:scale-105 hover:text-white active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                    Explore Live Map →
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-6"
                style={{ borderTop: "1px solid rgba(52,211,153,0.15)" }}>
                {[
                  { icon: ShieldCheck, text: "AI-Verified Data" },
                  { icon: Globe,       text: "National Coverage" },
                  { icon: Recycle,     text: "Circular Economy" },
                  { icon: TrendingUp,  text: "Real-Time Insights" },
                ].map((item) => (
                  <div key={item.text}
                    className="flex items-center gap-1.5 transition-all duration-200 hover:scale-105 cursor-default group">
                    <item.icon size={13} style={{ color: "#6ee7b7" }} className="group-hover:drop-shadow-[0_0_6px_#6ee7b7]" />
                    <span className="text-xs font-semibold group-hover:text-emerald-200 transition-colors"
                      style={{ color: "rgba(209,250,229,0.75)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Smart Bin Animation */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              {/* Greener India label above */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(52,211,153,0.25)" }}>
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: "#6ee7b7" }}>🇮🇳 Greener India</span>
                </div>
                <span className="text-[10px]" style={{ color: "rgba(110,231,183,0.4)" }}>+ Circular Economy</span>
              </div>

              {/* The Animated Bin */}
              <SmartBinAnimation />

              {/* Labels below */}
              <div className="flex items-center gap-4 mt-1">
                {[
                  { dot: "#10b981", label: "Smart Bin" },
                  { dot: "#3b82f6", label: "IoT Sensor" },
                  { dot: "#8b5cf6", label: "AI Vision" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: l.dot }} />
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(110,231,183,0.6)" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===========================
          MAIN FOOTER BODY
      =========================== */}
      <div className="relative" style={{
        background: "linear-gradient(180deg, #022c22 0%, #011a14 60%, #010d0a 100%)"
      }}>
        {/* Top glow separator */}
        <div className="w-full h-px" style={{
          background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.4), rgba(16, 185, 129, 0.6), rgba(52, 211, 153, 0.4), transparent)"
        }} />
        <div className="w-full h-px mb-px" style={{
          background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1), transparent)"
        }} />

        {/* Subtle background mesh */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(52, 211, 153, 1) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: "#10b981" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-8 pointer-events-none"
          style={{ background: "#059669" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">
          
          {/* Impact Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-3xl"
            style={{
              background: "rgba(16, 185, 129, 0.06)",
              border: "1px solid rgba(52, 211, 153, 0.12)",
              backdropFilter: "blur(20px)"
            }}>
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold" style={{ color: "#6ee7b7" }}>{stat.value}</p>
                <p className="text-xs font-semibold text-white/80 mt-1">{stat.label}</p>
                <p className="text-[10px]" style={{ color: "rgba(110, 231, 183, 0.5)" }}>{stat.suffix}</p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}>
                  <Leaf size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xl font-bold text-white tracking-tight">Urja<span style={{ color: "#34d399" }}>Loop</span></span>
                  <p className="text-[10px] font-medium" style={{ color: "rgba(110, 231, 183, 0.6)" }}>Smart Waste Intelligence</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(209, 250, 229, 0.6)" }}>
                AI-powered smart waste management platform building a transparent, scalable, and citizen-centric circular economy for urban and rural India.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {TECH_BADGES.map((badge) => (
                  <div key={badge.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold cursor-default transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid rgba(52, 211, 153, 0.2)`,
                      color: badge.color
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${badge.color}40`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                    }}>
                    <badge.icon size={11} />
                    {badge.label}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(52, 211, 153, 0.15)",
                      color: "rgba(110, 231, 183, 0.7)"
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.15)"
                      ;(e.currentTarget as HTMLElement).style.border = "1px solid rgba(52,211,153,0.5)"
                      ;(e.currentTarget as HTMLElement).style.color = "#6ee7b7"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(16,185,129,0.3)"
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"
                      ;(e.currentTarget as HTMLElement).style.border = "1px solid rgba(52,211,153,0.15)"
                      ;(e.currentTarget as HTMLElement).style.color = "rgba(110,231,183,0.7)"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                    }}>
                    <s.icon size={16} />
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div className="space-y-2">
                {[
                  { icon: Mail, text: "hello@urjaloop.in" },
                  { icon: MapPin, text: "New Delhi, India 🇮🇳" },
                ].map((item) => (
                  <div key={item.text}
                    className="flex items-center gap-2 group cursor-default transition-all duration-200 hover:translate-x-0.5">
                    <item.icon size={13} className="transition-all group-hover:scale-110" style={{ color: "#34d399" }} />
                    <span className="text-xs transition-colors group-hover:text-emerald-300"
                      style={{ color: "rgba(209, 250, 229, 0.5)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: "Platform", links: FOOTER_LINKS.platform },
                { title: "Impact", links: FOOTER_LINKS.impact },
                { title: "Transparency", links: FOOTER_LINKS.transparency },
              ].map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-4 rounded-full" style={{ background: "linear-gradient(180deg, #10b981, transparent)" }} />
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>
                      {section.title}
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}
                          className="text-sm transition-all duration-200 flex items-center gap-1.5 group"
                          style={{ color: "rgba(209, 250, 229, 0.45)" }}>
                          <span
                            className="w-0 overflow-hidden group-hover:w-2.5 transition-all duration-200 text-emerald-400"
                            aria-hidden>›</span>
                          <span className="group-hover:text-emerald-300 group-hover:translate-x-1 transition-all duration-200">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Partners Row */}
          <div className="py-6 px-6 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: "rgba(16, 185, 129, 0.04)",
              border: "1px solid rgba(52, 211, 153, 0.08)"
            }}>
            <div className="flex items-center gap-3">
              <Zap size={16} style={{ color: "#34d399" }} fill="currentColor" />
              <p className="text-xs font-semibold" style={{ color: "rgba(110, 231, 183, 0.7)" }}>
                Built for{" "}
                <span style={{ color: "#6ee7b7" }}>Viksit Bharat 2047</span>
                {" "}· Smart India Hackathon Initiative
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {["Smart Cities Mission", "CPCB Standards", "IoT Framework", "AI Ethics"].map((badge) => (
                <span key={badge}
                  className="text-[10px] font-bold uppercase tracking-wider cursor-default transition-all duration-200 hover:scale-105"
                  style={{ color: "rgba(52, 211, 153, 0.4)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(110, 231, 183, 0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(52, 211, 153, 0.4)")}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Glowing Separator */}
          <div className="relative my-8 flex items-center">
            <div className="flex-1 h-px" style={{
              background: "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.4), rgba(52, 211, 153, 0.2), transparent)"
            }} />
            <div className="mx-4 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                boxShadow: "0 0 12px rgba(16, 185, 129, 0.3)"
              }}>
              <Recycle size={12} style={{ color: "#34d399" }} />
            </div>
            <div className="flex-1 h-px" style={{
              background: "linear-gradient(90deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.4), rgba(52, 211, 153, 0.2), transparent)"
            }} />
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1">
              <p className="text-xs font-bold italic" style={{ color: "rgba(110, 231, 183, 0.5)" }}>
                "From Waste Management to Circular Economy Infrastructure."
              </p>
              <p className="text-[11px]" style={{ color: "rgba(209, 250, 229, 0.3)" }}>
                © 2025 UrjaLoop · All rights reserved · Made with 🌱 in India
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Use", href: "#" },
                { label: "Open Source", href: "#" },
              ].map((l) => (
                <a key={l.label} href={l.href}
                  className="text-[11px] transition-colors"
                  style={{ color: "rgba(209, 250, 229, 0.3)" }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = "rgba(110, 231, 183, 0.8)"}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(209, 250, 229, 0.3)"}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
