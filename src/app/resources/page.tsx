import React from 'react';
import { prisma } from '@/lib/prisma';
import ResourceCatalog from '@/components/ResourceCatalog';
import Link from 'next/link';
import { Sparkles, BookOpen, Layers, ArrowRight, Compass } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function ResourcesPage() {
  const [resources, departments, tracksCount] = await Promise.all([
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
    prisma.track.count(),
  ]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-950/30 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
                <BookOpen className="h-3.5 w-3.5" />
                <span>NJACK Central Repository</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Resource <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Hub</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Hand-curated roadmaps, lecture notes, video series, competitive programming cheat sheets, and hands-on repositories curated by IIT Patna seniors and coordinators.
              </p>
            </div>

            {/* Quick Track Highlight Card */}
            <div className="flex items-center gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Structured Paths</div>
                <div className="font-semibold text-white text-sm">
                  {tracksCount} Guided Learning Tracks
                </div>
                <Link
                  href="/resources/tracks"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
                >
                  <span>Explore Tracks</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
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
