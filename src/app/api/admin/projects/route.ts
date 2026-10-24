import { createCrudHandlers, reqStr, str, slug, nullable, bool } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'project',
  label: 'project',
  required: ['title', 'slug'],
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    slug: slug(b.slug)!,
    description: reqStr(b.description),
    cover: reqStr(b.cover, '/projects/default.jpg'),
    stackTags: reqStr(b.stackTags),
    repoUrl: nullable(b.repoUrl),
    demoUrl: nullable(b.demoUrl),
    contributors: nullable(b.contributors),
    featured: bool(b.featured),
    departmentId,
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    slug: slug(b.slug),
    description: str(b.description),
    cover: str(b.cover),
    stackTags: str(b.stackTags),
    repoUrl: nullable(b.repoUrl),
    demoUrl: nullable(b.demoUrl),
    contributors: nullable(b.contributors),
    featured: b.featured === undefined ? undefined : bool(b.featured),
    departmentId,
  }),
});
