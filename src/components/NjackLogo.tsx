'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NjackLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function NjackLogo({
  className = '',
  size = 36,
  animated = true,
}: NjackLogoProps) {
  return (
    <motion.div
      whileHover={animated ? { scale: 1.05 } : undefined}
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,87,34,0.65)]"
      >
        <defs>
          {/* Highlight Amber Gradient (Left outer ribbon) */}
          <linearGradient id="njackAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA000" />
            <stop offset="50%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FF5722" />
          </linearGradient>

          {/* Central Diagonal Orange Gradient */}
          <linearGradient id="njackOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="50%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#D9381E" />
          </linearGradient>

          {/* Deep Fold Crimson Gradient (Right bracket & inner fold) */}
          <linearGradient id="njackCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="70%" stopColor="#D9381E" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="njackDropGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF5722" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Segment 1: Left Bracket Ribbon (Amber highlight) */}
        <motion.path
          d="M 28 18 L 12 30 L 12 68 L 28 80 L 28 66 L 22 61 L 22 37 L 34 28 Z"
          fill="url(#njackAmberGrad)"
          className="transition-transform duration-300 origin-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />

        {/* Segment 2: Central Slanted Diagonal Bridge (Tangerine Vermilion to Crimson) */}
        <motion.path
          d="M 34 26 L 46 36 L 40 76 L 28 66 Z"
          fill="url(#njackOrangeGrad)"
          className="transition-transform duration-300 origin-center group-hover:scale-[1.02]"
        />

        {/* Segment 3: Right Bracket Ribbon (Crimson shadow to Orange) */}
        <motion.path
          d="M 46 36 L 68 18 L 68 56 L 52 74 L 40 76 L 56 58 L 56 34 Z"
          fill="url(#njackCrimsonGrad)"
          className="transition-transform duration-300 origin-center group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />

        {/* Segment 4: Lower Right Base Return */}
        <motion.path
          d="M 40 76 L 52 74 L 64 64 L 64 74 L 46 88 L 34 80 Z"
          fill="url(#njackOrangeGrad)"
        />
      </svg>
    </motion.div>
  );
}
