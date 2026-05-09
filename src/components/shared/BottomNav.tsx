"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, User, Scan, MapPin, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Scan", href: "#", icon: Scan, isFab: true },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Me", href: "/profile", icon: User },
]

export function BottomNav({ onScanClick }: { onScanClick: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-8 left-6 right-6 h-20 ultra-glass rounded-[2.5rem] shadow-2xl z-50 flex items-center justify-between px-6 border border-foreground/10 transition-all duration-700 animate-in slide-in-from-bottom-10">
      {navItems.map((item) => {
          if (item.isFab) {
            return (
              <button
                key={item.name}
                onClick={onScanClick}
                className="relative -top-10 flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-90 group"
              >
                <div className="w-16 h-16 bg-primary rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-primary/40 text-primary-foreground border-4 border-background relative overflow-hidden group-hover:rotate-6 transition-all duration-500">
                   <div className="absolute inset-0 bg-mesh opacity-20"></div>
                   <item.icon size={28} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -inset-2 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            )
          }

          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 transition-all duration-500 relative group",
                isActive ? "text-primary" : "text-muted-foreground/40 hover:text-primary/60"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-500 relative",
                isActive && "bg-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={cn("transition-all duration-500", isActive && "scale-110")} />
              </div>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_12px_rgba(16,185,129,1)]"></div>
              )}
            </Link>
          )
      })}
    </nav>
  )
}

