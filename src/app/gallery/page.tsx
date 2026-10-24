import React from 'react';
import { prisma } from '@/lib/prisma';
import GalleryViewer from '@/components/GalleryViewer';
import { Image as ImageIcon } from 'lucide-react';

export const revalidate = 60;

export default async function GalleryPage() {
  const rawAlbums = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const albums = rawAlbums.map((album) => {
    let images: { id: string; url: string; caption: string | null }[] = [];
    try {
      images = JSON.parse(album.images || '[]');
    } catch {
      images = [];
    }
    return {
      ...album,
      images,
    };
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6]"> {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#2A0F06]/20 via-[#0E1016]/40 to-transparent py-16 sm:py-16"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-2xl"> <h1 className="font-display text-[1.6rem] sm:text-3xl font-medium tracking-[-0.02em] text-[#F3F4F6]"> Event Gallery </h1> <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed"> Snapshots of midnight debugging, trophy presentations, hackathon brainstorms, and annual fests at IIT Patna.
            </p> </div> </div> </section> {/* Main Gallery */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"> <GalleryViewer albums={albums} /> </main> </div> );
}
