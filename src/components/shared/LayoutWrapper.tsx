"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"
import { ScanModal } from "./ScanModal"
import { AccessibilityProvider } from "./AccessibilityProvider"

const AUTH_ROUTES = ["/", "/splash", "/onboarding", "/login", "/verify-otp", "/setup-profile", "/permissions"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  useEffect(() => {
    setMounted(true)
    if (!isAuthRoute) {
      const hasOnboarded = localStorage.getItem("urjaloop_onboarded")
      if (!hasOnboarded) {
        router.push("/login")
      }
    }
  }, [isAuthRoute, pathname, router])

  if (!mounted) return <div className="min-h-screen bg-background" />

  if (isAuthRoute) {
    return (
      <AccessibilityProvider>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </AccessibilityProvider>
    )
  }

  return (
    <AccessibilityProvider>
      <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        
        <Sidebar />
        
        <main id="main-content" className="flex-1 w-full overflow-x-hidden flex flex-col outline-none relative" tabIndex={-1}>

          <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
            {children}
          </div>

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
