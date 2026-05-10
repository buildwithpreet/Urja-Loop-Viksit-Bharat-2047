"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, MapPin, ShoppingBag, User, BrainCircuit,
  AlertCircle, Leaf, ChevronLeft, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageToggle } from "./LanguageToggle"
import { useLanguage } from "./LanguageProvider"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Live Map", href: "/map", icon: MapPin },
    { name: "Marketplace", href: "/shop", icon: ShoppingBag },
    { name: "Complaints", href: "/complaints", icon: AlertCircle },
    { name: "Urja AI", href: "/bot", icon: BrainCircuit },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out",
        "bg-background border-r border-border",
        isCollapsed ? "w-[72px]" : "w-56"
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-50 shadow-md"
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={12} strokeWidth={2.5} /> : <ChevronLeft size={12} strokeWidth={2.5} />}
      </button>

      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 border-b border-border transition-all duration-300",
        isCollapsed ? "px-0 justify-center" : "px-5"
      )}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <Leaf className="text-primary-foreground" size={16} strokeWidth={2} />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-200">
              <span className="text-sm font-semibold tracking-tight">Urja<span className="text-primary">Loop</span></span>
              <p className="text-[9px] text-muted-foreground font-medium leading-none mt-0.5">Smart Infrastructure</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-3 pt-1">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isCollapsed ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
              )}
              <item.icon
                className="shrink-0"
                size={17}
                strokeWidth={isActive ? 2 : 1.75}
              />
              {!isCollapsed && (
                <span className="animate-in fade-in duration-200 text-[13px]">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Controls */}
      <div className={cn(
        "p-3 border-t border-border space-y-2 transition-all duration-300",
      )}>
        <div className={cn("flex flex-col gap-2 px-1", isCollapsed ? "items-center" : "")}>
          
          <div className={cn("flex items-center w-full", isCollapsed ? "justify-center" : "justify-between")}>
             {!isCollapsed && <span className="text-[11px] text-muted-foreground font-medium">Language</span>}
             <LanguageToggle isCollapsed={isCollapsed} />
          </div>
        </div>
        
        {/* User */}
        <div className="pt-2 border-t border-border">
          <div className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted transition-all cursor-pointer",
            isCollapsed ? "justify-center" : ""
          )}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Avatar" 
              className="w-7 h-7 rounded-lg border border-border shrink-0" 
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-in fade-in duration-200">
                <p className="text-xs font-semibold truncate">Alex Harrison</p>
                <p className="text-[9px] text-muted-foreground truncate">Sector 14 · New Delhi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
