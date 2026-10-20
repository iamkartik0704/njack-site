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
  Trophy,
  Users,
  Compass,
} from 'lucide-react';

export const revalidate = 300;

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
    gradient: 'from-[#FF8A00]/20 via-[#FF5722]/10 to-transparent',
    badge: 'bg-[#FF8A00]/15 text-[#FF8A00] border-[#FF8A00]/30',
    border: 'border-[#FF8A00]/30',
    accent: 'text-[#FF8A00]',
    glow: 'shadow-[0_0_30px_-8px_rgba(255,138,0,0.4)]',
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
    gradient: 'from-[#FF5722]/20 via-[#FF8A00]/10 to-transparent',
    badge: 'bg-[#FF5722]/15 text-[#FF5722] border-[#FF5722]/30',
    border: 'border-[#FF5722]/30',
    accent: 'text-[#FF5722]',
    glow: 'shadow-[0_0_30px_-8px_rgba(255,87,34,0.4)]',
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
    gradient: 'from-[#FF8A00]/20 via-[#D9381E]/10 to-transparent',
    badge: 'bg-[#FF8A00]/15 text-[#FF8A00] border-[#FF8A00]/30',
    border: 'border-[#FF8A00]/30',
    accent: 'text-[#FF8A00]',
    glow: 'shadow-[0_0_30px_-8px_rgba(255,138,0,0.4)]',
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
    gradient: 'from-[#FF5722]/20 via-[#D9381E]/10 to-transparent',
    badge: 'bg-[#FF5722]/15 text-[#FF5722] border-[#FF5722]/30',
    border: 'border-[#FF5722]/30',
    accent: 'text-[#FF5722]',
    glow: 'shadow-[0_0_30px_-8px_rgba(255,87,34,0.4)]',
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
      {/* Hero Header */}
      <section className={`relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b ${config.gradient} py-14 sm:py-20`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Division Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
            {allDepts.map((d) => (
              <Link
                key={d.slug}
                href={`/departments/${d.slug}`}
                className={`rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  d.slug === slug
                    ? 'bg-[#FF5722] text-white font-semibold shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                    : 'bg-white/[0.04] text-[#8A8F98] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {d.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF5722] backdrop-blur-md">
                <DeptIcon className="h-4 w-4" />
                <span>NJACK Technical Division</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                {department.name}
              </h1>

              {department.tagline && (
                <p className={`text-base sm:text-lg font-medium ${config.accent}`}>
                  {department.tagline}
                </p>
              )}

              <p className="text-sm sm:text-base text-[#8A8F98] leading-relaxed">
                {department.description}
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-8 backdrop-blur-xl text-center min-w-[260px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 ${config.accent} mb-4 ${config.glow}`}>
                <DeptIcon className="h-10 w-10" />
              </div>
              <div className="font-mono text-xs text-[#8A8F98] uppercase tracking-widest">
                Division Status
              </div>
              <div className="font-bold text-white mt-1">
                Active &amp; Enrolling
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
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              What You&apos;ll Master in this Division
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-4 backdrop-blur-md transition-all hover:border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] font-mono text-xs font-bold ${config.accent}`}>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className={`h-5 w-5 ${config.accent}`} />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Featured Resources &amp; Cheat Sheets
                </h2>
              </div>
              <Link
                href="/resources"
                className={`text-xs font-mono font-semibold ${config.accent} hover:underline flex items-center gap-1`}
              >
                <span>Explore all resources</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {department.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8F98] mb-2">
                      <span className="uppercase text-[#FF5722]">{resource.type}</span>
                      <span className="capitalize">{resource.difficulty}</span>
                    </div>
                    <h3 className="font-display font-semibold text-white text-sm leading-snug">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#8A8F98] leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs font-semibold text-[#FF5722] hover:text-white transition-colors"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Self-Check Quizzes for this Department */}
        {department.quizzes.length > 0 && (
          <section className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 sm:p-8 backdrop-blur-md space-y-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 text-[#FF5722]">
              <Trophy className="h-5 w-5" />
              <h2 className="font-display text-xl font-bold text-white tracking-tight">
                Division Self-Check Quizzes
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8F98] max-w-2xl">
              Put your knowledge to the test before club contests and technical recruitment interviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {department.quizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quizzes/${quiz.slug}`}
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#07080A]/60 p-4 hover:border-[#FF5722]/40 transition-all"
                >
                  <div>
                    <h3 className="font-display font-bold text-white text-sm">{quiz.title}</h3>
                    <div className="text-[11px] font-mono text-[#8A8F98] mt-0.5">
                      {(() => {
                        try {
                          return JSON.parse(quiz.questions || '[]').length;
                        } catch {
                          return 0;
                        }
                      })()} Questions • Instant Feedback
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#FF5722] shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Division Coordinators */}
        {coordinators.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className={`h-5 w-5 ${config.accent}`} />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Division Coordinators
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coordinators.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#07080A]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-sm">{member.name}</h3>
                    <div className="text-xs font-mono text-[#FF5722]">{member.role}</div>

                    <div className="flex items-center gap-2 pt-1 text-[#8A8F98]">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FF5722] transition-colors text-[11px]"
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

        {/* Division Sub-Coordinators */}
        {subCoordinators.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neutral-400" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Division Sub-Coordinators
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCoordinators.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-md flex items-center gap-4 hover:border-white/20 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#07080A]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-sm">{member.name}</h3>
                    <div className="text-xs font-mono text-neutral-300">{member.role}</div>

                    <div className="flex items-center gap-2 pt-1 text-[#8A8F98]">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FF5722] transition-colors text-[11px]"
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
