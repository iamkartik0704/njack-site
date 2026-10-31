import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEntityManager, { type AdminField } from '@/components/AdminEntityManager';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({ orderBy: { createdAt: 'desc' } });
  const fields: AdminField[] = [
    { name: 'title', label: 'Album title', required: true },
    { name: 'slug', label: 'Slug', required: true, half: true },
    { name: 'date', label: 'Date label', placeholder: 'March 2026', half: true },
    { name: 'cover', label: 'Cover URL', type: 'url' },
    { name: 'images', label: 'Images JSON', type: 'textarea', required: true, placeholder: '[{"id":"1","url":"https://...","caption":"Event photo"}]' },
  ];
  return <AdminEntityManager title="Gallery Management" eyebrow="Media" description="Create albums and maintain gallery image metadata." endpoint="/api/admin/gallery" noun="album" fields={fields} initialRows={albums.map((album) => ({ ...album }))} previewHref="/gallery" />;
}
