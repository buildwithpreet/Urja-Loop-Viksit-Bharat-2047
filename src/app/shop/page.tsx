"use client"

import { useState } from "react"
import { 
  Leaf,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = ["Compost", "Plastic", "Paper", "Glass", "Agri Waste", "Metal"]

const products = [
  { id: 1, name: "Premium Organic Compost", price: "450", quantity: "25kg", category: "Compost", seller: "Urja Farms", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Baled PET Plastic", price: "1200", unit: "ton", quantity: "5.2 tons", category: "Plastic", seller: "EcoRecycle Ltd", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400", buyer: "Polymer Corp" },
  { id: 3, name: "Shredded Paper Pulp", price: "800", unit: "ton", quantity: "12 tons", category: "Paper", seller: "GreenPaper Co", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Agricultural Husk Waste", price: "350", unit: "ton", quantity: "40 tons", category: "Agri Waste", seller: "FarmSource", image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400", buyer: "BioFuel Inc" },
]

export default function Shop() {
  const [activeTab, setActiveTab] = useState("buy")

  return (
    <div className="p-8 pb-32 lg:p-12 space-y-12 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gradient tracking-tight">Marketplace</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">Trade recycled materials & products</p>
        </div>
        <Tabs defaultValue="buy" onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1.5 h-14 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <TabsTrigger value="buy" className="rounded-xl px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-600 data-[state=active]:shadow-lg font-black text-xs transition-all">BUY</TabsTrigger>
            <TabsTrigger value="sell" className="rounded-xl px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-600 data-[state=active]:shadow-lg font-black text-xs transition-all">SELL</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Category Pills */}
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <Badge 
              key={cat} 
              variant="secondary" 
              className="bg-card border border-border text-slate-500 dark:text-slate-400 px-6 py-2.5 rounded-2xl font-bold cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"
            >
              {cat}
            </Badge>
          ))}
        </div>
      </ScrollArea>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="card-premium group overflow-hidden flex flex-col h-full">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 py-1 font-black text-[10px] shadow-lg">
                  {product.category.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                <div className="text-right">
                  <p className="text-xl font-black text-emerald-600 tabular-nums">₹{product.price}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{product.quantity}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-2">High-quality processed material ready for industrial use.</p>
              
              {product.buyer && (
                <div className="bg-blue-50/50 p-3 rounded-xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Reserved for {product.buyer}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.seller}</span>
                <button 
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95",
                    product.buyer 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-slate-900 text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                  )}
                  disabled={!!product.buyer}
                >
                  {product.buyer ? "SOLD" : (activeTab === "buy" ? "ADD TO CART" : "LIST ITEM")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Section */}
      <div className="card-premium bg-slate-900 border-none p-10 relative overflow-hidden group">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black text-white">Join the Circular Economy</h2>
            <p className="text-slate-400 max-w-md font-medium">Verify your business as an Urja Partner and unlock bulk trade discounts and green tax benefits.</p>
            <button className="bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">BECOME A PARTNER</button>
          </div>
          <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 shadow-glow">
            <Leaf size={64} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  )
}
