import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const projects = await prisma.project.findMany({
    where: scopeWhere(session),
    orderBy: { createdAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true },
    { name: 'stackTags', label: 'Tech stack', type: 'text', half: true, inTable: true, help: 'Comma separated' },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'cover', label: 'Cover image URL', type: 'url' },
    { name: 'repoUrl', label: 'Repository', type: 'url', half: true },
    { name: 'demoUrl', label: 'Live demo', type: 'url', half: true },
    { name: 'contributors', label: 'Contributors', type: 'text', help: 'Comma separated' },
    { name: 'featured', label: 'Featured', type: 'checkbox', inTable: true, help: 'Show on the home page' },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/projects"
      eyebrow="Projects"
      title="Project Showcase"
      description="Open-source work built by club members."
      noun="project"
      publicHref="/projects"
      rows={serialize(projects)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
    />
  );
}
