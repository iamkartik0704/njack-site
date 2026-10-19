import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Trophy,
  Calendar,
  FolderGit2,
  Users,
  ExternalLink,
  ChevronRight,
  Zap,
  Globe,
  Award,
} from 'lucide-react';
import HeroParticles from '@/components/HeroParticles';
import StatsCounter from '@/components/StatsCounter';
import UpcomingEventsStrip from '@/components/UpcomingEventsStrip';
import TechMarquee from '@/components/TechMarquee';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { BlurText } from '@/components/ui/blur-text';
import { Magnet } from '@/components/ui/magnet';

const deptIcons: Record<string, React.ElementType> = {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
};

const deptDetails: Record<
  string,
  {
    tag: string;
    border: string;
    bg: string;
    textColor: string;
    topics: string[];
  }
> = {
  cp: {
    tag: 'Algorithmic Dominance',
    border: 'border-orange-500/20 hover:border-orange-500/50',
    bg: 'bg-[#0b0d13]',
    textColor: 'text-orange-400',
    topics: ['ICPC Regional Ladder', 'Codeforces Rounds', 'Segment Trees & DP', 'Graph Algorithms'],
  },
  'dev-os': {
    tag: 'Production Systems',
    border: 'border-orange-500/20 hover:border-orange-500/50',
    bg: 'bg-[#0b0d13]',
    textColor: 'text-orange-400',
    topics: ['Full-Stack Architectures', 'Linux Kernel & Tooling', 'NWoC Open Source', 'GSoC Mentorship'],
  },
  ml: {
    tag: 'Intelligent Systems',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    bg: 'bg-[#0b0d13]',
    textColor: 'text-amber-400',
    topics: ['Transformer Architectures', 'PyTorch & LoRA', 'Computer Vision', 'Kaggle Competitions'],
  },
  'cyber-security': {
    tag: 'Offensive & Defensive Security',
    border: 'border-amber-600/20 hover:border-amber-600/50',
    bg: 'bg-[#0b0d13]',
    textColor: 'text-amber-400',
    topics: ['CTF Championships', 'Binary Exploitation', 'Web Vulnerabilities', 'Cryptography'],
  },
};

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [departments, upcomingEvents, featuredResources, tracks, projects, posts, teamLeads] =
    await Promise.all([
      prisma.department.findMany({ orderBy: { order: 'asc' } }),
      prisma.event.findMany({
        where: { status: 'upcoming' },
        orderBy: { startsAt: 'asc' },
        take: 4,
      }),
      prisma.resource.findMany({
        where: { featured: true },
        include: { department: true },
        take: 6,
      }),
      prisma.track.findMany({
        include: { department: true, items: true },
        orderBy: { order: 'asc' },
      }),
      prisma.project.findMany({
        where: { featured: true },
        take: 3,
      }),
      prisma.post.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
      prisma.teamMember.findMany({
        where: { role: { contains: 'Lead' } },
        include: { department: true },
        orderBy: { order: 'asc' },
        take: 5,
      }),
    ]);

  const resourceCount = await prisma.resource.count();
  const quizCount = await prisma.quiz.count();
  const eventCount = await prisma.event.count();
  const projectCount = await prisma.project.count();

  return (
    <div className="relative bg-[#060709] text-white selection:bg-[#ff5500] selection:text-white">
      {/* ================================================================ */}
      {/* HERO SECTION — ASYMMETRICAL EDITORIAL WITH LIVE TERMINAL         */}
      {/* ================================================================ */}
      <section
        className="relative min-h-[90vh] flex items-center bg-[#060709] overflow-hidden py-16 lg:py-24"
        id="hero-section"
      >
        <AnimatedGridPattern
          numSquares={32}
          maxOpacity={0.2}
          duration={3.5}
          repeatDelay={0.5}
          className="opacity-60"
        />
        <HeroParticles />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Bold Typography & Clear Statements */}
            <div className="lg:col-span-7 space-y-6">
              {upcomingEvents.length > 0 && (
                <div className="hero-badge">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-md border border-orange-500/30 bg-[#0e1117] px-3.5 py-1.5 text-xs font-semibold text-orange-400 hover:border-orange-500 hover:text-white transition-colors"
                    id="hero-announcement-badge"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500]" />
                    <span>Session Notice: {upcomingEvents[0].title}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}

              <h1 className="hero-title text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
                <BlurText text="Not Just Another" delay={65} animateBy="words" className="text-white block" />
                <BlurText text="Coding Club." delay={90} animateBy="words" className="text-[#ff5500] block mt-1" />
              </h1>

              <p className="hero-desc text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                The Computer Science and engineering society of IIT Patna. Fostering ICPC
                Regional finalists, Google Summer of Code contributors, ML researchers, and systems developers.
              </p>

              {/* Action Buttons */}
              <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
                <Link href="/resources" id="hero-explore-resources">
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    background="#ff5500"
                    borderRadius="8px"
                    className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Browse Roadmaps</span>
                    <ArrowRight className="h-4 w-4 ml-0.5" />
                  </ShimmerButton>
                </Link>
                <Magnet magnitude={0.25} maxDistance={120}>
                  <Link
                    href="/quizzes"
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#0d1016] px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-orange-500/50 hover:bg-[#121620] hover:text-white transition-colors"
                    id="hero-take-quiz"
                  >
                    <span>Self-Check Quizzes</span>
                  </Link>
                </Magnet>
              </div>

              {/* Authentic Numerical Proof */}
              <div className="hero-stats pt-4">
                <StatsCounter
                  resources={resourceCount}
                  quizzes={quizCount}
                  events={eventCount}
                  projects={projectCount}
                />
              </div>
            </div>

            {/* Right Column: The Live Thing — Interactive Terminal */}
            <div className="lg:col-span-5 w-full">
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* UPCOMING EVENTS TICKER STRIP                                     */}
      {/* ================================================================ */}
      {upcomingEvents.length > 0 && (
        <UpcomingEventsStrip
          events={upcomingEvents.map((e) => ({
            id: e.id,
            title: e.title,
            slug: e.slug,
            startsAt: e.startsAt.toISOString(),
            venue: e.venue,
            department: e.department,
          }))}
        />
      )}

      {/* ================================================================ */}
      {/* TECH STACK & DOMAINS MARQUEE                                     */}
      {/* ================================================================ */}
      <TechMarquee />

      {/* ================================================================ */}
      {/* FOUR SPECIALIZED DIVISIONS — EDITORIAL SHOWCASE                   */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#080a10]" id="departments-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Four Specialized Engineering Divisions
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Every department functions with dedicated coordinators, curated roadmaps, hands-on
              workshops, and competitive contest participation.
            </p>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept) => {
              const Icon = deptIcons[dept.icon] || Code2;
              const details = deptDetails[dept.slug] || deptDetails['dev-os'];
              return (
                <div
                  key={dept.id}
                  className={`gsap-card rounded-xl border ${details.border} ${details.bg} p-7 transition-colors`}
                  id={`dept-card-${dept.slug}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#121622] text-orange-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-slate-400">
                          {details.tag}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-0.5">{dept.name}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {dept.description}
                  </p>

                  {/* Core Topics Checklist */}
                  <div className="grid grid-cols-2 gap-2 mb-6 py-2">
                    {details.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="h-1 w-1 rounded-full bg-[#ff5500]" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-white transition-colors"
                    >
                      <span>Explore Department Hub</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/resources"
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      View Resources
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CURATED KNOWLEDGE BASE & LEARNING TRACKS                         */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#0a0d14]" id="resources-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Curated Engineering Roadmaps
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Verified books, production repositories, interactive tutorials, and problem sets
                organized by difficulty level.
              </p>
            </div>
            <Link
              href="/resources"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
            >
              <span>Explore all {resourceCount} resources</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredResources.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-card group rounded-xl border border-white/10 bg-[#0b0e14] p-5 flex flex-col hover:border-orange-500/40 hover:bg-[#10141f] transition-colors"
                id={`featured-resource-${res.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded border border-white/10 bg-[#131722] px-2 py-0.5 text-xs font-semibold text-slate-300">
                    {res.department.name}
                  </span>
                  <span className="rounded border border-white/10 bg-[#131722] px-2 py-0.5 text-xs text-orange-400">
                    {res.difficulty}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-4">
                  {res.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                  <span className="capitalize">{res.type} · {res.topic}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-400" />
                </div>
              </a>
            ))}
          </div>

          {/* Structured Learning Tracks */}
          {tracks.length > 0 && (
            <div className="mt-20">
              <div className="gsap-section-header flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Step-by-Step Learning Tracks
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Structured multi-week curriculum designed for freshman orientation and technical mastery
                  </p>
                </div>
                <Link
                  href="/resources/tracks"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
                >
                  <span>All Tracks</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="gsap-stagger-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tracks.map((track) => (
                  <Link
                    key={track.id}
                    href="/resources/tracks"
                    className="gsap-card group rounded-xl border border-white/10 bg-[#0b0e14] p-5 hover:border-orange-500/40 hover:bg-[#10141f] transition-colors"
                    id={`track-card-${track.slug}`}
                  >
                    <span className="text-xs font-semibold text-orange-400">
                      {track.department.name}
                    </span>
                    <h4 className="text-white font-bold text-sm mt-1 mb-1.5 group-hover:text-orange-300 transition-colors">
                      {track.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {track.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                      <span>{track.items.length} units</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROVEN TRACK RECORD & COMPETITIVE WINS                            */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#07090e]" id="achievements-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Competitive Track Record
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Verified national and international results achieved by IIT Patna teams mentored by NJACK.
            </p>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                metric: 'Rank 47',
                title: 'ICPC Asia-West Regional Finals',
                description:
                  'Team IITP_BinaryBeasts secured 47th rank at the Asia-West Regional 2025, qualifying among 200+ teams across the country.',
                note: 'Competitive Programming',
              },
              {
                icon: Globe,
                metric: '12 Contributors',
                title: 'Google Summer of Code 2025',
                description:
                  'Mentored 12 student selections across prominent open source foundations including CNCF, OpenCV, TensorFlow, and Godot.',
                note: 'Open Source Development',
              },
              {
                icon: Trophy,
                metric: 'Top 100',
                title: 'CTFTime Global University Rank',
                description:
                  'Team NJACK_Pwners broke into the global top 100 university ranking after high placement in picoCTF and CakeCTF 2025.',
                note: 'Cyber Security',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="gsap-card rounded-xl border border-white/10 bg-[#0b0e14] p-7 flex flex-col justify-between"
                  id={`achievement-card-${idx}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
                        {item.metric}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121622] text-orange-400">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 text-xs text-orange-400/90 font-medium">
                    {item.note}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-right">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
            >
              <span>View full club timeline</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRODUCTION PROJECTS & CODEBASES                                   */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#0a0d14]" id="projects-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Production Codebases & Tools
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Software built, maintained, and deployed by NJACK members for the campus and developer community.
              </p>
            </div>
            <Link
              href="/projects"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="gsap-card rounded-xl border border-white/10 bg-[#0b0e14] overflow-hidden flex flex-col"
                id={`project-card-${project.slug}`}
              >
                <div className="relative h-44 overflow-hidden bg-[#121622]">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stackTags.split(',').map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-[#131722] px-2 py-0.5 text-xs text-slate-300"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-white transition-colors"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TECHNICAL ARTICLES & WRITEUPS                                    */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#07090e]" id="blog-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Technical Articles & Writeups
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                In-depth deep dives on algorithms, distributed architecture, CTF challenges, and machine learning.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
            >
              <span>View all articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="gsap-card group rounded-xl border border-white/10 bg-[#0b0e14] overflow-hidden flex flex-col hover:border-orange-500/40 hover:bg-[#10141f] transition-colors"
                id={`blog-card-${post.slug}`}
              >
                {post.cover && (
                  <div className="relative h-40 overflow-hidden bg-[#121622]">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.split(',').slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-[#131722] px-2 py-0.5 text-xs text-slate-300"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                    <span>{post.author}</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* LEADERSHIP & COORDINATORS                                        */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#0a0d14]" id="team-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-header max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Department Coordinators
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Session 2026-27 core coordinators leading workshops, contests, and technical initiatives.
            </p>
          </div>

          <div className="gsap-stagger-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamLeads.map((member) => (
              <div
                key={member.id}
                className="gsap-card rounded-xl border border-white/10 bg-[#0b0e14] p-5 text-center"
                id={`team-member-${member.id}`}
              >
                <div className="relative mx-auto h-20 w-20 rounded-full overflow-hidden border border-white/15 mb-3 bg-[#131722]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-white font-bold text-sm truncate">{member.name}</h4>
                <p className="text-xs text-orange-400 font-medium mt-0.5 truncate">{member.role}</p>
                {member.department && (
                  <p className="text-xs text-slate-500 mt-1 truncate">{member.department.name}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#0b0e14] px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-orange-500/50 hover:text-white transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>View Full Leadership & Mentors</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FLAGSHIP INITIATIVES — NWOC & APEIREON                            */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#07090e]" id="flagships-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NWoC Card */}
            <div
              className="gsap-card relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0e14] p-8 flex flex-col justify-between"
              id="flagship-nwoc"
            >
              <BorderBeam size={280} duration={14} colorFrom="#ff5500" colorTo="#f59e0b" delay={0} />
              <div>
                <span className="text-xs font-semibold text-orange-400">
                  Annual Open Source Program
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                  NJACK Winter of Code (NWoC)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  India&apos;s premier student-run month-long open source initiative. Over 500 pull requests
                  merged across 35 production repositories, preparing students for Google Summer of Code.
                </p>
              </div>
              <Link
                href="/nwoc"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-white transition-colors"
              >
                <span>View NWoC Program Details</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Apeireon Card */}
            <div
              className="gsap-card relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0e14] p-8 flex flex-col justify-between"
              id="flagship-apeireon"
            >
              <BorderBeam size={280} duration={14} colorFrom="#f59e0b" colorTo="#ff5500" delay={7} />
              <div>
                <span className="text-xs font-semibold text-amber-400">
                  Annual Technical Fest
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                  Apeireon CS Festival
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  IIT Patna&apos;s annual flagship computer science festival. Featuring King of the Hills
                  algorithmic challenge, Forecast Frenzy machine learning contest, CACTUS security CTF,
                  and SpeedRun hackathon.
                </p>
              </div>
              <Link
                href="/apeireon"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-white transition-colors"
              >
                <span>View Apeireon Schedule</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FINAL CALL TO ACTION                                             */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#07090e]" id="cta-section">
        <div className="gsap-section-header mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get Involved with NJACK
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base">
            Whether you are preparing for ICPC Regionals, building production web software, or training
            deep learning models, our roadmaps and team are here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/resources"
              className="flex items-center gap-2 rounded-lg bg-[#ff5500] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#e04b00] active:scale-95 transition-transform"
              id="cta-start-learning"
            >
              <BookOpen className="h-4 w-4" />
              <span>Explore Resource Hub</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-[#0b0e14] px-7 py-3.5 text-sm font-semibold text-slate-200 hover:border-orange-500/50 hover:text-white transition-colors"
              id="cta-contact"
            >
              <span>Contact Department Leads</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
