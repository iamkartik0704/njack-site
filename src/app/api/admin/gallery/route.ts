import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const { title, slug, cover, date, images } = data;
    if (!title || !slug || !images) {
      return NextResponse.json({ error: 'Missing album fields' }, { status: 400 });
    }

    let parsedImages = [];
    try {
      parsedImages = typeof images === 'string' ? JSON.parse(images) : images;
    } catch {
      return NextResponse.json({ error: 'Images must be valid JSON' }, { status: 400 });
    }

    const album = await prisma.galleryAlbum.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        cover: cover?.trim() || '/home/gallery-default.jpg',
        date: date?.trim() || '2026',
        images: JSON.stringify(parsedImages),
      },
    });

    return NextResponse.json({ success: true, album });
  } catch (error) {
    console.error('Create gallery album error:', error);
    return NextResponse.json({ error: 'Failed to create gallery album' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    await prisma.galleryAlbum.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete gallery album error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery album' }, { status: 500 });
  }
}
