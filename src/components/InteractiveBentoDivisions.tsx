'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  Trophy,
  GitBranch,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

// ============================================================================
// 1. HIGH-VELOCITY SPARKLING LIGHT BEAMS & PARTICLES CANVAS (Image 4 Fusion)
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

// Palette of spark hues matching the sparkling effect in Image 4
const SPARK_PALETTES = [
  { core: '#FFFFFF', glow: '#FF8A00' }, // Gold-Amber
  { core: '#FFF8E1', glow: '#FF5722' }, // Brand Orange
  { core: '#FFFFFF', glow: '#FFE082' }, // White-hot Gold
  { core: '#FFFFFF', glow: '#00B4D8' }, // Electric Cyan
  { core: '#FFFFFF', glow: '#D946EF' }, // Neon Violet
];

function DivisionSparkCanvas({ activeColor }: { activeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  const streaksRef = useRef<LightStreak[]>([]);
  const sparksRef = useRef<FloatingSpark[]>([]);

  // Initialize light streaks
  const initStreaks = useCallback((width: number, height: number) => {
    const count = 18;
    const streaks: LightStreak[] = [];
    for (let i = 0; i < count; i++) {
      const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 6.5 + 4.5,
        length: Math.random() * 85 + 40,
        thickness: Math.random() * 1.8 + 1.2,
        color: p.core,
        glowColor: p.glow,
        alpha: Math.random() * 0.5 + 0.4,
      });
    }
    streaksRef.current = streaks;
  }, []);

  // Spawn spark burst at cursor or random position
  const spawnSpark = useCallback((x: number, y: number, color?: string) => {
    if (sparksRef.current.length > 60) return;
    const p = SPARK_PALETTES[Math.floor(Math.random() * SPARK_PALETTES.length)];
    const angle = (Math.random() - 0.5) * Math.PI * 0.8;
    const speed = Math.random() * 2.8 + 1.0;
    sparksRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed + 1.5,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2.2 + 1.0,
      alpha: 1.0,
      decay: Math.random() * 0.02 + 0.015,
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

      // 1. Draw and update horizontal high-velocity light streaks
      for (let i = 0; i < streaksRef.current.length; i++) {
        const s = streaksRef.current[i];
        s.x += s.vx;

        // Reset streak when it travels past right edge
        if (s.x - s.length > width) {
          s.x = -s.length - Math.random() * 80;
          s.y = Math.random() * height;
          s.vx = Math.random() * 6.5 + 4.5;
        }

        // Draw gradient tail
        const grad = ctx.createLinearGradient(s.x - s.length, s.y, s.x, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.7, s.glowColor);
        grad.addColorStop(1, s.color);

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';

        // Outer glow
        ctx.shadowColor = s.glowColor;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(s.x - s.length, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Luminous spark head dot
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Randomly shed a micro-spark from the head
        if (Math.random() < 0.04) {
          spawnSpark(s.x, s.y, s.glowColor);
        }
      }

      // 2. Draw and update floating ember sparks
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
        ctx.shadowBlur = 6;
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
      { rootMargin: '100px' }
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

  // Mouse hover event handler for cursor sparkling trails
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    if (Math.random() < 0.35) {
      spawnSpark(x, y, activeColor);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Background HTML5 Canvas for continuous light streak sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* Massive NJACK Typography Watermark from Image 4 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black text-[17vw] leading-none tracking-tighter uppercase transition-colors duration-700"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NJACK
        </span>
      </div>

      {/* Dynamic ambient color glow matching active hovered division */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle 600px at 50% 50%, ${activeColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

// ============================================================================
// 2. DIVISION DEFINITIONS & METADATA
// ============================================================================

interface DivisionItem {
  id: string;
  num: string;
  name: string;
  shortName: string;
  tagline: string;
  desc: string;
  color: string;
  colorLight: string;
  bgTint: string;
  borderTint: string;
  icon: React.ElementType;
  subIcon: React.ElementType;
  link: string;
  highlights: string[];
  metrics: { label: string; value: string };
  ribbonLabel: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: 'cp',
    num: '01',
    name: 'COMPETITIVE PROGRAMMING',
    shortName: 'CP',
    tagline: 'Algorithmic Supremacy & Mathematical Prowess',
    desc: 'Committed to honing students\' problem-solving skills, algorithmic thinking, and programming prowess. Through regular coding contests, workshops, and practice sessions, this department helps participants develop their abilities to solve complex programming challenges efficiently.',
    color: '#FF5722',
    colorLight: '#FFA726',
    bgTint: 'rgba(255, 87, 34, 0.04)',
    borderTint: 'rgba(255, 87, 34, 0.3)',
    icon: Binary,
    subIcon: Trophy,
    link: '/departments/cp',
    highlights: [
      'ICPC World Finals & Regionals',
      'Codeforces & AtCoder Weekly Contests',
      'Advanced Graph Theory & DP',
      'Combinatorics & Number Theory',
    ],
    metrics: { label: 'ICPC Podiums & Ranks', value: 'Global Finalists' },
    ribbonLabel: 'CORE DIVISION // 01',
  },
  {
    id: 'dev-os',
    num: '02',
    name: 'DEVELOPMENT & OPEN SOURCE',
    shortName: 'DEV & OS',
    tagline: 'Production Engineering & Scalable Systems',
    desc: 'Encourages students to delve into the world of software development and contribute to the open-source community. Through hands-on workshops, collaborative projects, and mentorship programs, this department nurtures students\' skills in building robust and scalable software solutions.',
    color: '#00B4D8',
    colorLight: '#48CAE4',
    bgTint: 'rgba(0, 180, 216, 0.04)',
    borderTint: 'rgba(0, 180, 216, 0.3)',
    icon: Code2,
    subIcon: GitBranch,
    link: '/departments/dev-os',
    highlights: [
      'NJACK Winter of Code (NWOC)',
      'Full-Stack Architecture & Cloud',
      'Linux Kernel, OS & Systems',
      'CI/CD, Kubernetes & Microservices',
    ],
    metrics: { label: 'Open Source Mentorship', value: '1,400+ PRs Merged' },
    ribbonLabel: 'CORE DIVISION // 02',
  },
  {
    id: 'ml',
    num: '03',
    name: 'MACHINE LEARNING & AI',
    shortName: 'ML & AI',
    tagline: 'Neural Architectures & Intelligent Systems',
    desc: 'Dedicated to exploring the vast field of artificial intelligence and machine learning. Through workshops, lectures, and practical sessions, this department equips members with the knowledge and tools required to tackle complex problems using cutting-edge machine learning algorithms.',
    color: '#FFAC2A',
    colorLight: '#FFD166',
    bgTint: 'rgba(255, 172, 42, 0.04)',
    borderTint: 'rgba(255, 172, 42, 0.3)',
    icon: Brain,
    subIcon: Cpu,
    link: '/departments/ml',
    highlights: [
      'Deep Neural Networks & Vision',
      'Transformers & Generative AI',
      'Kaggle Grandmaster Challenges',
      'Research Papers & ArXiv Syncs',
    ],
    metrics: { label: 'AI Research Discussions', value: '30+ Top Papers' },
    ribbonLabel: 'CORE DIVISION // 03',
  },
  {
    id: 'cyber-security',
    num: '04',
    name: 'CYBERSECURITY (CSEC)',
    shortName: 'CSEC',
    tagline: 'Offensive Exploitation & Vulnerability Defense',
    desc: 'Focuses on promoting awareness and technical understanding across cybersecurity through workshops, seminars, and hands-on sessions covering threats, binary exploitation, reverse engineering, and defensive countermeasures.',
    color: '#D946EF',
    colorLight: '#F472B6',
    bgTint: 'rgba(217, 70, 239, 0.04)',
    borderTint: 'rgba(217, 70, 239, 0.3)',
    icon: ShieldAlert,
    subIcon: ShieldCheck,
    link: '/departments/cyber-security',
    highlights: [
      'Capture The Flag (CTF) Circuit',
      'Binary Exploitation (PWN)',
      'Reverse Engineering & Forensics',
      'Applied Cryptography & Zero-Days',
    ],
    metrics: { label: 'Jeopardy & Attack-Defense', value: 'Top 10 National CTF' },
    ribbonLabel: 'CORE DIVISION // 04',
  },
];

// ============================================================================
// 3. MAIN COMPONENT: INTERACTIVE BENTO DIVISIONS (Fusion Showcase)
// ============================================================================

export default function InteractiveBentoDivisions() {
  const [activeDivision, setActiveDivision] = useState<number>(0);

  const currentActive = DIVISIONS[activeDivision] || DIVISIONS[0];

  return (
    <section id="divisions" className="relative z-10 py-24 sm:py-32 overflow-hidden bg-[#07080A]">
      {/* Background Sparkling Light Streaks & Particles (Image 4) */}
      <DivisionSparkCanvas activeColor={currentActive.color} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722]">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-[#FF8A00]" />
            <span>Four Specialized Divisions // Pillars of NJACK</span>
          </div>

          <div className="mt-4 max-w-3xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F3F4F6] leading-[1.1]">
              Engineered Across Four Core Disciplines.
            </h2>
            <p className="max-w-2xl font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              A high-impact fusion of competitive algorithmic prowess, production open-source systems, frontier machine learning research, and adversarial offensive security.
            </p>
          </div>
        </div>

        {/* ====================================================================
            DESKTOP: INTERACTIVE EXPANDING SEGMENTED STRIP (Fusion of Image 2 & 3)
            ==================================================================== */}
        <div className="hidden lg:flex gap-3.5 h-[530px] w-full items-stretch">
          {DIVISIONS.map((div, idx) => {
            const isExpanded = activeDivision === idx;
            const Icon = div.icon;
            const SubIcon = div.subIcon;

            return (
              <div
                key={div.id}
                onMouseEnter={() => setActiveDivision(idx)}
                onClick={() => setActiveDivision(idx)}
                style={{
                  backgroundColor: isExpanded ? 'rgba(14, 16, 22, 0.92)' : 'rgba(11, 13, 18, 0.75)',
                  borderColor: isExpanded ? div.borderTint : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isExpanded
                    ? `0 20px 40px -15px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.12), 0 0 35px -5px ${div.color}25`
                    : 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
                }}
                className={`relative flex flex-col justify-between rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden p-6 ${
                  isExpanded ? 'flex-[2.4]' : 'flex-1 hover:border-white/20'
                }`}
              >
                {/* 1. Top Colored Hairline Indicator Bar (from Image 2) */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${div.color} 0%, ${div.colorLight} 100%)`,
                    opacity: isExpanded ? 1 : 0.6,
                    boxShadow: isExpanded ? `0 0 16px ${div.color}` : 'none',
                  }}
                />

                {/* 2. Top Content Area: Number, Ribbon Notch & Title */}
                <div>
                  {/* Top Bar: Monospace Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-base font-bold tracking-tight transition-colors duration-300"
                        style={{ color: isExpanded ? div.color : '#8A8F98' }}
                      >
                        {div.num}
                      </span>
                      <span className="text-white/20 text-xs font-mono">//</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">
                        {div.shortName}
                      </span>
                    </div>

                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
                      style={{
                        backgroundColor: isExpanded ? `${div.color}15` : 'rgba(255,255,255,0.03)',
                        borderColor: isExpanded ? `${div.color}40` : 'rgba(255,255,255,0.08)',
                        color: isExpanded ? div.color : '#8A8F98',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Division Title (Image 2 Uppercase Style) */}
                  <div className="mt-5">
                    <h3
                      className={`font-display font-black tracking-tight uppercase transition-all duration-300 ${
                        isExpanded ? 'text-2xl text-white' : 'text-lg text-white/90 line-clamp-2'
                      }`}
                    >
                      {div.name}
                    </h3>

                    <p
                      className="mt-1 font-mono text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300"
                      style={{ color: div.color }}
                    >
                      {div.tagline}
                    </p>
                  </div>

                  {/* Expanded Content View */}
                  {isExpanded ? (
                    <div className="mt-5 space-y-5 animate-fade-in">
                      {/* Deep Authentic Description (from Image 3) */}
                      <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#9CA3AF] line-clamp-4">
                        {div.desc}
                      </p>

                      {/* Pillar Badges */}
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F98] mb-2">
                          Core Focus Areas
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {div.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors"
                              style={{
                                backgroundColor: `${div.color}10`,
                                borderColor: `${div.color}25`,
                                color: '#E5E7EB',
                              }}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Collapsed Compact Preview */
                    <div className="mt-5 space-y-4">
                      <p className="font-sans text-xs text-[#8A8F98] line-clamp-3 leading-relaxed">
                        {div.desc}
                      </p>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/50 group-hover:text-white transition-colors">
                          Expand wing <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Bottom Action Bar: Ribbon Callout & Direct Link (Image 3 Style) */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SubIcon className="h-3.5 w-3.5 text-[#8A8F98]" />
                    <span className="font-mono text-[11px] text-[#8A8F98]">
                      {div.metrics.value}
                    </span>
                  </div>

                  <Link
                    href={div.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 group"
                    style={{
                      backgroundColor: isExpanded ? div.color : 'rgba(255,255,255,0.05)',
                      color: isExpanded ? '#FFFFFF' : '#D1D5DB',
                      boxShadow: isExpanded ? `0 0 15px ${div.color}40` : 'none',
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

        {/* ====================================================================
            MOBILE & TABLET: STACKED INTERACTIVE CARDS
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
          {DIVISIONS.map((div) => {
            const Icon = div.icon;
            const SubIcon = div.subIcon;

            return (
              <div
                key={div.id}
                style={{
                  backgroundColor: 'rgba(14, 16, 22, 0.85)',
                  borderColor: div.borderTint,
                  boxShadow: `0 15px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.08)`,
                }}
                className="relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 backdrop-blur-xl overflow-hidden"
              >
                {/* Top Colored Hairline Indicator Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${div.color} 0%, ${div.colorLight} 100%)`,
                    boxShadow: `0 0 12px ${div.color}`,
                  }}
                />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold" style={{ color: div.color }}>
                        {div.num}
                      </span>
                      <span className="text-white/20 text-xs font-mono">//</span>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
                        {div.shortName}
                      </span>
                    </div>

                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg border"
                      style={{
                        backgroundColor: `${div.color}15`,
                        borderColor: `${div.color}40`,
                        color: div.color,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-4">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      {div.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold" style={{ color: div.color }}>
                      {div.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {div.desc}
                  </p>

                  {/* Focus Highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {div.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono border"
                        style={{
                          backgroundColor: `${div.color}10`,
                          borderColor: `${div.color}25`,
                          color: '#E5E7EB',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SubIcon className="h-3.5 w-3.5 text-[#8A8F98]" />
                    <span className="font-mono text-[11px] text-[#8A8F98]">
                      {div.metrics.value}
                    </span>
                  </div>

                  <Link
                    href={div.link}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white transition-all"
                    style={{
                      backgroundColor: div.color,
                      boxShadow: `0 0 15px ${div.color}40`,
                    }}
                  >
                    <span>Know More</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
