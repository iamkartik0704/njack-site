import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { formatEventDateLong } from '@/lib/utils';

export const revalidate = 60;

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post || post.status !== 'published') {
    notFound();
  }

  const dateStr = formatEventDateLong(post.publishedAt);
  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Articles</span>
        </Link>

        {/* Post Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-500/15 px-3 py-0.5 text-xs font-mono font-semibold text-cyan-400 border border-cyan-500/30"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-6 pt-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5" suppressHydrationWarning>
              <Calendar className="h-3.5 w-3.5" />
              {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              5 min read
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {post.cover && (
          <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Article Markdown Body */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl">
          <MarkdownRenderer content={post.bodyMd} />
        </div>

        {/* Post Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <Link
            href="/blog"
            className="text-xs font-mono text-cyan-400 hover:underline"
          >
            ← View more club stories
          </Link>
          <Link
            href="/resources"
            className="text-xs font-semibold text-white bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-500 transition-all"
          >
            Explore NJACK Resources
          </Link>
        </div>

      </div>
    </div>
  );
}
