import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminEventsManager from '@/components/AdminEventsManager';
import { Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: 'desc' },
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FF5722]">
          <Calendar className="h-3.5 w-3.5" />
          <span>Hackathons & Workshop Scheduler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Events Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Publish new workshops, configure registration RSVP links, update dates, and publish event recaps.
        </p>
      </div>

      <AdminEventsManager
        initialEvents={events.map((e) => ({
          ...e,
          startsAt: e.startsAt.toISOString(),
        }))}
      />
    </div>
  );
}
