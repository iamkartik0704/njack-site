import React from 'react';
import Link from 'next/link';
import { Award, Trophy, Star, Target, Globe, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 300;

export default function AchievementsPage() {
  const stats = [
    { label: 'GSoC Selections', value: '45+', desc: 'Across Linux Foundation, Apache, KDE & Python Org' },
    { label: 'ICPC World Finals', value: '3x', desc: 'Representing India on the global stage' },
    { label: 'CTF National Rank', value: 'Top 5', desc: 'In InCTF, bi0s, and national cyber defense leagues' },
    { label: 'Kaggle Grandmasters', value: '4', desc: 'Ranked among top 0.1% worldwide data scientists' },
  ];

  const milestones = [
    {
      year: '2025-2026',
      title: 'ICPC Asia-West Finals Podium & 11 GSoC Scholars',
      desc: 'Team BinaryBeasts qualified for the ICPC Asia-West Continental Finals. 11 IIT Patna undergraduates secured Google Summer of Code contributor grants.',
      badge: 'Competitive Programming & Dev',
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    },
    {
      year: '2024-2025',
      title: 'Top 3 Podium at InCTF Nationals',
      desc: 'Our Cyber Security team cracked complex heap exploitation and zero-day web challenges, earning 2nd Runner Up against 250+ collegiate teams.',
      badge: 'Cyber Security',
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    },
    {
      year: '2023-2024',
      title: 'Launch of NJACK Winter of Code (NWoC)',
      desc: 'Over 1,200 student developers across 40 institutes contributed to 30+ open source repositories hosted under NJACK mentorship.',
      badge: 'Open Source',
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    },
    {
      year: '2022-2023',
      title: 'ICPC World Finals Qualification — Dhaka, Bangladesh',
      desc: 'IIT Patna team proved their algorithmic prowess on the highest collegiate world stage solving complex graph and geometry problems under 5-hour clock.',
      badge: 'World Championship',
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-amber-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-300 mb-4">
              <Trophy className="h-3.5 w-3.5" />
              <span>Hall of Fame</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Achievements</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Celebrating over a decade of algorithmic excellence, open-source engineering, and cyber competition milestones at IIT Patna.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md text-center space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                {s.value}
              </div>
              <div className="text-sm font-bold text-white">{s.label}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Milestone Timeline */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Milestone Timeline
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Key breakthroughs etched in NJACK history.
            </p>
          </div>

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-10">
            {milestones.map((m, index) => (
              <div key={index} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 border-2 border-amber-400 shadow-glow-amber">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-all group-hover:border-amber-500/40 group-hover:bg-slate-900/60 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {m.year}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border ${m.color}`}>
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-orange-950/20 p-8 text-center space-y-4 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white">
            Ready to build the next milestone?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Join the technical wings, follow our structured roadmaps, and participate in weekly practice contests.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/resources/tracks"
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-glow-amber transition-all hover:scale-105"
            >
              Start Learning Tracks
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
