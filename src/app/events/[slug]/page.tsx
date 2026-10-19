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
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const revalidate = 60;

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

  const dateObj = new Date(event.startsAt);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Events</span>
        </Link>

        {/* Poster Card */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          <Image
            src={event.poster}
            alt={event.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`rounded-full px-3 py-0.5 text-xs font-mono font-bold uppercase ${
                event.status === 'upcoming'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-white/20 text-white'
              }`}>
                {event.status}
              </span>
              {event.department && (
                <span className="rounded-full bg-black/60 px-3 py-0.5 text-xs font-mono text-cyan-300 border border-white/10 backdrop-blur-md">
                  {event.department}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Details & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h2 className="text-lg font-bold text-white">About the Event</h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {event.recap && (
                <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-2">
                  <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    Post-Event Recap & Highlights
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{event.recap}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Logistics
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Date</div>
                    <div className="font-semibold text-white">{dateStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Time</div>
                    <div className="font-semibold text-white">{timeStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400">Venue</div>
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
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
