import React from 'react';
import { prisma } from '@/lib/prisma';
import GalleryViewer from '@/components/GalleryViewer';
import { Image as ImageIcon } from 'lucide-react';

export const revalidate = 60;

export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    include: {
      images: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Memories & Moments</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Gallery</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Snapshots of midnight debugging, trophy presentations, hackathon brainstorms, and annual fests at IIT Patna.
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <GalleryViewer albums={albums} />
      </main>
    </div>
  );
}
