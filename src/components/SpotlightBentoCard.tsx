'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightBentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
}

export default function SpotlightBentoCard({
  children,
  className = '',
  glowColor = 'rgba(255, 87, 34, 0.24)',
  enableTilt = true,
}: SpotlightBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Springs for 3D perspective tilt
  const rotX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.8 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Calculate tilt angles up to ±6deg
      const tiltX = -((y - centerY) / centerY) * 5.5;
      const tiltY = ((x - centerX) / centerX) * 5.5;

      rotX.set(tiltX);
      rotY.set(tiltY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`group relative rounded-2xl transition-shadow duration-300 ${className}`}
    >
      {/* 1px Border with live cursor radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), ${glowColor} 25%, transparent 60%)`
            : 'rgba(255, 255, 255, 0.07)',
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Main card body with Obsidian glassmorphism */}
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl p-6 lg:p-8"
        style={{
          backgroundColor: 'rgba(14, 16, 22, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow:
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Subtle moving specular sheen on hover */}
        {isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-full opacity-20 transition-transform duration-1000"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.18), transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </motion.div>
  );
}
