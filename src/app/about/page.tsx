import React from 'react';
import Link from 'next/link';
import {
  Terminal,
  Shield,
  Award,
  Compass,
  ArrowRight,
  Code2,
  HeartHandshake
} from 'lucide-react';

export const revalidate = 300;

export const metadata = {
  title: 'About NJACK | Official Computer Science Club | IIT Patna',
  description:
    'About NJACK (Not Just Another Computer Science Club), the premier student-led computer science club of IIT Patna.',
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Peer Mentorship & Open Learning',
      desc: 'Seniors pass down competitive tricks, system architectures, and research insights to freshers through weekly syncs, workshops, and open code reviews.',
      icon: HeartHandshake,
      color: 'text-[#FF8A00]',
    },
    {
      title: 'Competitive Excellence',
      desc: 'Our members represent IIT Patna at ICPC World Finals, top-tier CTF arenas, Google Summer of Code, and global hackathons.',
      icon: Award,
      color: 'text-[#FF5722]',
    },
    {
      title: 'Production Systems Craftsmanship',
      desc: 'We build tangible tools, scalable web microservices, and autonomous robotics projects used across IIT Patna campus and the broader open-source world.',
      icon: Code2,
      color: 'text-[#FF8A00]',
    },
    {
      title: 'Security & Ethical Hacking',
      desc: 'Fostering deep systems knowledge through binary exploitation, reverse engineering, and responsible disclosure in our dedicated Cyber Security division.',
      icon: Shield,
      color: 'text-[#FF5722]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722]">
              <Terminal className="h-3.5 w-3.5" />
              <span>Not Just Another Computer Science Club</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8A00] to-[#FF5722]">
                NJACK
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#8A8F98] leading-relaxed">
              NJACK (Not Just Another Computer Science Club) is the official Computer Science Club under the Students’ Gymkhana at the Indian Institute of Technology Patna (IIT Patna).
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* Heritage Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              Heritage &amp; Purpose
            </h2>
            <p className="text-sm text-[#8A8F98] leading-relaxed">
              Founded over a decade ago by passionate students of the Department of Computer Science &amp; Engineering at IIT Patna, NJACK was born out of a desire to create a collaborative haven for programmers, algorithmic competitors, security researchers, and systems hackers.
            </p>
            <p className="text-sm text-[#8A8F98] leading-relaxed">
              Today, NJACK operates across four specialized divisions: <strong>Competitive Programming (CP)</strong>, <strong>Development &amp; Open Source (Dev &amp; OS)</strong>, <strong>Machine Learning (ML)</strong>, and <strong>Cyber Security (CSEC)</strong>. We organize campus-wide bootcamps, premier hackathons, flagship coding fests, and the prestigious <strong>NJACK Winter of Code (NWoC)</strong>.
            </p>

            <div className="pt-2">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF5722] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] transition-all hover:bg-[#FF3D00]"
              >
                <span>Meet the Student Council</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 text-[#FF5722]">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">Affiliation</h3>
                <p className="text-xs text-[#8A8F98]">Technical Affairs Council, Gymkhana, IIT Patna</p>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4 space-y-3 text-xs text-[#8A8F98]">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#8A8F98]">Campus Location:</span>
                <span className="font-medium text-white">Bihta, Patna, Bihar 801106</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#8A8F98]">Official Email:</span>
                <span className="font-mono text-[#FF5722]">njack@iitp.ac.in</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#8A8F98]">Active Technical Divisions:</span>
                <span className="font-medium text-white">4 Specialized Divisions</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8A8F98]">Flagship Events:</span>
                <span className="font-medium text-white">NWoC, Apeireon, ByteRace</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              Our Core Pillars
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8A8F98]">
              Every initiative, workshop, and hackathon at NJACK is anchored in four values.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 ${pillar.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-white text-base">{pillar.title}</h3>
                    <p className="mt-2 text-xs text-[#8A8F98] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Affiliation & Gymkhana Banner */}
        <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#FF5722]/10 via-[#0E1016]/80 to-[#FF8A00]/10 p-8 backdrop-blur-xl text-center space-y-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            IIT Patna Students&apos; Gymkhana Affiliation
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
            NJACK operates with the support and guidance of the Department of Computer Science &amp; Engineering and the Technical Affairs Council of the Students&apos; Gymkhana, IIT Patna.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white border border-white/[0.08] hover:bg-white/[0.08] transition-all"
            >
              Get in Touch
            </Link>
            <Link
              href="/resources"
              className="rounded-xl bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] transition-all hover:bg-[#FF3D00]"
            >
              Explore Club Resources
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
