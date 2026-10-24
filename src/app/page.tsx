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
import TeamSection from '@/components/TeamSection';

export const revalidate = 300; // Cache 5 min for instant loads

export default async function HomePage() {
  // Fetch real seeded data from Prisma
  const upcomingEvents = await prisma.event.findMany({
    where: { status: 'upcoming' },
    orderBy: { startsAt: 'asc' },
    take: 4,
  });

  // Projects section is commented out for now; will re-enable in future if needed
  // const projects = await prisma.project.findMany({
  //   where: { featured: true },
  //   take: 4,
  // });

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
                wordClassName="text-[#FF5722]"
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]"
              />
            </div>

            {/* Editorial Subtitle */}
            <p className="mt-7 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#8A8F98]">
              NJACK (Not Just Another Computer Science Club) is the official Computer Science Club of IIT Patna, a vibrant community dedicated to empowering students to hone technical skills, collaborate on real-world projects, and organize premier coding competitions and hackathons.
            </p>

            {/* Action Buttons & Magnetic Trigger */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic pullFactor={0.15}>
                <Link
                  href="/#divisions"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5722] px-6 py-2.5 font-sans text-sm font-semibold text-[#F3F4F6] shadow-lift transition-all hover:bg-[#FF6A3D] active:scale-[0.98]"
                >
                  <span>Explore Divisions</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>

              <Magnetic pullFactor={0.15}>
                <Link
                  href="/resources"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-5 py-2.5 font-sans text-sm font-medium text-neutral-300 transition-all hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white active:scale-[0.98]"
                >
                  <span>Explore Resources</span>
                  <ArrowRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </Magnetic>
            </div>

            {/* Club orientation: running copy, not a metric template */}
            <div className="mt-14 border-t border-white/[0.10] pt-7">
              <p className="max-w-prose font-sans text-sm leading-relaxed text-[#8A8F98]">
                Four divisions run the club:{' '}
                <Link href="/#divisions" className="font-medium text-[#F3F4F6] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-[#FF5722]">competitive programming, development and open source, machine learning, and cyber security</Link>. Each winter we run{' '}
                <Link href="/nwoc" className="font-medium text-[#F3F4F6] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-[#FF5722]">NWoC</Link>, a mentored open-source programme. Each spring,{' '}
                <Link href="/apeireon" className="font-medium text-[#FF5722] underline decoration-[#FF5722]/40 underline-offset-4 transition-colors hover:decoration-[#FF5722]">Apeireon</Link>, our flagship fest.
              </p>
            </div></div></div>
          </section>

      {/* ========================================================
          2. INTERACTIVE BENTO GRID (DIVISIONS & WHAT WE BUILD)
      ======================================================== */}
      <InteractiveBentoDivisions />

      {/* ========================================================
          3. PROJECTS & OPEN SOURCE SHOWCASE (COMMENTED OUT)
      ======================================================== */}
      {/* <ProjectsShowcase projects={projects} /> */}

      {/* ========================================================
          4. EVENTS & HACKATHON TIMELINE
      ======================================================== */}
      <EventsTimeline events={upcomingEvents} />


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
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#FF5722] bg-[#FF5722] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FF8A00] shrink-0"
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

      {/* ========================================================
          7. NJACK LEADERSHIP & TEAM (COORDINATORS & SUB-COORDINATORS)
      ======================================================== */}
      <TeamSection />

    </div>
  );
}
