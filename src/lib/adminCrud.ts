import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canManage, forbidden, requireAdmin, resolveWriteDepartment, type AdminSession } from '@/lib/auth';

/**
 * Builds the POST/PUT/DELETE handlers for one admin-managed model.
 *
 * Every endpoint runs the same permission rules, so division scoping cannot be
 * forgotten on a single route:
 *  - a super admin may touch anything;
 *  - anyone else may only touch rows in their own division, and the division of
 *    a row they create or edit is forced to theirs (a forged departmentId in the
 *    request body is ignored).
 */
export type CrudConfig = {
  /** Prisma delegate name, e.g. 'event' for prisma.event. */
  model: string;
  /** Human label used in error messages. */
  label: string;
  /** False for models with no departmentId column (e.g. submissions). */
  scoped?: boolean;
  /** Only a super admin may use these endpoints at all. */
  superOnly?: boolean;
  /** The model's departmentId column is NOT nullable, so a division must resolve. */
  departmentRequired?: boolean;
  /** Body keys that must be present on create. */
  required?: string[];
  /** Maps the request body to Prisma create data. `departmentId` is already resolved. */
  toCreate: (body: Record<string, unknown>, departmentId: string | null, session: AdminSession) => unknown;
  /** Maps the request body to Prisma update data. Undefined values are skipped by Prisma. */
  toUpdate: (body: Record<string, unknown>, departmentId: string | null, session: AdminSession) => unknown;
};

// Prisma's generated client has no index signature; this is the one place we bridge it.
const delegate = (model: string) =>
  (prisma as unknown as Record<string, {
    create: (a: unknown) => Promise<unknown>;
    update: (a: unknown) => Promise<unknown>;
    delete: (a: unknown) => Promise<unknown>;
    findUnique: (a: unknown) => Promise<{ departmentId?: string | null } | null>;
  }>)[model];

const bad = (message: string, status = 400) => NextResponse.json({ error: message }, { status });

export function createCrudHandlers(cfg: CrudConfig) {
  const scoped = cfg.scoped !== false;
  const db = () => delegate(cfg.model);

  async function POST(req: Request) {
    const { session, error } = await requireAdmin({ superOnly: cfg.superOnly });
    if (error) return error;

    try {
      const body = (await req.json()) as Record<string, unknown>;

      const missing = (cfg.required ?? []).filter((k) => {
        const v = body[k];
        return v === undefined || v === null || v === '';
      });
      if (missing.length) return bad(`Missing required field(s): ${missing.join(', ')}`);

      const departmentId = scoped
        ? resolveWriteDepartment(session, body.departmentId as string | null)
        : null;
      if (scoped && cfg.departmentRequired && !departmentId) return bad('A division is required');
      if (scoped && !canManage(session, departmentId)) return forbidden();

      const record = await db().create({ data: cfg.toCreate(body, departmentId, session) });
      return NextResponse.json({ success: true, record });
    } catch (err) {
      console.error(`Create ${cfg.label} error:`, err);
      return bad(`Failed to create ${cfg.label}`, 500);
    }
  }

  async function PUT(req: Request) {
    const { session, error } = await requireAdmin({ superOnly: cfg.superOnly });
    if (error) return error;

    try {
      const body = (await req.json()) as Record<string, unknown>;
      const id = body.id as string | undefined;
      if (!id) return bad('ID is required');

      const existing = await db().findUnique({ where: { id } });
      if (!existing) return bad(`${cfg.label} not found`, 404);
      if (scoped && !canManage(session, existing.departmentId)) return forbidden();

      const departmentId = scoped
        ? resolveWriteDepartment(session, (body.departmentId as string | null) || existing.departmentId)
        : null;
      if (scoped && cfg.departmentRequired && !departmentId) return bad('A division is required');
      if (scoped && !canManage(session, departmentId)) return forbidden();

      const record = await db().update({ where: { id }, data: cfg.toUpdate(body, departmentId, session) });
      return NextResponse.json({ success: true, record });
    } catch (err) {
      console.error(`Update ${cfg.label} error:`, err);
      return bad(`Failed to update ${cfg.label}`, 500);
    }
  }

  async function DELETE(req: Request) {
    const { session, error } = await requireAdmin({ superOnly: cfg.superOnly });
    if (error) return error;

    try {
      const id = new URL(req.url).searchParams.get('id');
      if (!id) return bad('ID is required');

      const existing = await db().findUnique({ where: { id } });
      if (!existing) return bad(`${cfg.label} not found`, 404);
      if (scoped && !canManage(session, existing.departmentId)) return forbidden();

      await db().delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error(`Delete ${cfg.label} error:`, err);
      return bad(`Failed to delete ${cfg.label}`, 500);
    }
  }

  return { POST, PUT, DELETE };
}

/* Shared body coercion helpers. */
export const str = (v: unknown): string | undefined =>
  typeof v === 'string' ? v.trim() : undefined;

export const reqStr = (v: unknown, fallback = ''): string =>
  typeof v === 'string' && v.trim() ? v.trim() : fallback;

export const slug = (v: unknown): string | undefined =>
  typeof v === 'string' ? v.trim().toLowerCase() : undefined;

export const nullable = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null;

export const bool = (v: unknown): boolean => v === true || v === 'true';

export const int = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** Accepts either a JSON string or an array/object, and stores it as a JSON string. */
export const json = (v: unknown, fallback = '[]'): string => {
  if (v === undefined || v === null || v === '') return fallback;
  if (typeof v === 'string') {
    try {
      JSON.parse(v);
      return v;
    } catch {
      return fallback;
    }
  }
  return JSON.stringify(v);
};
