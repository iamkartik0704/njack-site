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
      {/* Official Folded-Ribbon Hexagonal N Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div
          className="relative transition-all duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 4px 16px rgba(255, 87, 34, 0.35))'
              : 'none',
          }}
        >
          <Image
            src="/njack-logo-mark.png"
            alt="NJACK Logo"
            width={160}
            height={160}
            priority
            className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Matching "jack" Lowercase Wordmark */}
      <div className="relative flex items-center">
        <span
          className="font-display font-black text-6xl sm:text-8xl lg:text-9xl leading-none tracking-[-0.04em] transition-colors duration-300"
          style={{
            color: isHovered ? '#FFFFFF' : '#CBD5E1',
          }}
        >
          jack
        </span>
      </div>
    </motion.div>
  );
}
