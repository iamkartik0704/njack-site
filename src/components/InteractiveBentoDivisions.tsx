'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// 1. CRISP HORIZONTAL SPARKLING LIGHT STREAKS CANVAS (Image 4 Fusion)
// Razor-sharp laser streaks on transparent canvas — NO formless blurry blobs
// ============================================================================

interface LightStreak {
  x: number;
  y: number;
  vx: number;
  length: number;
  thickness: number;
  color: string;
  glowColor: string;
  alpha: number;
}

interface FloatingSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

// Crisp, high-energy palette inspired by Image 4
const SPARK_PALETTES = [
  { core: '#FFFFFF', glow: '#FF8A00' }, // Gold-Amber
  { core: '#FFF8E1', glow: '#FF5722' }, // Brand Orange
  { core: '#FFFFFF', glow: '#FFE082' }, // Luminous Gold
  { core: '#FFFFFF', glow: '#00B4D8' }, // Electric Cyan
  { core: '#FFFFFF', glow: '#EC4899' }, // Neon Magenta
];

function DivisionSparkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  const streaksRef = useRef<LightStreak[]>([]);
  const sparksRef = useRef<FloatingSpark[]>([]);

  // Initialize horizontal light streaks
  const initStreaks = useCallback((width: number, height: number) => {
    const count = 18;
    const streaks: LightStreak[] = [];
    for (let i = 0; i < count; i++) {
      const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 5.0 + 3.5,
        length: Math.random() * 85 + 35,
        thickness: Math.random() * 1.5 + 1.0,
        color: p.core,
        glowColor: p.glow,
        alpha: Math.random() * 0.4 + 0.3,
      });
    }
    streaksRef.current = streaks;
  }, []);

  // Spawn an organic spark
  const spawnSpark = useCallback((x: number, y: number, color?: string) => {
    if (sparksRef.current.length > 40) return;
    const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
    const angle = (Math.random() - 0.5) * Math.PI * 0.8;
    const speed = Math.random() * 2.2 + 0.8;
    sparksRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed + 1.0,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 1.8 + 0.8,
      alpha: 1.0,
      decay: Math.random() * 0.024 + 0.016,
      color: color || p.glow,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      initStreaks(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Horizontal light streaks (Image 4 laser lines)
      for (let i = 0; i < streaksRef.current.length; i++) {
        const s = streaksRef.current[i];
        s.x += s.vx;

        if (s.x - s.length > width) {
          s.x = -s.length - Math.random() * 60;
          s.y = Math.random() * height;
          s.vx = Math.random() * 5.0 + 3.5;
        }

        const grad = ctx.createLinearGradient(s.x - s.length, s.y, s.x, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.65, s.glowColor);
        grad.addColorStop(1, s.color);

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.shadowColor = s.glowColor;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(s.x - s.length, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // White-hot spark head
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (Math.random() < 0.025) {
          spawnSpark(s.x, s.y, s.glowColor);
        }
      }

      // 2. Floating ember sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const sp = sparksRef.current[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0 || sp.x > width || sp.y < 0 || sp.y > height) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, sp.alpha);
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting) {
          animFrameRef.current = requestAnimationFrame(render);
        } else if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [initStreaks, spawnSpark]);

  // Cursor trail sparks
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.random() < 0.25) {
      spawnSpark(x, y);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 100% transparent canvas allowing 3D Hexagon 'N' to be visible */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
    </div>
  );
}

// ============================================================================
// 2. DIVISION DATA DEFINITIONS (Authentic Copy from Image 3 & departments.json)
// ============================================================================

interface DivisionItem {
  id: string;
  num: string;
  name: string;
  focusTag: string;
  desc: string;
  color: string;
  colorLight: string;
  icon: React.ElementType;
  link: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: 'cp',
    num: '01',
    name: 'COMPETITIVE PROGRAMMING',
    focusTag: 'ALGORITHMS & DSA',
    desc: "The Competitive Programming Department at NJACK is committed to honing students' problem-solving skills, algorithmic thinking, and programming prowess. Through regular coding contests, workshops, and practice sessions, this department helps participants develop their abilities to solve complex programming challenges efficiently.",
    color: '#FF5722',
    colorLight: '#FFA726',
    icon: Binary,
    link: '/departments/cp',
  },
  {
    id: 'dev-os',
    num: '02',
    name: 'DEVELOPMENT & OPEN SOURCE',
    focusTag: 'SYSTEMS & OPEN SOURCE',
    desc: 'The Development and Open Source Department at NJACK encourages students to delve into the world of software development and contribute to the open-source community. Through hands-on workshops, collaborative projects, and mentorship programs, this department nurtures students\' skills in building robust and scalable software solutions.',
    color: '#00B4D8',
    colorLight: '#48CAE4',
    icon: Code2,
    link: '/departments/dev-os',
  },
  {
    id: 'ml',
    num: '03',
    name: 'MACHINE LEARNING',
    focusTag: 'ARTIFICIAL INTELLIGENCE',
    desc: 'The Machine Learning Department of NJACK is dedicated to exploring the vast field of artificial intelligence and machine learning. Through workshops, lectures, and practical sessions, this department equips members with the knowledge and tools required to tackle complex problems using machine learning algorithms.',
    color: '#FFAC2A',
    colorLight: '#FFD166',
    icon: Brain,
    link: '/departments/ml',
  },
  {
    id: 'cyber-security',
    num: '04',
    name: 'CYBERSECURITY',
    focusTag: 'INFOSEC & DEFENSE',
    desc: 'The Cybersecurity Department at NJACK focuses on promoting awareness and understanding of the crucial field of cybersecurity. This department conducts workshops, seminars, and hands-on sessions to educate members about various cybersecurity threats, techniques, and countermeasures.',
    color: '#EC4899',
    colorLight: '#F472B6',
    icon: ShieldAlert,
    link: '/departments/cyber-security',
  },
];

// ============================================================================
// 3. MAIN COMPONENT: INTERACTIVE BENTO DIVISIONS
// ============================================================================

export default function InteractiveBentoDivisions() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="divisions" className="relative z-10 py-24 sm:py-32 bg-transparent">
      {/* Background Sparkling Light Streaks on Transparent Canvas (3D Hexagon 'N' shines through) */}
      <DivisionSparkCanvas />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722]">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-[#FF8A00]" />
            <span>Four Core Divisions // Structure &amp; Focus</span>
          </div>

          <div className="mt-4 max-w-3xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.1]">
              Engineered Across Four Disciplines.
            </h2>
            <p className="max-w-2xl font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              NJACK operates as four specialized divisions—fostering algorithmic supremacy, scalable open-source systems, frontier machine learning, and adversarial cyber defense.
            </p>
          </div>
        </div>

        {/* ====================================================================
            FOUR-COLUMN RIBBON SHOWCASE (Clean Fusion of Image 2 & Image 3)
            - 100% Equal Stature across all 4 divisions
            - Razor-sharp top colored hairline indicator (Image 2)
            - Monospace numbering (01, 02, 03, 04)
            - Authentic student club copy (Image 3)
            - Tactile 'Know More ↗' ribbon button (Image 3)
            - Translucent obsidian glass (3D Hexagon 'N' clearly visible behind)
            - NO fuzzy drop-shadows or basic AI radial blur blobs!
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {DIVISIONS.map((div, idx) => {
            const Icon = div.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={div.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: isHovered ? 'rgba(18, 22, 30, 0.72)' : 'rgba(13, 15, 21, 0.52)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: isHovered ? div.color : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered
                    ? '0 16px 32px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)'
                    : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                }}
                className="group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 hover:-translate-y-1 overflow-hidden p-6"
              >
                {/* 1. Razor-Sharp Top Colored Indicator Bar (from Image 2) */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-200"
                  style={{
                    background: `linear-gradient(90deg, ${div.color} 0%, ${div.colorLight} 100%)`,
                    opacity: isHovered ? 1 : 0.75,
                  }}
                />

                {/* 2. Card Content */}
                <div>
                  {/* Top Bar: Monospace Number & Icon Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <span
                      className="font-mono text-base font-bold tracking-tight transition-colors duration-150"
                      style={{ color: isHovered ? div.color : '#9CA3AF' }}
                    >
                      {div.num}
                    </span>

                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150"
                      style={{
                        backgroundColor: isHovered ? `${div.color}15` : 'rgba(255, 255, 255, 0.03)',
                        borderColor: isHovered ? `${div.color}40` : 'rgba(255, 255, 255, 0.08)',
                        color: isHovered ? div.color : '#9CA3AF',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Editorial Tag (Image 2 style) */}
                  <div className="mt-5">
                    <h3 className="font-display text-lg font-black tracking-tight text-white uppercase leading-snug">
                      {div.name}
                    </h3>
                    <p
                      className="mt-1 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
                      style={{ color: div.color }}
                    >
                      {div.focusTag}
                    </p>
                  </div>

                  {/* Authentic Department Description (Word-for-word from Image 3) */}
                  <p className="mt-4 font-sans text-[13px] leading-relaxed text-[#9CA3AF] transition-colors group-hover:text-[#D1D5DB]">
                    {div.desc}
                  </p>
                </div>

                {/* 3. Bottom Action Bar: Tactile 'Know More ↗' Ribbon Button (Image 3 style) */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    NJACK // IIT PATNA
                  </span>

                  <Link
                    href={div.link}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150"
                    style={{
                      backgroundColor: isHovered ? div.color : 'rgba(255, 255, 255, 0.05)',
                      color: isHovered ? '#FFFFFF' : '#D1D5DB',
                      borderColor: isHovered ? div.color : 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <span>Know More</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
