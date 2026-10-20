import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { formatEventDateLong, formatEventTime } from '@/lib/utils';

export const revalidate = 300;

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) {
    notFound();
  }

  const dateStr = formatEventDateLong(event.startsAt);
  const timeStr = formatEventTime(event.startsAt);

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF5722] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Events</span>
        </Link>

        {/* Poster Card */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1016] shadow-2xl">
          <Image
            src={event.poster}
            alt={event.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-[#0E1016]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`rounded-full px-3 py-0.5 text-xs font-mono font-bold uppercase ${
                event.status === 'upcoming'
                  ? 'bg-[#FF5722] text-white shadow-[0_0_12px_rgba(255,87,34,0.5)]'
                  : 'bg-white/10 text-neutral-300'
              }`}>
                {event.status}
              </span>
              {event.department && (
                <span className="rounded-full bg-[#07080A]/80 px-3 py-0.5 text-xs font-mono text-[#FF8A00] border border-white/10 backdrop-blur-md">
                  {event.department}
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-black text-white">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Details & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-4">
              <h2 className="font-display text-lg font-bold text-white">About the Event</h2>
              <p className="text-sm text-[#8A8F98] leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {event.recap && (
                <div className="mt-6 rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 p-5 space-y-2">
                  <div className="text-xs font-mono font-semibold text-[#FF5722] uppercase tracking-wider">
                    Post-Event Recap &amp; Highlights
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                    "{event.recap}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#FF8A00]">
                Event Logistics
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-[#FF5722] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#8A8F98]">Date</div>
                    <div className="font-semibold text-white" suppressHydrationWarning>{dateStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-[#FF5722] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#8A8F98]">Time</div>
                    <div className="font-semibold text-white" suppressHydrationWarning>{timeStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#FF5722] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#8A8F98]">Venue</div>
                    <div className="font-semibold text-white">{event.venue}</div>
                  </div>
                </div>
              </div>

              {event.registerUrl && event.status === 'upcoming' && (
                <div className="pt-2">
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5722] py-3 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] transition-all hover:bg-[#FF3D00]"
                  >
                    <span>Register Now</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
