"use client"

import { useLanguage } from "./LanguageProvider"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  isCollapsed?: boolean
}

export function LanguageToggle({ isCollapsed }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  if (isCollapsed) {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all",
          "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        )}
        title={language === "en" ? "Switch to Hindi" : "English में बदलें"}
      >
        {language === "en" ? "EN" : "HI"}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1 ultra-glass p-1 rounded-xl">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
          language === "en" 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
          language === "hi" 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        हिन्दी
      </button>
    </div>
  )
}
