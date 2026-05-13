"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"
import { ScanModal } from "./ScanModal"
import { Footer } from "./Footer"
import { PageTransition } from "./PageTransition"
import { AccessibilityProvider } from "./AccessibilityProvider"
import { supabase } from "@/lib/supabase"
import { ProfileSettingsMenu } from "./ProfileSettingsMenu"
import { Leaf } from "lucide-react"
import { useAccessibility } from "./AccessibilityProvider"
import { Toaster } from "@/components/ui/sonner"

const AUTH_ROUTES = ["/", "/splash", "/onboarding", "/login", "/verify-otp", "/setup-profile", "/permissions"]
const STANDALONE_ROUTES = ["/admin"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { notificationsEnabled } = useAccessibility()

  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isStandalone = STANDALONE_ROUTES.includes(pathname)

  useEffect(() => {
    const handleOpenScan = () => setIsScanModalOpen(true)
    window.addEventListener("open-scan-modal", handleOpenScan)
    return () => window.removeEventListener("open-scan-modal", handleOpenScan)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const isDemoSession = localStorage.getItem("urjaloop_demo_session") === "true"
        
        if (!isAuthRoute && !session && !isDemoSession) {
          router.push("/login")
        }
      } catch (error) {
        console.warn("Auth check failed:", error)
        // In case of error, if it's not an auth route, redirect to login
        const isDemoSession = localStorage.getItem("urjaloop_demo_session") === "true"
        if (!isAuthRoute && !isDemoSession) {
          router.push("/login")
        }
      }
    }
    checkAuth()
  }, [isAuthRoute, pathname, router])

  if (!mounted) return <div className="min-h-screen bg-background" />

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {notificationsEnabled && <Toaster position="top-center" richColors theme="system" />}
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <main id="main-content" className="flex-1 w-full overflow-x-hidden flex flex-col outline-none relative" tabIndex={-1}>
          {/* Top Header */}
          <header className="h-20 flex items-center justify-between px-6 md:px-12 sticky top-0 z-[60] bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Leaf className="text-primary-foreground w-6 h-6" strokeWidth={2.5} />
               </div>
               <div>
                  <h1 className="text-xl font-black uppercase tracking-tighter">UrjaLoop</h1>
                  <p className="text-[8px] text-primary font-bold uppercase tracking-[0.3em]">Neural Network</p>
               </div>
            </div>
            <ProfileSettingsMenu />
          </header>

          {/* Main Content Area */}
          <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AnimatePresence mode="wait">
              <PageTransition key={pathname}>
                {children}
              </PageTransition>
            </AnimatePresence>
          </div>
          
          <Footer />
        </main>

        <BottomNav onScanClick={() => setIsScanModalOpen(true)} />
        
        <ScanModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
        />
        {notificationsEnabled && <Toaster position="top-center" richColors theme="system" />}
      </div>
  )
}
