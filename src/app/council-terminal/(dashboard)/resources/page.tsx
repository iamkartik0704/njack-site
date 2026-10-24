import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminResourcesPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const resources = await prisma.resource.findMany({
    where: scopeWhere(session),
    orderBy: { createdAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, inTable: true },
    { name: 'url', label: 'Link', type: 'url', required: true, inTable: true, hideOnMobile: true },
    ...divisionField(divisions, scoped, { required: true, inTable: true }),
    {
      name: 'type', label: 'Type', type: 'select', half: true, badge: true, inTable: true,
      defaultValue: 'link',
      options: ['note', 'link', 'youtube', 'slides', 'repo', 'article', 'roadmap'].map((v) => ({
        value: v, label: v[0].toUpperCase() + v.slice(1),
      })),
    },
    {
      name: 'difficulty', label: 'Difficulty', type: 'select', half: true, badge: true,
      defaultValue: 'beginner',
      options: ['beginner', 'intermediate', 'advanced'].map((v) => ({
        value: v, label: v[0].toUpperCase() + v.slice(1),
      })),
    },
    { name: 'topic', label: 'Topic', type: 'text', half: true },
    { name: 'tags', label: 'Tags', type: 'text', half: true, help: 'Comma separated' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'featured', label: 'Featured', type: 'checkbox', help: 'Pin to the top of the hub' },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/resources"
      eyebrow="Resources"
      title="Resources Hub"
      description="Curated links, notes and roadmaps for each division."
      noun="resource"
      publicHref="/resources"
      rows={serialize(resources)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
    />
  );
}
