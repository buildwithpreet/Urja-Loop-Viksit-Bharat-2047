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
  ShieldCheck,
  AlertCircle,
  MapPin
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Live Map", href: "/map", icon: MapPin },
  { name: "Marketplace", href: "/shop", icon: ShoppingBag },
  { name: "Complaints", href: "/complaints", icon: AlertCircle },
  { name: "Urja Bot", href: "/bot", icon: BrainCircuit },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-50">
      <div className="p-8 pb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-white" size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-black text-gradient tracking-tighter">UrjaLoop</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all duration-300 group",
                isActive 
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 shadow-sm shadow-emerald-500/5" 
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <item.icon size={20} className={cn("transition-transform group-hover:scale-110", isActive && "fill-emerald-500/20")} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 space-y-3">
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
