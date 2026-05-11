"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, QrCode, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Scan", href: null, icon: QrCode, isScan: true }, // center scan button
  { name: "Market", href: "/shop", icon: ShoppingBag },
  { name: "Profile", href: "/profile", icon: User },
]

interface BottomNavProps {
  onScanClick: () => void
}

export function BottomNav({ onScanClick }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Blur background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl border-t border-border" />
      
      <div className="relative flex items-center justify-around px-2 h-[72px]">
        {navItems.map((item) => {
          if (item.isScan) {
            return (
              <button
                key="scan"
                onClick={onScanClick}
                className="relative -mt-6 flex flex-col items-center gap-1"
              >
                {/* Central scan button */}
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:opacity-90 active:scale-95 transition-all">
                  <item.icon size={26} className="text-primary-foreground" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-semibold text-primary">Scan</span>
              </button>
            )
          }
          const isActive = item.href && pathname === item.href
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
