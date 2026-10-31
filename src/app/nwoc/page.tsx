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
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-950/25 via-slate-900/40 to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300">
              <Code2 className="h-3.5 w-3.5" />
              <span>Winter of Code Initiative</span>
            </div>

            <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              NJACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Winter of Code</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A month-long open source extravaganza hosted by IIT Patna. Learn Git workflows, contribute to production repositories, and get mentored by seasoned GSoC scholars.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
              >
                <span>Explore Participating Repos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 border border-white/10 hover:bg-white/10 transition-all"
              >
                <span>Apply as Mentor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* NWoC Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <div className="text-3xl font-black font-mono text-cyan-400">1,200+</div>
            <div className="text-xs text-slate-400 mt-1">Student Participants</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <div className="text-3xl font-black font-mono text-cyan-400">35+</div>
            <div className="text-xs text-slate-400 mt-1">Open Source Projects</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <div className="text-3xl font-black font-mono text-cyan-400">1,800+</div>
            <div className="text-xs text-slate-400 mt-1">Pull Requests Merged</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <div className="text-3xl font-black font-mono text-cyan-400">₹1.5L+</div>
            <div className="text-xs text-slate-400 mt-1">Prizes & Goodies</div>
          </div>
        </div>

        {/* Timeline */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Program Timeline & Phases
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Clear roadmap guiding your open source transformation over winter break.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
                    <span className="font-bold">{item.phase}</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Perks Section */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/30 p-8 sm:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Award className="h-8 w-8 text-cyan-400 mb-2" />
              <h3 className="text-base font-bold text-white">Official Certificate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive verified completion credentials signed by NJACK IIT Patna and project maintainers.
              </p>
            </div>
            <div className="space-y-2">
              <Users className="h-8 w-8 text-cyan-400 mb-2" />
              <h3 className="text-base font-bold text-white">1-on-1 GSoC Mentorship</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get your pull requests reviewed directly by past Google Summer of Code contributors.
              </p>
            </div>
            <div className="space-y-2">
              <Sparkles className="h-8 w-8 text-cyan-400 mb-2" />
              <h3 className="text-base font-bold text-white">Exclusive Swag Kits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Top 25 contributors take home limited-edition hoodies, stickers, and tech accessories.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
