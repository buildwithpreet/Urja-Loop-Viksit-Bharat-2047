"use client"

import { useLanguage } from "./LanguageProvider"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 ultra-glass border border-white/10 p-1.5 rounded-2xl">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
          language === "en" 
            ? "bg-primary text-white shadow-lg shadow-primary/20" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <div className="w-px h-4 bg-white/10" />
      <button
        onClick={() => setLanguage("hi")}
        className={cn(
          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
          language === "hi" 
            ? "bg-primary text-white shadow-lg shadow-primary/20" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        हिन्दी
      </button>
    </div>
  )
}
