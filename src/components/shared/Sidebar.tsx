"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, MapPin, ShoppingBag, User, BrainCircuit,
  AlertCircle, Leaf, ChevronLeft, ChevronRight, ScanLine
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useUser } from "./UserContext"
import { LanguageToggle } from "./LanguageToggle"
import { ThemeToggle } from "./ThemeToggle"
import { useLanguage } from "./LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { AccessibilityMenu } from "./AccessibilityMenu"

export function Sidebar() {
  const { mode } = useMode()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const pathname = usePathname()
  const user = useUser()
  const { t } = useLanguage()

  const isFarmer = mode === "rural"

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (data) setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const navItems = [
    { name: "Home", label: t("nav_home"), href: "/dashboard", icon: Home },
    { name: "Live Map", label: t("nav_map"), href: "/map", icon: MapPin },
    { name: "Scan", label: t("nav_scan") || "Scan", onClick: () => window.dispatchEvent(new CustomEvent("open-scan-modal")), icon: ScanLine },
    { name: "Marketplace", label: t("nav_shop"), href: "/shop", icon: ShoppingBag },
    { name: "Complaints", label: t("nav_complaints"), href: "/complaints", icon: AlertCircle },
    { name: "Urja AI", label: t("nav_bot"), href: "/bot", icon: BrainCircuit },
    { name: "Profile", label: t("nav_profile"), href: "/profile", icon: User },
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
              <p className="text-[9px] text-muted-foreground font-medium leading-none mt-0.5">Smart Waste Platform</p>
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
          const isActive = item.href && pathname === item.href
          
          const className = cn(
            "flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative w-full text-left",
            isCollapsed ? "p-2.5 justify-center" : "px-3 py-2.5 gap-3",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )

          const innerContent = (
            <>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
              )}
              <item.icon
                className="shrink-0"
                size={17}
                strokeWidth={isActive ? 2 : 1.75}
              />
              {!isCollapsed && (
                <span className="animate-in fade-in duration-200 text-[13px]">{item.label}</span>
              )}
            </>
          )

          if (item.onClick) {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                title={isCollapsed ? item.name : undefined}
                className={className}
              >
                {innerContent}
              </button>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href!}
              title={isCollapsed ? item.name : undefined}
              className={className}
            >
              {innerContent}
            </Link>
          )
        })}
      </nav>

      {/* Footer Controls */}
      <div className={cn(
        "p-3 border-t border-border space-y-2 transition-all duration-300",
      )}>
        {!isCollapsed && (
          <div className="space-y-2 px-1 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-medium">Language</span>
              <LanguageToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
        
        <AccessibilityMenu isCollapsed={isCollapsed} />

        {/* User */}
        <div className="pt-2 border-t border-border">
          <Link href="/profile" className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted transition-all cursor-pointer",
            isCollapsed ? "justify-center" : ""
          )}>
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.full_name || user.name || (isFarmer ? 'Ram' : 'Alex')}`} 
              alt="Avatar" 
              className="w-7 h-7 rounded-lg border border-border shrink-0 bg-white" 
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-in fade-in duration-200 text-left">
                <p className="text-xs font-semibold truncate">{profile?.full_name || user.name || (isFarmer ? "Ram Singh" : "Alex Harrison")}</p>
                <p className="text-[9px] text-muted-foreground truncate">{profile?.location || user.location || (isFarmer ? "Ludhiana · Punjab" : "Sector 14 · New Delhi")}</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  )
}
