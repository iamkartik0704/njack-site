import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: 'desc' },
  });

  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>Campus & Online Hackathons</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Events</span> & Workshops
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              From intense 24-hour hackathons and algorithmic sprints to hands-on systems workshops and guest lectures by IIT Patna alumni.
            </p>
          </div>
        </div>
      </section>

      {/* Main Events List */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Upcoming Section */}
        {upcomingEvents.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Upcoming Events & Registrations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const dateObj = new Date(event.startsAt);
                const dateStr = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                const timeStr = dateObj.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={event.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/5"
                  >
                    {/* Poster */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                      <Image
                        src={event.poster}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-cyan-500/90 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-slate-950 shadow-md">
                          UPCOMING
                        </span>
                        {event.department && (
                          <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-mono text-cyan-300 border border-white/10">
                            {event.department}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-cyan-400">
                            <Clock className="h-3.5 w-3.5" />
                            {dateStr} • {timeStr}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-slate-500" />
                            {event.venue}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          <Link href={`/events/${event.slug}`}>
                            {event.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <Link
                          href={`/events/${event.slug}`}
                          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          View Details →
                        </Link>

                        {event.registerUrl && (
                          <a
                            href={event.registerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
                          >
                            <span>RSVP / Register</span>
                            <ExternalLink className="h-3.5 w-3.5" />
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
            <CheckCircle2 className="h-5 w-5 text-slate-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Past Events & Workshop Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event) => {
              const dateObj = new Date(event.startsAt);
              const dateStr = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/30 p-5 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-800">
                      <Image
                        src={event.poster}
                        alt={event.title}
                        fill
                        className="object-cover opacity-80"
                        unoptimized
                      />
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                      <span>{dateStr}</span>
                      <span className="text-slate-500">{event.venue}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug">
                      <Link href={`/events/${event.slug}`} className="hover:text-cyan-300">
                        {event.title}
                      </Link>
                    </h3>

                    {event.recap ? (
                      <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/40 pl-2">
                        "{event.recap}"
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-4 text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1 self-start"
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
