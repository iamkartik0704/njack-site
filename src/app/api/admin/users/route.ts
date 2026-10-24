import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, requireAdmin } from '@/lib/auth';

const ROLES = ['super-admin', 'coordinator', 'sub-coordinator'] as const;
type Role = (typeof ROLES)[number];

const isRole = (v: unknown): v is Role => ROLES.includes(v as Role);
const bad = (message: string, status = 400) => NextResponse.json({ error: message }, { status });

/**
 * Division-scoped roles need a division, otherwise the holder could manage nothing
 * (or, if the check were loose, everything).
 */
function validate(role: unknown, departmentId: unknown) {
  if (!isRole(role)) return 'Role must be super-admin, coordinator or sub-coordinator';
  if (role !== 'super-admin' && !departmentId) return 'Coordinators must be assigned a division';
  return null;
}

export async function POST(req: Request) {
  const { session, error } = await requireAdmin({ superOnly: true });
  if (error) return error;

  try {
    const { email, password, name, role, departmentId } = await req.json();

    if (!email || !password || !name) return bad('Email, password and name are required');
    if (String(password).length < 8) return bad('Password must be at least 8 characters');

    const invalid = validate(role, departmentId);
    if (invalid) return bad(invalid);

    const normalised = String(email).toLowerCase().trim();
    if (await prisma.adminUser.findUnique({ where: { email: normalised } })) {
      return bad('An account with that email already exists', 409);
    }

    const user = await prisma.adminUser.create({
      data: {
        email: normalised,
        name: String(name).trim(),
        passwordHash: await hashPassword(password),
        role,
        departmentId: role === 'super-admin' ? null : departmentId,
      },
      select: { id: true, email: true, name: true, role: true, departmentId: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error('Create admin user error:', err);
    return bad('Failed to create account', 500);
  }
}

export async function PUT(req: Request) {
  const { session, error } = await requireAdmin({ superOnly: true });
  if (error) return error;

  try {
    const { id, name, role, departmentId, password } = await req.json();
    if (!id) return bad('ID is required');

    const invalid = validate(role, departmentId);
    if (invalid) return bad(invalid);

    // Never let the last super admin be demoted — that would lock everyone out.
    if (role !== 'super-admin') {
      const target = await prisma.adminUser.findUnique({ where: { id } });
      if (target?.role === 'super-admin') {
        const supers = await prisma.adminUser.count({ where: { role: 'super-admin' } });
        if (supers <= 1) return bad('Cannot demote the only super admin', 409);
      }
    }

    const user = await prisma.adminUser.update({
      where: { id },
      data: {
        name: typeof name === 'string' ? name.trim() : undefined,
        role,
        departmentId: role === 'super-admin' ? null : departmentId,
        ...(password ? { passwordHash: await hashPassword(password) } : {}),
      },
      select: { id: true, email: true, name: true, role: true, departmentId: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error('Update admin user error:', err);
    return bad('Failed to update account', 500);
  }
}

export async function DELETE(req: Request) {
  const { session, error } = await requireAdmin({ superOnly: true });
  if (error) return error;

  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return bad('ID is required');
    if (id === session.id) return bad('You cannot delete your own account', 409);

    const target = await prisma.adminUser.findUnique({ where: { id } });
    if (!target) return bad('Account not found', 404);

    if (target.role === 'super-admin') {
      const supers = await prisma.adminUser.count({ where: { role: 'super-admin' } });
      if (supers <= 1) return bad('Cannot delete the only super admin', 409);
    }

    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete admin user error:', err);
    return bad('Failed to delete account', 500);
  }
}
