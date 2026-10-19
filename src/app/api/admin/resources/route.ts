import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, description, type, url, departmentId, topic, tags, difficulty, featured } = data;

    if (!title || !type || !url || !departmentId || !topic) {
      return NextResponse.json({ error: 'Missing required resource fields' }, { status: 400 });
    }

    const resource = await prisma.resource.create({
      data: {
        title: title.trim(),
        description: description?.trim() || '',
        type,
        url: url.trim(),
        departmentId,
        topic: topic.trim(),
        tags: tags?.trim() || '',
        difficulty: difficulty || 'Beginner',
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, resource });
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { id, title, description, type, url, departmentId, topic, tags, difficulty, featured } = data;

    if (!id) return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 });

    const resource = await prisma.resource.update({
      where: { id },
      data: {
        title: title?.trim(),
        description: description?.trim(),
        type,
        url: url?.trim(),
        departmentId,
        topic: topic?.trim(),
        tags: tags?.trim(),
        difficulty,
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, resource });
  } catch (error) {
    console.error('Update resource error:', error);
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete resource error:', error);
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}
