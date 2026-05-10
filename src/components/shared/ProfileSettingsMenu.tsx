"use client"

import { useState } from "react"
import { 
  Settings, X, Globe, Accessibility, 
  Palette, Eye, Wind, Languages, 
  MousePointer2, ScreenShare, Check,
  Menu, Building2, Wheat
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAccessibility } from "./AccessibilityProvider"
import { LanguageToggle } from "./LanguageToggle"
import { ModeToggle } from "./ModeToggle"
import { ThemeToggle } from "./ThemeToggle"

export function ProfileSettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
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
        className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm"
        aria-label="Open Settings"
      >
        <Menu size={20} strokeWidth={2.5} />
      </button>

      {/* Side Sheet / Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-card border-l border-border shadow-2xl z-[101] overflow-y-auto animate-in slide-in-from-right duration-500">
            <div className="p-6 space-y-8">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Settings size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">System Config</h2>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Control Panel</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-all"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Theme & Language Section */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                       <Globe size={14} strokeWidth={2.5} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Network Language</span>
                    </div>
                    <LanguageToggle />
                 </div>

                 <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                       <Building2 size={14} strokeWidth={2.5} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Sector Mode</span>
                    </div>
                    <ModeToggle />
                 </div>
              </div>

              {/* Accessibility Section */}
              <div className="space-y-6 pt-4 border-t border-border">
                 <div className="flex items-center gap-2 text-primary">
                    <Accessibility size={16} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Accessibility Protocol</span>
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
                      label="Monochrome" 
                      active={monochrome} 
                      onClick={() => setMonochrome(!monochrome)} 
                    />
                    <AccessibilityToggle 
                      icon={Languages} 
                      label="Dyslexia Font" 
                      active={dyslexiaFont} 
                      onClick={() => setDyslexiaFont(!dyslexiaFont)} 
                    />
                    <AccessibilityToggle 
                      icon={MousePointer2} 
                      label="Large Cursor" 
                      active={largeCursor} 
                      onClick={() => setLargeCursor(!largeCursor)} 
                    />
                    <AccessibilityToggle 
                      icon={ScreenShare} 
                      label="Audio Hints" 
                      active={screenReaderHints} 
                      onClick={() => setScreenReaderHints(!screenReaderHints)} 
                    />
                 </div>
              </div>

              {/* Footer Info */}
              <div className="pt-8 text-center space-y-4">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">
                   UrjaLoop Neural Network v1.0
                 </p>
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
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                 >
                   Restore Factory Defaults
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
        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
        active 
          ? "bg-primary/5 border-primary/20 text-foreground" 
          : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={14} className={cn(active ? "text-primary" : "text-muted-foreground")} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className={cn(
        "w-5 h-5 rounded-lg border flex items-center justify-center transition-all",
        active ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
      )}>
        {active && <Check size={12} strokeWidth={4} />}
      </div>
    </button>
  )
}
