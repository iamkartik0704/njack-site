import { prisma } from '@/lib/prisma';
import { getAdminSession, isSuperAdmin, type AdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { FieldSpec } from '@/components/admin/EntityManager';

/** Session + the division context every admin screen needs. */
export async function getAdminPageContext() {
  const session = await getAdminSession();
  if (!session) redirect('/council-terminal/login');

  const divisions = await prisma.department.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true },
  });

  const scoped = !isSuperAdmin(session);
  const lockedDivisionName = scoped
    ? divisions.find((d) => d.id === session.departmentId)?.name ?? null
    : null;

  return { session, divisions, scoped, lockedDivisionName };
}

/**
 * Limits a listing to the signed-in user's division. The sentinel matches no
 * cuid, so a scoped account with no division assigned sees nothing rather than
 * everything — and it type-checks against required `departmentId` columns too.
 */
export function scopeWhere(session: AdminSession) {
  if (isSuperAdmin(session)) return {};
  return { departmentId: session.departmentId ?? '__no_division__' };
}

/**
 * The division picker. A coordinator cannot change it, so the field is omitted
 * entirely for them — the API forces their own division anyway.
 */
export function divisionField(
  divisions: { id: string; name: string }[],
  scoped: boolean,
  opts?: { required?: boolean; inTable?: boolean }
): FieldSpec[] {
  if (scoped) return [];
  return [
    {
      name: 'departmentId',
      label: 'Division',
      type: 'select',
      half: true,
      required: opts?.required,
      inTable: opts?.inTable ?? false,
      options: divisions.map((d) => ({ value: d.id, label: d.name })),
    },
  ];
}

/** Rows come from Prisma with Date objects; JSON-safe them for the client component. */
export function serialize<T extends Record<string, unknown>>(rows: T[]) {
  return JSON.parse(JSON.stringify(rows)) as (T & { id: string })[];
}
