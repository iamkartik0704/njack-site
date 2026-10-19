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
  ExternalLink,
  BookOpen,
  Sparkles,
  Trophy,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  Mail
} from 'lucide-react';

export const revalidate = 60;

const deptConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  badge: string;
  border: string;
  accent: string;
  glow: string;
  skills: string[];
}> = {
  cp: {
    icon: Binary,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
    glow: 'shadow-glow-amber',
    skills: [
      'Data Structures (Segment Trees, Treaps, Disjoint Set Union)',
      'Dynamic Programming & Bitmasking Optimizations',
      'Graph Algorithms & Flow Networks (Dijkstra, Tarjan, MaxFlow)',
      'Number Theory, Combinatorics & Fast Fourier Transform',
      'ICPC & Codeforces Division 1 contest strategies',
    ],
  },
  'dev-os': {
    icon: Code2,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
    glow: 'shadow-glow-cyan',
    skills: [
      'Full-Stack Modern Web (React, Next.js, Node.js, TypeScript)',
      'Systems Programming & Linux Kernel Interfacing',
      'DevOps & Cloud Native (Docker, Kubernetes, CI/CD Pipelines)',
      'Open Source Contribution (GSoC, LFX, Hacktoberfest)',
      'Distributed Systems & High-Throughput Database Design',
    ],
  },
  ml: {
    icon: Brain,
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
    glow: 'shadow-[0_0_30px_-8px_rgba(168,85,247,0.4)]',
    skills: [
      'Deep Learning Fundamentals (PyTorch, TensorFlow, Autograd)',
      'Computer Vision & Object Detection (CNNs, YOLO, Diffusion)',
      'Natural Language Processing & Transformer Architecture (BERT, LLMs)',
      'Reinforcement Learning & Agentic Decision Systems',
      'Scalable MLOps & Model Quantization (ONNX, TensorRT, vLLM)',
    ],
  },
  'cyber-security': {
    icon: ShieldAlert,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_-8px_rgba(16,185,129,0.4)]',
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
      tracks: {
        include: {
          items: {
            include: { resource: true },
          },
        },
        orderBy: { order: 'asc' },
      },
      resources: {
        take: 6,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      },
      quizzes: {
        include: { questions: true },
      },
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

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero Header */}
      <section className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-b ${config.gradient} py-14 sm:py-20`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Division Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
            {allDepts.map((d) => (
              <Link
                key={d.slug}
                href={`/departments/${d.slug}`}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  d.slug === slug
                    ? 'bg-white/20 text-white border border-white/30 font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {d.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider backdrop-blur-md"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <DeptIcon className={`h-4 w-4 ${config.accent}`} />
                <span>NJACK Technical Division</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {department.name}
              </h1>

              {department.tagline && (
                <p className={`text-base sm:text-lg font-medium ${config.accent}`}>
                  {department.tagline}
                </p>
              )}

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {department.description}
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl text-center min-w-[260px]">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 ${config.accent} mb-4 ${config.glow}`}>
                <DeptIcon className="h-10 w-10" />
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                Division Status
              </div>
              <div className="font-bold text-white mt-1">
                Active & Enrolling
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Core Curriculum & Focus Areas */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Compass className={`h-5 w-5 ${config.accent}`} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              What You&apos;ll Master in this Division
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all hover:border-white/20"
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/5 font-mono text-xs font-bold ${config.accent}`}>
                  0{index + 1}
                </div>
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Curated Learning Tracks */}
        {department.tracks.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className={`h-5 w-5 ${config.accent}`} />
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Curated Learning Tracks
                </h2>
              </div>
              <Link
                href="/resources/tracks"
                className={`text-xs font-mono font-semibold ${config.accent} hover:underline flex items-center gap-1`}
              >
                <span>View all tracks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {department.tracks.map((track) => (
                <div
                  key={track.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{track.title}</h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {track.description}
                    </p>
                    <div className="mt-4 text-xs font-mono text-slate-400">
                      Includes {track.items.length} guided modules
                    </div>
                  </div>

                  <Link
                    href={`/resources/tracks/${track.slug}`}
                    className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white border border-white/10 hover:bg-white/10 transition-all self-start`}
                  >
                    <span>Follow Roadmap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top Resources Catalog Preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`h-5 w-5 ${config.accent}`} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Featured Resources & Cheat Sheets
              </h2>
            </div>
            <Link
              href={`/resources/${department.slug}`}
              className={`text-xs font-mono font-semibold ${config.accent} hover:underline flex items-center gap-1`}
            >
              <span>Explore all {department.name} resources</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {department.resources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="uppercase text-cyan-400">{resource.type}</span>
                    <span className="capitalize">{resource.difficulty}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-snug">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {resource.description}
                  </p>
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Self-Check Quizzes for this Department */}
        {department.quizzes.length > 0 && (
          <section className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Trophy className="h-5 w-5" />
              <h2 className="text-xl font-bold text-white">
                Department Self-Check Quizzes
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Put your knowledge to the test before club contests and technical interviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {department.quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quizzes/${quiz.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4 hover:border-amber-500/40 transition-all"
                >
                  <div>
                    <h3 className="font-bold text-white text-sm">{quiz.title}</h3>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {quiz.questions.length} Questions • Instant Feedback
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-amber-400 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Department Coordinators */}
        {department.teamMembers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className={`h-5 w-5 ${config.accent}`} />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Division Coordinators ({department.teamMembers[0]?.year || '2026-2027'})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-all"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-800">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-sm">{member.name}</h3>
                    <div className="text-xs font-mono text-cyan-400">{member.role}</div>

                    <div className="flex items-center gap-2 pt-1 text-slate-400">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan-400 transition-colors text-[11px]"
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors text-[11px]"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
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
