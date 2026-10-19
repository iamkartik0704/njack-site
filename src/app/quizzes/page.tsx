import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Trophy, HelpCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

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
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-amber-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-300 mb-4">
              <Trophy className="h-3.5 w-3.5" />
              <span>Self-Check Evaluation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Quizzes</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              No account required. Test your knowledge in algorithms, full-stack dev, machine learning architectures, and network exploits with instant pedagogical feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Quizzes List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-mono font-semibold text-amber-400 border border-amber-500/30">
                    {quiz.department?.name || 'NJACK'}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {quiz.questions.length} Questions
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {quiz.title}
                </h2>

                <div className="mt-1 text-xs font-mono text-cyan-400">
                  Topic: {quiz.topic}
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {quiz.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Instant Explanations
                </span>

                <Link
                  href={`/quizzes/${quiz.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-3.5 py-2 text-xs font-semibold text-amber-300 border border-amber-500/30 transition-all hover:bg-amber-500 hover:text-slate-950 shadow-glow-amber"
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
