"use client"

import Link from "next/link"
import { 
  Leaf, Globe, Zap, BrainCircuit, Recycle, ShieldCheck,
  ArrowRight, Share2, Code2, Users, Camera,
  MapPin, Mail, TrendingUp, Wifi, Cpu
} from "lucide-react"

import dynamic from "next/dynamic"

const SmartBinAnimation = dynamic(
  () => import("./SmartBinAnimation").then(m => m.SmartBinAnimation),
  { ssr: false, loading: () => <div className="w-32 h-44 bg-emerald-500/5 rounded-3xl animate-pulse" /> }
)

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
  { label: "AI-Powered", icon: BrainCircuit },
  { label: "IoT Enabled", icon: Wifi },
  { label: "Circular Economy", icon: Recycle },
  { label: "Real-Time Analytics", icon: Cpu },
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

/* ==========================================
   SUB-COMPONENTS
   ========================================== */

function FooterHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950">
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none bg-emerald-400" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none bg-emerald-300" />
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(52,211,153,1)_1px,transparent_0)] bg-[length:32px_32px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* LEFT — Text + CTAs */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-300 hover:scale-105 cursor-default bg-emerald-400/15 border border-emerald-400/30">
              <Leaf size={13} className="text-emerald-300" />
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Viksit Bharat 2047</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Ready to Build<br />
              <span className="text-emerald-300">Cleaner, Smarter</span><br />
              <span className="text-white/90">&amp; Sustainable</span> Communities?
            </h2>
            <p className="text-emerald-200/70 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
              Join thousands of citizens, municipalities, and enterprises building India&apos;s most transparent smart waste ecosystem — powered by AI, IoT, and circular economy principles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 mb-8">
              <Link href="/onboarding">
                <button className="group px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                  Get Started — It&apos;s Free
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Link>
              <Link href="/map">
                <button className="group px-7 py-3.5 rounded-2xl font-bold text-sm text-white/90 transition-all duration-300 hover:scale-105 hover:text-white active:scale-95 bg-white/7 border border-white/18 backdrop-blur-xl hover:bg-white/12">
                  Explore Live Map →
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-6 border-t border-emerald-400/15">
              {[
                { icon: ShieldCheck, text: "AI-Verified Data" },
                { icon: Globe,       text: "National Coverage" },
                { icon: Recycle,     text: "Circular Economy" },
                { icon: TrendingUp,  text: "Real-Time Insights" },
              ].map((item) => (
                <div key={item.text}
                  className="flex items-center gap-1.5 transition-all duration-200 hover:scale-105 cursor-default group">
                  <item.icon size={13} className="text-emerald-300 group-hover:drop-shadow-[0_0_6px_rgba(110,231,183,0.6)]" />
                  <span className="text-[11px] font-semibold text-emerald-200/75 group-hover:text-emerald-200 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Smart Bin Animation */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            {/* Greener India label above */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">🇮🇳 Greener India</span>
              </div>
              <span className="text-[11px] text-emerald-300/40">+ Circular Economy</span>
            </div>

            {/* The Animated Bin */}
            <SmartBinAnimation />

            {/* Labels below */}
            <div className="flex items-center gap-4 mt-1">
              {[
                { dot: "bg-emerald-500", label: "Smart Bin" },
                { dot: "bg-blue-500", label: "IoT Sensor" },
                { dot: "bg-violet-500", label: "AI Vision" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${l.dot}`} />
                  <span className="text-[11px] font-semibold text-emerald-300/60">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function FooterStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-3xl bg-emerald-500/6 border border-emerald-400/12 backdrop-blur-xl">
      {IMPACT_STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-emerald-300">{stat.value}</p>
          <p className="text-xs font-semibold text-white/80 mt-1">{stat.label}</p>
          <p className="text-[11px] text-emerald-300/50">{stat.suffix}</p>
        </div>
      ))}
    </div>
  )
}

function FooterLinks() {
  return (
    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        { title: "Platform", links: FOOTER_LINKS.platform },
        { title: "Impact", links: FOOTER_LINKS.impact },
        { title: "Transparency", links: FOOTER_LINKS.transparency },
      ].map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-emerald-500 to-transparent" />
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {section.title}
            </p>
          </div>
          <ul className="space-y-2.5">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}
                  className="text-sm transition-all duration-200 flex items-center gap-1.5 group text-emerald-200/45 hover:text-emerald-300">
                  <span
                    className="w-0 overflow-hidden group-hover:w-2.5 transition-all duration-200 text-emerald-400"
                    aria-hidden>›</span>
                  <span className="group-hover:translate-x-1 transition-all duration-200">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function FooterBrand() {
  return (
    <div className="md:col-span-4 space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/40">
          <Leaf size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-xl font-bold text-white tracking-tight">Urja<span className="text-emerald-400">Loop</span></span>
          <p className="text-[11px] font-medium text-emerald-300/60">Smart Waste Intelligence</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-emerald-200/60 max-w-prose">
        AI-powered smart waste management platform building a transparent, scalable, and citizen-centric circular economy for urban and rural India.
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {TECH_BADGES.map((badge) => (
          <div key={badge.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-default transition-all duration-200 hover:scale-105 bg-white/5 border border-emerald-400/20 text-emerald-300 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/10">
            <badge.icon size={11} />
            {badge.label}
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map((s) => (
          <a key={s.label} href={s.href} aria-label={s.label}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/6 border border-emerald-400/15 text-emerald-300/70 hover:bg-emerald-500/15 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 focus-ring">
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
            <item.icon size={13} className="text-emerald-400 transition-all group-hover:scale-110" />
            <span className="text-xs text-emerald-200/50 group-hover:text-emerald-300 transition-colors">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FooterBottom() {
  return (
    <>
      {/* Ecosystem Partners Row */}
      <div className="py-6 px-6 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/4 border border-emerald-400/8">
        <div className="flex items-center gap-3">
          <Zap size={16} className="text-emerald-400" fill="currentColor" />
          <p className="text-xs font-semibold text-emerald-300/70">
            Built for{" "}
            <span className="text-emerald-300">Viksit Bharat 2047</span>
            {" "}· Smart India Hackathon Initiative
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {["Smart Cities Mission", "CPCB Standards", "IoT Framework", "AI Ethics"].map((badge) => (
            <span key={badge}
              className="text-[11px] font-bold uppercase tracking-wider cursor-default transition-all duration-200 hover:scale-105 text-emerald-400/40 hover:text-emerald-300/80">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Glowing Separator */}
      <div className="relative my-8 flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        <div className="mx-4 w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500/15 border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
          <Recycle size={12} className="text-emerald-400" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs font-bold italic text-emerald-300/50">
            &quot;From Waste Management to Circular Economy Infrastructure.&quot;
          </p>
          <p className="text-[11px] text-emerald-200/30">
            © {new Date().getFullYear()} UrjaLoop · All rights reserved · Made with 🌱 in India
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Use", href: "#" },
            { label: "Open Source", href: "#" },
          ].map((l) => (
            <a key={l.label} href={l.href}
              className="text-[11px] text-emerald-200/30 hover:text-emerald-300/80 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

/* ==========================================
   MAIN FOOTER
   ========================================== */

export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden">
      {/* Hero CTA Section */}
      <FooterHero />

      {/* Main Footer Body */}
      <div className="relative bg-gradient-to-b from-emerald-950 via-[#011a14] to-[#010d0a]">
        {/* Top glow separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="w-full h-px mb-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />

        {/* Subtle background mesh */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(52,211,153,1)_1px,transparent_0)] bg-[length:40px_40px]" />

        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-emerald-500" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-[0.08] pointer-events-none bg-emerald-600" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">
          {/* Impact Stats Row */}
          <FooterStats />

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            {/* Brand Column */}
            <FooterBrand />

            {/* Links Columns */}
            <FooterLinks />
          </div>

          {/* Bottom Sections */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}
