import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const albums = await prisma.galleryAlbum.findMany({
    where: scopeWhere(session),
    orderBy: { createdAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Album title', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true },
    { name: 'date', label: 'Date label', type: 'text', half: true, inTable: true, help: 'e.g. March 2025' },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'cover', label: 'Cover image URL', type: 'url' },
    {
      name: 'images', label: 'Images', type: 'json', defaultValue: '[]',
      help: 'JSON array: [{ "id": "1", "url": "https://...", "caption": "..." }]',
    },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/gallery"
      eyebrow="Gallery"
      title="Photo Albums"
      description="Event photography shown on the public gallery."
      noun="album"
      publicHref="/gallery"
      rows={serialize(albums)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
      wideForm
    />
  );
}
