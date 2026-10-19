import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  ArrowRight,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import SplitTextReveal from '@/components/SplitTextReveal';
import Magnetic from '@/components/Magnetic';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import InteractiveBentoDivisions from '@/components/InteractiveBentoDivisions';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import EventsTimeline from '@/components/EventsTimeline';
import HeroLogoLockup from '@/components/HeroLogoLockup';

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
            {/* Main Hero Title (3 Stacked Lines with Masked Spring Reveal) */}
            <div className="space-y-1 sm:space-y-2">
              {/* Line 1: Official NJACK Logo Brand Lockup with Interactive 3D Spring Hover */}
              <div className="pt-1 pb-1">
                <HeroLogoLockup />
              </div>

              {/* Line 2: CODE. COMPILE. */}
              <SplitTextReveal
                text="CODE. COMPILE."
                as="h1"
                delay={0.1}
                wordClassName="text-[#F3F4F6]"
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F3F4F6] leading-[0.95]"
              />

              {/* Line 3: CONQUER. in NJACK Orange Gradient */}
              <SplitTextReveal
                text="CONQUER."
                as="h1"
                delay={0.2}
                wordClassName="text-gradient-njack drop-shadow-[0_0_35px_rgba(255,87,34,0.45)]"
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]"
              />
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-7 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#8A8F98]">
              NJACK (Not Just Another Coding Klub) is the official Coding Club of IIT Patna—a vibrant community dedicated to empowering students to hone technical skills, collaborate on real-world projects, and organize premier coding competitions and hackathons.
            </p>

            {/* Action Buttons & Magnetic Trigger */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic pullFactor={0.15}>
                <Link
                  href="/#divisions"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5722] px-6 py-2.5 font-sans text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_24px_rgba(255,87,34,0.3)] transition-all hover:bg-[#FF6A3D] hover:shadow-[0_0_36px_rgba(255,87,34,0.45)] active:scale-[0.98]"
                >
                  <span>Explore Divisions</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>

              <Magnetic pullFactor={0.15}>
                <Link
                  href="/resources/tracks"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 font-sans text-sm font-medium text-neutral-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-[0.98]"
                >
                  <span>Learning Tracks</span>
                  <ArrowRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </Magnetic>
            </div>

            {/* Key Pillars & Club Overview */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-white/[0.08] pt-8">
              <Link
                href="/#divisions"
                className="group block space-y-1.5 transition-opacity hover:opacity-90"
              >
                <div className="font-display text-3xl sm:text-4xl font-black text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors">
                  4
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-neutral-300 group-hover:text-[#FF5722] transition-colors">
                    Core Divisions
                  </p>
                  <p className="font-sans text-[11px] text-[#8A8F98]">
                    CP · Dev &amp; OS · AI/ML · CSEC
                  </p>
                </div>
              </Link>

              <Link
                href="/apeireon"
                className="group block space-y-1.5 transition-opacity hover:opacity-90"
              >
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#FF5722] tracking-tight group-hover:text-[#FF6A3D] transition-colors">
                  Apeireon
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-neutral-300 group-hover:text-[#FF5722] transition-colors">
                    Flagship Tech Fest
                  </p>
                  <p className="font-sans text-[11px] text-[#8A8F98]">
                    Annual Hackathons &amp; Contests
                  </p>
                </div>
              </Link>

              <Link
                href="/nwoc"
                className="group block space-y-1.5 transition-opacity hover:opacity-90"
              >
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors">
                  NWoC
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-neutral-300 group-hover:text-[#FF5722] transition-colors">
                    Winter of Code
                  </p>
                  <p className="font-sans text-[11px] text-[#8A8F98]">
                    Open-Source Mentorship
                  </p>
                </div>
              </Link>
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
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
                <span>Curriculum & Learning Tracks</span>
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">
                From First Principles to Production.
              </h2>
            </div>

            <Link
              href="/resources/tracks"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-xs font-medium text-neutral-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              <span>Browse All Tracks</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks && tracks.length > 0 ? (
              tracks.map((track) => (
                <SpotlightBentoCard key={track.id} className="h-full">
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#8A8F98] mb-3">
                        <span className="text-[#FF5722] uppercase font-semibold">
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
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#FF5722] hover:underline"
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
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
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
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#FF5722] bg-[#FF5722] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FF8A00] shadow-[0_0_25px_rgba(255,87,34,0.4)] shrink-0"
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
