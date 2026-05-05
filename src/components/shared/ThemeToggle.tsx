"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, []) // eslint-disable-line react-hooks/set-state-in-effect

  if (!mounted) return <div className="w-10 h-10" />

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-all active:scale-90 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 animate-in zoom-in duration-300" />
      ) : (
        <Moon className="h-5 w-5 animate-in zoom-in duration-300" />
      )}
    </button>
  )
}
