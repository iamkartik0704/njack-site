import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { formatEventDate, formatEventTime } from '@/lib/utils';

export const revalidate = 300; // Cache 5 min for ultra-fast loads

export const metadata = {
  title: 'Club Events & Hackathons | NJACK IIT Patna',
  description:
    'Join upcoming hackathons, ICPC mock contests, cybersecurity CTFs, and technical guest lectures hosted by NJACK IIT Patna.',
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: 'desc' },
  });

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      {/* Architectural Header (Crisp Engineering Aesthetic — No Muddy Gradient Blobs) */}
      <section className="relative border-b border-white/[0.08] bg-[#07080A] py-14 sm:py-18">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>[ NJACK // RADAR_EVENTS ]</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Events &amp; Hackathons<span className="text-[#FF5722]">.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed pt-1">
              From 24-hour engineering sprints and ICPC qualifiers to system architecture bootcamps, CTF challenges, and technical panels with IIT Patna alumni.
            </p>
          </div>
        </div>
      </section>

      {/* Main Events List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Upcoming Section */}
        {upcomingEvents.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF5722] shadow-[0_0_10px_#FF5722] animate-pulse" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Upcoming Events &amp; Registrations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const dateStr = formatEventDate(event.startsAt);
                const timeStr = formatEventTime(event.startsAt);

                return (
                  <div
                    key={event.id}
                    style={{
                      backgroundColor: '#0A0D14',
                      boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                    }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] transition-all duration-200 hover:border-white/20 hover:-translate-y-1"
                  >
                    {/* Poster */}
                    <div className="relative h-52 w-full overflow-hidden bg-[#07080A]">
                      <Image
                        src={event.poster}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/40 to-transparent" />
                      
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="rounded px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase bg-[#FF5722] text-white shadow-sm">
                          REGISTRATION OPEN
                        </span>
                        {event.department && (
                          <span className="rounded bg-[#07080A]/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-neutral-300 border border-white/10">
                            {event.department}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8A8F98]">
                          <span className="flex items-center gap-1.5 text-[#FF5722]" suppressHydrationWarning>
                            <Clock className="h-3.5 w-3.5" />
                            {dateStr} // {timeStr}
                          </span>
                          <span className="flex items-center gap-1.5 text-neutral-400">
                            <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                            {event.venue}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white group-hover:text-neutral-100 transition-colors leading-snug">
                          <Link href={`/events/${event.slug}`}>
                            {event.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <Link
                          href={`/events/${event.slug}`}
                          className="text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors"
                        >
                          Protocol Briefing →
                        </Link>

                        {event.registerUrl && (
                          <a
                            href={event.registerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF5722] px-4 py-2 text-xs font-mono font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95"
                          >
                            <span>Register ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Past Events Archive */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#FF5722]" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Past Events &amp; Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event) => {
              const dateStr = formatEventDate(event.startsAt);

              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#07080A]">
                      <Image
                        src={event.poster}
                        alt={event.title}
                        fill
                        className="object-cover opacity-80"
                        unoptimized
                      />
                    </div>

                    <div className="text-[11px] font-mono text-[#8A8F98] flex items-center justify-between">
                      <span suppressHydrationWarning>{dateStr}</span>
                      <span className="text-[#8A8F98]/70">{event.venue}</span>
                    </div>

                    <h3 className="font-display font-bold text-white text-base leading-snug">
                      <Link href={`/events/${event.slug}`} className="hover:text-[#FF5722] transition-colors">
                        {event.title}
                      </Link>
                    </h3>

                    {event.recap ? (
                      <p className="text-xs text-neutral-300 leading-relaxed italic border-l-2 border-[#FF5722]/50 pl-2">
                        "{event.recap}"
                      </p>
                    ) : (
                      <p className="text-xs text-[#8A8F98] leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-4 text-xs font-semibold text-[#FF5722] hover:underline inline-flex items-center gap-1 self-start"
                  >
                    <span>Read Recap</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
