"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Sprout, Flame, Leaf, Search, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"

export function MarketplaceDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fertilizer' | 'energy' | 'credits'>('all')
  const [showCheckout, setShowCheckout] = useState(false)
  const [cartItem, setCartItem] = useState<any>(null)

  const products = [
    { id: 1, name: "Premium Bio-Compost", category: "fertilizer", price: "₹450 / 50kg", icon: Sprout, color: "emerald", desc: "High-yield organic compost generated from rural digester network." },
    { id: 2, name: "Liquid Bio-Slurry", category: "fertilizer", price: "₹200 / 10L", icon: Sprout, color: "emerald", desc: "Nutrient-rich liquid fertilizer for spray application." },
    { id: 3, name: "Bio-CNG Subscription", category: "energy", price: "₹850 / month", icon: Flame, color: "cyan", desc: "Unlimited clean cooking gas generated locally." },
    { id: 4, name: "Industrial Bio-CNG", category: "energy", price: "₹45 / kg", icon: Flame, color: "cyan", desc: "Bulk Bio-CNG for local rural industries and tractors." },
    { id: 5, name: "Urja Carbon Credits", category: "credits", price: "Market Rate", icon: Leaf, color: "primary", desc: "Verified Carbon Credits (VCCs) for corporate ESG offset." },
  ]

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory)

  const handleBuy = (product: any) => {
    setCartItem(product)
    setShowCheckout(true)
  }

  const handleMockPayment = () => {
    // Simulate payment delay
    setTimeout(() => {
      setShowCheckout(false)
      alert("Payment Successful! Mock Transaction Complete.")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
            <ShoppingBag className="text-primary" size={36} /> 
            Bio-Economy Marketplace
          </h1>
          <p className="text-muted-foreground max-w-2xl">Purchase sustainable bio-products directly from the SMART-BioGRID network. Support rural prosperity.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/5 relative">
          <Search className="absolute left-4 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none pl-10 pr-4 py-2 w-48 focus:w-64 transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4 px-2">Categories</h3>
          
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === 'all' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 text-white/70'}`}
          >
            All Products
          </button>
          
          <button 
            onClick={() => setSelectedCategory('fertilizer')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === 'fertilizer' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'hover:bg-white/5 text-white/70'}`}
          >
            <span className="flex items-center gap-2"><Sprout size={18}/> Organic Fertilizer</span>
          </button>

          <button 
            onClick={() => setSelectedCategory('energy')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === 'energy' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'hover:bg-white/5 text-white/70'}`}
          >
            <span className="flex items-center gap-2"><Flame size={18}/> Bio-Energy</span>
          </button>

          <button 
            onClick={() => setSelectedCategory('credits')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === 'credits' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 text-white/70'}`}
          >
            <span className="flex items-center gap-2"><Leaf size={18}/> Carbon Credits</span>
          </button>

          {/* Trust Badge */}
          <div className="mt-8 p-4 bg-black/40 rounded-xl border border-white/5 flex items-start gap-3">
            <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs font-bold text-white mb-1">100% Quality Verified</p>
              <p className="text-[10px] text-muted-foreground">All products are tested via IoT sensors at our Digester plants.</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={product.id} 
                className="glass-panel p-6 border border-white/10 hover:border-primary/50 transition-colors flex flex-col h-full group"
              >
                <div className={`w-12 h-12 rounded-full mb-6 flex items-center justify-center bg-${product.color}-500/20 text-${product.color}-400 group-hover:scale-110 transition-transform`}>
                  <product.icon size={24} />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                  <p className="font-black text-lg text-white">{product.price}</p>
                  <button 
                    onClick={() => handleBuy(product)}
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary transition-colors flex items-center gap-2"
                  >
                    Purchase <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mock Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-black mb-6">Secure Checkout</h2>
              
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Item Summary</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold">{cartItem?.name}</p>
                  <p className="text-primary font-bold">{cartItem?.price}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                  <span className="font-medium text-sm">UPI (GPay, PhonePe)</span>
                  <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                  <span className="font-medium text-sm">Credit/Debit Card (Razorpay)</span>
                  <div className="w-4 h-4 rounded-full border-2 border-neutral-700" />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-3 rounded-lg border border-white/10 font-bold hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleMockPayment}
                  className="flex-[2] py-3 rounded-lg bg-primary text-black font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  Pay Now <CheckCircle2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
