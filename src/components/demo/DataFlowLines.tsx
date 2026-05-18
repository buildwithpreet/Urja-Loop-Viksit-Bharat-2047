"use client"

import { motion } from "framer-motion"

interface DataFlowLinesProps {
  phase: string
}

export function DataFlowLines({ phase }: DataFlowLinesProps) {
  // We use a responsive SVG that covers the entire grid area.
  // The paths are approximations connecting the centers of the cards in a 2x2 grid.
  
  const showBinToAI = phase === "AI_ANALYZING"
  const showAIToCollector = phase === "ALERTING_COLLECTOR"
  const showCollectorToAdmin = phase === "REPORTING"

  return (
    <div className="absolute inset-0 pointer-events-none z-50 hidden lg:block">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path 1: Top Left (Bin) to Top Right (AI) */}
        {showBinToAI && (
          <motion.path
            d="M 25 25 L 75 25"
            fill="none"
            stroke="url(#glowPulse)"
            strokeWidth="4"
            filter="url(#neonGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
        )}

        {/* Path 2: Top Right (AI) to Bottom Left (Collector) */}
        {showAIToCollector && (
          <motion.path
            d="M 75 25 C 50 25, 50 75, 25 75"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            filter="url(#neonGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        )}

        {/* Path 3: Bottom Left (Collector) to Bottom Right (Admin) */}
        {showCollectorToAdmin && (
          <motion.path
            d="M 25 75 L 75 75"
            fill="none"
            stroke="#a855f7"
            strokeWidth="4"
            filter="url(#neonGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
        )}
      </svg>
    </div>
  )
}
