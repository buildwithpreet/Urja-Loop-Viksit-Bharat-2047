"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  ShoppingBag, 
  BrainCircuit, 
  User, 
  Leaf,
  LogOut,
  Settings,
  AlertCircle,
  MapPin,
  Zap,
  Globe
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageToggle } from "./LanguageToggle"
import { useLanguage } from "./LanguageProvider"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { name: t("dashboard_title"), href: "/", icon: Home },
    { name: t("nav_map"), href: "/map", icon: MapPin },
    { name: t("nav_shop"), href: "/shop", icon: ShoppingBag },
    { name: t("nav_complaints"), href: "/complaints", icon: AlertCircle },
    { name: t("nav_community"), href: "/bot", icon: BrainCircuit },
    { name: t("nav_profile"), href: "/profile", icon: User },
  ]

  return (
    <aside className="hidden md:flex flex-col w-80 h-[calc(100vh-2.5rem)] fixed left-5 top-5 ultra-glass border border-foreground/10 rounded-[3rem] z-50 transition-all duration-700 shadow-2xl relative overflow-hidden">
      {/* Background Decal */}
      <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 tactical-grid opacity-[0.03]"></div>

      <div className="p-10 relative z-10">
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="w-14 h-14 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/30 relative overflow-hidden group-hover:rotate-12 transition-transform duration-700">
            <div className="absolute inset-0 bg-mesh opacity-20"></div>
            <Globe className="text-white relative z-10" size={28} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-foreground tracking-tighter uppercase leading-none">Urja<span className="text-primary">Loop</span></span>
            <span className="text-[9px] font-black text-primary tracking-[0.4em] uppercase opacity-80 mt-1">Core Terminal</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-8 py-6 space-y-3 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-5 px-8 py-5 rounded-[1.75rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 group relative overflow-hidden",
                isActive 
                  ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-105" 
                  : "text-muted-foreground/40 hover:text-foreground hover:bg-foreground/5"
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 3 : 1.5} className={cn("transition-all duration-500 group-hover:scale-110", isActive ? "text-white" : "group-hover:text-primary")} />
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <div className="ml-auto relative z-10">
                   <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" />
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-8 space-y-4 mt-auto border-t border-foreground/5 relative z-10">
        <div className="px-2 pb-4">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/50 mb-3 ml-2">Language Matrix</p>
          <LanguageToggle />
        </div>
        <button className="w-full flex items-center gap-5 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all group">
          <Settings size={18} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-700" />
          Settings
        </button>
        <button className="w-full flex items-center gap-5 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-all group">
          <LogOut size={18} strokeWidth={2} />
          Terminate
        </button>
      </div>
    </aside>
  )
}

