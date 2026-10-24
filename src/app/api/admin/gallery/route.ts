import { createCrudHandlers, reqStr, str, slug, json } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'galleryAlbum',
  label: 'album',
  required: ['title', 'slug'],
  toCreate: (b, departmentId) => ({
    title: reqStr(b.title),
    slug: slug(b.slug)!,
    cover: reqStr(b.cover, '/gallery/default.jpg'),
    date: reqStr(b.date, new Date().getFullYear().toString()),
    images: json(b.images),
    departmentId,
  }),
  toUpdate: (b, departmentId) => ({
    title: str(b.title),
    slug: slug(b.slug),
    cover: str(b.cover),
    date: str(b.date),
    images: b.images === undefined ? undefined : json(b.images),
    departmentId,
  }),
});
