import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEntityManager, { type AdminField } from '@/components/AdminEntityManager';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const fields: AdminField[] = [
    { name: 'title', label: 'Title', required: true },
    { name: 'slug', label: 'Slug', required: true, half: true },
    { name: 'stackTags', label: 'Tech stack', placeholder: 'Next.js, Python, OpenCV', half: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'cover', label: 'Cover URL', type: 'url' },
    { name: 'repoUrl', label: 'Repository URL', type: 'url', half: true },
    { name: 'demoUrl', label: 'Demo URL', type: 'url', half: true },
    { name: 'contributors', label: 'Contributors', half: true },
    { name: 'featured', label: 'Featured project', type: 'checkbox', placeholder: 'Show on project highlights', half: true },
  ];
  return <AdminEntityManager title="Projects Management" eyebrow="Portfolio" description="Maintain NJACK projects, repositories, demos, and contributors." endpoint="/api/admin/projects" noun="project" fields={fields} initialRows={projects.map((project) => ({ ...project }))} previewHref="/projects" />;
}
