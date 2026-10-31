import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Trophy,
  Users,
  Compass,
} from 'lucide-react';

// Clean Uniform Social Icons
function LinkedInIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function CodeforcesIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9A1.5 1.5 0 0 1 1.5 7.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 9A1.5 1.5 0 0 1 24 13.5v6a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 18 19.5v-6a1.5 1.5 0 0 1 1.5-1.5h3z" />
    </svg>
  );
}

export const revalidate = 300;

// Authentic department visual configuration
const deptConfig: Record<string, {
  num: string;
  shortName: string;
  focusTag: string;
  color: string;
  colorLight: string;
  icon: React.ElementType;
  skills: string[];
  flagship: string;
}> = {
  cp: {
    num: '01',
    shortName: 'CP',
    focusTag: 'ALGORITHMS & DSA',
    color: '#FF5722',
    colorLight: '#FFA726',
    icon: Binary,
    flagship: 'ICPC World Finals Track & Weekly Contests',
    skills: [
      'Data Structures (Segment Trees, Treaps, Disjoint Set Union)',
      'Dynamic Programming & Bitmasking Optimizations',
      'Graph Algorithms & Flow Networks (Dijkstra, Tarjan, MaxFlow)',
      'Number Theory, Combinatorics & Fast Fourier Transform',
      'ICPC & Codeforces Division 1 contest strategies',
    ],
  },
  'dev-os': {
    num: '02',
    shortName: 'DevOS',
    focusTag: 'SYSTEMS & OPEN SOURCE',
    color: '#2563EB',
    colorLight: '#60A5FA',
    icon: Code2,
    flagship: 'NJACK Winter of Code (NWOC) & Open Source',
    skills: [
      'Full-Stack Modern Web (React, Next.js, Node.js, TypeScript)',
      'Systems Programming & Linux Kernel Interfacing',
      'DevOps & Cloud Native (Docker, Kubernetes, CI/CD Pipelines)',
      'Open Source Contribution (GSoC, LFX, Hacktoberfest)',
      'Distributed Systems & High-Throughput Database Design',
    ],
  },
  ml: {
    num: '03',
    shortName: 'AI-ML',
    focusTag: 'ARTIFICIAL INTELLIGENCE',
    color: '#FFAC2A',
    colorLight: '#FFD166',
    icon: Brain,
    flagship: 'AI Research Paper Reading & Kaggle Sprints',
    skills: [
      'Deep Learning Fundamentals (PyTorch, TensorFlow, Autograd)',
      'Computer Vision & Object Detection (CNNs, YOLO, Diffusion)',
      'Natural Language Processing & Transformer Architecture (BERT, LLMs)',
      'Reinforcement Learning & Agentic Decision Systems',
      'Scalable MLOps & Model Quantization (ONNX, TensorRT, vLLM)',
    ],
  },
  'cyber-security': {
    num: '04',
    shortName: 'CSEC',
    focusTag: 'INFOSEC & DEFENSE',
    color: '#EC4899',
    colorLight: '#F472B6',
    icon: ShieldAlert,
    flagship: 'National CTF Competitions & Zero-Day Research',
    skills: [
      'Binary Exploitation, ROP Gadgets & Buffer Overflows',
      'Web Application Security (OWASP Top 10, SSRF, SQLi, XSS)',
      'Modern Cryptography (RSA, AES, Zero-Knowledge Proofs)',
      'Reverse Engineering (Ghidra, IDA Pro, x64dbg)',
      'CTF Competition Tactics & Incident Response Forensics',
    ],
  },
};

interface DeptPageProps {
  params: {
    slug: string;
  };
}

export default async function DepartmentDetailPage({ params }: DeptPageProps) {
  const { slug } = params;

  const department = await prisma.department.findUnique({
    where: { slug },
    include: {
      teamMembers: {
        orderBy: { order: 'asc' },
      },
      resources: {
        take: 6,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      },
      quizzes: true,
    },
  });

  if (!department) {
    notFound();
  }

  const allDepts = await prisma.department.findMany({
    select: { name: true, slug: true },
    orderBy: { order: 'asc' },
  });

  const config = deptConfig[slug] || deptConfig['dev-os'];
  const DeptIcon = config.icon;

  const coordinators = department.teamMembers.filter(
    (member) => !member.role.toLowerCase().includes('sub')
  );
  const subCoordinators = department.teamMembers.filter(
    (member) => member.role.toLowerCase().includes('sub')
  );

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      
      {/* ====================================================================
          1. ARCHITECTURAL HERO HEADER (No Muddy AI Glow Smudges)
          ==================================================================== */}
      <section className="relative border-b border-white/[0.08] bg-[#07080A] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Division Stepper Pills: CP, DevOS, AI-ML, CSEC */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/[0.06] pb-4">
            {allDepts.map((d) => {
              const dCfg = deptConfig[d.slug] || deptConfig['dev-os'];
              const isCurrent = d.slug === slug;

              return (
                <Link
                  key={d.slug}
                  href={`/departments/${d.slug}`}
                  style={{
                    backgroundColor: isCurrent ? `${dCfg.color}20` : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isCurrent ? `${dCfg.color}70` : 'rgba(255, 255, 255, 0.08)',
                    color: isCurrent ? dCfg.color : '#9CA3AF',
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition-all duration-150 whitespace-nowrap border ${
                    isCurrent
                      ? 'shadow-sm ring-1 ring-white/10'
                      : 'hover:text-white hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <span className="opacity-60">{dCfg.num}</span>
                  <span>{dCfg.shortName}</span>
                </Link>
              );
            })}
          </div>

          {/* Hero Row: Left Briefing + Right Division Telemetry Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Briefing Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: config.color }}>
                <span className="flex h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
                <span>[ NJACK // DIVISION_{config.num} // {config.focusTag} ]</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                {department.name}<span style={{ color: config.color }}>.</span>
              </h1>

              {department.tagline && (
                <div className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  Mission // <span style={{ color: config.color }}>{department.tagline}</span>
                </div>
              )}

              <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-2xl pt-1">
                {department.description}
              </p>
            </div>

            {/* Right Division Telemetry Dossier Card */}
            <div
              style={{
                backgroundColor: '#0A0D14',
                boxShadow: '0 16px 40px -16px rgba(0,0,0,0.85), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              className="lg:col-span-4 relative rounded-xl border p-5 sm:p-6 overflow-hidden space-y-4"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: config.color }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm"
                    style={{
                      backgroundColor: `${config.color}20`,
                      borderColor: `${config.color}50`,
                      color: config.color,
                    }}
                  >
                    <DeptIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      DIV-{config.num}
                    </span>
                    <p className="font-mono text-[10px] text-neutral-400">
                      NJACK WING
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/[0.06] text-xs font-mono">
                <div>
                  <span className="text-neutral-500 text-[10px] uppercase tracking-wider block">
                    Flagship Activity
                  </span>
                  <span className="text-neutral-200 text-xs font-medium">
                    {config.flagship}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-neutral-400 text-[11px]">
                  <span>Leadership:</span>
                  <span className="text-white font-bold">
                    {coordinators.length} Leads • {subCoordinators.length} Sub-Leads
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                  <span>Handbooks &amp; Repos:</span>
                  <span className="text-white font-bold">
                    {department.resources.length} Handbooks
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          2. MAIN CONTENT AREA
          ==================================================================== */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Core Curriculum & Focus Areas */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: config.color }}>
            <Compass className="h-4 w-4" />
            <span>[ 01 // TECHNICAL_CURRICULUM ]</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Curriculum &amp; Technical Mastery<span style={{ color: config.color }}>.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {config.skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#0A0D14',
                  boxShadow: '0 10px 24px -10px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.06)',
                }}
                className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold"
                  style={{
                    backgroundColor: `${config.color}15`,
                    borderColor: `${config.color}40`,
                    color: config.color,
                  }}
                >
                  0{index + 1}
                </div>
                <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Resources Catalog Preview */}
        {department.resources.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
                  <BookOpen className="h-4 w-4" />
                  <span>[ 02 // DIVISION_ARTIFACTS ]</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  Featured Resources &amp; Handbooks<span style={{ color: config.color }}>.</span>
                </h2>
              </div>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold transition-colors hover:underline"
                style={{ color: config.color }}
              >
                <span>Explore all resources</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {department.resources.map((resource) => (
                <div
                  key={resource.id}
                  style={{
                    backgroundColor: '#0A0D14',
                    boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                  }}
                  className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Top Accent Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: config.color }}
                  />

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span
                        className="rounded px-2 py-0.5 font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${config.color}15`,
                          borderColor: `${config.color}40`,
                          color: config.color,
                        }}
                      >
                        [ {resource.type} ]
                      </span>
                      <span className="capitalize text-neutral-400">
                        {resource.difficulty}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-neutral-100 transition-colors">
                      {resource.title}
                    </h3>

                    <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-bold transition-colors hover:brightness-110"
                    style={{ color: config.color }}
                  >
                    <span>Open Resource</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Self-Check Quizzes for this Department */}
        {department.quizzes.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
              <Trophy className="h-4 w-4" />
              <span>[ 03 // SKILL_ASSESSMENT ]</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Division Self-Check Quizzes<span style={{ color: config.color }}>.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {department.quizzes.map((quiz) => {
                let count = 0;
                try {
                  count = JSON.parse(quiz.questions || '[]').length;
                } catch {
                  count = 0;
                }

                return (
                  <Link
                    key={quiz.id}
                    href={`/quizzes/${quiz.slug}`}
                    style={{
                      backgroundColor: '#0A0D14',
                      boxShadow: '0 10px 24px -10px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.06)',
                    }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] p-4.5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5 group"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-white text-sm group-hover:text-neutral-100 transition-colors">
                        {quiz.title}
                      </h3>
                      <div className="text-[11px] font-mono text-[#8A8F98]">
                        {count} Questions • Instant Explanations
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: config.color }} />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Division Coordinators (3 in a row on desktop) */}
        {coordinators.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: config.color }}>
              <Users className="h-4 w-4" />
              <span>[ 04 // LEADERSHIP_TEAM ]</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Division Coordinators<span style={{ color: config.color }}>.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coordinators.map((member) => (
                <div
                  key={member.id}
                  style={{
                    backgroundColor: '#0A0D14',
                    boxShadow: '0 16px 40px -18px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                  }}
                  className="group rounded-2xl border border-white/[0.08] p-6 text-center transition-all duration-200 hover:border-white/20 hover:-translate-y-1"
                >
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl border border-white/10 bg-[#07080A]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      unoptimized
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <h3 className="font-display text-base font-bold text-white">{member.name}</h3>
                    <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: config.color }}>
                      {member.role}
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2 text-[#8A8F98]">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors p-1"
                          title="LinkedIn"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors p-1"
                          title="GitHub"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.codeforces && (
                        <a
                          href={member.codeforces}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors p-1"
                          title="Codeforces"
                        >
                          <CodeforcesIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Division Sub-Coordinators (4 in a row on desktop — Square Box Card following Hierarchy) */}
        {subCoordinators.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <Users className="h-4 w-4" />
              <span>[ 05 // ASSOCIATE_LEADS ]</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Division Sub-Coordinators<span className="text-neutral-500">.</span>
            </h2>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {subCoordinators.map((member) => (
                <div
                  key={member.id}
                  style={{
                    backgroundColor: '#0A0D14',
                    boxShadow: '0 10px 28px -12px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.06)',
                  }}
                  className="group flex flex-col justify-between rounded-xl border border-white/[0.08] p-4 sm:p-5 text-center transition-all duration-200 hover:border-white/20 hover:-translate-y-1"
                >
                  <div>
                    {/* Square Box Photo (Compact proportion following hierarchy) */}
                    <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-xl border border-white/10 bg-[#07080A]">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    <div className="mt-3.5 space-y-1">
                      <h3 className="font-display font-bold text-white text-sm sm:text-[15px] leading-snug truncate">
                        {member.name}
                      </h3>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        Sub-Coordinator
                      </div>
                    </div>
                  </div>

                  {/* Social Links Row */}
                  <div className="flex items-center justify-center gap-2.5 pt-3 mt-3 border-t border-white/[0.06] text-[#8A8F98]">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors p-1"
                        title="LinkedIn"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors p-1"
                        title="GitHub"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.codeforces && (
                      <a
                        href={member.codeforces}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors p-1"
                        title="Codeforces"
                      >
                        <CodeforcesIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
