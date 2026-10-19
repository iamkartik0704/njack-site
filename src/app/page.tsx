import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import SplitTextReveal from '@/components/SplitTextReveal';
import Magnetic from '@/components/Magnetic';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import InteractiveBentoDivisions from '@/components/InteractiveBentoDivisions';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import EventsTimeline from '@/components/EventsTimeline';
import { BorderBeam } from '@/components/ui/border-beam';

export default async function HomePage() {
  // Fetch real seeded data from Prisma
  const [upcomingEvents, tracks, projects] =
    await Promise.all([
      prisma.event.findMany({
        where: { status: 'upcoming' },
        orderBy: { startsAt: 'asc' },
        take: 4,
      }),
      prisma.track.findMany({
        include: { department: true, items: true },
        orderBy: { order: 'asc' },
      }),
      prisma.project.findMany({
        where: { featured: true },
        take: 4,
      }),
    ]);

  return (
    <div className="relative min-h-screen text-[#F3F4F6]">
      {/* ========================================================
          1. HERO SECTION (OVERLAYING 3D WEBGL CENTERPIECE)
      ======================================================== */}
      <section className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl">
            {/* Monospace Terminal Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CCFF00] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CCFF00]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8F98]">
                {'[ NJACK // V2.0_ORBIT ]'}
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-xs text-[#CCFF00] font-semibold">
                {'IIT_PATNA // CS_POWERHOUSE'}
              </span>
            </div>

            {/* Oversized Display Typography with Masked Staggered Reveals */}
            <div className="mt-8 space-y-2">
              <SplitTextReveal
                text="ARCHITECTING SYSTEMS."
                as="h1"
                className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-[#F3F4F6]"
              />
              <SplitTextReveal
                text="SOLVING COMPLEXITY."
                as="h1"
                delay={0.15}
                wordClassName="text-[#CCFF00]"
                className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-[#CCFF00]"
              />
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-8 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#8A8F98]">
              The official Computer Science Club of Indian Institute of Technology Patna. We build distributed production systems, train ICPC algorithmic contenders, conduct AI research, and defend digital infrastructure.
            </p>

            {/* Action Buttons & Magnetic Trigger */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic pullFactor={0.25}>
                <Link
                  href="/#divisions"
                  className="relative group inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#CCFF00]/40 bg-[#CCFF00] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-white shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                >
                  <span>EXPLORE APPARATUS</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <BorderBeam size={80} duration={4} colorFrom="#ffffff" colorTo="#000000" />
                </Link>
              </Magnetic>

              <Magnetic pullFactor={0.2}>
                <Link
                  href="/resources/tracks"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-[#F3F4F6] backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <Sparkles className="h-4 w-4 text-[#CCFF00]" />
                  <span>CURATED TRACKS</span>
                </Link>
              </Magnetic>
            </div>

            {/* Live Telemetry Metric Strip */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.08] pt-8">
              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#F3F4F6]">
                  1,250+
                </span>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                  ACTIVE MEMBERS
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#CCFF00]">
                  3,400+
                </span>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                  OPEN SOURCE PRS
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#F3F4F6]">
                  2,450
                </span>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                  PEAK ICPC RATING
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#CCFF00]">
                  38+
                </span>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                  PODIUM VICTORIES
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. INTERACTIVE BENTO GRID (DIVISIONS & WHAT WE BUILD)
      ======================================================== */}
      <InteractiveBentoDivisions />

      {/* ========================================================
          3. PROJECTS & OPEN SOURCE SHOWCASE
      ======================================================== */}
      <ProjectsShowcase projects={projects} />

      {/* ========================================================
          4. EVENTS & HACKATHON TIMELINE
      ======================================================== */}
      <EventsTimeline events={upcomingEvents} />

      {/* ========================================================
          5. CURATED LEARNING TRACKS STRIP
      ======================================================== */}
      <section className="relative z-10 py-24 border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#CCFF00]">
                <span>{'[ 04 // LEARNING_TRACKS ]'}</span>
                <span className="text-white/20">{'///'}</span>
                <span className="text-[#8A8F98]">STEP-BY-STEP ROADMAPS</span>
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">
                STRUCTURED MASTERY PROTOCOLS.
              </h2>
            </div>

            <Link
              href="/resources/tracks"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-[#8A8F98] hover:text-white hover:border-[#CCFF00]/40 transition-colors"
            >
              <span>BROWSE ALL TRACKS</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#CCFF00]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks && tracks.length > 0 ? (
              tracks.map((track) => (
                <SpotlightBentoCard key={track.id} className="h-full">
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#8A8F98] mb-3">
                        <span className="text-[#CCFF00] uppercase font-semibold">
                          [{track.department?.slug || 'CORE'}]
                        </span>
                        <span>{track.items?.length || 5} MODULES</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#F3F4F6]">
                        {track.title}
                      </h3>
                      <p className="mt-2 font-sans text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                        {track.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <Link
                        href={`/resources/tracks/${track.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#CCFF00] hover:underline"
                      >
                        <span>BEGIN TRACK</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </SpotlightBentoCard>
              ))
            ) : (
              <div className="col-span-full py-8 text-center font-mono text-xs text-[#8A8F98]">
                ROADMAPS INITIALIZING IN PROTOCOL...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. INTERACTIVE QUIZ & KNOWLEDGE ARENA CALLOUT
      ======================================================== */}
      <section className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SpotlightBentoCard className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#CCFF00]">
                  <HelpCircle className="h-4 w-4" />
                  <span>{'[ NJACK // ARENA_EVALUATION ]'}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F4F6]">
                  TEST YOUR ALGORITHMIC & SYSTEMS ACUMEN.
                </h3>
                <p className="font-sans text-sm text-[#8A8F98]">
                  Challenge yourself with timed technical quizzes curated by IIT Patna mentors across Segment Trees, Linux Kernel internals, PyTorch architectures, and Binary Exploitation.
                </p>
              </div>

              <Magnetic pullFactor={0.25}>
                <Link
                  href="/quizzes"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#CCFF00] bg-[#CCFF00] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-white shadow-[0_0_20px_rgba(204,255,0,0.3)] shrink-0"
                >
                  <Trophy className="h-4 w-4" />
                  <span>ENTER ARENA</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Magnetic>
            </div>
          </SpotlightBentoCard>
        </div>
      </section>

    </div>
  );
}
