import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 300; // Cache 5 min for ultra-fast loads

export const metadata = {
  title: 'Interactive Quizzes | NJACK IIT Patna',
  description:
    'Test your algorithmic rigor, Linux internals, machine learning architectures, and security exploits with instant explanations.',
};

// Authentic department visual identities
const DEPT_THEMES: Record<
  string,
  { color: string; border: string; bg: string; shortTag: string }
> = {
  cp: {
    color: '#FF5722',
    border: 'border-[#FF5722]/30',
    bg: 'bg-[#FF5722]/10',
    shortTag: 'CP // ALGORITHMS',
  },
  'dev-os': {
    color: '#2563EB',
    border: 'border-[#2563EB]/30',
    bg: 'bg-[#2563EB]/10',
    shortTag: 'DevOS // SYSTEMS',
  },
  ml: {
    color: '#FFAC2A',
    border: 'border-[#FFAC2A]/30',
    bg: 'bg-[#FFAC2A]/10',
    shortTag: 'AI-ML // INTELLIGENCE',
  },
  'cyber-security': {
    color: '#EC4899',
    border: 'border-[#EC4899]/30',
    bg: 'bg-[#EC4899]/10',
    shortTag: 'CSEC // DEFENSE',
  },
};

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      department: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      {/* Architectural Header (Crisp Engineering Aesthetic — No Muddy Gradient Blobs) */}
      <section className="relative border-b border-white/[0.08] bg-[#07080A] py-14 sm:py-18">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>[ NJACK // ARENA_DIAGNOSTICS ]</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interactive Quizzes<span className="text-[#FF5722]">.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed pt-1">
              Test your algorithmic rigor, Linux kernel internals, deep learning backprop, and binary exploits. Instant answers and pedagogical step-by-step breakdowns—no sign-up required.
            </p>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const deptSlug = quiz.department?.slug || 'cp';
            const theme = DEPT_THEMES[deptSlug] || DEPT_THEMES.cp;
            
            let questionCount = 0;
            try {
              questionCount = JSON.parse(quiz.questions || '[]').length;
            } catch {
              questionCount = 0;
            }

            return (
              <div
                key={quiz.id}
                style={{
                  backgroundColor: '#0A0D14',
                  boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                }}
                className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] p-6 transition-all duration-200 hover:border-white/20 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Razor-Sharp Accent Line per Division */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: theme.color }}
                />

                <div className="space-y-4">
                  {/* Division Tag & Question Counter */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase border ${theme.bg} ${theme.border}`}
                      style={{ color: theme.color }}
                    >
                      {theme.shortTag}
                    </span>

                    <span className="font-mono text-xs text-neutral-400 bg-white/[0.03] border border-white/[0.06] rounded px-2 py-0.5">
                      {String(questionCount).padStart(2, '0')} Qs
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg font-bold text-white group-hover:text-neutral-100 transition-colors leading-snug">
                    {quiz.title}
                  </h2>

                  {/* Topic Metadata Pill */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-neutral-400">
                      Topic // <span className="text-neutral-200">{quiz.topic}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {quiz.description}
                  </p>
                </div>

                {/* Bottom Footer: Feature Tag & Start Button */}
                <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/80" />
                    <span>Instant Review</span>
                  </div>

                  <Link
                    href={`/quizzes/${quiz.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 shadow-sm"
                    style={{ backgroundColor: theme.color }}
                  >
                    <span>Launch</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
