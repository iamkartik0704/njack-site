import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, slug, departmentId, topic, description, questions } = data;

    if (!title || !slug || !departmentId || !topic) {
      return NextResponse.json({ error: 'Missing required quiz fields' }, { status: 400 });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        departmentId,
        topic: topic.trim(),
        description: description?.trim() || '',
        questions: JSON.stringify(
          (questions || []).map((q: any, idx: number) => ({
            id: `q-${Date.now()}-${idx}`,
            question: q.question.trim(),
            options: typeof q.options === 'string' ? q.options : JSON.stringify(q.options),
            correctIndex: Number(q.correctIndex) || 0,
            explanation: q.explanation?.trim() || '',
            order: idx,
          }))
        ),
      },
    });

    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    console.error('Create quiz error:', error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.quiz.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete quiz error:', error);
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}
