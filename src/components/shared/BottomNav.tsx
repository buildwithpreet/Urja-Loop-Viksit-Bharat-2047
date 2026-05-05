"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Bot, User, Scan, MapPin } from "lucide-react"
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
    <nav className="md:hidden fixed bottom-8 left-8 right-8 h-20 glass rounded-[2.5rem] shadow-2xl z-50 flex items-center justify-between px-6 ring-1 ring-black/5">
      {navItems.map((item) => {
          if (item.isFab) {
            return (
              <button
                key={item.name}
                onClick={onScanClick}
                className="relative -top-10 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <div className="w-16 h-16 bg-slate-900 dark:bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-900/40 text-white border-4 border-white dark:border-slate-900">
                  <item.icon size={32} />
                </div>
                <span className="text-[10px] font-black text-slate-900 mt-2 uppercase tracking-[0.2em]">{item.name}</span>
              </button>
            )
          }

          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 min-w-[50px] transition-all duration-300",
                isActive ? "text-emerald-600 translate-y-[-2px]" : "text-slate-400"
              )}
            >
              <item.icon size={24} className={cn(isActive && "fill-emerald-500/10")} />
              <span className={cn("text-[9px] font-black uppercase tracking-tighter transition-all", isActive ? "opacity-100 scale-100" : "opacity-0 scale-50")}>
                {item.name}
              </span>
            </Link>
          )
      })}
    </nav>
  )
}
