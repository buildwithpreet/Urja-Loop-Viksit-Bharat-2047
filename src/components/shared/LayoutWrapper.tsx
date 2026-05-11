"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ScanModal } from "./ScanModal"
import { Sidebar } from "./Sidebar"
import { BottomNav } from "./BottomNav"
import { Loader2 } from "lucide-react"
const AUTH_ROUTES = ["/", "/splash", "/onboarding", "/login", "/verify-otp", "/setup-profile", "/permissions"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  useEffect(() => {
    setMounted(true)
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const isDemoSession = localStorage.getItem("urjaloop_demo_session") === "true"
      
      if (!isAuthRoute && !session && !isDemoSession) {
        router.push("/login")
      }
    }
    checkAuth()
  }, [isAuthRoute, pathname, router])

  if (!mounted) return <div className="min-h-screen bg-background" />

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      
      <Sidebar />
      
      <main id="main-content" className="flex-1 w-full overflow-x-hidden flex flex-col outline-none relative" tabIndex={-1}>
        {/* Premium Header */}
        <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-background/60 border-b border-border/50 px-6 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">U</span>
            </div>
            <span className="text-sm font-bold tracking-tight">Urja<span className="text-primary">Loop</span></span>
          </div>
        </header>

        <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      </main>

      <BottomNav onScanClick={() => setIsScanModalOpen(true)} />
      
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
      />
    </div>
  )
}
