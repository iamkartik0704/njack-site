import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Terminal,
  Shield,
  Award,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  HeartHandshake
} from 'lucide-react';

export const revalidate = 300;

export default function AboutPage() {
  const pillars = [
    {
      title: 'Peer Mentorship & Open Learning',
      desc: 'Seniors pass down competitive tricks, system architectures, and research insights to freshers through weekly syncs, workshops, and open code reviews.',
      icon: HeartHandshake,
      color: 'text-cyan-400',
    },
    {
      title: 'Competitive Excellence',
      desc: 'Our members represent IIT Patna at ICPC World Finals, top-tier CTF arenas, Google Summer of Code, and global hackathons.',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      title: 'Production Systems Craftsmanship',
      desc: 'We build tangible tools, scalable web microservices, and autonomous robotics projects used across IIT Patna campus and the broader open-source world.',
      icon: Code2,
      color: 'text-emerald-400',
    },
    {
      title: 'Security & Ethical Hacking',
      desc: 'Fostering deep systems knowledge through binary exploitation, reverse engineering, and responsible disclosure in our dedicated Cyber Security division.',
      icon: Shield,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-950/20 via-slate-900/40 to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300">
              <Terminal className="h-3.5 w-3.5" />
              <span>Not Just Another Coding Klub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">NJACK</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              NJACK (Not Just Another Coding Klub) is the official Coding Club under the Students’ Gymkhana at the Indian Institute of Technology Patna (IIT Patna).
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* Heritage Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Heritage & Purpose
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded over a decade ago by passionate students of the Department of Computer Science & Engineering at IIT Patna, NJACK was born out of a desire to create a collaborative haven for programmers, algorithmic competitors, security researchers, and hackers.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Today, NJACK operates across four specialized divisions: <strong>Competitive Programming (CP)</strong>, <strong>Development & Open Source (Dev & OS)</strong>, <strong>Machine Learning (ML)</strong>, and <strong>Cyber Security (CSEC)</strong>. We organize campus-wide bootcamps, premier hackathons, flagship coding fests, and the prestigious <strong>NJACK Winter of Code (NWoC)</strong>.
            </p>

            <div className="pt-2">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all shadow-glow-cyan"
              >
                <span>Meet the Student Council</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Affiliation</h3>
                <p className="text-xs text-slate-400">Technical Affairs Council, Gymkhana, IIT Patna</p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Campus Location:</span>
                <span className="font-medium text-white">Bihta, Patna, Bihar 801106</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Official Email:</span>
                <span className="font-mono text-cyan-400">njack@iitp.ac.in</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Active Technical Divisions:</span>
                <span className="font-medium text-white">4 Specialized Divisions</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Flagship Events:</span>
                <span className="font-medium text-white">NWoC, Apeireon, ByteRace</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Our Core Pillars
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Every initiative, workshop, and hackathon at NJACK is anchored in four values.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 ${pillar.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-white text-base">{pillar.title}</h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Affiliation & Gymkhana Banner */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-purple-950/30 p-8 backdrop-blur-xl text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            IIT Patna Students' Gymkhana Affiliation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            NJACK operates with the support and guidance of the Department of Computer Science & Engineering and the Technical Affairs Council of the Students' Gymkhana, IIT Patna.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white border border-white/10 hover:bg-white/20 transition-all"
            >
              Get in Touch
            </Link>
            <Link
              href="/resources"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all"
            >
              Explore Club Resources
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
