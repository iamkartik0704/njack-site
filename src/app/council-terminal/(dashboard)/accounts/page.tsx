import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { isSuperAdmin } from '@/lib/auth';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminAccountsPage() {
  const { session, divisions } = await getAdminPageContext();
  if (!isSuperAdmin(session)) redirect('/council-terminal');

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, email: true, name: true, role: true, departmentId: true, createdAt: true },
  });

  const fields: FieldSpec[] = [
    { name: 'name', label: 'Full name', type: 'text', required: true, inTable: true },
    { name: 'email', label: 'Email', type: 'text', required: true, inTable: true, half: true },
    {
      name: 'role', label: 'Role', type: 'select', required: true, half: true, badge: true, inTable: true,
      defaultValue: 'coordinator',
      options: [
        { value: 'super-admin', label: 'Super Admin' },
        { value: 'coordinator', label: 'Coordinator' },
        { value: 'sub-coordinator', label: 'Sub-Coordinator' },
      ],
    },
    {
      name: 'departmentId', label: 'Division', type: 'select', half: true, inTable: true,
      help: 'Required for coordinators and sub-coordinators',
      options: divisions.map((d) => ({ value: d.id, label: d.name })),
    },
    {
      name: 'password', label: 'Password', type: 'text', half: true,
      help: 'At least 8 characters. Leave blank when editing to keep the current one.',
    },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/users"
      eyebrow="Accounts"
      title="Terminal Accounts"
      description="Who can sign in, and which division they manage."
      noun="account"
      rows={serialize(users)}
      fields={fields}
    />
  );
}
