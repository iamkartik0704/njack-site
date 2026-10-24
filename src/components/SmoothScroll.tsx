'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisScrollTriggerBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Native scrolling for touch devices and for anyone who asked for less motion:
  // inertia on a trackpad or phone reads as lag, not polish.
  const [useNative, setUseNative] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setUseNative(coarse || reduced);
  }, []);

  if (useNative) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.22,
        duration: 0.7,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        syncTouch: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
