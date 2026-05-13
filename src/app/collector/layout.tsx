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
  const { mode } = useMode()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // If not in collector mode, redirect back to dashboard
    if (mode !== "collector") {
      router.replace("/dashboard")
    } else {
      setIsAuthorized(true)
    }
  }, [mode, router])

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-white/80">Access Denied</h2>
        <p className="text-sm text-white/50">You do not have collector privileges.</p>
      </div>
    )
  }

  return <>{children}</>
}
