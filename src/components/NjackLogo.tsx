'use client';

import Image from 'next/image';
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
      whileHover={animated ? { scale: 1.08 } : undefined}
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(255,87,34,0.75)]">
        <Image
          src="/njack-logo-mark.png"
          alt="NJACK Official Logo"
          width={size * 2}
          height={size * 2}
          priority
          className="w-full h-full object-contain filter select-none transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
