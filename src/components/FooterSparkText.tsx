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

export default function FooterSparkText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [hasMoved, setHasMoved] = useState(false);

  const particlesRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Spawn spark particles with physics
  const spawnSparkAt = useCallback((x: number, y: number, vxOffset = 0, vyOffset = 0, burst = false) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? Math.random() * 5.5 + 1.5 : Math.random() * 2.8 + 0.8;
    
    const vx = vxOffset + Math.cos(angle) * speed;
    const vy = vyOffset + Math.sin(angle) * speed;
    const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];

    particlesRef.current.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y + (Math.random() - 0.5) * 4,
      vx,
      vy,
      size: Math.random() * 2.4 + 1.2,
      alpha: 1.0,
      decay: Math.random() * 0.024 + 0.016,
      color,
      length: Math.sqrt(vx * vx + vy * vy) * 1.5 + 2,
    });
  }, []);

  // Spawn spark trails along the cursor motion vector
  const spawnTrail = useCallback((currX: number, currY: number) => {
    const prevX = lastMousePosRef.current.x;
    const prevY = lastMousePosRef.current.y;
    const dx = currX - prevX;
    const dy = currY - prevY;
    const dist = Math.hypot(dx, dy);

    // Interpolate steps so fast cursor movement leaves a continuous streak
    const steps = Math.min(Math.max(Math.floor(dist / 6), 1), 10);
    const vxBias = dx * 0.2;
    const vyBias = dy * 0.2;

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const x = prevX + dx * t;
      const y = prevY + dy * t;
      const sparkCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < sparkCount; i++) {
        spawnSparkAt(x, y, vxBias, vyBias, false);
      }
    }

    lastMousePosRef.current = { x: currX, y: currY };
  }, [spawnSparkAt]);

  // Burst on click
  const handleMouseDown = () => {
    if (!isHoveringRef.current) return;
    const { x, y } = mousePosRef.current;
    for (let i = 0; i < 28; i++) {
      spawnSparkAt(x, y, 0, 0, true);
    }
  };

  // Canvas render & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Subtle idle crackle when resting cursor over NJACK
      if (isHoveringRef.current && frameCount % 6 === 0) {
        const { x, y } = mousePosRef.current;
        spawnSparkAt(x, y, 0, -0.5, false);
      }

      if (particlesRef.current.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];

          // Physics update
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94; // air drag
          p.vy *= 0.94;
          p.vy += 0.05; // subtle gravity downward
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          // Draw spark as glowing directional streak
          ctx.beginPath();
          ctx.lineWidth = p.size;
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;

          // Head of the spark
          ctx.moveTo(p.x, p.y);
          // Tail pointing backward along velocity
          ctx.lineTo(p.x - p.vx * (p.length * 0.4), p.y - p.vy * (p.length * 0.4));
          ctx.stroke();

          // Hot spark core point
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.min(p.alpha * 1.3, 1.0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (running) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [spawnSparkAt]);

  // Handle canvas sizing with high-DPI support
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    mousePosRef.current = { x, y };
    setHasMoved(true);
    spawnTrail(x, y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lastMousePosRef.current = { x, y };
    mousePosRef.current = { x, y };
    setMousePos({ x, y });
    setIsHovering(true);
    isHoveringRef.current = true;

    // Greeting spark burst
    for (let i = 0; i < 12; i++) {
      spawnSparkAt(x, y, 0, 0, true);
    }
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
    >
      {/* Interactive Sparks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Custom Glowing Orange Spark Cursor */}
      {isHovering && hasMoved && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          {/* Luminous Pulsing Ambient Heat Glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#FF5722]/30 via-[#FF8A00]/40 to-[#FF3D00]/30 blur-md animate-pulse" />

          {/* 4-Point Radiant Spark Star Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="relative drop-shadow-[0_0_8px_#FF8A00] drop-shadow-[0_0_16px_#FF5722]"
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
      )}

      {/* Massive NJACK Display Typography with Interactive Radial Orange Glow */}
      <div className="relative py-6">
        <span
          className="block font-display font-black text-[18vw] leading-none tracking-tighter transition-all duration-200"
          style={{
            backgroundImage: isHovering
              ? `radial-gradient(circle 420px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 138, 0, 0.88) 0%, rgba(255, 87, 34, 0.65) 30%, rgba(217, 56, 30, 0.25) 58%, rgba(255, 255, 255, 0.025) 82%)`
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: isHovering
              ? '0 0 50px rgba(255, 87, 34, 0.3)'
              : 'none',
          }}
        >
          NJACK
        </span>
      </div>
    </div>
  );
}
