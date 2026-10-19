import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <FileText className="h-3.5 w-3.5" />
              <span>Articles & Club Chronicles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              NJACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Blog</span> & Guides
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Technical post-mortems, ICPC contest strategies, open-source guidebooks, and deep dives authored by coordinators and researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const dateStr = new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

            return (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/5"
              >
                <div>
                  {/* Cover */}
                  {post.cover && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {dateStr}
                      </span>
                      <span>•</span>
                      <span className="truncate">{post.author}</span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {post.bodyMd.replace(/[#*`>]/g, '').slice(0, 150)}...
                    </p>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 p-6 pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    5 min read
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
