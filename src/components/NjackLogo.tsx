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
        className="w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(255,87,34,0.7)]"
      >
        <defs>
          {/* Highlight Amber to Orange Gradient (Left ribbon) */}
          <linearGradient id="njackAmberGrad" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFA000" />
            <stop offset="50%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FF5722" />
          </linearGradient>

          {/* Central Diagonal Tangerine-Vermilion Gradient */}
          <linearGradient id="njackDiagonalGrad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="45%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#E64A19" />
          </linearGradient>

          {/* Deep Fold Crimson Shadow Gradient */}
          <linearGradient id="njackFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C62828" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>

          {/* Right Ribbon Glowing Orange Gradient */}
          <linearGradient id="njackRightGrad" x1="50%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E64A19" />
            <stop offset="50%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>
        </defs>

        {/* 1. Left Bracket Ribbon (from bottom-left vertical cut, around V4, up to V5, to top fold) */}
        <motion.path
          d="M 36 86.92 L 11.03 72.5 L 11.03 27.5 L 48 6.15 L 38 17.5 L 22.53 34.14 L 22.53 65.86 L 36 73.64 Z"
          fill="url(#njackAmberGrad)"
          className="transition-transform duration-300 origin-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />

        {/* 2. Top Fold Shadow Triangle (crease under diagonal ribbon) */}
        <motion.path
          d="M 48 6.15 L 55 10.2 L 38 17.5 Z"
          fill="url(#njackFoldGrad)"
          className="transition-opacity duration-300"
        />

        {/* 3. Central Diagonal Ribbon (Front layer, crossing center to bottom fold) */}
        <motion.path
          d="M 38 17.5 L 48 6.15 L 62 82.5 L 52 93.85 Z"
          fill="url(#njackDiagonalGrad)"
          className="transition-transform duration-300 origin-center group-hover:scale-[1.02]"
        />

        {/* 4. Bottom Fold Shadow Triangle */}
        <motion.path
          d="M 52 93.85 L 45 89.8 L 62 82.5 Z"
          fill="url(#njackFoldGrad)"
          className="transition-opacity duration-300"
        />

        {/* 5. Right Bracket Ribbon (from bottom fold, around V2, up to V1, to top-right vertical cut) */}
        <motion.path
          d="M 52 93.85 L 62 82.5 L 77.47 65.86 L 77.47 34.14 L 64 26.36 L 64 13.08 L 88.97 27.5 L 88.97 72.5 Z"
          fill="url(#njackRightGrad)"
          className="transition-transform duration-300 origin-center group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />
      </svg>
    </motion.div>
  );
}
