"use client"

import { useState } from "react"
import { 
  Leaf,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  Search,
  Filter,
  Package,
  Store,
  CreditCard,
  Zap,
  Target,
  ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"

const products = [
  { id: 1, name: "Premium Organic Compost", price: "450", quantity: "25kg", category: "Bio-Compost", seller: "Urja Bio-Farms", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400", quality: "98% Purity" },
  { id: 2, name: "Baled PET Matrix", price: "1200", unit: "ton", quantity: "5.2 tons", category: "Recycled Polymers", seller: "Eco-Tech Recycling", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400", buyer: "Polymer Corp", quality: "Grade A" },
  { id: 3, name: "Shredded Paper Pulp", price: "800", unit: "ton", quantity: "12 tons", category: "Processed Cellulose", seller: "Green-Stream Paper", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400", quality: "LWC Standard" },
  { id: 4, name: "Agricultural Husk Waste", price: "350", unit: "ton", quantity: "40 tons", category: "Agri-Waste", seller: "Agro-Link Hub", image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400", buyer: "BioFuel Systems", quality: "Standard" },
]

export default function Shop() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("buy")
  
  const categories = [t("shop_category_all"), t("shop_category_vouchers"), t("shop_category_products"), "Bio-Compost", "Recycled Polymers", "Processed Cellulose"]

  return (
    <div className="p-8 pb-32 lg:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header & Strategic Control */}
      <div className="space-y-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center text-primary shadow-2xl">
                  <ShoppingCart size={28} strokeWidth={2.5} />
               </div>
               <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 font-black text-[10px] tracking-[0.2em] uppercase rounded-xl">
                  Verified Ecosystem
               </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-tight">
              {t("shop_title").split(' ')[0]}<span className="text-primary">{t("shop_title").split(' ')[1] || ""}</span>
            </h1>
            <p className="text-muted-foreground font-black flex items-center gap-3 uppercase text-[11px] tracking-[0.15em] opacity-60">
              <ShieldCheck size={16} className="text-primary" strokeWidth={2.5} /> {t("shop_subtitle")}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full xl:w-auto">
            <div className="relative flex-1 md:w-96 group">
               <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform duration-500">
                  <Search size={22} strokeWidth={2.5} />
               </div>
               <input 
                  type="text" 
                  placeholder="Scan Resource Manifest..." 
                  className="w-full pl-14 pr-6 h-16 ultra-glass rounded-[1.5rem] border border-foreground/10 text-[13px] font-black uppercase tracking-widest focus:border-primary/50 transition-all outline-none shadow-2xl bg-foreground/5"
               />
            </div>
            <button className="w-16 h-16 ultra-glass border border-foreground/10 rounded-[1.5rem] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all shadow-2xl active:scale-90 group">
               <Filter size={24} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-1 ultra-glass border border-foreground/10 rounded-[2.5rem] bg-foreground/5 shadow-2xl">
          <Tabs defaultValue="buy" onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="bg-transparent p-2 h-20 gap-2">
              <TabsTrigger value="buy" className="rounded-3xl px-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30 font-black text-[11px] tracking-[0.2em] transition-all h-full uppercase">Acquisition</TabsTrigger>
              <TabsTrigger value="sell" className="rounded-3xl px-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/30 font-black text-[11px] tracking-[0.2em] transition-all h-full uppercase">Liquidation</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="px-10 py-4 flex items-center gap-8 lg:border-l border-foreground/10 w-full lg:w-auto justify-center lg:justify-start">
             <div className="space-y-1 text-center lg:text-right">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40">{t("profile_credits")}</p>
                <p className="text-3xl font-black tabular-nums tracking-tighter text-foreground">₹1,240.50</p>
             </div>
             <div className="w-16 h-16 ultra-glass border border-foreground/10 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                <CreditCard size={28} strokeWidth={2.5} />
             </div>
          </div>
        </div>
      </div>

      {/* Resource Classifications */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-8">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className="ultra-glass border border-foreground/10 text-muted-foreground px-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-primary hover:text-primary-foreground hover:border-primary/20 transition-all shadow-xl uppercase"
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Tactical Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="ultra-glass rounded-[2.5rem] border border-foreground/10 overflow-hidden group flex flex-col hover:scale-[1.02] transition-all duration-700 shadow-2xl relative">
            <div className="absolute inset-0 bg-mesh opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem] shadow-xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-5 left-5">
                <Badge className="ultra-glass border border-foreground/20 text-white px-4 py-1.5 font-black text-[9px] tracking-[0.15em] shadow-2xl uppercase rounded-lg">
                  {product.category}
                </Badge>
              </div>
              <div className="absolute bottom-5 left-6 right-6 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-primary" strokeWidth={2.5} /> {product.quality}
                 </div>
              </div>
            </div>

            <div className="p-8 pt-4 flex flex-col flex-1 space-y-8 relative z-10">
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tighter uppercase leading-tight group-hover:text-primary transition-colors h-12 flex items-center">
                   {product.name}
                </h3>
                <div className="flex items-center gap-3 text-muted-foreground opacity-60">
                   <Store size={14} strokeWidth={2.5} className="text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{product.seller}</span>
                </div>
              </div>

              <div className="flex items-end justify-between border-y border-foreground/5 py-6">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">Base Valuation</p>
                   <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black tabular-nums tracking-tighter">₹{product.price}</span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">/{product.unit || 'kg'}</span>
                   </div>
                </div>
                <div className="text-right space-y-1">
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">Volume</p>
                   <p className="text-sm font-black text-primary uppercase tracking-tight flex items-center gap-2 justify-end">
                      <Package size={14} strokeWidth={2.5} /> {product.quantity}
                   </p>
                </div>
              </div>
              
              {product.buyer ? (
                <div className="ultra-glass border border-amber-500/20 p-5 rounded-[1.5rem] flex items-center gap-4 bg-amber-500/5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/30"></div>
                  <div className="space-y-0.5">
                     <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest opacity-60">Reservation Confirmed</p>
                     <p className="text-[11px] font-black text-amber-600 uppercase tracking-tight">{product.buyer}</p>
                  </div>
                </div>
              ) : (
                <button 
                  className="w-full btn-premium py-5 text-[11px] uppercase tracking-[0.2em] shadow-primary/20 flex items-center justify-center gap-4 group/btn"
                >
                  <ShoppingCart size={20} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                  {t("shop_buy")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Enterprise Banner */}
      <div className="ultra-glass rounded-[4rem] border border-foreground/10 p-12 lg:p-16 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] transition-transform duration-[2000ms] group-hover:scale-110"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="space-y-8 text-center lg:text-left max-w-3xl">
            <div className="flex items-center justify-center lg:justify-start gap-4">
               <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-primary border border-foreground/10">
                  <Zap size={20} strokeWidth={2.5} />
               </div>
               <Badge className="bg-primary/10 text-primary border-none px-5 py-2 font-black text-[10px] tracking-[0.3em] uppercase rounded-xl">Enterprise Portal</Badge>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">Scale Your Strategic Impact</h2>
            <p className="text-lg md:text-xl font-bold text-muted-foreground/80 leading-relaxed uppercase tracking-tight">
              Unlock the Enterprise Matrix: Integrated ESG reporting, automated smart-contracts, and hyper-local green logistics at scale.
            </p>
            <div className="flex flex-wrap gap-6 pt-6 justify-center lg:justify-start">
               <button className="btn-premium px-12 py-6 text-[11px] uppercase tracking-[0.2em] shadow-primary/30 flex items-center gap-4">
                  Register Enterprise <ChevronRight size={18} strokeWidth={3} />
               </button>
               <button className="ultra-glass border border-foreground/10 px-12 py-6 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/5 active:scale-95 transition-all rounded-[1.5rem] font-black">Technical Documentation</button>
            </div>
          </div>
          <div className="relative">
             <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-[3.5rem] ultra-glass border border-foreground/10 flex items-center justify-center text-primary shadow-2xl relative z-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <TrendingUp size={100} strokeWidth={2} className="opacity-80" />
             </div>
             <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-[2rem] blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
