import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, slug, description, cover, stackTags, repoUrl, demoUrl, contributors, featured } = data;

    if (!title || !slug || !description) {
      return NextResponse.json({ error: 'Missing required project fields' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim(),
        cover: cover?.trim() || '/projects/default.png',
        stackTags: stackTags?.trim() || 'Next.js, TypeScript',
        repoUrl: repoUrl?.trim() || null,
        demoUrl: demoUrl?.trim() || null,
        contributors: contributors?.trim() || null,
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
