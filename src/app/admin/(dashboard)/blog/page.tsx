import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEntityManager, { type AdminField } from '@/components/AdminEntityManager';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: 'desc' } });
  const fields: AdminField[] = [
    { name: 'title', label: 'Title', required: true },
    { name: 'slug', label: 'Slug', required: true, half: true },
    { name: 'status', label: 'Status', type: 'select', required: true, half: true, options: [{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }] },
    { name: 'author', label: 'Author', required: true, half: true },
    { name: 'tags', label: 'Tags', placeholder: 'ICPC, Competitive Programming', half: true },
    { name: 'cover', label: 'Cover URL', type: 'url' },
    { name: 'bodyMd', label: 'Markdown content', type: 'textarea', required: true },
  ];
  return <AdminEntityManager title="Blog Management" eyebrow="Articles" description="Publish announcements, technical articles, and club updates." endpoint="/api/admin/blog" noun="post" fields={fields} initialRows={posts.map((post) => ({ ...post }))} previewHref="/blog" />;
}
