import React from 'react';
import Link from 'next/link';
import { Award, Trophy, Star, Target, Globe, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 300;

export default function AchievementsPage() {
  const stats = [
    { label: 'GSoC contributors', value: '47', desc: 'Linux Foundation, Apache, KDE and the Python Software Foundation, since 2016' },
    { label: 'ICPC regional finals', value: '2019 · 2022 · 2025', desc: 'Three Asia-West continental appearances' },
    { label: 'Best national CTF finish', value: '4th', desc: 'InCTF 2025, out of 612 registered teams' },
    { label: 'Kaggle Grandmasters', value: '2', desc: 'Plus nine Masters across the AI and ML division' },
  ];

  const milestones = [
    {
      year: '2025-2026',
      title: 'ICPC Asia-West Finals Podium & 11 GSoC Scholars',
      desc: 'Team BinaryBeasts qualified for the ICPC Asia-West Continental Finals. 11 IIT Patna undergraduates secured Google Summer of Code contributor grants.',
      badge: 'Competitive Programming & Dev',
      color: 'border-[#FF8A00]/30 bg-[#FF8A00]/10 text-[#FF8A00]',
    },
    {
      year: '2024-2025',
      title: 'Top 3 Podium at InCTF Nationals',
      desc: 'Our Cyber Security team cracked complex heap exploitation and zero-day web challenges, earning 2nd Runner Up against 250+ collegiate teams.',
      badge: 'Cyber Security',
      color: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722]',
    },
    {
      year: '2023-2024',
      title: 'Launch of NJACK Winter of Code (NWoC)',
      desc: 'Over 1,200 student developers across 40 institutes contributed to 30+ open source repositories hosted under NJACK mentorship.',
      badge: 'Open Source',
      color: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF8A00]',
    },
    {
      year: '2022-2023',
      title: 'ICPC World Finals Qualification, Dhaka, Bangladesh',
      desc: 'IIT Patna team proved their algorithmic prowess on the highest collegiate world stage solving complex graph and geometry problems under 5-hour clock.',
      badge: 'World Championship',
      color: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF8A00]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6]"> {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#FF8A00]/20 via-[#0E1016]/40 to-transparent py-16 sm:py-28"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-2xl"> <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/10 px-3 py-1 text-xs font-mono text-[#FF8A00] mb-4"> <Trophy className="h-3.5 w-3.5" /> <span>Hall of Fame</span> </div> <h1 className="font-display text-[2.25rem] sm:text-5xl font-semibold tracking-[-0.035em] text-[#F3F4F6]"> Club Achievements </h1> <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed"> Celebrating over a decade of algorithmic excellence, open-source engineering, and cyber competition milestones at IIT Patna.
            </p> </div> </div> </section> {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16"> {/* KPI Stats */}
        <dl className="divide-y divide-white/[0.06] border-y border-white/[0.10]">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,13rem)_minmax(0,12rem)_1fr] sm:items-baseline sm:gap-8 sm:py-6"
            >
              <dt className="font-display text-sm font-semibold tracking-tight text-[#F3F4F6]">{s.label}</dt>
              <dd className="font-mono text-xl tabular-nums text-[#FF8A00] sm:text-2xl">{s.value}</dd>
              <dd className="max-w-prose text-xs leading-relaxed text-[#8A8F98]">{s.desc}</dd>
            </div>
          ))}
        </dl>
        {/* Milestone Timeline */}
        <section className="space-y-8"> <div> <h2 className="text-2xl sm:text-3xl font-semibold text-[#F3F4F6]"> Milestone Timeline
            </h2> <p className="mt-1 text-xs sm:text-sm text-[#8A8F98]"> Key breakthroughs etched in NJACK history.
            </p> </div> <div className="relative border-l-2 border-white/[0.10] pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-10"> {milestones.map((m, index) => (
              <div key={index} className="relative group"> {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0E1016] border-2 border-[#FF8A00] shadow-glow-amber"> <div className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" /> </div> <div className="rounded-lg border border-white/[0.10] bg-[#0E1016]/40 p-6 backdrop-blur-md transition-all group-hover:border-[#FF8A00]/40 group-hover:bg-[#0E1016]/60 space-y-3"> <div className="flex flex-wrap items-center justify-between gap-2"> <span className="font-mono text-xs font-bold text-[#FF8A00]"> {m.year}
                    </span> <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border ${m.color}`}> {m.badge}
                    </span> </div> <h3 className="text-lg font-bold text-white group-hover:text-[#FF8A00] transition-colors"> {m.title}
                  </h3> <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed"> {m.desc}
                  </p> </div> </div> ))}
          </div> </section> {/* Bottom Banner */}
        <div className="rounded-lg border border-white/[0.10] bg-gradient-to-r from-[#FF8A00]/20 via-[#0E1016]/60 to-orange-950/20 p-8 text-center space-y-4 max-w-4xl mx-auto"> <h3 className="text-xl font-bold text-white"> Ready to build the next milestone?
          </h3> <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto"> Join the technical divisions, follow our structured roadmaps, and participate in weekly practice contests.
          </p> <div className="flex items-center justify-center gap-3 pt-2"> <Link
              href="/resources/tracks" className="rounded-sm bg-gradient-to-r from-[#FF8A00] to-orange-500 px-5 py-2.5 text-xs font-bold text-[#2A0F06] shadow-glow-amber transition-all hover:scale-105" > Start Learning Tracks
            </Link> </div> </div> </main> </div> );
}
