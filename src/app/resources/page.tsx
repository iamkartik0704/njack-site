import React from 'react';
import { prisma } from '@/lib/prisma';
import ResourceCatalog from '@/components/ResourceCatalog';

export const revalidate = 300; // Cache 5 min for ultra-fast loads

export const metadata = {
  title: 'Technical Resources | NJACK IIT Patna',
  description:
    'Hand-curated roadmaps, lecture notes, video series, competitive programming cheat sheets, and technical guides curated by IIT Patna coordinators.',
};

export default async function ResourcesPage() {
  const [resources, departments] = await Promise.all([
    prisma.resource.findMany({
      include: {
        department: {
          select: { name: true, slug: true },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.department.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      {/* Architectural Header (Crisp Engineering Aesthetic — No Muddy Gradient Blobs) */}
      <section className="relative border-b border-white/[0.08] bg-[#07080A] py-14 sm:py-18">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>[ NJACK // KNOWLEDGE_BASE ]</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Resource Catalog<span className="text-[#FF5722]">.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed pt-1">
              Curated problem sheets, internal guides, system architecture breakdowns, and algorithmic roadmaps maintained by NJACK mentors and alumni.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <ResourceCatalog
          initialResources={resources}
          departments={departments}
        />
      </main>
    </div>
  );
}
