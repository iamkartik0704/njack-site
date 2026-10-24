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
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16"> {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-20 sm:py-24"> <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-3xl"> <h1 className="font-display text-[2rem] sm:text-5xl font-semibold tracking-[-0.035em] text-[#F3F4F6]"> Interactive                Quizzes
               </h1> <p className="mt-3 text-sm sm:text-base text-[#8A8F98] leading-relaxed"> No account required. Test your knowledge in algorithmic complexities, operating systems internals, deep learning backpropagation, and CTF binary exploits with instant pedagogical explanations.
            </p> </div> </div> </section> {/* Quizzes Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"> <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.10] gap-6"> {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group relative flex flex-col gap-3 py-7 transition-colors sm:grid sm:grid-cols-[minmax(0,22rem)_1fr_auto] sm:items-center sm:gap-8 hover:bg-white/[0.015]" > <div> <div className="flex items-center justify-between gap-3 mb-3"> <span className="rounded-full bg-[#FF5722]/10 px-3 py-1 text-xs font-mono font-semibold text-[#FF5722] border border-[#FF5722]/20"> {quiz.department?.name || 'NJACK Core'}
                  </span> <span className="text-xs font-mono text-[#8A8F98]"> {(() => {
                      try {
                        return JSON.parse(quiz.questions || '[]').length;
                      } catch {
                        return 0;
                      }
                    })()} Questions
                  </span> </div> <h2 className="font-display text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors"> {quiz.title}
                </h2> <div className="mt-1 text-xs font-mono text-[#FF8A00]"> Topic: {quiz.topic}
                </div> <p className="mt-3 text-xs text-[#8A8F98] leading-relaxed line-clamp-3"> {quiz.description}
                </p> </div> <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between"> <span className="text-[11px] font-mono text-[#8A8F98]"> Instant Explanations
                </span> <Link
                  href={`/quizzes/${quiz.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-[#FF5722] px-3.5 py-2 text-xs font-semibold text-[#F3F4F6] transition-all hover:bg-[#FF3D00]" > <span>Start Quiz</span> <ArrowRight className="h-3.5 w-3.5" /> </Link> </div> </div> ))}
        </div> </main> </div> );
}
