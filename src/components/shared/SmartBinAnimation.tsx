"use client"

import { useEffect, useState } from "react"

export function SmartBinAnimation() {
  const [lidOpen, setLidOpen] = useState(false)
  const [wasteDropping, setWasteDropping] = useState(false)
  const [creditPop, setCreditPop] = useState(false)
  const [leafPulse, setLeafPulse] = useState(false)

  useEffect(() => {
    const cycle = () => {
      // 1. Lid opens
      setTimeout(() => setLidOpen(true), 200)
      // 2. Waste drops
      setTimeout(() => setWasteDropping(true), 800)
      // 3. Lid closes
      setTimeout(() => setLidOpen(false), 1800)
      // 4. Credits pop
      setTimeout(() => { setWasteDropping(false); setCreditPop(true); setLeafPulse(true) }, 2200)
      // 5. Reset
      setTimeout(() => { setCreditPop(false); setLeafPulse(false) }, 3600)
    }
    cycle()
    const interval = setInterval(cycle, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-end select-none" style={{ width: 220, height: 320 }}>

      {/* === AMBIENT GLOW === */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full blur-2xl pointer-events-none"
        style={{ background: "rgba(16,185,129,0.35)" }} />

      {/* === FLOATING LEAVES (eco indicators) === */}
      {[
        { left: 18, delay: "0s", dur: "3.2s" },
        { left: 160, delay: "0.8s", dur: "2.8s" },
        { left: 90,  delay: "1.5s", dur: "3.6s" },
      ].map((l, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            left: l.left,
            bottom: leafPulse ? 200 : 80,
            opacity: leafPulse ? 0 : 0.7,
            transition: `all ${l.dur} ease-out`,
            transitionDelay: l.delay,
            fontSize: 18,
          }}>
          🍃
        </div>
      ))}

      {/* === WASTE ITEM (falling) === */}
      <div className="absolute pointer-events-none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: wasteDropping ? 110 : -30,
          opacity: wasteDropping ? 1 : 0,
          transition: "all 0.55s cubic-bezier(0.4,0,0.6,1)",
          fontSize: 26,
          zIndex: 10,
        }}>
        🗑️
      </div>

      {/* === ECO CREDIT POP === */}
      <div className="absolute pointer-events-none flex flex-col items-center gap-1"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: creditPop ? 200 : 140,
          opacity: creditPop ? 1 : 0,
          transition: "all 0.6s ease-out",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}>
        <div className="px-3 py-1 rounded-full text-xs font-black"
          style={{
            background: "linear-gradient(135deg,#10b981,#059669)",
            color: "white",
            boxShadow: "0 0 16px rgba(16,185,129,0.6)",
          }}>
          + 24 Eco Credits ⚡
        </div>
        <div className="text-[10px] font-bold" style={{ color: "#6ee7b7" }}>AI Verified ✓</div>
      </div>

      {/* === SMART BIN SVG === */}
      <svg width="200" height="230" viewBox="0 0 200 230" fill="none">
        {/* Body shadow */}
        <ellipse cx="100" cy="225" rx="60" ry="8" fill="rgba(16,185,129,0.15)" />

        {/* === BIN BODY === */}
        <rect x="28" y="95" width="144" height="118" rx="14" fill="url(#bodyGrad)" />

        {/* Body inner shine */}
        <rect x="32" y="99" width="136" height="110" rx="12" fill="url(#innerGrad)" opacity="0.5" />

        {/* Side panel lines */}
        <line x1="55" y1="105" x2="55" y2="207" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
        <line x1="145" y1="105" x2="145" y2="207" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />

        {/* === SCREEN / DISPLAY === */}
        <rect x="62" y="118" width="76" height="52" rx="8" fill="rgba(0,0,0,0.55)" />
        <rect x="64" y="120" width="72" height="48" rx="7" fill="rgba(2,44,34,0.9)" />

        {/* Screen glow line */}
        <rect x="64" y="120" width="72" height="2" rx="1" fill="rgba(52,211,153,0.6)" />

        {/* AI text on screen */}
        <text x="100" y="138" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="bold" fontFamily="monospace">SMART BIN v2</text>
        <text x="100" y="150" textAnchor="middle" fill="rgba(110,231,183,0.7)" fontSize="5.5" fontFamily="monospace">AI ACTIVE · IoT ONLINE</text>

        {/* Fill bar on screen */}
        <rect x="70" y="156" width="60" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="70" y="156" width="18" height="4" rx="2" fill="#10b981" />
        <text x="136" y="160" fill="rgba(110,231,183,0.6)" fontSize="4.5" fontFamily="monospace">18%</text>

        {/* Recycle symbol */}
        <text x="100" y="197" textAnchor="middle" fill="rgba(52,211,153,0.4)" fontSize="14">♻</text>

        {/* Status dot */}
        <circle cx="158" cy="110" r="4" fill="#10b981">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="158" cy="110" r="7" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="5;9;5" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* QR on side */}
        <rect x="30" y="160" width="18" height="18" rx="3" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
        <text x="39" y="173" textAnchor="middle" fill="rgba(52,211,153,0.5)" fontSize="9">⊞</text>

        {/* === LID === */}
        <g style={{
          transformOrigin: "28px 90px",
          transform: lidOpen ? "rotate(-42deg)" : "rotate(0deg)",
          transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <rect x="22" y="76" width="156" height="22" rx="10" fill="url(#lidGrad)" />
          {/* Lid shine */}
          <rect x="22" y="76" width="156" height="8" rx="10" fill="rgba(255,255,255,0.07)" />
          {/* Lid slot */}
          <rect x="78" y="83" width="44" height="8" rx="4" fill="rgba(0,0,0,0.5)" />
          {/* Handle */}
          <rect x="84" y="68" width="32" height="12" rx="6" fill="url(#lidGrad)" />
          <rect x="90" y="71" width="20" height="6" rx="3" fill="rgba(0,0,0,0.3)" />
        </g>

        {/* === FEET === */}
        <rect x="42" y="208" width="18" height="12" rx="5" fill="rgba(4,120,87,0.9)" />
        <rect x="140" y="208" width="18" height="12" rx="5" fill="rgba(4,120,87,0.9)" />

        {/* === GRADIENT DEFS === */}
        <defs>
          <linearGradient id="bodyGrad" x1="28" y1="95" x2="172" y2="213" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="innerGrad" x1="32" y1="99" x2="168" y2="209" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(52,211,153,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="22" y1="76" x2="178" y2="98" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>

      {/* === LABELS BELOW === */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold" style={{ color: "#6ee7b7" }}>SMART BIN ONLINE</span>
        </div>
        <span className="text-[10px]" style={{ color: "rgba(110,231,183,0.45)" }}>AI · IoT · Circular Economy</span>
      </div>

      {/* === CIRCULAR ECONOMY ORBIT RING === */}
      <div className="absolute"
        style={{ top: 60, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, pointerEvents: "none" }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="94" fill="none"
            stroke="rgba(52,211,153,0.08)" strokeWidth="1.5" strokeDasharray="4 6" />
          {/* Orbiting dots */}
          <circle r="4" fill="#10b981" opacity="0.7">
            <animateMotion dur="6s" repeatCount="indefinite"
              path="M100,6 a94,94 0 1,1 -0.1,0 z" />
          </circle>
          <circle r="3" fill="#6ee7b7" opacity="0.5">
            <animateMotion dur="9s" repeatCount="indefinite" begin="3s"
              path="M100,6 a94,94 0 1,0 -0.1,0 z" />
          </circle>
        </svg>
      </div>

    </div>
  )
}
