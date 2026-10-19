import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { name, role, departmentId, year, photo, linkedin, github, email, order } = data;

    if (!name || !role) {
      return NextResponse.json({ error: 'Missing name or role' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        departmentId: departmentId || null,
        year: year || '2026-2027',
        photo: photo?.trim() || '/team/default.png',
        linkedin: linkedin?.trim() || null,
        github: github?.trim() || null,
        email: email?.trim() || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Create team member error:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
