'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // Use gsap.quickTo for high-performance 60/120fps mouse tracking
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 h-[500px] w-[500px] rounded-full bg-gradient-radial from-orange-500/[0.08] via-amber-500/[0.03] to-transparent blur-3xl opacity-80 transition-opacity"
      aria-hidden="true"
    />
  );
}
