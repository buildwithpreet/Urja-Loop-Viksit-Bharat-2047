"use client"

import { useState } from "react"
import { 
  ShoppingCart, Search, Filter, ShieldCheck, ChevronRight,
  Leaf, Package, Recycle, TrendingUp, Award, Zap, Star,
  ArrowRight, CheckCircle2, CreditCard
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState as useStateFn } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralShop } from "@/components/rural/RuralShop"
import { toast } from "sonner"

const rawMaterials = [
  { id: 1, name: "PET Plastic Bottles (Baled)", type: "Plastic Waste", weight: "5.2 tons", price: "₹1,200/ton", seller: "Eco-Collect Delhi", quality: "Grade A", verified: true, demand: "High", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Shredded Paper & Cardboard", type: "Paper Waste", weight: "12 tons", price: "₹800/ton", seller: "GreenStream Paper", quality: "LWC Standard", verified: true, demand: "Medium", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Agricultural Husk Residue", type: "Agri Waste", weight: "40 tons", price: "₹350/ton", seller: "Agro-Link Hub", quality: "Standard", verified: false, demand: "High", image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400" },
]

const processedProducts = [
  { id: 4, name: "Premium Organic Compost", type: "Processed Output", weight: "25kg bags", price: "₹450/bag", seller: "Urja Bio-Farms", quality: "98% Pure", verified: true, demand: "Very High", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400", desc: "Ready-to-use certified organic compost" },
  { id: 5, name: "Recycled PET Pellets", type: "Recycled Plastic", weight: "Per ton", price: "₹2,400/ton", seller: "Eco-Tech Recycling", quality: "ISO Certified", verified: true, demand: "High", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400", desc: "Food-grade recycled plastic pellets" },
  { id: 6, name: "Biofuel Briquettes", type: "Biomass Energy", weight: "Per 10kg", price: "₹280/10kg", seller: "BioFuel Systems", quality: "Grade B", verified: true, demand: "Medium", image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400", desc: "Clean-burning agricultural biomass briquettes" },
  { id: 7, name: "Recycled Paper Sheets", type: "Recycled Paper", weight: "Per ream", price: "₹120/ream", seller: "GreenStream Paper", quality: "80gsm", verified: true, demand: "Medium", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400", desc: "100% recycled office paper" },
]

const demandColor = {
  "Very High": "bg-red-500/10 text-red-600 dark:text-red-400",
  "High": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Medium": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

export default function Shop() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [activeTab, setActiveTab] = useState<"raw" | "processed">("processed")

  if (mode === "rural") {
    return <RuralShop />
  }
  const [search, setSearch] = useState("")

  const products = activeTab === "raw" ? rawMaterials : processedProducts

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700 min-h-screen">
      
      {/* Header */}
      <div className="pt-2 space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Recycle size={18} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Circular Economy</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Eco Marketplace</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Waste → Processing → Circular Wealth</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Eco Credits</p>
            <p className="text-xl font-bold text-foreground">1,240</p>
            <p className="text-[10px] text-primary font-medium">≈ ₹1,240</p>
          </div>
        </div>
      </div>

      {/* Value Chain Banner */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-emerald-500/5 border border-primary/20 rounded-3xl">
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={14} className="text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">How It Works</span>
        </div>
        <div className="flex items-center gap-2">
          {["Your Waste", "Smart Collection", "Processing Center", "Market Value"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className="text-center flex-1">
                <div className="w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                  {i === 0 ? <Package size={14} className="text-muted-foreground" /> :
                   i === 1 ? <Recycle size={14} className="text-blue-500" /> :
                   i === 2 ? <Zap size={14} className="text-amber-500" /> :
                   <TrendingUp size={14} className="text-emerald-500" />}
                </div>
                <p className="text-[9px] font-semibold text-muted-foreground">{step}</p>
              </div>
              {i < 3 && <ArrowRight size={12} className="text-muted-foreground flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search materials, products..."
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-sm text-foreground outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <button onClick={() => setActiveTab("processed")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "processed" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          🌱 Processed Products
        </button>
        <button onClick={() => setActiveTab("raw")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "raw" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          ♻️ Raw Materials
        </button>
      </div>

      {/* Tab description */}
      <div className="px-1">
        {activeTab === "processed" ? (
          <p className="text-xs text-muted-foreground">Verified, AI-inspected output products ready for purchase. Supports circular economy.</p>
        ) : (
          <p className="text-xs text-muted-foreground">Connect with verified waste collectors and processors in your area.</p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
            {/* Image */}
            <div className="aspect-[16/7] overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                {product.verified && (
                  <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-full">
                    <ShieldCheck size={10} />
                    <span className="text-[10px] font-bold">Verified</span>
                  </div>
                )}
                <Badge className={cn("text-[10px] border-none rounded-full px-2 py-0.5 font-semibold",
                  demandColor[product.demand as keyof typeof demandColor]
                )}>
                  {product.demand} Demand
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-bold text-foreground leading-tight">{product.name}</p>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">{product.price}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{product.type} · {product.weight}</p>
              {'desc' in product && <p className="text-xs text-muted-foreground mb-3">{(product as typeof processedProducts[0]).desc}</p>}
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Award size={12} className="text-amber-500" />
                  <span className="text-[11px] text-muted-foreground">{product.quality}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{product.seller}</span>
              </div>

              <button 
                onClick={() => toast.success(activeTab === "raw" ? `Interest expressed for ${product.name}!` : `Successfully redeemed ${product.name}!`)}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-2xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={13} />
                {activeTab === "raw" ? "Express Interest" : "Redeem with Credits"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Banner */}
      <div className="p-6 bg-gradient-to-br from-primary/10 to-emerald-500/5 border border-primary/20 rounded-3xl">
        <Badge className="bg-primary/10 text-primary border-none mb-3 text-xs font-semibold">Enterprise Integration</Badge>
        <h3 className="text-lg font-bold text-foreground mb-2">Scale Your Circular Economy</h3>
        <p className="text-sm text-muted-foreground mb-4">Connect with processing centers, bulk buyers, and ESG-reporting tools for your organization.</p>
        <button 
          onClick={() => toast.success("Enterprise registration portal will open soon!")}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2"
        >
          Register as Enterprise <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
