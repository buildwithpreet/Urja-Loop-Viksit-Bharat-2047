"use client"

import { useState } from "react"
import { 
  Settings, X, Globe, Accessibility, 
  Palette, Eye, Wind, Languages, 
  MousePointer2, ScreenShare, Check,
  Menu, Building2, Wheat, LogOut,
  ChevronRight, Sparkles, ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAccessibility } from "./AccessibilityProvider"
import { useLanguage, LANGUAGES } from "./LanguageProvider"
import { ModeToggle } from "./ModeToggle"
import { ThemeToggle } from "./ThemeToggle"

export function ProfileSettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { 
    fontScale, setFontScale, 
    reducedMotion, setReducedMotion,
    highContrast, setHighContrast,
    dyslexiaFont, setDyslexiaFont,
    monochrome, setMonochrome,
    largeCursor, setLargeCursor,
    screenReaderHints, setScreenReaderHints
  } = useAccessibility()

  return (
    <div className="relative">
      {/* Hamburger Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-xl hover:scale-105 active:scale-95"
        aria-label="System Settings"
      >
        <Menu size={24} strokeWidth={2.5} />
      </button>

      {/* Side Sheet / Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/40 backdrop-blur-md z-[100] animate-in fade-in duration-500"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-card/95 backdrop-blur-2xl border-l border-border shadow-[0_0_50px_rgba(0,0,0,0.3)] z-[101] overflow-y-auto animate-in slide-in-from-right duration-500 selection:bg-primary/20">
            <div className="p-8 space-y-10">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <Settings size={24} strokeWidth={2.5} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Urja Control</h2>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">System Protocol v1.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground transition-all hover:rotate-90"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Theme & Mode Section */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-3">
                       <Palette size={18} className="text-primary" />
                       <span className="text-[11px] font-black uppercase tracking-widest">Interface Theme</span>
                    </div>
                    <ThemeToggle />
                 </div>

                 <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                       <Building2 size={14} className="text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Sector Environment</span>
                    </div>
                    <ModeToggle />
                 </div>
              </div>

              {/* Language Section - 20+ Languages Grid */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                       <Globe size={14} className="text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Linguistic Node</span>
                    </div>
                    <span className="text-[9px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">22 Active</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={cn(
                          "flex flex-col items-start p-3 rounded-xl border transition-all text-left group",
                          language === lang.code 
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10" 
                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span className="text-[11px] font-black uppercase tracking-tight">{lang.native}</span>
                        <span className={cn("text-[9px] font-bold opacity-60", language === lang.code ? "text-primary-foreground" : "text-muted-foreground")}>
                           {lang.name}
                        </span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Accessibility Section */}
              <div className="space-y-6 pt-6 border-t border-border/50">
                 <div className="flex items-center gap-2 px-1">
                    <Accessibility size={16} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sensory Protocols</span>
                 </div>

                 <div className="grid grid-cols-1 gap-2">
                    <AccessibilityToggle 
                      icon={Wind} 
                      label="Reduced Motion" 
                      active={reducedMotion} 
                      onClick={() => setReducedMotion(!reducedMotion)} 
                    />
                    <AccessibilityToggle 
                      icon={Eye} 
                      label="High Contrast" 
                      active={highContrast} 
                      onClick={() => setHighContrast(!highContrast)} 
                    />
                    <AccessibilityToggle 
                      icon={Palette} 
                      label="Monochrome Mode" 
                      active={monochrome} 
                      onClick={() => setMonochrome(!monochrome)} 
                    />
                    <AccessibilityToggle 
                      icon={Languages} 
                      label="Dyslexia Font" 
                      active={dyslexiaFont} 
                      onClick={() => setDyslexiaFont(!dyslexiaFont)} 
                    />
                 </div>
              </div>

              {/* System Actions */}
              <div className="space-y-3 pt-6 border-t border-border/50">
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50 group">
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={18} className="text-emerald-500" />
                       <span className="text-[11px] font-black uppercase tracking-widest">Privacy Encryption</span>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                 </button>

                 <button 
                   onClick={() => window.location.href = "/login"}
                   className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-all border border-transparent hover:border-red-500/30 group"
                 >
                    <div className="flex items-center gap-3">
                       <LogOut size={18} className="text-red-500" />
                       <span className="text-[11px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">Terminate Session</span>
                    </div>
                    <X size={14} className="text-red-500/50 group-hover:rotate-90 transition-transform" />
                 </button>
              </div>

              {/* Footer Info */}
              <div className="pt-8 text-center space-y-6">
                 <div className="flex items-center justify-center gap-2 text-primary opacity-40">
                    <Sparkles size={12} />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em]">
                      Neural Nexus v1.0.4
                    </p>
                 </div>
                 <button 
                  onClick={() => {
                    setFontScale("normal")
                    setReducedMotion(false)
                    setHighContrast(false)
                    setDyslexiaFont(false)
                    setMonochrome(false)
                    setLargeCursor(false)
                    setScreenReaderHints(false)
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:underline transition-all"
                 >
                   Clear Buffer & Reset
                 </button>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  )
}

function AccessibilityToggle({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
        active 
          ? "bg-primary/5 border-primary/20 text-foreground" 
          : "bg-muted/10 border-transparent text-muted-foreground hover:bg-muted/30"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className={cn(active ? "text-primary" : "text-muted-foreground", "group-hover:scale-110 transition-transform")} />
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-lg border flex items-center justify-center transition-all",
        active ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-muted/20"
      )}>
        {active && <Check size={14} strokeWidth={4} />}
      </div>
    </button>
  )
}
