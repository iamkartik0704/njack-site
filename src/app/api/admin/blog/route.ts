import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, slug, bodyMd, cover, author, tags, status } = data;

    if (!title || !slug || !bodyMd || !author) {
      return NextResponse.json({ error: 'Missing required post fields' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        bodyMd: bodyMd.trim(),
        cover: cover?.trim() || null,
        author: author.trim(),
        tags: tags?.trim() || 'Club, Tech',
        status: status || 'published',
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
