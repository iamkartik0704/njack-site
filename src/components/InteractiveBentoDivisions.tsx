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
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

// ============================================================================
// 1. CRISP HORIZONTAL SPARKLING LIGHT STREAKS CANVAS (Image 4 Fusion)
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

const SPARK_PALETTES = [
  { core: '#FFFFFF', glow: '#FF8A00' },
  { core: '#FFF8E1', glow: '#FF5722' },
  { core: '#FFFFFF', glow: '#FFE082' },
  { core: '#FFFFFF', glow: '#2563EB' },
  { core: '#FFFFFF', glow: '#EC4899' },
];

function DivisionSparkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  const streaksRef = useRef<LightStreak[]>([]);
  const sparksRef = useRef<FloatingSpark[]>([]);

  const initStreaks = useCallback((width: number, height: number) => {
    const count = 16;
    const streaks: LightStreak[] = [];
    for (let i = 0; i < count; i++) {
      const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 4.5 + 3.0,
        length: Math.random() * 80 + 35,
        thickness: Math.random() * 1.5 + 1.0,
        color: p.core,
        glowColor: p.glow,
        alpha: Math.random() * 0.35 + 0.25,
      });
    }
    streaksRef.current = streaks;
  }, []);

  const spawnSpark = useCallback((x: number, y: number, color?: string) => {
    if (sparksRef.current.length > 35) return;
    const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
    const angle = (Math.random() - 0.5) * Math.PI * 0.8;
    const speed = Math.random() * 2.0 + 0.8;
    sparksRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed + 1.0,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 1.6 + 0.8,
      alpha: 1.0,
      decay: Math.random() * 0.025 + 0.018,
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

      for (let i = 0; i < streaksRef.current.length; i++) {
        const s = streaksRef.current[i];
        s.x += s.vx;

        if (s.x - s.length > width) {
          s.x = -s.length - Math.random() * 60;
          s.y = Math.random() * height;
          s.vx = Math.random() * 4.5 + 3.0;
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
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(s.x - s.length, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (Math.random() < 0.02) {
          spawnSpark(s.x, s.y, s.glowColor);
        }
      }

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

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
    </div>
  );
}

// ============================================================================
// 2. DIVISION DATA DEFINITIONS (Authentic Copy from departments.json & Image 3)
// ============================================================================

interface DivisionItem {
  id: string;
  num: string;
  name: string;
  shortName: string;
  focusTag: string;
  tagline: string;
  desc: string;
  color: string;
  colorLight: string;
  icon: React.ElementType;
  link: string;
  stack: string[];
  flagship: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: 'cp',
    num: '01',
    name: 'COMPETITIVE PROGRAMMING',
    shortName: 'CP',
    focusTag: 'ALGORITHMS & DSA',
    tagline: 'Algorithmic Supremacy & Mathematical Prowess',
    desc: "The Competitive Programming Department at NJACK is committed to honing students' problem-solving skills, algorithmic thinking, and programming prowess. Through regular coding contests, workshops, and practice sessions, this department helps participants develop their abilities to solve complex programming challenges efficiently.",
    color: '#FF5722',
    colorLight: '#FFA726',
    icon: Binary,
    link: '/departments/cp',
    stack: ['C++', 'Python', 'AtCoder', 'Codeforces', 'Data Structures'],
    flagship: 'ICPC World Finals Track & Weekly Contests',
  },
  {
    id: 'dev-os',
    num: '02',
    name: 'DEVELOPMENT & OPEN SOURCE',
    shortName: 'DevOS',
    focusTag: 'SYSTEMS & OPEN SOURCE',
    tagline: 'Production Engineering & Scalable Systems',
    desc: 'The Development and Open Source Department at NJACK encourages students to delve into the world of software development and contribute to the open-source community. Through hands-on workshops, collaborative projects, and mentorship programs, this department nurtures students\' skills in building robust and scalable software solutions.',
    color: '#2563EB',
    colorLight: '#60A5FA',
    icon: Code2,
    link: '/departments/dev-os',
    stack: ['TypeScript', 'Rust', 'Docker', 'Linux Kernel', 'Next.js'],
    flagship: 'NJACK Winter of Code (NWOC) & Open Source',
  },
  {
    id: 'ml',
    num: '03',
    name: 'MACHINE LEARNING',
    shortName: 'AI-ML',
    focusTag: 'ARTIFICIAL INTELLIGENCE',
    tagline: 'Neural Architectures & Intelligent Systems',
    desc: 'The Machine Learning Department of NJACK is dedicated to exploring the vast field of artificial intelligence and machine learning. Through workshops, lectures, and practical sessions, this department equips members with the knowledge and tools required to tackle complex problems using machine learning algorithms.',
    color: '#FFAC2A',
    colorLight: '#FFD166',
    icon: Brain,
    link: '/departments/ml',
    stack: ['PyTorch', 'Transformers', 'CUDA', 'Kaggle', 'Computer Vision'],
    flagship: 'AI Research Paper Reading & Kaggle Sprints',
  },
  {
    id: 'cyber-security',
    num: '04',
    name: 'CYBERSECURITY',
    shortName: 'CSEC',
    focusTag: 'INFOSEC & DEFENSE',
    tagline: 'Offensive Exploitation & Vulnerability Defense',
    desc: 'The Cybersecurity Department at NJACK focuses on promoting awareness and understanding of the crucial field of cybersecurity. This department conducts workshops, seminars, and hands-on sessions to educate members about various cybersecurity threats, techniques, and countermeasures.',
    color: '#EC4899',
    colorLight: '#F472B6',
    icon: ShieldAlert,
    link: '/departments/cyber-security',
    stack: ['Ghidra', 'GDB / PWN', 'Wireshark', 'BurpSuite', 'Cryptography'],
    flagship: 'National CTF Competitions & Zero-Day Research',
  },
];

// ============================================================================
// 3. MAIN COMPONENT: OPTION 4 FEATURED SPLIT-STAGE WITH NAVIGATION BUTTONS
// ============================================================================

export default function InteractiveBentoDivisions() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const activeDivision = DIVISIONS[activeStageIdx] || DIVISIONS[0];
  const ActiveIcon = activeDivision.icon;

  // Navigation handlers to cycle through divisions
  const handlePrev = useCallback(() => {
    setActiveStageIdx((prev) => (prev === 0 ? DIVISIONS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStageIdx((prev) => (prev === DIVISIONS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if focus isn't in an input/textarea
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section id="divisions" className="relative z-10 py-24 sm:py-32 bg-transparent">
      {/* Background Sparkling Light Streaks on Transparent Canvas */}
      <DivisionSparkCanvas />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722]">
              <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
              <Sparkles className="h-3.5 w-3.5 text-[#FF8A00]" />
              <span>Four Specialized Divisions // Pillars of NJACK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.1]">
              Engineered Across Four Disciplines.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8A8F98]">
              NJACK operates as four deeply integrated wings—from algorithmic contest supremacy to production cloud systems, AI research, and offensive cybersecurity.
            </p>
          </div>

          {/* Quick Prev / Next Controls at Section Level */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400">
              <span className="text-white font-bold">{activeDivision.num}</span> / 04
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-[#0E1016]/90 backdrop-blur-md">
              <button
                onClick={handlePrev}
                aria-label="Previous division"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-300 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next division"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-300 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================================
            FEATURED SPLIT-STAGE DECK (Option 4 Refined)
            - Left: Main Stage with Solid Obsidian Backdrop for 100% Readability
            - Right: 4-Card Selector Deck
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. Left Featured Stage (lg:col-span-8) - Solid Obsidian Surface (Eliminates 3D Hexagon Glare) */}
          <div
            style={{
              backgroundColor: '#090B10',
              borderColor: activeDivision.color,
              boxShadow: `0 24px 60px -12px rgba(0,0,0,0.95), inset 0 1px 0 0 rgba(255,255,255,0.16)`,
            }}
            className="lg:col-span-8 relative flex flex-col justify-between rounded-2xl border p-6 sm:p-9 overflow-hidden transition-all duration-300"
          >
            {/* Top Razor-Sharp Hairline Indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, ${activeDivision.color} 0%, ${activeDivision.colorLight} 100%)`,
              }}
            />

            <div className="space-y-6">
              {/* Header Bar with Division Tag & Interactive Navigation Arrows */}
              <div className="flex items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0">
                  <div
                    className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border transition-colors shadow-md"
                    style={{
                      backgroundColor: `${activeDivision.color}20`,
                      borderColor: `${activeDivision.color}55`,
                      color: activeDivision.color,
                    }}
                  >
                    <ActiveIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest truncate" style={{ color: activeDivision.color }}>
                        Division {activeDivision.num} // {activeDivision.focusTag}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mt-0.5 break-words">
                      {activeDivision.name}
                    </h3>
                  </div>
                </div>

                {/* Stage Nav Buttons (Prev / Next) */}
                <div className="flex items-center gap-1.5 shrink-0 pt-1 sm:pt-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous division"
                    title="Previous Division (←)"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-neutral-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next division"
                    title="Next Division (→)"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-neutral-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tagline */}
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Mission // <span className="text-neutral-200">{activeDivision.tagline}</span>
              </div>

              {/* Deep Authentic Description — 100% Legible with High-Opacity Obsidian Backdrop */}
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#E5E7EB]">
                {activeDivision.desc}
              </p>

              {/* Flagship Initiative Box */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Flagship Activity
                  </span>
                  <div className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{activeDivision.flagship}</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {activeDivision.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.05] border border-white/10 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer: Division Stepper Dots & Action CTA */}
            <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Stepper Dots to Jump Directly to Any Division */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-xs text-neutral-400 mr-1 hidden sm:inline">Jump:</span>
                {DIVISIONS.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveStageIdx(i)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeStageIdx === i
                        ? 'text-white border'
                        : 'text-neutral-500 hover:text-neutral-300 border border-transparent hover:border-white/10'
                    }`}
                    style={{
                      backgroundColor: activeStageIdx === i ? `${d.color}25` : 'transparent',
                      borderColor: activeStageIdx === i ? `${d.color}60` : 'transparent',
                      color: activeStageIdx === i ? d.color : undefined,
                    }}
                  >
                    {d.num} {d.shortName || d.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <Link
                href={activeDivision.link}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white transition-all shadow-lg group shrink-0"
                style={{
                  backgroundColor: activeDivision.color,
                }}
              >
                <span>Explore Division Handbook</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* 2. Right Interactive Deck Navigator (lg:col-span-4) - High-Opacity Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3.5">
            {DIVISIONS.map((div, idx) => {
              const Icon = div.icon;
              const isSelected = activeStageIdx === idx;

              return (
                <button
                  key={div.id}
                  onClick={() => setActiveStageIdx(idx)}
                  style={{
                    backgroundColor: isSelected ? '#121620' : '#0B0D13',
                    borderColor: isSelected ? div.color : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected
                      ? `inset 0 1px 0 0 rgba(255,255,255,0.18), 0 10px 25px -5px rgba(0,0,0,0.7)`
                      : '0 4px 15px -2px rgba(0,0,0,0.6)',
                  }}
                  className={`group relative flex items-center justify-between rounded-xl border p-4 sm:p-4.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected ? 'ring-1 ring-white/10' : 'hover:border-white/20'
                  }`}
                >
                  {/* Active Left Vertical Accent Strip */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r shadow-sm"
                      style={{ backgroundColor: div.color }}
                    />
                  )}

                  <div className="flex items-center gap-3.5 pl-1.5">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors shrink-0"
                      style={{
                        backgroundColor: isSelected ? `${div.color}25` : 'rgba(255,255,255,0.03)',
                        borderColor: isSelected ? `${div.color}55` : 'rgba(255,255,255,0.08)',
                        color: isSelected ? div.color : '#9CA3AF',
                      }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold" style={{ color: div.color }}>
                          {div.num}
                        </span>
                        <h4 className="font-display font-bold text-white text-sm tracking-tight">
                          {div.name}
                        </h4>
                      </div>
                      <p className="font-mono text-[10px] text-neutral-400 mt-0.5 tracking-wider">
                        {div.focusTag}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`h-4 w-4 transition-all shrink-0 ${
                      isSelected ? 'opacity-100 text-white' : 'opacity-30 text-neutral-400 group-hover:opacity-70'
                    }`}
                  />
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
