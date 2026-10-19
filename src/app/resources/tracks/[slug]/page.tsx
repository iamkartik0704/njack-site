import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Trophy,
  ArrowRight,
  Layers
} from 'lucide-react';

export const revalidate = 60;

interface TrackPageProps {
  params: {
    slug: string;
  };
}

export default async function SingleTrackPage({ params }: TrackPageProps) {
  const track = await prisma.track.findUnique({
    where: { slug: params.slug },
    include: {
      department: true,
      items: {
        include: {
          resource: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!track) {
    notFound();
  }

  // Look for a matching quiz in the same department
  const relatedQuiz = await prisma.quiz.findFirst({
    where: { departmentId: track.departmentId },
    include: { questions: true },
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-900/50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources/tracks"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Learning Tracks</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-mono font-semibold text-cyan-400 border border-cyan-500/30">
              {track.department.name}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {track.items.length} Step-by-Step Milestones
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {track.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {track.description}
          </p>
        </div>
      </section>

      {/* Step by Step Timeline */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="space-y-4">
          {track.items.map((item, index) => {
            const res = item.resource;
            return (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6 backdrop-blur-md transition-all hover:border-cyan-500/40 hover:bg-slate-900/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 font-mono text-sm font-bold text-cyan-400 shadow-glow-cyan">
                    {index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                        {res.topic}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] font-mono capitalize text-slate-400">
                        {res.type}
                      </span>
                    </div>

                    <h3 className="font-semibold text-white text-base">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                      {res.description}
                    </p>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-white/10 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all"
                  >
                    <span>Open Module</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Closing Quiz Card */}
        {relatedQuiz && (
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-6 sm:p-8 backdrop-blur-md mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-mono font-semibold text-amber-300 border border-amber-500/30">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>Track Milestone Assessment</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Test your mastery: {relatedQuiz.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Completed the modules above? Take our {relatedQuiz.questions.length}-question interactive self-check quiz to validate your understanding with instant explanations.
                </p>
              </div>

              <Link
                href={`/quizzes/${relatedQuiz.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:scale-105 shadow-glow-amber shrink-0"
              >
                <span>Take Self-Check Quiz</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
