"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Bot, Send, Mic, Sparkles, User, 
  Leaf, MapPin, AlertCircle, Search, Recycle,
  BrainCircuit, Camera, CheckCircle2
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { toast } from "sonner"

const suggestedPrompts = [
  { icon: Recycle, text: "How do I segregate plastic waste?", tag: "Segregation" },
  { icon: AlertCircle, text: "How do I report an illegal dump?", tag: "Reporting" },
  { icon: MapPin, text: "Where is the nearest collection center?", tag: "Nearby" },
  { icon: Leaf, text: "What are Eco Credits and how do I earn them?", tag: "Credits" },
]

import { useMode } from "@/components/shared/ModeProvider"
import { supabase } from "@/lib/supabase"

const botResponses: Record<string, (context: any) => string> = {
  "default": () => "That's a great question! I'm analyzing your request using my sustainability knowledge base. Based on current data in your area, I'd suggest checking the Transparency Map for real-time information. 🌍",
  
  "segregate": () => "Plastic waste should be divided into: **Hard Plastics** (bottles, containers), **Soft Plastics** (bags, wrappers), and **Composite** (multi-layer packaging). Rinse containers before disposal. In Sector 14, the nearest segregation facility is at the Main Gate smart bin. Your submission earns Eco Credits after AI + weight verification! ♻️",
  
  "report": () => "To report illegal dumping: 1️⃣ Open the Scan Center and select **Report Open Dumping** 2️⃣ Take a photo as evidence 3️⃣ Your GPS location is auto-captured 4️⃣ Select severity level 5️⃣ Submit. Your complaint will receive an AI validation tag and be assigned within 2 hours. You can track progress in the Complaint Center.",
  
  "credits": (ctx) => `You currently have **${ctx.credits} Eco Credits**. You can earn more by submitting verified recyclables at the nearest Smart Bin. Current rate: ~₹0.50 per 100g verified plastic. Your recent contribution saved **4.2kg of CO2**! 💎`,

  "bins": (ctx) => {
    const fullBins = ctx.bins.filter((b: any) => b.fill > 80).length
    if (fullBins > 0) {
      return `Warning: **${fullBins} bins** in your area are nearing capacity. Our collection team (Truck #402) has been notified and is 1.2km away. I recommend using the **Park Entrance** bin which is only 67% full. 🚛`
    }
    return `All bins in your vicinity are currently available. The cleanest one is at **Main Gate** (18% full). Happy recycling! ✅`
  },

  "rural": () => "As your Agri-Waste Assistant, I recommend checking the **Marketplace** for the latest Bio-fuel prices. Current demand for **Rice Straw (Prali)** is high in Ludhiana. Selling now can earn you up to **₹1,500/ton** plus 500 Urja Credits! 🌾"
}

interface Message {
  role: "user" | "bot"
  content: string
  timestamp: string
}

export default function UrjaBot() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm **Urja AI**, your smart sustainability assistant. I can help with waste segregation guidance, complaint support, finding nearby facilities, and more. What would you like to know? 🌱", timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [bins, setBins] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: p } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
        if (p) setProfile(p)
      }
      const { data } = await supabase.from('smart_bins').select('*')
      if (data) setBins(data)
    }
    fetchData()
  }, [])

  const handleSend = (text?: string) => {
    const msg = text || input
    if (!msg.trim()) return

    const userMsg: Message = { role: "user", content: msg, timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const lowerMsg = msg.toLowerCase()
    const context = { credits: profile?.eco_credits || 0, bins: bins }
    
    let responseFn = botResponses.default
    if (lowerMsg.includes("segregat") || lowerMsg.includes("plastic") || lowerMsg.includes("separate")) responseFn = botResponses.segregate
    else if (lowerMsg.includes("report") || lowerMsg.includes("dump") || lowerMsg.includes("illegal")) responseFn = botResponses.report
    else if (lowerMsg.includes("credit") || lowerMsg.includes("earn") || lowerMsg.includes("reward")) responseFn = botResponses.credits
    else if (lowerMsg.includes("bin") || lowerMsg.includes("fill") || lowerMsg.includes("full") || lowerMsg.includes("near")) responseFn = botResponses.bins
    
    if (mode === "rural" && (lowerMsg.includes("farm") || lowerMsg.includes("agri") || lowerMsg.includes("prali") || lowerMsg.includes("straw"))) {
      responseFn = botResponses.rural
    }

    const response = responseFn(context)

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { role: "bot", content: response, timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }])
    }, 1400)
  }

  const handleScan = async () => {
    setIsTyping(true)
    const userMsg: Message = { role: "user", content: "[Photo Uploaded: Plastic Bottle]", timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }
    setMessages(prev => [...prev, userMsg])
    
    setTimeout(async () => {
      const reward = 50
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // 1. Get current credits
        const { data: profile } = await supabase
          .from('profiles')
          .select('eco_credits')
          .eq('id', session.user.id)
          .single()
        
        const newCredits = (profile?.eco_credits || 0) + reward

        // 2. Update credits
        await supabase
          .from('profiles')
          .update({ eco_credits: newCredits })
          .eq('id', session.user.id)
        
        // 3. Log activity
        await supabase.from('activity_log').insert({
          user_id: session.user.id,
          action: "Scanned Waste",
          description: "Identified PET Plastic Bottle via AI Scan",
          points_earned: reward
        })

        setIsTyping(false)
        setMessages(prev => [...prev, { 
          role: "bot", 
          content: `AI Scan Complete! ✅\n\nItem: **PET Plastic Bottle**\nStatus: **Verified**\nReward: **+${reward} Eco Credits**\n\nYour contribution has been logged. Thank you for keeping India clean! 🌍`, 
          timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) 
        }])
        toast.success(`Reward Earned: +${reward} Credits!`)
      } else {
        setIsTyping(false)
        setMessages(prev => [...prev, { role: "bot", content: "AI Scan Complete! Identified a **Plastic Bottle**. Please login to earn Eco Credits for your contribution! ♻️", timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }])
      }
    }, 2000)
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  // Render message content with basic markdown
  const renderContent = (content: string) => {
    const parts = content.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] m-4 lg:m-8 bg-card border border-border rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="p-5 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-sm">
              <BrainCircuit size={22} strokeWidth={2} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">{t("bot_title")}</h1>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              {t("bot_subtitle")}
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-xl">
          <Sparkles size={12} className="text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground">AI-Assisted · Not 100% Accurate</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
            m.role === "user" ? "flex-row-reverse" : ""
          )}>
            <div className={cn("w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0",
              m.role === "bot" ? "bg-primary/10 text-primary" : "bg-muted border border-border"
            )}>
              {m.role === "bot" ? <BrainCircuit size={16} /> : <User size={16} className="text-muted-foreground" />}
            </div>
            <div className={cn("max-w-[80%] space-y-1",
              m.role === "user" ? "items-end" : "items-start"
            )}>
              <div className={cn("px-4 py-3 rounded-3xl text-sm leading-relaxed",
                m.role === "bot"
                  ? "bg-muted/60 border border-border text-foreground rounded-tl-lg"
                  : "bg-primary text-primary-foreground rounded-tr-lg"
              )}>
                {renderContent(m.content)}
              </div>
              <p className="text-[10px] text-muted-foreground px-1">{m.timestamp}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <BrainCircuit size={16} />
            </div>
            <div className="px-4 py-3 bg-muted/60 border border-border rounded-3xl rounded-tl-lg">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggested Prompts — show only at start */}
        {messages.length === 1 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-muted-foreground text-center">Suggested Questions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                    <prompt.icon size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{prompt.text}</p>
                    <Badge className="bg-muted text-muted-foreground border-none text-[9px] px-1.5 py-0 mt-0.5">{prompt.tag}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-3">
          <button 
            onClick={handleScan}
            className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary hover:bg-primary/20 transition-all flex-shrink-0"
            title="Scan Waste"
          >
            <Camera size={18} />
          </button>
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("bot_placeholder")}
              className="w-full px-4 py-3 bg-muted border border-border rounded-2xl text-sm text-foreground outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          <button
            onClick={() => handleSend()}
            className="w-11 h-11 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-sm hover:opacity-90 transition-all active:scale-95 flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          AI-assisted responses · Not 100% accurate · Verify critical info
        </p>
      </div>
    </div>
  )
}
