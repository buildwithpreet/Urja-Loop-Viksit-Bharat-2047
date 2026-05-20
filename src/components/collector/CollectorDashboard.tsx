"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Truck, QrCode, Navigation, Clock, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react"

export function CollectorDashboard() {
  const [activeTab, setActiveTab] = useState<'route' | 'scan'>('route')

  const pickups = [
    { id: 'PK-101', farmer: 'Ramesh Singh', distance: '2.4 km', waste: '4,500 kg', status: 'pending' },
    { id: 'PK-102', farmer: 'Village Coop', distance: '5.1 km', waste: '12,000 kg', status: 'pending' },
    { id: 'PK-103', farmer: 'Farm Sector B', distance: '8.7 km', waste: '3,200 kg', status: 'completed' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-2">
            <Truck className="text-primary" /> 
            Fleet Operations
          </h1>
          <p className="text-muted-foreground">AI-Optimized Routing & Verification</p>
        </div>
        
        <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Active Vehicle</p>
            <p className="font-bold text-white">EV-Truck 04</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
            <span className="text-primary font-bold">85%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* AI Route Map */}
          <div className="glass-panel p-1 rounded-2xl overflow-hidden border border-white/10 relative">
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3">
              <p className="text-xs text-primary font-bold mb-1 flex items-center gap-2"><Navigation size={14}/> AI Route Active</p>
              <p className="text-sm text-white">14 km total · 45 mins saved</p>
            </div>
            
            {/* Fake Map Background */}
            <div className="h-[400px] w-full bg-[#1e1e1e] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=30.900965,75.857277&zoom=13&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000|lightness:13&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53|lightness:14|weight:1.4&style=feature:landscape|element:all|color:0x08304b&style=feature:poi|element:geometry|color:0x0c4152|lightness:5&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f|lightness:25&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51|lightness:16&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:all|color:0x146474&style=feature:water|element:all|color:0x021019&key=YOUR_API_KEY')] bg-cover bg-center" />
              
              {/* Route Path (SVG Overlay) */}
              <svg className="absolute inset-0 w-full h-full z-10" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }}>
                <path d="M200,300 C250,250 350,350 400,200 S550,150 600,100" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="8 8" className="animate-[dash_20s_linear_infinite]" />
              </svg>

              {/* Pins */}
              <div className="absolute top-[300px] left-[200px] z-20 flex flex-col items-center">
                <Truck className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]" size={32} />
              </div>
              <div className="absolute top-[200px] left-[400px] z-20">
                <MapPin className="text-primary drop-shadow-[0_0_10px_#10b981]" size={28} />
              </div>
              <div className="absolute top-[100px] left-[600px] z-20">
                <MapPin className="text-yellow-400 drop-shadow-[0_0_10px_#facc15]" size={28} />
              </div>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('route')}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'route' ? 'bg-primary text-black' : 'bg-black/50 border border-white/10 text-white/70'}`}
            >
              <Navigation size={18} /> Route Manifest
            </button>
            <button 
              onClick={() => setActiveTab('scan')}
              className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'scan' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-black/50 border border-white/10 text-white/70'}`}
            >
              <QrCode size={18} /> Scan & Verify
            </button>
          </div>

          {/* Tab Content */}
          <div className="glass-panel p-6 border border-white/10 min-h-[300px]">
            {activeTab === 'route' ? (
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">Upcoming Pickups</h3>
                {pickups.map((p, i) => (
                  <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${p.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/5 opacity-50' : 'border-white/10 bg-black/40 hover:border-primary/50 transition-colors'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${p.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/20 text-primary'}`}>
                        {p.status === 'completed' ? <CheckCircle2 size={20} /> : <MapPin size={20} />}
                      </div>
                      <div>
                        <p className="font-bold">{p.farmer}</p>
                        <p className="text-xs text-muted-foreground">ID: {p.id} · {p.distance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{p.waste}</p>
                      <p className={`text-[10px] uppercase tracking-wider ${p.status === 'completed' ? 'text-emerald-400' : 'text-primary'}`}>{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
                <div className="w-48 h-48 border-2 border-dashed border-purple-500/50 rounded-2xl flex flex-col items-center justify-center bg-purple-500/5 relative overflow-hidden">
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-purple-500 shadow-[0_0_10px_#a855f7]"
                  />
                  <QrCode size={48} className="text-purple-400/50 mb-2" />
                  <p className="text-xs text-purple-400/70 uppercase tracking-widest">Awaiting Scan</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Verify Farm Load</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">Scan the farmer's unique QR code to weigh the waste and transfer Bio-Credits directly to their wallet.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border border-white/10">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Clock size={18}/> Shift Status</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="text-white font-bold">19.7 / 25 Tons</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} className="h-full bg-gradient-to-r from-primary to-emerald-400" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Route Progress</span>
                  <span className="text-white font-bold">4 / 12 Stops</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '33%' }} className="h-full bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-400"><ShieldCheck size={18}/> Verification Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm text-muted-foreground">Fraud Attempts Blocked</span>
                <span className="font-black text-white">0</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm text-muted-foreground">Weight Accuracy Check</span>
                <span className="font-black text-emerald-400">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Credits Disbursed</span>
                <span className="font-black text-primary">84,500</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 flex items-start gap-3">
            <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-yellow-400 mb-1">Weather Alert</p>
              <p className="text-xs text-yellow-400/80">Heavy rain expected on Route B. AI has redirected you to Route C to avoid delays.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
