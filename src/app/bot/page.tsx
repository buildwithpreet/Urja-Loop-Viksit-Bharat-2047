"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  Search,
  AlertCircle,
  MapPin,
  Cpu,
  Zap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"

export default function UrjaBot() {
  const { t } = useLanguage()
  
  const quickActions = [
    { text: t("onboarding_2_title"), icon: Search },
    { text: t("nav_complaints"), icon: AlertCircle },
    { text: t("dashboard_facilities_title"), icon: MapPin },
  ]

  const [messages, setMessages] = useState([
    { role: "bot", content: t("bot_greeting") }
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "That's a great question! I'm analyzing your request using my waste-aware knowledge base. 🌍" 
      }])
    }, 1200)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] ultra-glass rounded-[3rem] border border-foreground/10 overflow-hidden shadow-2xl m-4 lg:m-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header */}
      <div className="p-8 border-b border-foreground/5 bg-foreground/5 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30 relative z-10">
              <Bot size={32} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-background z-20 animate-pulse"></div>
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-foreground tracking-tighter uppercase">{t("bot_title")}</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] opacity-80">{t("bot_subtitle")}</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 ultra-glass border border-foreground/5 px-5 py-2.5 rounded-2xl">
           <Cpu size={16} className="text-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-foreground">GPT-4 Turbo Integrated</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-8 py-10" ref={scrollRef}>
        <div className="space-y-10 max-w-4xl mx-auto">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={cn(
                "flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                m.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl border border-foreground/5",
                m.role === "bot" ? "ultra-glass text-primary" : "bg-primary text-white"
              )}>
                {m.role === "bot" ? <Bot size={24} strokeWidth={2.5} /> : <User size={24} strokeWidth={2.5} />}
              </div>
              <div className={cn(
                "max-w-[75%] p-6 rounded-[2rem] text-[13px] font-bold leading-relaxed shadow-xl border border-foreground/5 relative",
                m.role === "bot" 
                  ? "ultra-glass text-foreground rounded-tl-none" 
                  : "bg-primary text-primary-foreground rounded-tr-none shadow-primary/10"
              )}>
                {m.content}
                {m.role === "bot" && (
                   <div className="absolute -top-3 -right-3 w-8 h-8 ultra-glass rounded-full flex items-center justify-center text-primary/40">
                      <Sparkles size={12} />
                   </div>
                )}
              </div>
            </div>
          ))}
          
          {messages.length === 1 && (
            <div className="flex flex-col gap-4 pt-10 items-center">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Autonomous Suggestion Engine</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {quickActions.map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(action.text)}
                    className="flex flex-col items-center gap-4 p-6 ultra-glass border border-foreground/5 rounded-3xl hover:bg-foreground/5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] group text-center"
                  >
                    <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all border border-foreground/5">
                      <action.icon size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-foreground opacity-80">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-8 bg-foreground/5 backdrop-blur-2xl border-t border-foreground/5 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex gap-4 relative">
            <input 
              placeholder={t("bot_placeholder")} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 h-16 px-8 rounded-2xl ultra-glass border border-foreground/10 bg-foreground/5 text-[13px] font-black uppercase tracking-widest text-foreground placeholder:opacity-30 focus:outline-none focus:border-primary/50 transition-all shadow-2xl"
            />
            <button 
              onClick={handleSend}
              className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 active:scale-90 transition-all border border-primary/20"
            >
              <Send size={24} strokeWidth={3} />
            </button>
          </div>
          <div className="flex justify-center items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">
            <Zap size={12} className="text-primary fill-current" />
            Hyper-Optimized Response Matrix
          </div>
        </div>
      </div>
    </div>
  )
}
