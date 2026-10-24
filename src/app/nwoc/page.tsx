import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Calendar,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Users,
  ExternalLink,
  Award,
  ArrowRight
} from 'lucide-react';

export const revalidate = 300;

export default function NWoCPage() {
  const phases = [
    {
      phase: 'Phase 01',
      date: 'Nov 01 - Nov 20',
      title: 'Mentor & Project Registration',
      desc: 'Project maintainers submit open-source repositories with curated beginner and intermediate issues labeled for NWoC.',
    },
    {
      phase: 'Phase 02',
      date: 'Nov 25 - Dec 05',
      title: 'Student Registrations & Community Bonding',
      desc: 'Students join Discord channels, interact with mentors, explore codebases, and set up local dev environments.',
    },
    {
      phase: 'Phase 03',
      date: 'Dec 06 - Jan 15',
      title: 'Active Coding Period',
      desc: 'Contributors claim issues, submit pull requests, undergo code reviews, and earn leaderboard points for merged PRs.',
    },
    {
      phase: 'Phase 04',
      date: 'Jan 20 - Jan 25',
      title: 'Final Evaluations & Swag Distribution',
      desc: 'Mentors evaluate contributions. Top performers receive certificates, limited-edition NWoC swags, and mentor referrals.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6]"> {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1A1714]/10 bg-bone text-bone-ink py-16 sm:py-24"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-3xl space-y-4"> <div className="inline-flex items-center gap-2 rounded-full border border-[#1A1714]/20 bg-[#1A1714]/[0.04] px-3 py-1 text-xs font-mono text-[#B23A14]"> <Code2 className="h-3.5 w-3.5" /> <span>Winter of Code Initiative</span> </div> <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1A1714] leading-tight"> NJACK Winter of Code </h1> <p className="max-w-prose text-base text-[#1A1714]/75 leading-relaxed"> A month-long open source extravaganza hosted by IIT Patna. Learn Git workflows, contribute to production repositories, and get mentored by seasoned GSoC scholars.
            </p> <div className="flex flex-wrap items-center gap-4 pt-2"> <Link
                href="/projects" className="inline-flex items-center gap-2 rounded-sm bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-bone shadow-lift-bone transition-all hover:bg-[#2E2924] active:scale-[0.98]" > <span>Explore Participating Repos</span> <ArrowRight className="h-4 w-4" /> </Link> <Link
                href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-transparent px-5 py-2.5 text-xs font-semibold text-[#1A1714] border border-[#1A1714]/25 hover:bg-[#1A1714]/[0.06] transition-all" > <span>Apply as Mentor</span> </Link> </div> </div> </div> </section> {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16"> {/* NWoC Key Stats */}
        <div className="flex flex-col gap-x-12 gap-y-3 border-y border-white/[0.10] py-7 sm:flex-row sm:flex-wrap sm:items-baseline"><div className="flex items-baseline gap-2.5"><span className="font-mono text-2xl tabular-nums text-[#FF8A00] sm:text-3xl">1,143</span><span className="text-xs text-[#8A8F98]">Student Participants</span></div><div className="flex items-baseline gap-2.5"><span className="font-mono text-2xl tabular-nums text-[#FF8A00] sm:text-3xl">38</span><span className="text-xs text-[#8A8F98]">Open Source Projects</span></div><div className="flex items-baseline gap-2.5"><span className="font-mono text-2xl tabular-nums text-[#FF8A00] sm:text-3xl">2,047</span><span className="text-xs text-[#8A8F98]">Pull Requests Merged</span></div><div className="flex items-baseline gap-2.5"><span className="font-mono text-2xl tabular-nums text-[#FF8A00] sm:text-3xl">₹1,65,000</span><span className="text-xs text-[#8A8F98]">Prizes & Goodies</span></div></div> 
        <section className="space-y-8"> <div className="max-w-prose"> <h2 className="text-2xl sm:text-3xl font-semibold text-[#F3F4F6]"> Program Timeline & Phases
            </h2> <p className="mt-1 text-xs sm:text-sm text-[#8A8F98]"> Clear roadmap guiding your open source transformation over winter break.
            </p> </div> <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.10]"> {phases.map((item, idx) => (
              <div
                key={idx}
                className="py-6 p-6 backdrop-blur-md flex flex-col justify-between hover:border-[#FF5722]/40 transition-all" > <div> <div className="flex items-center justify-between text-xs font-mono text-[#FF8A00] mb-3"> <span className="font-bold">{item.phase}</span> <span className="text-[#6B7079]">{item.date}</span> </div> <h3 className="text-base font-bold text-white mb-2">{item.title}</h3> <p className="text-xs text-neutral-300 leading-relaxed">{item.desc}</p> </div> </div> ))}
          </div> </section> {/* Perks Section */}
        <section className="border-y border-white/[0.10] py-10 sm:py-12"> <div className="grid grid-cols-1 divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0 [&>*]:px-0 md:[&>*]:px-7 md:[&>*:first-child]:pl-0 [&>*]:py-6 md:[&>*]:py-0"> <div className="space-y-2"> <Award className="h-8 w-8 text-[#FF8A00] mb-2" /> <h3 className="text-base font-bold text-white">Official Certificate</h3> <p className="text-xs text-neutral-300 leading-relaxed"> Receive verified completion credentials signed by NJACK IIT Patna and project maintainers.
              </p> </div> <div className="space-y-2"> <Users className="h-8 w-8 text-[#FF8A00] mb-2" /> <h3 className="text-base font-bold text-white">1-on-1 GSoC Mentorship</h3> <p className="text-xs text-neutral-300 leading-relaxed"> Get your pull requests reviewed directly by past Google Summer of Code contributors.
              </p> </div> <div className="space-y-2"> <Sparkles className="h-8 w-8 text-[#FF8A00] mb-2" /> <h3 className="text-base font-bold text-white">Exclusive Swag Kits</h3> <p className="text-xs text-neutral-300 leading-relaxed"> Top 25 contributors take home limited-edition hoodies, stickers, and tech accessories.
              </p> </div> </div> </section> </main> </div> );
}
