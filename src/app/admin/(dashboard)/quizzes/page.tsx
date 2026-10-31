import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminQuizzesManager from '@/components/AdminQuizzesManager';
import { Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminQuizzesPage() {
  const [rawQuizzes, departments] = await Promise.all([
    prisma.quiz.findMany({
      include: {
        department: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.department.findMany({
      select: { id: true, name: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  const quizzes = rawQuizzes.map((q) => {
    let parsedQuestions: any[] = [];
    try {
      parsedQuestions = JSON.parse(q.questions || '[]');
    } catch {
      parsedQuestions = [];
    }
    return {
      ...q,
      questions: parsedQuestions.map((x) => ({ id: x.id || '' })),
    };
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FF5722]">
          <Trophy className="h-3.5 w-3.5" />
          <span>Interactive Self-Check Evaluation Authoring</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Quizzes Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Create, edit, and organize multiple-choice concept evaluations with instant pedagogical explanations for freshers.
        </p>
      </div>

      <AdminQuizzesManager
        initialQuizzes={quizzes}
        departments={departments}
      />
    </div>
  );
}
