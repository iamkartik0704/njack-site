import { createCrudHandlers, reqStr, str, slug, json } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'quiz',
  label: 'quiz',
  required: ['title', 'slug'],
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    slug: slug(b.slug)!,
    departmentId,
    topic: reqStr(b.topic, 'General'),
    description: reqStr(b.description),
    questions: json(b.questions),
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    slug: slug(b.slug),
    departmentId,
    topic: str(b.topic),
    description: str(b.description),
    questions: b.questions === undefined ? undefined : json(b.questions),
  }),
});
