import { prisma } from '@/lib/prisma';
import EntityManager, { type FieldSpec } from '@/components/admin/EntityManager';
import { getAdminPageContext, scopeWhere, divisionField, serialize } from '@/lib/adminPage';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const { session, divisions, scoped, lockedDivisionName } = await getAdminPageContext();

  const posts = await prisma.post.findMany({
    where: scopeWhere(session),
    orderBy: { publishedAt: 'desc' },
  });

  const fields: FieldSpec[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, inTable: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, half: true },
    {
      name: 'status', label: 'Status', type: 'select', half: true, badge: true, inTable: true,
      defaultValue: 'published',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
      ],
    },
    { name: 'author', label: 'Author', type: 'text', half: true, inTable: true, defaultValue: 'NJACK' },
    { name: 'publishedAt', label: 'Published on', type: 'date', half: true, inTable: true, hideOnMobile: true },
    ...divisionField(divisions, scoped, { inTable: true }),
    { name: 'tags', label: 'Tags', type: 'text', help: 'Comma separated' },
    { name: 'cover', label: 'Cover image URL', type: 'url' },
    { name: 'bodyMd', label: 'Body', type: 'markdown', required: true, help: 'Markdown is supported' },
  ];

  return (
    <EntityManager
      endpoint="/api/admin/blog"
      eyebrow="Blog"
      title="Engineering Blog"
      description="Posts, tutorials and announcements."
      noun="post"
      publicHref="/blog"
      rows={serialize(posts)}
      fields={fields}
      lockedDivisionName={lockedDivisionName}
      wideForm
    />
  );
}
