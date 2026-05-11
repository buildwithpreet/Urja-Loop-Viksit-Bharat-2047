import Link from "next/link"
import { Leaf, Globe, Zap, Recycle, Share2, Code2, Users, Camera, MapPin, Mail, Cpu, Wifi, BrainCircuit } from "lucide-react"

const FOOTER_LINKS = {
  platform: [
    { label: "Home Dashboard", href: "/dashboard" },
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
  { label: "Twitter / X", icon: Share2, href: "#" },
  { label: "GitHub", icon: Code2, href: "#" },
  { label: "LinkedIn", icon: Users, href: "#" },
  { label: "Instagram", icon: Camera, href: "#" },
]

const IMPACT_STATS = [
  { value: "2.4T+", label: "Waste Processed", suffix: "This Month" },
  { value: "12K+", label: "Active Citizens", suffix: "Registered" },
  { value: "84T", label: "CO₂ Offset", suffix: "Carbon Credits" },
  { value: "98%", label: "Transparency", suffix: "AI Verified" },
]

export function LandingFooter() {
  return (
    <footer className="bg-background border-t border-border relative pt-16 pb-10">
      
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        {/* Impact Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-8 rounded-[2rem] bg-card border border-border shadow-sm">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-medium text-foreground tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-primary mt-1">{stat.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.suffix}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <Leaf size={20} strokeWidth={2} />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground tracking-tight">Urja<span className="text-primary">Loop</span></span>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Smart Waste Intelligence</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered smart waste management platform building a transparent, scalable, and citizen-centric circular economy for urban and rural India.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((badge) => (
                <div key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-[10px] font-medium text-foreground">
                  <badge.icon size={12} className="text-primary" />
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <s.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-3 pt-2">
              {[
                { icon: Mail, text: "hello@urjaloop.in" },
                { icon: MapPin, text: "New Delhi, India 🇮🇳" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon size={14} className="text-primary" />
                  <span className="text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
            {[
              { title: "Platform", links: FOOTER_LINKS.platform },
              { title: "Impact", links: FOOTER_LINKS.impact },
              { title: "Transparency", links: FOOTER_LINKS.transparency },
            ].map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-6">
                  {section.title}
                </p>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Partners Row */}
        <div className="py-6 px-8 rounded-2xl mb-12 bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Zap size={16} className="text-primary" fill="currentColor" />
            <p className="text-xs font-medium">
              Built for <span className="text-foreground font-semibold">Viksit Bharat 2047</span> · Smart India Hackathon
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {["Smart Cities Mission", "CPCB Standards", "IoT Framework"].map((badge) => (
              <span key={badge} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <div className="text-center md:text-left">
            <p className="text-[11px] text-muted-foreground">
              © 2025 UrjaLoop · Made with 🌱 in India
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Use", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
