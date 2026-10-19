'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EventStripItem {
  id: string;
  title: string;
  slug: string;
  startsAt: string;
  venue: string;
  department: string | null;
}

export default function UpcomingEventsStrip({ events }: { events: EventStripItem[] }) {
  return (
    <section className="relative border-y border-white/10 bg-[#090b10] py-4 overflow-hidden" id="events-strip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 border-r border-white/10 pr-4">
            <Calendar className="h-4 w-4" />
            <span>Upcoming</span>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            {events.map((event, idx) => {
              const date = new Date(event.startsAt);
              return (
                <Link
                  key={event.id}
                  href={`/events`}
                  className="group shrink-0 flex items-center gap-3 rounded-lg border border-white/10 bg-[#0e1118] px-4 py-2 transition-colors hover:border-orange-500/50 hover:bg-[#141824]"
                >
                  <div className="flex flex-col items-center text-center w-10">
                    <span className="text-[10px] font-semibold text-orange-400 uppercase">
                      {date.toLocaleDateString('en-IN', { month: 'short' })}
                    </span>
                    <span className="text-xl font-bold text-white leading-tight">
                      {date.getDate()}
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-3 min-w-0">
                    <p className="text-sm font-semibold text-white truncate max-w-[180px] group-hover:text-orange-300 transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                      <MapPin className="h-2.5 w-2.5" />
                      <span className="truncate max-w-[120px]">{event.venue}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-orange-400 transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
