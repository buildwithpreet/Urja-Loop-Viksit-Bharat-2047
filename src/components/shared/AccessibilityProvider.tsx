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
  notificationsEnabled: boolean
  setNotificationsEnabled: (val: boolean) => void
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(localStorage.getItem("urja_reducedMotion") === "true")
      setHighContrast(localStorage.getItem("urja_highContrast") === "true")
      setFontScale((localStorage.getItem("urja_fontScale") as FontScale) || "normal")
      setDyslexiaFont(localStorage.getItem("urja_dyslexiaFont") === "true")
      setMonochrome(localStorage.getItem("urja_monochrome") === "true")
      setLargeCursor(localStorage.getItem("urja_largeCursor") === "true")
      setScreenReaderHints(localStorage.getItem("urja_screenReaderHints") === "true")
      setNotificationsEnabled(localStorage.getItem("urja_notificationsEnabled") !== "false")
      setMounted(true)
    }
  }, [])

  // Save to localStorage when settings change
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("urja_reducedMotion", String(reducedMotion))
      localStorage.setItem("urja_highContrast", String(highContrast))
      localStorage.setItem("urja_fontScale", fontScale)
      localStorage.setItem("urja_dyslexiaFont", String(dyslexiaFont))
      localStorage.setItem("urja_monochrome", String(monochrome))
      localStorage.setItem("urja_largeCursor", String(largeCursor))
      localStorage.setItem("urja_screenReaderHints", String(screenReaderHints))
      localStorage.setItem("urja_notificationsEnabled", String(notificationsEnabled))
    }
  }, [reducedMotion, highContrast, fontScale, dyslexiaFont, monochrome, largeCursor, screenReaderHints, notificationsEnabled, mounted])

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
        screenReaderHints, setScreenReaderHints,
        notificationsEnabled, setNotificationsEnabled
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
