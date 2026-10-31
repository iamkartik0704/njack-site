import React from 'react';
import { prisma } from '@/lib/prisma';
import ResourceCatalog from '@/components/ResourceCatalog';
import { BookOpen } from 'lucide-react';

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
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-14 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              <span>CENTRAL KNOWLEDGE REPOSITORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Resource{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8A00] to-[#FF5722]">
                Catalog
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              Hand-curated lecture notes, competitive programming cheat sheets, production systems architectures, machine learning research guides, and hands-on repositories curated by NJACK coordinators and alumni.
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
