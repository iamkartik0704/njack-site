'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroLogoLockupProps {
  className?: string;
}

export default function HeroLogoLockup({ className = '' }: HeroLogoLockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural tactile feel
  const springConfig = { stiffness: 350, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(isHovered ? 1.04 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className={`relative inline-flex items-center gap-2 sm:gap-3.5 select-none cursor-pointer group ${className}`}
    >
      {/* Dynamic Ambient Orange Glow Bloom on Hover */}
      <div
        className={`absolute -inset-6 sm:-inset-10 rounded-3xl bg-gradient-to-r from-[#FF5722]/35 via-[#FF8A00]/25 to-transparent blur-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Official Folded-Ribbon Hexagonal N Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Pulsing Ember Halo */}
        <div
          className={`absolute inset-0 rounded-2xl bg-[#FF5722]/40 blur-xl transition-all duration-300 ${
            isHovered ? 'scale-125 opacity-100' : 'scale-90 opacity-0'
          }`}
        />

        <div
          className="relative transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 20px rgba(255, 87, 34, 0.85)) drop-shadow(0 0 45px rgba(255, 138, 0, 0.45))'
              : 'drop-shadow(0 0 8px rgba(255, 87, 34, 0.25))',
          }}
        >
          <Image
            src="/njack-logo-mark.png"
            alt="NJACK Logo"
            width={160}
            height={160}
            priority
            className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Matching "jack" Lowercase Wordmark */}
      <div className="relative flex items-center">
        <span
          className="font-display font-black text-6xl sm:text-8xl lg:text-9xl leading-none tracking-[-0.04em] transition-all duration-300"
          style={{
            color: isHovered ? '#FFFFFF' : '#CBD5E1',
            textShadow: isHovered
              ? '0 0 35px rgba(255, 87, 34, 0.5), 0 0 70px rgba(255, 138, 0, 0.25)'
              : 'none',
          }}
        >
          jack
        </span>

        {/* Subtle orange reflective light glint on hover */}
        <span
          className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF8A00] via-[#FF5722] to-transparent rounded-full transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 origin-left'
          }`}
        />
      </div>
    </motion.div>
  );
}
