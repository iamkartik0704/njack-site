import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { formatEventDate } from '@/lib/utils';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6]"> {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#2A0F06]/20 via-[#0E1016]/40 to-transparent py-12 sm:py-16"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-2xl"> <h1 className="font-display text-[1.6rem] sm:text-3xl font-medium tracking-[-0.02em] text-[#F3F4F6]"> NJACK Blog & Guides
            </h1> <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed"> Technical post-mortems, ICPC contest strategies, open-source guidebooks, and deep dives authored by coordinators and researchers.
            </p> </div> </div> </section> {/* Posts List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"> <div className="grid grid-cols-1 md:grid-cols-6 [&>*]:md:col-span-2 [&>*:first-child]:md:col-span-4 [&>*:nth-child(4)]:md:col-span-4 [&>*:nth-child(5)]:md:col-span-2 gap-8"> {posts.map((post) => {
            const dateStr = formatEventDate(post.publishedAt);
            const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

            return (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden border-t border-white/[0.10] pt-5 transition-colors hover:border-[#FF5722]/50" > <div> {/* Cover */}
                  {post.cover && (
                    <div className="relative h-48 w-full overflow-hidden bg-[#13161D]"> <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw" /> </div> )}

                  <div className="p-6 space-y-3"> <div className="flex items-center gap-3 text-xs font-mono text-[#8A8F98]"> <span className="flex items-center gap-1 text-[#FF8A00]" suppressHydrationWarning> <Calendar className="h-3.5 w-3.5" /> {dateStr}
                      </span> <span>•</span> <span className="truncate">{post.author}</span> </div> <h2 className="text-lg font-bold text-white group-hover:text-[#FF8A00] transition-colors leading-snug"> <Link href={`/blog/${post.slug}`}> {post.title}
                      </Link> </h2> <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3"> {post.bodyMd.replace(/[#*`>]/g, '').slice(0, 150)}...
                    </p> {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2"> {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm bg-white/5 px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]" > #{tag}
                          </span> ))}
                      </div> )}
                  </div> </div> <div className="border-t border-white/[0.06] p-6 pt-4 flex items-center justify-between"> <span className="text-xs font-mono text-[#6B7079]"> 5 min read
                  </span> <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8A00] hover:text-white transition-colors" > <span>Read Article</span> <ArrowRight className="h-3.5 w-3.5" /> </Link> </div> </article> );
          })}
        </div> </main> </div> );
}
