"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type?: Toast["type"], duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration || 3500)
    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  const bgMap = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-amber-500 text-white",
  }

  const iconMap = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 animate-in slide-in-from-bottom-5 fade-in duration-300 ${bgMap[toast.type]}`}
    >
      <span className="text-sm font-bold w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        {iconMap[toast.type]}
      </span>
      <p className="text-sm font-semibold flex-1">{toast.message}</p>
      <button
        onClick={onRemove}
        className="text-white/60 hover:text-white transition-colors text-lg leading-none flex-shrink-0"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast["type"] = "success", duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
