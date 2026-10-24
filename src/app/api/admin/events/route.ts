import { createCrudHandlers, reqStr, str, slug, nullable } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'event',
  label: 'event',
  required: ['title', 'slug', 'startsAt', 'venue'],
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    slug: slug(b.slug)!,
    description: reqStr(b.description),
    poster: reqStr(b.poster, '/events/default.jpg'),
    startsAt: new Date(b.startsAt as string),
    endsAt: b.endsAt ? new Date(b.endsAt as string) : null,
    venue: reqStr(b.venue),
    registerUrl: nullable(b.registerUrl),
    status: reqStr(b.status, 'upcoming'),
    recap: nullable(b.recap),
    departmentId,
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    slug: slug(b.slug),
    description: str(b.description),
    poster: str(b.poster),
    startsAt: b.startsAt ? new Date(b.startsAt as string) : undefined,
    endsAt: b.endsAt ? new Date(b.endsAt as string) : null,
    venue: str(b.venue),
    registerUrl: nullable(b.registerUrl),
    status: str(b.status),
    recap: nullable(b.recap),
    departmentId,
  }),
});
