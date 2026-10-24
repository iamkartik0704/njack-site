import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET;
if (!JWT_SECRET) throw new Error('ADMIN_JWT_SECRET is not set');

const TOKEN_NAME = 'njack_admin_token';

export const ADMIN_ROOT = '/council-terminal';
export const ADMIN_LOGIN = '/council-terminal/login';

export type AdminRole = 'super-admin' | 'coordinator' | 'sub-coordinator';

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  departmentId: string | null;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminSession): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function getAdminTokenName(): string {
  return TOKEN_NAME;
}

export function isSuperAdmin(session: AdminSession | null): boolean {
  return session?.role === 'super-admin';
}

/**
 * A super admin manages everything. Anyone else manages only their own division,
 * and never a row that belongs to no division.
 */
export function canManage(session: AdminSession | null, departmentId?: string | null): boolean {
  if (!session) return false;
  if (isSuperAdmin(session)) return true;
  return !!departmentId && !!session.departmentId && departmentId === session.departmentId;
}

/**
 * The division a write must be filed under. A non-super-admin cannot choose:
 * their own division is forced, so a forged departmentId in the body is ignored.
 */
export function resolveWriteDepartment(
  session: AdminSession,
  requested?: string | null
): string | null {
  // An unselected <select> posts '', which is not a valid foreign key — treat it as "none".
  if (!isSuperAdmin(session)) return session.departmentId;
  return requested ? requested : null;
}

/** Prisma `where` clause that limits a listing to what this session may see. */
export function departmentScope(session: AdminSession | null) {
  if (!session || isSuperAdmin(session)) return {};
  return { departmentId: session.departmentId };
}

type Guard = { session: AdminSession; error: null } | { session: null; error: NextResponse };

/** One-line guard for route handlers: `const { session, error } = await requireAdmin();` */
export async function requireAdmin(opts?: { superOnly?: boolean }): Promise<Guard> {
  const session = await getAdminSession();
  if (!session) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (opts?.superOnly && !isSuperAdmin(session)) {
    return { session: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { session, error: null };
}

export function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
