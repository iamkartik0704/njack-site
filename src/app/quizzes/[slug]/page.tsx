import React from 'react';
import { prisma } from '@/lib/prisma';
import QuizPlayer from '@/components/QuizPlayer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Trophy } from 'lucide-react';

export const revalidate = 60;

interface QuizPageProps {
  params: {
    slug: string;
  };
}

export default async function SingleQuizPage({ params }: QuizPageProps) {
  const quiz = await prisma.quiz.findUnique({
    where: { slug: params.slug },
    include: {
      department: true,
      questions: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Quizzes</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-300 mb-3">
            <Trophy className="h-3.5 w-3.5" />
            <span>{quiz.department?.name || 'NJACK'} Self-Check</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            {quiz.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            {quiz.description}
          </p>
        </div>

        {/* Interactive Quiz Engine */}
        <QuizPlayer
          quizTitle={quiz.title}
          quizTopic={quiz.topic}
          departmentName={quiz.department?.name || 'General CS'}
          questions={quiz.questions}
        />
      </div>
    </div>
  );
}
