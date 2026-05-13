"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingCart, Search, Filter, ShieldCheck, ChevronRight,
  Leaf, Package, Recycle, TrendingUp, Award, Zap,
  ArrowRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import Image from "next/image"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralShop } from "@/components/rural/RuralShop"
import { toast } from "sonner"
import { supabase, getSessionUser } from "@/lib/supabase"

const demandColor = {
  "Very High": "bg-red-500/10 text-red-600 dark:text-red-400",
  "High": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Medium": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}

const processedProducts = [
  { id: 1, name: "Premium Organic Compost", type: "Fertilizer", price: "250 Credits", weight: "25 kg bag", desc: "High-yield organic compost made from certified city bio-waste.", seller: "UrjaLoop Processing", quality: "Grade A+", verified: true, demand: "High", image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Recycled Plastic Pellets", type: "Raw Material", price: "400 Credits", weight: "50 kg sack", desc: "Washed and processed PET plastic pellets ready for manufacturing.", seller: "City Recycling Co.", quality: "Industrial Grade", verified: true, demand: "Very High", image: "https://images.unsplash.com/photo-1605600659873-d808a1d8508a?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Bio-Gas Energy Token", type: "Energy", price: "100 Credits", weight: "1 Token (10 kWh)", desc: "Redeemable energy token generated from municipal solid waste.", seller: "Waste-to-Energy Plant A", quality: "Renewable", verified: true, demand: "High", image: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?auto=format&fit=crop&q=80&w=400" },
]

const rawMaterials = [
  { id: 4, name: "Sorted PET Bottles", type: "Plastic", price: "150 Credits", weight: "100 kg bale", seller: "Sector 14 Collection", quality: "Unwashed", verified: false, demand: "Medium", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Mixed E-Waste", type: "Electronic", price: "800 Credits", weight: "50 kg lot", seller: "Tech Park Bin Hub", quality: "Mixed", verified: true, demand: "Very High", image: "https://images.unsplash.com/photo-1550005973-58721c56b02a?auto=format&fit=crop&q=80&w=400" },
]

export default function Shop() {
  const { t } = useLanguage()
  const { mode } = useMode()
  const [activeTab, setActiveTab] = useState<"raw" | "processed">("processed")
  const [search, setSearch] = useState("")
  const [profile, setProfile] = useState<any>(null)
  const [rawMaterials, setRawMaterials] = useState<any[]>([])
  const [processedProducts, setProcessedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (data) setProfile(data)
      }

      // Fetch Raw Materials
      const { data: rawItems } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('type', 'urban')
      
      // Fetch Processed Outputs
      const { data: processedItems } = await supabase
        .from('processed_outputs')
        .select('*')

      if (rawItems) setRawMaterials(rawItems)
      if (processedItems) setProcessedProducts(processedItems.map(p => ({
        ...p,
        image: p.image_url, // normalize key
        price: p.price_per_unit,
        demand: "High", // Default for demo
        verified: true,
        type: p.category,
        weight: p.unit
      })))
      setLoading(false)
    }
    fetchData()
  }, [])

  if (mode === "rural") {
    return <RuralShop />
  }


  const products = activeTab === "raw" ? rawMaterials : processedProducts

  const handlePurchase = async (item: any) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      toast.error("Please login to make a purchase")
      return
    }

    const price = item.price || item.price_per_unit

    if (!profile || profile.eco_credits < price) {
      toast.error("Insufficient Eco Credits!")
      return
    }

    try {
      // 1. Deduct Credits
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ eco_credits: profile.eco_credits - price })
        .eq('id', session.user.id)

      if (profileError) throw profileError

      // 2. Decrement Stock
      const table = activeTab === "raw" ? 'marketplace_items' : 'processed_outputs'
      await supabase
        .from(table)
        .update({ stock: (item.stock || 10) - 1 })
        .eq('id', item.id)

      // 3. Log Activity
      await supabase.from('activity_log').insert({
        user_id: session.user.id,
        action: "Marketplace Purchase",
        description: `Bought ${item.name} for ${price} credits`,
        points_earned: -price
      })

      setProfile({...profile, eco_credits: profile.eco_credits - price})
      toast.success(`Successfully purchased ${item.name}!`)
    } catch (err) {
      toast.error("Transaction failed")
    }
  }

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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("shop_title")}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{t("shop_subtitle")}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Eco Credits</p>
            <p className="text-xl font-bold text-foreground">{profile?.eco_credits?.toLocaleString() || "0"}</p>
            <p className="text-[10px] text-primary font-medium">≈ ₹{profile?.eco_credits?.toLocaleString() || "0"}</p>
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
          placeholder={t("shop_search")}
          aria-label="Search marketplace"
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-sm text-foreground focus-ring focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <button onClick={() => setActiveTab("processed")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "processed" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          🌱 {t("shop_tab_processed")}
        </button>
        <button onClick={() => setActiveTab("raw")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "raw" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          ♻️ {t("shop_tab_raw")}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="aspect-[16/7] overflow-hidden relative">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
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

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-bold text-foreground leading-tight">{product.name}</p>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">{product.price}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{product.type} · {product.weight}</p>
              {'desc' in product && <p className="text-xs text-muted-foreground mb-3">{(product as any).desc}</p>}
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Award size={12} className="text-amber-500" />
                  <span className="text-[11px] text-muted-foreground">{product.quality}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{product.seller}</span>
              </div>

              <button 
                onClick={() => handlePurchase(product)}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-2xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={13} />
                {activeTab === "raw" ? "Express Interest" : "Redeem with Credits"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
