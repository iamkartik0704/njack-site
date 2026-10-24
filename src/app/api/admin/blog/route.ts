import { createCrudHandlers, reqStr, str, slug, nullable } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'post',
  label: 'post',
  required: ['title', 'slug', 'bodyMd'],
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    slug: slug(b.slug)!,
    bodyMd: reqStr(b.bodyMd),
    cover: nullable(b.cover),
    author: reqStr(b.author, 'NJACK'),
    tags: reqStr(b.tags),
    status: reqStr(b.status, 'published'),
    departmentId,
    publishedAt: b.publishedAt ? new Date(b.publishedAt as string) : new Date(),
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    slug: slug(b.slug),
    bodyMd: str(b.bodyMd),
    cover: nullable(b.cover),
    author: str(b.author),
    tags: str(b.tags),
    status: str(b.status),
    departmentId,
    publishedAt: b.publishedAt ? new Date(b.publishedAt as string) : undefined,
  }),
});
