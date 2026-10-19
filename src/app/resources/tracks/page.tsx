import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, Trophy } from 'lucide-react';

export const revalidate = 60;

export default async function TracksPage() {
  const tracks = await prisma.track.findMany({
    include: {
      department: true,
      items: {
        include: {
          resource: true,
        },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Step-by-Step Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Learning Tracks</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Skip the tutorial hell. Follow structured roadmaps carefully ordered by NJACK leads, pairing practical resources with self-check quizzes at the finish line.
            </p>
          </div>
        </div>
      </section>

      {/* Tracks Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, idx) => (
            <div
              key={track.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-mono font-semibold text-cyan-400 border border-cyan-500/30">
                    {track.department.name}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Track #{idx + 1}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {track.title}
                </h2>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {track.description}
                </p>

                {/* Steps preview */}
                <div className="mt-6 space-y-2 border-t border-white/5 pt-4">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Included Modules ({track.items.length} steps):
                  </div>
                  {track.items.slice(0, 3).map((item, i) => (
                    <div key={item.id} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[10px] text-cyan-400 border border-white/10">
                        {i + 1}
                      </span>
                      <span className="truncate">{item.resource.title}</span>
                    </div>
                  ))}
                  {track.items.length > 3 && (
                    <div className="text-xs font-mono text-slate-500 pl-7">
                      +{track.items.length - 3} more modules & closing evaluation
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>{track.items.length} Modules</span>
                </div>

                <Link
                  href={`/resources/tracks/${track.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
                >
                  <span>Start Track</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
