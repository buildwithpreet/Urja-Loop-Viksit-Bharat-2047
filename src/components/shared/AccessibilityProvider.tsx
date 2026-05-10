"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type FontScale = "normal" | "large" | "extra-large"

interface AccessibilityContextType {
  reducedMotion: boolean
  setReducedMotion: (val: boolean) => void
  highContrast: boolean
  setHighContrast: (val: boolean) => void
  fontScale: FontScale
  setFontScale: (scale: FontScale) => void
  dyslexiaFont: boolean
  setDyslexiaFont: (val: boolean) => void
  monochrome: boolean
  setMonochrome: (val: boolean) => void
  largeCursor: boolean
  setLargeCursor: (val: boolean) => void
  screenReaderHints: boolean
  setScreenReaderHints: (val: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontScale, setFontScale] = useState<FontScale>("normal")
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [monochrome, setMonochrome] = useState(false)
  const [largeCursor, setLargeCursor] = useState(false)
  const [screenReaderHints, setScreenReaderHints] = useState(false)

  // Apply settings to document element
  useEffect(() => {
    const root = document.documentElement
    
    // Font Scale
    root.classList.remove("font-scale-normal", "font-scale-large", "font-scale-extra-large")
    root.classList.add(`font-scale-${fontScale}`)
    
    // Dyslexia Font
    if (dyslexiaFont) root.classList.add("dyslexia-font")
    else root.classList.remove("dyslexia-font")
    
    // High Contrast
    if (highContrast) root.classList.add("high-contrast")
    else root.classList.remove("high-contrast")
    
    // Reduced Motion
    if (reducedMotion) root.classList.add("reduced-motion")
    else root.classList.remove("reduced-motion")

    // Monochrome
    if (monochrome) root.classList.add("monochrome-mode")
    else root.classList.remove("monochrome-mode")

    // Large Cursor
    if (largeCursor) root.classList.add("large-cursor")
    else root.classList.remove("large-cursor")

    // Screen Reader Hints
    if (screenReaderHints) root.classList.add("sr-hints-active")
    else root.classList.remove("sr-hints-active")

  }, [fontScale, dyslexiaFont, highContrast, reducedMotion, monochrome, largeCursor, screenReaderHints])

  return (
    <AccessibilityContext.Provider 
      value={{ 
        reducedMotion, setReducedMotion, 
        highContrast, setHighContrast, 
        fontScale, setFontScale,
        dyslexiaFont, setDyslexiaFont,
        monochrome, setMonochrome,
        largeCursor, setLargeCursor,
        screenReaderHints, setScreenReaderHints
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
