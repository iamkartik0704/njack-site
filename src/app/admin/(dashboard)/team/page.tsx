import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEntityManager, { type AdminField } from '@/components/AdminEntityManager';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const [members, departments] = await Promise.all([
    prisma.teamMember.findMany({ include: { department: { select: { name: true } } }, orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
    prisma.department.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true } }),
  ]);

  const fields: AdminField[] = [
    { name: 'name', label: 'Name', required: true, half: true },
    { name: 'role', label: 'Role', required: true, half: true },
    { name: 'departmentId', label: 'Department', type: 'select', required: false, half: true, options: departments.map((department) => ({ value: department.id, label: department.name })) },
    { name: 'year', label: 'Tenure', half: true, placeholder: '2026-2027' },
    { name: 'photo', label: 'Photo URL', type: 'url' },
    { name: 'linkedin', label: 'LinkedIn URL', type: 'url', half: true },
    { name: 'github', label: 'GitHub URL', type: 'url', half: true },
    { name: 'codeforces', label: 'Codeforces URL', type: 'url', half: true },
    { name: 'email', label: 'Email', half: true },
    { name: 'order', label: 'Display order', type: 'number', half: true },
  ];

  return <AdminEntityManager title="Team Management" eyebrow="People" description="Add coordinators, sub-coordinators, and team roles." endpoint="/api/admin/team" noun="team member" fields={fields} initialRows={members.map((member) => ({ ...member }))} />;
}
