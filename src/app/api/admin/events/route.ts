import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, slug, description, poster, startsAt, venue, registerUrl, status, recap } = data;

    if (!title || !slug || !startsAt || !venue) {
      return NextResponse.json({ error: 'Missing required event fields' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        description: description?.trim() || '',
        poster: poster?.trim() || '/events/default.jpg',
        startsAt: new Date(startsAt),
        venue: venue.trim(),
        registerUrl: registerUrl?.trim() || null,
        status: status || 'upcoming',
        recap: recap?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { id, title, slug, description, poster, startsAt, venue, registerUrl, status, recap } = data;

    if (!id) return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });

    const event = await prisma.event.update({
      where: { id },
      data: {
        title: title?.trim(),
        slug: slug?.trim()?.toLowerCase(),
        description: description?.trim(),
        poster: poster?.trim(),
        startsAt: startsAt ? new Date(startsAt) : undefined,
        venue: venue?.trim(),
        registerUrl: registerUrl?.trim() || null,
        status,
        recap: recap?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
