'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  length: number;
}

// Official NJACK brand orange spark color palette
const SPARK_COLORS = [
  '#FFFFFF', // pure white hot core
  '#FFF8E1', // white-hot amber
  '#FFE082', // luminous golden amber
  '#FFA726', // warm amber highlight
  '#FF8A00', // official NJACK amber ribbon fold
  '#FF5722', // official NJACK primary brand orange
  '#FF3D00', // vibrant vermilion
  '#D9381E', // deep fold crimson
];

const MAX_SPARKS = 130;

export default function FooterSparkText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  const particlesRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);

  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const rectRef = useRef<DOMRect | null>(null);

  // Cache bounding client rect to prevent synchronous layout reflows during mouse movement
  const updateRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  // Spawn a spark particle with physics
  const spawnSparkAt = useCallback((x: number, y: number, vxOffset = 0, vyOffset = 0, burst = false) => {
    if (particlesRef.current.length >= MAX_SPARKS) return;

    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? Math.random() * 4.8 + 1.4 : Math.random() * 2.4 + 0.8;

    const vx = vxOffset + Math.cos(angle) * speed;
    const vy = vyOffset + Math.sin(angle) * speed;
    const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];

    particlesRef.current.push({
      x: x + (Math.random() - 0.5) * 3,
      y: y + (Math.random() - 0.5) * 3,
      vx,
      vy,
      size: Math.random() * 2.2 + 1.2,
      alpha: 1.0,
      decay: Math.random() * 0.024 + 0.018,
      color,
      length: Math.sqrt(vx * vx + vy * vy) * 1.4 + 2,
    });
  }, []);

  // Spawn spark trails along the cursor motion vector smoothly without particle explosion
  const spawnTrail = useCallback((currX: number, currY: number) => {
    const prevX = lastMousePosRef.current.x;
    const prevY = lastMousePosRef.current.y;
    const dx = currX - prevX;
    const dy = currY - prevY;
    const dist = Math.hypot(dx, dy);

    // Skip micro-movements
    if (dist < 4) return;

    // Cap interpolation steps to max 4 to preserve ultra-high FPS
    const steps = Math.min(Math.max(Math.floor(dist / 14), 1), 4);
    const vxBias = dx * 0.15;
    const vyBias = dy * 0.15;

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x = prevX + dx * t;
      const y = prevY + dy * t;
      const count = Math.random() > 0.65 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        spawnSparkAt(x, y, vxBias, vyBias, false);
      }
    }

    lastMousePosRef.current = { x: currX, y: currY };
  }, [spawnSparkAt]);

  // Main rendering loop - optimized for 60/120 FPS
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isRunningRef.current = false;
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isRunningRef.current = false;
      return;
    }

    // If invisible or no work to do, sleep animation loop to save 100% CPU/GPU
    if (!isVisibleRef.current || (!isHoveringRef.current && particlesRef.current.length === 0)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isRunningRef.current = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    if (particles.length > 0) {
      ctx.save();
      // Hardware-accelerated additive blending
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vy += 0.05; // gentle gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          // O(1) swap-and-pop removal prevents array shift overhead
          particles[i] = particles[particles.length - 1];
          particles.pop();
          continue;
        }

        const tailX = p.x - p.vx * (p.length * 0.38);
        const tailY = p.y - p.vy * (p.length * 0.38);

        // Pass 1: Luminous ambient aura (wide streak, low alpha, zero shadowBlur overhead)
        ctx.beginPath();
        ctx.lineWidth = p.size * 2.4;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.28;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Pass 2: Sharp incandescent streak
        ctx.beginPath();
        ctx.lineWidth = p.size;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Pass 3: Hot white center point
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.min(p.alpha * 1.2, 1.0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // Start rendering loop if not already running
  const ensureRenderLoop = useCallback(() => {
    if (!isRunningRef.current && isVisibleRef.current) {
      isRunningRef.current = true;
      animFrameRef.current = requestAnimationFrame(render);
    }
  }, [render]);

  // Handle canvas sizing with high-DPI support
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    rectRef.current = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rectRef.current.width * dpr;
    canvas.height = rectRef.current.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  // IntersectionObserver to pause loop when scrolled away
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting) {
          handleResize();
          ensureRenderLoop();
        } else {
          isRunningRef.current = false;
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(container);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRect);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [ensureRenderLoop, handleResize, updateRect]);

  // Burst on click
  const handleMouseDown = () => {
    if (!isHoveringRef.current) return;
    const { x, y } = mousePosRef.current;
    for (let i = 0; i < 20; i++) {
      spawnSparkAt(x, y, 0, 0, true);
    }
    ensureRenderLoop();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Use cached rect to prevent forced reflow on mousemove
    let rect = rectRef.current;
    if (!rect) {
      rect = container.getBoundingClientRect();
      rectRef.current = rect;
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };

    // Update CSS custom properties directly on DOM for zero-cost gradient repositioning
    container.style.setProperty('--mouse-x', `${x}px`);
    container.style.setProperty('--mouse-y', `${y}px`);

    // Move custom cursor directly on GPU compositor without React re-render
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    spawnTrail(x, y);
    ensureRenderLoop();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    updateRect();
    const rect = rectRef.current || container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lastMousePosRef.current = { x, y };
    mousePosRef.current = { x, y };

    container.style.setProperty('--mouse-x', `${x}px`);
    container.style.setProperty('--mouse-y', `${y}px`);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    setIsHovering(true);
    isHoveringRef.current = true;

    // Greeting spark burst
    for (let i = 0; i < 10; i++) {
      spawnSparkAt(x, y, 0, 0, true);
    }

    ensureRenderLoop();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    isHoveringRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      className={`relative w-full overflow-hidden text-center select-none ${
        isHovering ? 'cursor-none' : ''
      }`}
      style={{
        // Default cursor coordinates offscreen
        ['--mouse-x' as string]: '-1000px',
        ['--mouse-y' as string]: '-1000px',
      }}
    >
      {/* Interactive Sparks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Custom Glowing Orange Spark Cursor - GPU accelerated translate3d */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 z-40 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(-1000px, -1000px, 0)',
          willChange: 'transform',
        }}
      >
        {/* Luminous Pulsing Ambient Heat Glow */}
        <div className="absolute -inset-3.5 rounded-full bg-gradient-to-r from-[#FF5722]/30 via-[#FF8A00]/40 to-[#FF3D00]/30 blur-md animate-pulse -translate-x-1/2 -translate-y-1/2" />

        {/* 4-Point Radiant Spark Star Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="relative -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_8px_#FF8A00] drop-shadow-[0_0_16px_#FF5722]"
        >
          <defs>
            <radialGradient id="cursorSparkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFE082" />
              <stop offset="70%" stopColor="#FF8A00" />
              <stop offset="100%" stopColor="#FF5722" />
            </radialGradient>
          </defs>
          {/* Primary 4-pointed radiant flare */}
          <path
            d="M16 2 C16 11 19 14 28 16 C19 18 16 21 16 30 C16 21 13 18 4 16 C13 14 16 11 16 2 Z"
            fill="url(#cursorSparkGrad)"
          />
          {/* Secondary diagonal diamond glint */}
          <path
            d="M16 8 C16 13 17.5 14.5 22 16 C17.5 17.5 16 19 16 24 C16 19 14.5 17.5 10 16 C14.5 14.5 16 13 16 8 Z"
            fill="#FFF8E1"
            opacity="0.85"
          />
          {/* Pure white-hot center core */}
          <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Massive NJACK Display Typography with Interactive Radial Orange Spotlight */}
      <div className="relative py-6">
        {/* Base Ghost Text Layer */}
        <span
          aria-hidden="true"
          className="block font-display font-black text-[18vw] leading-none tracking-tighter pointer-events-none select-none"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NJACK
        </span>

        {/* Dynamic Radiant Highlight Overlay - driven by CSS variables for buttery 120 FPS */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center font-display font-black text-[18vw] leading-none tracking-tighter pointer-events-none select-none transition-opacity duration-300 ease-out ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle 420px at var(--mouse-x) var(--mouse-y), rgba(255, 138, 0, 0.92) 0%, rgba(255, 87, 34, 0.7) 30%, rgba(217, 56, 30, 0.28) 58%, rgba(255, 255, 255, 0.02) 82%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 45px rgba(255, 87, 34, 0.32))',
          }}
        >
          NJACK
        </span>
      </div>
    </div>
  );
}
