import { createCrudHandlers, reqStr, str, nullable, int } from '@/lib/adminCrud';

export const { POST, PUT, DELETE } = createCrudHandlers({
  model: 'teamMember',
  label: 'team member',
  required: ['name', 'role'],
  toCreate: (b, departmentId) => ({
    name: reqStr(b.name),
    role: reqStr(b.role),
    departmentId,
    year: reqStr(b.year, '2026-2027'),
    photo: reqStr(b.photo, '/team/default.png'),
    linkedin: nullable(b.linkedin),
    github: nullable(b.github),
    email: nullable(b.email),
    order: int(b.order),
  }),
  toUpdate: (b, departmentId) => ({
    name: str(b.name),
    role: str(b.role),
    departmentId,
    year: str(b.year),
    photo: str(b.photo),
    linkedin: nullable(b.linkedin),
    github: nullable(b.github),
    email: nullable(b.email),
    order: b.order === undefined ? undefined : int(b.order),
  }),
});
