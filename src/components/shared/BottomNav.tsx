"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, MapPin, User, Scan, 
  Store, QrCode, AlertCircle, X, ChevronRight,
  LayoutDashboard, Map, CheckSquare, Truck, FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { useLanguage } from "./LanguageProvider"

interface NavItem {
  name: string
  label: string
  href?: string
  icon: any
  isPrimary?: boolean
}

export function BottomNav({ onScanClick }: { onScanClick?: () => void }) {
  const { mode } = useMode()
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isCollector = mode === "collector"

  const defaultNavItems: NavItem[] = [
    { name: "Home", label: t("nav_home"), href: "/dashboard", icon: Home },
    { name: "Map", label: t("nav_map"), href: "/map", icon: MapPin },
    { name: "Scanner", label: t("nav_scan"), icon: Scan, isPrimary: true },
    { name: "Market", label: t("nav_shop"), href: "/shop", icon: Store },
    { name: "Profile", label: t("nav_profile"), href: "/profile", icon: User },
  ]
  
  const collectorNavItems: NavItem[] = [
    { name: "Dashboard", label: "Home", href: "/collector", icon: LayoutDashboard },
    { name: "Routes", label: "Routes", href: "/collector/routes", icon: Map },
    { name: "Verification", label: "Verify", href: "/collector/verification", icon: QrCode, isPrimary: true },
    { name: "Tasks", label: "Tasks", href: "/collector/tasks", icon: CheckSquare },
    { name: "Profile", label: "Profile", href: "/profile", icon: User },
  ]

  const navItems = isCollector ? collectorNavItems : defaultNavItems

  const menuOptions = [
    { 
      name: "Generate QR", 
      desc: "Your unique identity for drop-offs", 
      icon: QrCode, 
      href: "/scanner?mode=qr",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      show: !isCollector
    },
    { 
      name: "Scan Waste Type", 
      desc: "Identify and log your disposal", 
      icon: Scan, 
      href: "/scanner?mode=waste",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      show: !isCollector
    },
    { 
      name: "Vehicle Status", 
      desc: "Monitor truck health and telemetry", 
      icon: Truck, 
      href: "/collector/vehicle",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      show: isCollector
    },
    { 
      name: "Shift Reports", 
      desc: "Review your performance logs", 
      icon: FileText, 
      href: "/collector/reports",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      show: isCollector
    },
    { 
      name: "File Complaint", 
      desc: "Report illegal dumping nearby", 
      icon: AlertCircle, 
      href: "/complaints",
      color: "text-red-400",
<<<<<<< HEAD
      bg: "bg-red-400/10",
      show: true
=======
      bg: "bg-red-400/10"
    },
    { 
      name: "Fleet & Monitoring", 
      desc: "Real-time infrastructure status", 
      icon: Truck, 
      href: "/fleet",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
>>>>>>> upstream/main
    }
  ].filter(opt => opt.show)

  return (
    <>
      {/* INSTANT SCANNER OVERLAY MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0d0f12]/95 backdrop-blur-md" 
            onClick={() => setIsMenuOpen(false)} 
          />
          
          {/* Menu Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-32">
            <div className="max-w-xl mx-auto space-y-4">
               <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white uppercase tracking-wider">Urja Actions</h3>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
                  >
                    <X size={20} />
                  </button>
               </div>

               {menuOptions.map((opt) => (
                  <Link
                    key={opt.name}
                    href={opt.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group block p-5 bg-white/[0.05] border border-white/10 rounded-[2rem] active:scale-[0.98]"
                  >
                     <div className="flex items-center gap-5">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", opt.bg, opt.color)}>
                           <opt.icon size={28} />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-lg font-black uppercase tracking-tight text-white">{opt.name}</h4>
                           <p className="text-sm text-white/40">{opt.desc}</p>
                        </div>
                        <ChevronRight size={20} className="text-white/20" />
                     </div>
                  </Link>
               ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden" aria-label="Main Navigation">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0d0f12] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" />
        
        <div className="relative flex items-center justify-between px-6 h-[88px] pb-5">
          {navItems.map((item) => {
            const isActive = item.href && pathname === item.href
            
            if (item.isPrimary) {
              return (
                <button
                  key={item.name}
                  onClick={() => onScanClick ? onScanClick() : setIsMenuOpen(!isMenuOpen)}
                  aria-label="Open scanner menu"
                  className="relative -top-6 flex flex-col items-center group outline-none"
                >
                  {/* The Primary Button (Reduced Size) */}
                  <div className="relative w-[68px] h-[68px] bg-emerald-500 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex items-center justify-center overflow-hidden active:scale-95">
                     <item.icon size={24} className="text-black" strokeWidth={2.5} />
                  </div>

                  {/* Subtext */}
                  <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-3 drop-shadow-xl">
                    {isMenuOpen ? "Close" : item.label}
                  </span>
                </button>
              )
            }

            const isProfile = item.name === "Profile"
            
            return (
              <Link
                key={item.name}
                href={item.href!}
                className={cn(
                  "flex flex-col items-center gap-2 px-3 py-2 rounded-2xl transition-all",
                  isActive ? "text-white scale-105" : "text-white/30"
                )}
              >
                {isProfile ? (
                  <div className={cn(
                    "w-6 h-6 rounded-full overflow-hidden border-2 transition-all",
                    isActive ? "border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "border-white/20"
                  )}>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mode === "rural" ? 'Ram' : 'Alex'}`} 
                      alt="Profile"
                      className="w-full h-full object-cover bg-white/10"
                    />
                  </div>
                ) : (
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                )}
                <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "opacity-100" : "opacity-40")}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
