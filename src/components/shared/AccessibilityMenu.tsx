"use client"

import { useState } from "react"
import { 
  Accessibility, Check, ChevronDown, 
  Eye, MousePointer2, Move, Type, 
  Wind, ScreenShare, Languages, Palette,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAccessibility } from "./AccessibilityProvider"
import { ThemeToggle } from "./ThemeToggle"

interface AccessibilityMenuProps {
  isCollapsed?: boolean
}

export function AccessibilityMenu({ isCollapsed }: AccessibilityMenuProps) {
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
    <div className={cn("relative", isCollapsed ? "flex justify-center" : "")}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-xl transition-all duration-300",
          isCollapsed ? "p-2.5 justify-center" : "px-3 py-2 justify-between border",
          isOpen 
            ? "bg-primary text-primary-foreground border-primary shadow-lg" 
            : "bg-muted/30 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label="Settings & Accessibility"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
           <Settings size={17} className={cn("transition-transform duration-500", isOpen && "rotate-90")} />
           {!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-wider">Settings</span>}
        </div>
        {!isCollapsed && (
          <ChevronDown size={12} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={cn(
            "absolute bottom-0 mb-12 w-80 bg-card border border-border rounded-[2rem] shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200",
            isCollapsed ? "left-16" : "left-0"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Settings size={16} className="text-primary" />
                System Settings
              </h3>
              <ThemeToggle />
            </div>

            <div className="space-y-6">
              {/* Text Size */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Type size={12} /> Text Scaling
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["normal", "large", "extra-large"] as const).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setFontScale(scale)}
                      className={cn(
                        "py-2 rounded-xl text-[10px] font-bold border transition-all",
                        fontScale === scale 
                          ? "bg-primary/10 border-primary/30 text-primary" 
                          : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {scale === "normal" ? "100%" : scale === "large" ? "125%" : "150%"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles Grid */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Accessibility size={12} /> Accessibility
                </p>
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
                    label="Dyslexia Friendly" 
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
                    label="Screen Reader Hints" 
                    active={screenReaderHints} 
                    onClick={() => setScreenReaderHints(!screenReaderHints)} 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                 <span>UrjaLoop v2.4.0</span>
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
                  className="text-primary hover:underline"
                 >
                   Reset Defaults
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
        "w-full flex items-center justify-between p-3 rounded-2xl border transition-all",
        active 
          ? "bg-primary/5 border-primary/20 text-foreground" 
          : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={14} className={cn(active ? "text-primary" : "text-muted-foreground")} />
        <span className="text-[11px] font-semibold">{label}</span>
      </div>
      <div className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
        active ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
      )}>
        {active && <Check size={10} strokeWidth={4} />}
      </div>
    </button>
  )
}
