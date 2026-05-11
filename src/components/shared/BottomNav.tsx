"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Trophy, User, Scan, ShoppingBag, Store } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Scanner", href: "/scanner", icon: Scan, isPrimary: true },
  { name: "Market", href: "/shop", icon: Store },
  { name: "Profile", href: "/profile", icon: User },
]

interface BottomNavProps {}

export function BottomNav({}: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" aria-label="Main Navigation">
      {/* Blur background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl border-t border-border/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none" />
      
      <div className="relative flex items-center justify-between px-4 h-[84px] pb-4">
        {navItems.map((item) => {
          const isActive = item.href && pathname === item.href
          
          if (item.isPrimary) {
            return (
              <Link
                key={item.name}
                href={item.href!}
                aria-label="Scan waste or QR code"
                className="relative -top-8 flex flex-col items-center group"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Main Circle */}
                <div className="relative w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 border-4 border-background transform transition-all active:scale-90 group-hover:scale-110">
                   <item.icon size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-2">Scan</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={cn("text-[10px] font-semibold", isActive ? "font-bold" : "")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
