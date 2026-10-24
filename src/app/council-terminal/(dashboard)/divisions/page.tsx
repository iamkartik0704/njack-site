import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { isSuperAdmin } from '@/lib/auth';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminDivisionsPage() {
  const { session } = await getAdminPageContext();
  if (!isSuperAdmin(session)) redirect('/council-terminal');

  const divisions = await prisma.department.findMany({ orderBy: { order: 'asc' } });

  const fields: FieldSpec[] = [
    { name: 'name', label: 'Name', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true, inTable: true },
    { name: 'order', label: 'Sort order', type: 'number', half: true, help: 'Lower shows first' },
    { name: 'icon', label: 'Icon', type: 'text', half: true, defaultValue: 'Code', help: 'A lucide-react icon name' },
    { name: 'tagline', label: 'Tagline', type: 'text', inTable: true, hideOnMobile: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/departments"
      eyebrow="Divisions"
      title="Club Divisions"
      description="The four core divisions. Deleting one unassigns its content."
      noun="division"
      publicHref="/departments"
      rows={serialize(divisions)}
      fields={fields}
    />
  );
}
