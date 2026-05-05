"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  Search,
  AlertCircle,
  Lightbulb
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const quickActions = [
  { text: "Identify Waste", icon: Search },
  { text: "Recycling Tips", icon: Lightbulb },
  { text: "File Complaint", icon: AlertCircle },
]

export default function UrjaBot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Urja AI, your sustainability assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "That's a great question! I'm analyzing your request using my waste-aware knowledge base. 🌍" 
      }])
    }, 1000)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 flex items-center gap-2">
            Urja Bot
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h1>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">AI Assistant Online</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.role === "bot" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
              }`}>
                {m.role === "bot" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                m.role === "bot" 
                  ? "bg-slate-50 text-slate-900 rounded-tl-none" 
                  : "bg-emerald-500 text-white rounded-tr-none"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          
          {messages.length === 1 && (
            <div className="grid grid-cols-1 gap-2 pt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Try these actions</p>
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl text-xs font-semibold text-slate-700 hover:border-emerald-200 transition-colors"
                >
                  <action.icon size={16} className="text-emerald-500" />
                  {action.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-white border-t border-slate-100 space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-emerald-500"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100 active:scale-95 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400">
          <Sparkles size={10} />
          Powered by Urja AI v2.0
        </div>
      </div>
    </div>
  )
}
