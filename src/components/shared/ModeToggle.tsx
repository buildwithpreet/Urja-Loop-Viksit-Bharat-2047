"use client"

import { useMode } from "./ModeProvider"
import { Building2, Wheat, Truck } from "lucide-react"

export function ModeToggle() {
  const { mode, setMode } = useMode()

  return (
    <div className="flex items-center p-1 bg-muted rounded-xl w-full max-w-md mx-auto border border-border">
      <button
        onClick={() => setMode("urban")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
          mode === "urban"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Building2 size={14} className={mode === "urban" ? "text-blue-500" : ""} />
        Urban
      </button>
      <button
        onClick={() => setMode("rural")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
          mode === "rural"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Wheat size={14} className={mode === "rural" ? "text-amber-500" : ""} />
        Rural
      </button>
      <button
        onClick={() => setMode("collector")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
          mode === "collector"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Truck size={14} className={mode === "collector" ? "text-cyan-400" : ""} />
        Collector
      </button>
    </div>
  )
}
