"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Leaf, TrendingUp, Search, Filter, ShieldCheck, 
  MapPin, ArrowRight, Wheat, Flame, Sprout, Tractor, Factory
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { toast } from "sonner"

const rawAgriWaste = [
  { id: 1, name: "Rice Straw (Prali)", type: "Raw Material", weight: "5000 kg", price: "₹2.4/kg", demand: "High", image: "https://images.unsplash.com/photo-1595981267035-7b04d84b4f1c?q=80&w=2070&auto=format&fit=crop", distance: "2.1 km", seller: "Kisan Farm Hub" },
  { id: 2, name: "Sugarcane Bagasse", type: "Biomass", weight: "2500 kg", price: "₹3.1/kg", demand: "Medium", image: "https://images.unsplash.com/photo-1530836369250-ef71a3fb114e?q=80&w=2070&auto=format&fit=crop", distance: "4.5 km", seller: "Local Mill" },
  { id: 3, name: "Wheat Husk", type: "Animal Feed / Fuel", weight: "1200 kg", price: "₹1.8/kg", demand: "Low", image: "https://images.unsplash.com/photo-1588628566587-bd78ef154c15?q=80&w=2070&auto=format&fit=crop", distance: "1.2 km", seller: "Farm #82" },
]

const processedProducts = [
  { id: 4, name: "Biofuel Briquettes", type: "Energy", weight: "50 kg bag", price: "₹450/bag", verified: true, image: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=2071&auto=format&fit=crop", processor: "Agri-Energy Ltd", quality: "Grade A" },
  { id: 5, name: "Organic Compost", type: "Fertilizer", weight: "25 kg bag", price: "₹180/bag", verified: true, image: "https://images.unsplash.com/photo-1592424001835-15a3eb17cd6b?q=80&w=2070&auto=format&fit=crop", processor: "Village Compost Hub", quality: "Premium" },
]

export function RuralShop() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"raw" | "processed">("raw")
  const [rawItems, setRawItems] = useState(rawAgriWaste)
  const [processedItems, setProcessedItems] = useState(processedProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
      
      if (data && !error && data.length > 0) {
        const raw = data.filter(item => item.type === 'Raw Material' || item.type === 'Biomass')
        const processed = data.filter(item => item.type === 'Energy' || item.type === 'Fertilizer')
        if (raw.length > 0) setRawItems(raw as any)
        if (processed.length > 0) setProcessedItems(processed as any)
      }
      setLoading(false)
    }
    fetchItems()
  }, [])

  const handlePurchase = async (item: any) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      toast.error("Please login to make a purchase")
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('eco_credits')
      .eq('id', session.user.id)
      .single()

    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/[^0-9]/g, '')) 
      : item.price

    if (!profile || profile.eco_credits < price) {
      toast.error("Insufficient Eco Credits!")
      return
    }

    // 1. Deduct Credits
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ eco_credits: profile.eco_credits - price })
      .eq('id', session.user.id)

    if (profileError) {
      toast.error("Transaction failed")
      return
    }

    // 2. Decrement Stock
    await supabase
      .from('marketplace_items')
      .update({ stock: (item.stock || 10) - 1 })
      .eq('id', item.id)

    // 3. Log Activity
    await supabase.from('activity_log').insert({
      user_id: session.user.id,
      action: "Marketplace Purchase",
      description: `Bought ${item.name} for ${price} credits`,
      points_earned: -price
    })

    toast.success(`Successfully purchased ${item.name}!`)
  }

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("rural_shop_title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{t("rural_shop_subtitle")}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">{t("rural_shop_verified")}</span>
        </div>
      </div>

      <div className="w-full rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-amber-600 to-emerald-600 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4" />
        <div className="relative z-10">
          <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none mb-3">
            <TrendingUp size={12} className="mr-1" /> Circular Wealth Flow
          </Badge>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-center md:text-left flex-1">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto md:mx-0 mb-2">
                <Wheat size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg">Agri Waste</h3>
              <p className="text-xs text-white/80">Crop residue sold</p>
            </div>
            <ArrowRight className="hidden md:block text-white/50" />
            <div className="text-center flex-1">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Flame size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg">Processing</h3>
              <p className="text-xs text-white/80">Biomass & Compost</p>
            </div>
            <ArrowRight className="hidden md:block text-white/50" />
            <div className="text-center md:text-right flex-1">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto md:ml-auto md:mr-0 mb-2">
                <Sprout size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg">Circular Wealth</h3>
              <p className="text-xs text-white/80">Farmers earn & save</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setActiveTab("raw")}
            className={cn("px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              activeTab === "raw" ? "bg-amber-500 text-white shadow-md shadow-amber-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}>
            {t("rural_shop_raw")}
          </button>
          <button onClick={() => setActiveTab("processed")}
            className={cn("px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              activeTab === "processed" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}>
            {t("rural_shop_processed")}
          </button>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:w-64 bg-card border border-border rounded-2xl px-4 py-2 flex items-center gap-2">
            <Search size={16} className="text-muted-foreground" />
            <input type="text" placeholder={activeTab === "raw" ? "Search straw, husk..." : "Search compost, briquettes..."}
              className="bg-transparent border-none outline-none flex-1 text-sm" />
          </div>
          <button className="w-10 h-10 bg-card border border-border rounded-2xl flex items-center justify-center hover:bg-muted transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "raw" ? (
          rawItems.map((item) => (
            <Card key={item.id} className="card-premium overflow-hidden group border-border/50">
              <div className="h-40 w-full relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3">
                  <Badge className={cn("text-[10px] uppercase font-bold", item.demand === "High" ? "bg-emerald-500 text-white" : item.demand === "Medium" ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground")}>
                    {item.demand} Demand
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.type} · {item.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-500">{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Tractor size={14} className="text-blue-500" />
                    <span>{item.distance}</span>
                    <span className="mx-1">·</span>
                    <span className="truncate max-w-[100px]">{item.seller}</span>
                  </div>
                  <button onClick={() => handlePurchase(item)} className="text-xs font-bold text-primary hover:underline">
                    Buy Now
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          processedItems.map((product) => (
            <Card key={product.id} className="card-premium overflow-hidden group border-border/50">
              <div className="h-40 w-full relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {product.verified && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
                    <ShieldCheck size={14} />
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.type} · {product.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{product.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-3">
                   <Badge variant="outline" className="text-[10px] font-bold text-amber-500 border-amber-500/30">
                     {product.quality}
                   </Badge>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Factory size={14} className="text-emerald-500" />
                    <span className="truncate max-w-[140px]">{product.processor}</span>
                  </div>
                  <button onClick={() => handlePurchase(product)} className="text-xs font-bold text-primary hover:underline">
                    Buy Now
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
