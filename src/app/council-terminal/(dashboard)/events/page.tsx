import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const events = await prisma.event.findMany({
    where: scopeWhere(session),
    orderBy: { startsAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true, help: 'Used in the page URL' },
    {
      name: 'status', label: 'Status', type: 'select', half: true, badge: true, inTable: true,
      defaultValue: 'upcoming',
      options: [
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'past', label: 'Past' },
      ],
    },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'startsAt', label: 'Starts at', type: 'datetime', required: true, half: true, inTable: true },
    { name: 'endsAt', label: 'Ends at', type: 'datetime', half: true },
    { name: 'venue', label: 'Venue', type: 'text', required: true, inTable: true, hideOnMobile: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'poster', label: 'Poster image URL', type: 'url' },
    { name: 'registerUrl', label: 'Registration link', type: 'url' },
    { name: 'recap', label: 'Recap', type: 'textarea', help: 'Shown after the event has finished' },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/events"
      eyebrow="Events"
      title="Events & Contests"
      description="Schedule contests, workshops and hackathons shown on the public events page."
      noun="event"
      publicHref="/events"
      rows={serialize(events)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
    />
  );
}
