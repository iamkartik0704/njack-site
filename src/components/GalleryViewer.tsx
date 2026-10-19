'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Calendar, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export interface AlbumItem {
  id: string;
  title: string;
  slug: string;
  cover: string;
  date: string;
  images: {
    id: string;
    url: string;
    caption: string | null;
  }[];
}

interface GalleryViewerProps {
  albums: AlbumItem[];
}

export default function GalleryViewer({ albums }: GalleryViewerProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');
  const [previewImage, setPreviewImage] = useState<{ url: string; caption: string | null } | null>(null);

  const activeAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];

  return (
    <div className="space-y-8">
      {/* Album Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {albums.map((album) => {
          const active = album.id === (activeAlbum?.id || '');
          return (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-semibold transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>{album.title}</span>
              <span className="text-[10px] font-mono opacity-70">({album.images.length})</span>
            </button>
          );
        })}
      </div>

      {/* Album Header Info */}
      {activeAlbum && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md">
          <div>
            <h2 className="text-xl font-bold text-white">{activeAlbum.title}</h2>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{activeAlbum.date}</span>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {activeAlbum.images.length} High-Res Moments Captured
          </div>
        </div>
      )}

      {/* Images Grid */}
      {activeAlbum && activeAlbum.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeAlbum.images.map((img) => (
            <div
              key={img.id}
              onClick={() => setPreviewImage(img)}
              className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 cursor-pointer transition-all hover:scale-[1.02] hover:border-cyan-500/50 shadow-md"
            >
              <Image
                src={img.url}
                alt={img.caption || activeAlbum.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                {img.caption && (
                  <p className="text-xs font-medium text-white line-clamp-2">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 text-slate-400">
          No images uploaded in this album yet.
        </div>
      )}

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-[85vw] max-w-4xl">
              <Image
                src={previewImage.url}
                alt={previewImage.caption || 'Event Preview'}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {previewImage.caption && (
              <div className="border-t border-white/10 bg-slate-950 p-4 text-center text-sm font-medium text-slate-200">
                {previewImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
