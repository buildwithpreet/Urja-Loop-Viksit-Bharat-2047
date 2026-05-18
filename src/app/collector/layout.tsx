"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMode } from "@/components/shared/ModeProvider"
import { ShieldAlert } from "lucide-react"

export default function CollectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { mode, isLoaded } = useMode()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    // If not in collector mode, redirect back to dashboard
    // Allow both collectors and admins
    if (mode !== "collector" && mode !== "admin") {
      router.replace("/dashboard")
    } else {
      setTimeout(() => setIsAuthorized(true), 0)
    }
  }, [mode, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-white/80">Access Denied</h2>
        <p className="text-sm text-white/50">Insufficient system privileges for this sector.</p>
      </div>
    )
  }

  return <>{children}</>
}
