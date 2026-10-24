import { createCrudHandlers, reqStr, str, slug, nullable, int } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'department',
  label: 'division',
  scoped: false,
  superOnly: true,
  required: ['name', 'slug'],
  toCreate: (b) => ({
    name: reqStr(b.name),
    slug: slug(b.slug)!,
    tagline: nullable(b.tagline),
    description: reqStr(b.description),
    icon: reqStr(b.icon, 'Code'),
    order: int(b.order),
  }),
  toUpdate: (b) => ({
    name: str(b.name),
    slug: slug(b.slug),
    tagline: nullable(b.tagline),
    description: str(b.description),
    icon: str(b.icon),
    order: b.order === undefined ? undefined : int(b.order),
  }),
});
