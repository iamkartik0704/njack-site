import { createCrudHandlers, reqStr, str, nullable, bool } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'resource',
  label: 'resource',
  required: ['title', 'url'],
  departmentRequired: true,
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    description: reqStr(b.description),
    type: reqStr(b.type, 'link'),
    url: reqStr(b.url),
    departmentId: departmentId!,
    topic: reqStr(b.topic, 'General'),
    tags: reqStr(b.tags),
    difficulty: reqStr(b.difficulty, 'beginner'),
    featured: bool(b.featured),
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    description: str(b.description),
    type: str(b.type),
    url: str(b.url),
    departmentId: departmentId ?? undefined,
    topic: str(b.topic),
    tags: str(b.tags),
    difficulty: str(b.difficulty),
    featured: b.featured === undefined ? undefined : bool(b.featured),
  }),
});
