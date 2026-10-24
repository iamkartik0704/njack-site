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
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] py-12 sm:py-16"> <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8"> {/* Back Link */}
        <Link
          href="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF8A00] hover:text-white transition-colors" > <ArrowLeft className="h-3.5 w-3.5" /> <span>Back to Articles</span> </Link> {/* Post Header */}
        <div className="space-y-4"> <div className="flex flex-wrap items-center gap-2"> {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FF5722]/15 px-3 py-0.5 text-xs font-mono font-semibold text-[#FF8A00] border border-[#FF5722]/30" > #{tag}
              </span> ))}
          </div> <h1 className="font-display text-[1.75rem] sm:text-4xl font-semibold tracking-[-0.03em] text-[#F3F4F6] leading-tight"> {post.title}
          </h1> <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8A8F98] border-b border-white/[0.10] pb-6 pt-2"> <span className="flex items-center gap-1.5 text-[#FF8A00] font-semibold"> <User className="h-3.5 w-3.5" /> {post.author}
            </span> <span>•</span> <span className="flex items-center gap-1.5" suppressHydrationWarning> <Calendar className="h-3.5 w-3.5" /> {dateStr}
            </span> <span>•</span> <span className="flex items-center gap-1.5"> <Clock className="h-3.5 w-3.5" /> 5 min read
            </span> </div> </div> {/* Cover Image */}
        {post.cover && (
          <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-lg border border-white/[0.10] bg-[#13161D] shadow-2xl"> <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover" priority
             
            sizes="(max-width: 768px) 100vw, 33vw" /> </div> )}

        {/* Article Markdown Body */}
        <div className="rounded-lg border border-white/[0.10] bg-[#0E1016]/40 p-6 sm:p-10 backdrop-blur-xl"> <MarkdownRenderer content={post.bodyMd} /> </div> {/* Post Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.10] pt-6"> <Link
            href="/blog" className="text-xs font-mono text-[#FF8A00] hover:underline" > ← View more club stories
          </Link> <Link
            href="/resources" className="text-xs font-semibold text-[#F3F4F6] bg-[#FF5722]/20 px-4 py-2 rounded-sm border border-[#FF5722]/30 hover:bg-[#FF5722] transition-all" > Explore NJACK Resources
          </Link> </div> </div> </div> );
}
