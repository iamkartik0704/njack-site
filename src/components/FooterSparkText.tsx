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

export default function FooterSparkText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [hasMoved, setHasMoved] = useState(false);

  const particlesRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Vibrant NJACK brand spark color palette
  const sparkColors = [
    '#FFF8E1', // white-hot spark center
    '#FFE082', // luminous golden amber
    '#FFA726', // warm amber highlight
    '#FF8A00', // official NJACK amber
    '#FF5722', // official NJACK primary brand orange
    '#FF3D00', // vibrant vermilion
    '#D9381E', // deep fold crimson
  ];

  // Spawn spark particles along the cursor motion
  const spawnSparks = useCallback((x: number, y: number, count = 4) => {
    const dx = x - lastMousePosRef.current.x;
    const dy = y - lastMousePosRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spreadSpeed = Math.random() * 2.8 + 0.8;
      
      // Blend mouse motion inertia with radial spark burst
      const vx = (dx * 0.25) + Math.cos(angle) * spreadSpeed;
      const vy = (dy * 0.25) + Math.sin(angle) * spreadSpeed;

      const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx,
        vy,
        size: Math.random() * 2.5 + 1.2,
        alpha: 1.0,
        decay: Math.random() * 0.025 + 0.015,
        color,
        length: Math.min(speed * 0.4 + 2, 10),
      });
    }

    lastMousePosRef.current = { x, y };
  }, []);

  // Canvas render & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];

          // Physics update
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94; // air resistance
          p.vy *= 0.94;
          p.vy += 0.04; // subtle gravity
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
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;

          // Head of the spark
          ctx.moveTo(p.x, p.y);
          // Tail pointing backward along velocity
          ctx.lineTo(p.x - p.vx * (p.length * 0.4), p.y - p.vy * (p.length * 0.4));
          ctx.stroke();

          // Hot spark core point
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.min(p.alpha * 1.2, 1.0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
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
  }, []);

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
    setHasMoved(true);
    spawnSparks(x, y, 5);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lastMousePosRef.current = { x, y };
    setMousePos({ x, y });
    setIsHovering(true);
    spawnSparks(x, y, 8); // Initial greeting burst
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden text-center select-none ${
        isHovering ? 'cursor-none' : ''
      }`}
    >
      {/* Interactive Sparks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Custom Glowing Orange Spark Cursor Pointer */}
      {isHovering && hasMoved && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          {/* Luminous Pulsing Outer Corona */}
          <div className="h-6 w-6 rounded-full bg-[#FF5722]/30 blur-[6px] animate-pulse" />
          {/* Hot Core Ember */}
          <div className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-[#FFF8E1] shadow-[0_0_12px_#FF8A00,0_0_24px_#FF5722]" />
          {/* Tiny Crosshairs for Technical Feel */}
          <div className="absolute inset-0 m-auto h-4 w-[1px] bg-[#FF8A00]/60" />
          <div className="absolute inset-0 m-auto h-[1px] w-4 bg-[#FF8A00]/60" />
        </div>
      )}

      {/* Massive NJACK Display Typography with Interactive Radial Glow */}
      <div className="relative py-6">
        <span
          className="block font-display font-black text-[18vw] leading-none tracking-tighter transition-all duration-200"
          style={{
            backgroundImage: isHovering
              ? `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 138, 0, 0.85) 0%, rgba(255, 87, 34, 0.6) 35%, rgba(217, 56, 30, 0.25) 60%, rgba(255, 255, 255, 0.03) 85%)`
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: isHovering
              ? '0 0 40px rgba(255, 87, 34, 0.25)'
              : 'none',
          }}
        >
          NJACK
        </span>
      </div>
    </div>
  );
}
