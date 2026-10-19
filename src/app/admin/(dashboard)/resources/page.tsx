import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminResourcesManager from '@/components/AdminResourcesManager';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminResourcesPage() {
  const [resources, departments] = await Promise.all([
    prisma.resource.findMany({
      include: {
        department: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.department.findMany({
      select: { id: true, name: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Content Repository Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Learning Resources Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Add, publish, organize, and delete lecture notes, video playlists, slides, and cheat sheets across divisions.
        </p>
      </div>

      <AdminResourcesManager
        initialResources={resources}
        departments={departments}
      />
    </div>
  );
}
