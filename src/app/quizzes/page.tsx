import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';

export const revalidate = 300; // Cache 5 min for ultra-fast loads

export const metadata = {
  title: 'Interactive Quizzes | NJACK IIT Patna',
  description:
    'Test algorithmic mastery, computer systems, machine learning architectures, and security exploits with instant explanations.',
};

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      department: true,
      questions: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-14 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-4">
              <Trophy className="h-3.5 w-3.5" />
              <span>DIAGNOSTIC & SELF-EVALUATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interactive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8A00] to-[#FF5722]">
                Quizzes
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              No account required. Test your knowledge in algorithmic complexities, operating systems internals, deep learning backpropagation, and CTF binary exploits with instant pedagogical explanations.
            </p>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="rounded-full bg-[#FF5722]/10 px-3 py-1 text-xs font-mono font-semibold text-[#FF5722] border border-[#FF5722]/20">
                    {quiz.department?.name || 'NJACK Core'}
                  </span>
                  <span className="text-xs font-mono text-[#8A8F98]">
                    {quiz.questions.length} Questions
                  </span>
                </div>

                <h2 className="font-display text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors">
                  {quiz.title}
                </h2>

                <div className="mt-1 text-xs font-mono text-[#FF8A00]">
                  Topic: {quiz.topic}
                </div>

                <p className="mt-3 text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                  {quiz.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8A8F98]">
                  Instant Explanations
                </span>

                <Link
                  href={`/quizzes/${quiz.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF5722] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#FF3D00] hover:shadow-[0_0_15px_rgba(255,87,34,0.35)]"
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
