import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminQuizzesPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const quizzes = await prisma.quiz.findMany({
    where: scopeWhere(session),
    orderBy: { createdAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true },
    { name: 'topic', label: 'Topic', type: 'text', half: true, inTable: true },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'description', label: 'Description', type: 'textarea' },
    {
      name: 'questions', label: 'Questions', type: 'json',
      help: 'JSON array: [{ "id": "q1", "question": "...", "options": ["A","B"], "correctIndex": 0, "explanation": "...", "order": 1 }]',
      defaultValue: '[]',
    },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/quizzes"
      eyebrow="Quizzes"
      title="Interactive Quizzes"
      description="Self-check quizzes with per-question explanations."
      noun="quiz"
      publicHref="/quizzes"
      rows={serialize(quizzes)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
      wideForm
    />
  );
}
