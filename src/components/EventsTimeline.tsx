'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Radio,
  Trophy,
} from 'lucide-react';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import SplitTextReveal from '@/components/SplitTextReveal';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  startsAt: Date | string;
  endsAt?: Date | string | null;
  venue?: string | null;
  mode?: string;
  category?: string;
  prizePool?: string | null;
  status?: string;
}

interface EventsTimelineProps {
  events: EventItem[];
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 35%'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // Fallback flagship events if database returns empty
  const defaultEvents: EventItem[] = [
    {
      id: 'ev-1',
      title: 'Apeireon 2026 — Flagship Annual Hackathon',
      slug: 'apeireon-2026',
      description:
        'The premier 36-hour offline hackathon of IIT Patna. 1,000+ national developers competing across System Architecture, Generative AI, and Decentralized Infrastructure.',
      startsAt: '2026-11-14T09:00:00Z',
      venue: 'Senate Hall & Core Computer Center, IIT Patna',
      mode: 'hybrid',
      category: 'Hackathon',
      prizePool: '₹2,50,000 INR',
      status: 'upcoming',
    },
    {
      id: 'ev-2',
      title: 'NWoC 2026 (NJACK Winter of Code)',
      slug: 'nwoc-2026',
      description:
        'A two-month open-source sprint connecting university students with elite open-source maintainers across Linux tooling, compilers, and ML platforms.',
      startsAt: '2026-12-01T10:00:00Z',
      venue: 'Global Distributed',
      mode: 'online',
      category: 'Open Source',
      prizePool: 'Swag + Mentorship',
      status: 'upcoming',
    },
    {
      id: 'ev-3',
      title: 'ByteRace — ICPC Prelims Invitational',
      slug: 'byterace-2026',
      description:
        'Fast-paced 5-hour ICPC style team contest testing combinatorial mathematics, flows, and string algorithms on Codeforces.',
      startsAt: '2026-10-28T18:00:00Z',
      venue: 'Online Arena',
      mode: 'online',
      category: 'Contest',
      prizePool: '₹50,000 INR',
      status: 'upcoming',
    },
    {
      id: 'ev-4',
      title: 'Kernel Hacking & Exploit Mitigation Workshop',
      slug: 'kernel-exploit-workshop',
      description:
        'Hands-on deep dive into Linux binary exploitation, ROP gadgets, ASLR bypass techniques, and eBPF security probing.',
      startsAt: '2026-10-24T17:00:00Z',
      venue: 'Tutorial Block Room 201, IIT Patna',
      mode: 'offline',
      category: 'Workshop',
      prizePool: null,
      status: 'upcoming',
    },
  ];

  const items = events && events.length > 0 ? events : defaultEvents;

  return (
    <section id="events" ref={containerRef} className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Technical Coordinates */}
        <div className="mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#CCFF00]">
            <span>{'[ 03 // RADAR_EVENTS_TIMELINE ]'}</span>
            <span className="text-white/20">{'///'}</span>
            <span className="text-[#8A8F98]">CHRONOLOGICAL APPARATUS</span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SplitTextReveal
              text="UPCOMING HACKATHONS & RADAR PROTOCOLS."
              as="h2"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6]"
            />
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-[#8A8F98] transition-all hover:border-[#CCFF00]/40 hover:text-white"
            >
              <span>VIEW FULL RADAR</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#CCFF00] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Schematic Circuit-Board Timeline Container */}
        <div className="relative">
          {/* Central Schematic Line (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.08]"
          >
            {/* Glowing tracer path that draws down with scroll */}
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="absolute inset-0 w-full bg-gradient-to-b from-[#CCFF00] via-[#CCFF00] to-transparent shadow-[0_0_12px_#CCFF00]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {items.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const dateStr =
                typeof event.startsAt === 'string'
                  ? new Date(event.startsAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : event.startsAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });

              return (
                <div
                  key={event.id || idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Left / Right Content Card */}
                  <div className="w-full md:w-[46%]">
                    <SpotlightBentoCard>
                      <div className="space-y-4">
                        {/* Header Status Row */}
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-[10px] text-[#8A8F98]">
                          <span className="flex items-center gap-1.5 text-[#CCFF00]">
                            <Radio className="h-3.5 w-3.5 animate-pulse" />
                            {event.category?.toUpperCase() || 'EVENT'}
                          </span>
                          <span className="rounded bg-white/5 px-2 py-0.5 uppercase">
                            {event.mode || 'HYBRID'}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F3F4F6]">
                            {event.title}
                          </h3>
                          <p className="mt-2 font-sans text-sm text-[#8A8F98] leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8A8F98] pt-2 border-t border-white/[0.06]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#CCFF00]" />
                            {dateStr}
                          </span>
                          {event.venue && (
                            <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                              <MapPin className="h-3.5 w-3.5 text-white/50" />
                              <span className="truncate">{event.venue}</span>
                            </span>
                          )}
                          {event.prizePool && (
                            <span className="flex items-center gap-1.5 text-[#CCFF00] font-semibold">
                              <Trophy className="h-3.5 w-3.5" />
                              {event.prizePool}
                            </span>
                          )}
                        </div>

                        {/* Action Link */}
                        <div className="pt-2">
                          <Link
                            href={
                              event.slug === 'apeireon-2026'
                                ? '/apeireon'
                                : event.slug === 'nwoc-2026'
                                ? '/nwoc'
                                : `/events/${event.slug}`
                            }
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#CCFF00] hover:underline"
                          >
                            <span>REGISTER PROTOCOL</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </SpotlightBentoCard>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="my-4 md:my-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#07080A] shadow-md z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-full md:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
