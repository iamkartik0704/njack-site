import React from 'react';
import { prisma } from '@/lib/prisma';
import QuizPlayer from '@/components/QuizPlayer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Trophy } from 'lucide-react';

export const revalidate = 300;

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
    },
  });

  if (!quiz) {
    notFound();
  }

  const questions = (() => {
    try {
      return JSON.parse(quiz.questions || '[]');
    } catch {
      return [];
    }
  })();

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF5722] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Quizzes</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-3">
            <Trophy className="h-3.5 w-3.5" />
            <span>{quiz.department?.name || 'NJACK Core'} Self-Check</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white">
            {quiz.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8A8F98]">
            {quiz.description}
          </p>
        </div>

        {/* Interactive Quiz Engine */}
        <QuizPlayer
          quizTitle={quiz.title}
          quizTopic={quiz.topic}
          departmentName={quiz.department?.name || 'General CS'}
          questions={questions}
        />
      </div>
    </div>
  );
}
