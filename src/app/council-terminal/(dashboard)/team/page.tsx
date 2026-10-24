import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const members = await prisma.teamMember.findMany({
    where: scopeWhere(session),
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
  });

  const fields: FieldSpec[] = [
    { name: 'name', label: 'Name', type: 'text', required: true, inTable: true },
    { name: 'role', label: 'Role', type: 'text', required: true, inTable: true, half: true, help: 'e.g. Overall Coordinator' },
    { name: 'year', label: 'Tenure', type: 'text', half: true, defaultValue: '2026-2027', inTable: true, hideOnMobile: true },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'photo', label: 'Photo URL', type: 'url' },
    { name: 'linkedin', label: 'LinkedIn', type: 'url', half: true },
    { name: 'github', label: 'GitHub', type: 'url', half: true },
    { name: 'email', label: 'Email', type: 'text', half: true },
    { name: 'order', label: 'Sort order', type: 'number', half: true, help: 'Lower shows first' },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/team"
      eyebrow="Team"
      title="Coordinators & Members"
      description="People listed on the public team page."
      noun="member"
      publicHref="/team"
      rows={serialize(members)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
    />
  );
}
