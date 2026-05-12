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

const AUTH_ROUTES = ["/", "/splash", "/onboarding", "/login", "/verify-otp", "/setup-profile", "/permissions"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  useEffect(() => {
    const handleOpenScan = () => setIsScanModalOpen(true)
    window.addEventListener("open-scan-modal", handleOpenScan)
    return () => window.removeEventListener("open-scan-modal", handleOpenScan)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
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
      <AccessibilityProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>
      </AccessibilityProvider>
    )
  }

  return (
    <AccessibilityProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <main id="main-content" className="flex-1 w-full overflow-x-hidden flex flex-col outline-none relative" tabIndex={-1}>
          <div className="flex-1 w-full max-w-4xl mx-auto">
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
      </div>
    </AccessibilityProvider>
  )
}
