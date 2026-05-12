"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type AppMode = "urban" | "rural"

interface ModeContextType {
  mode: AppMode
  toggleMode: () => void
  setMode: (mode: AppMode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AppMode>("urban")

  useEffect(() => {
    const initMode = async () => {
      const savedMode = localStorage.getItem("urjaloop_mode") as AppMode
      if (savedMode && (savedMode === "urban" || savedMode === "rural")) {
        setModeState(savedMode)
      } else {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()
            
            if (profile?.role) {
              setModeState(profile.role as AppMode)
              localStorage.setItem("urjaloop_mode", profile.role)
            }
          }
        } catch (error) {
          console.warn("Supabase session check skipped or failed:", error)
          // Default to urban if no session or error
          setModeState("urban")
        }
      }
    }
    initMode()
  }, [])

  const setMode = (newMode: AppMode) => {
    setModeState(newMode)
    localStorage.setItem("urjaloop_mode", newMode)
  }

  const toggleMode = () => {
    setMode(mode === "urban" ? "rural" : "urban")
  }

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
