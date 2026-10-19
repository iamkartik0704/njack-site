'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  Crown,
  ExternalLink,
  Users,
} from 'lucide-react';
import coordinatorsData from '@/data/coordinators.json';
import subCoordinatorsData from '@/data/sub-coordinators.json';

// LinkedIn Icon
function LinkedInIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// GitHub Icon
function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Codeforces Icon
function CodeforcesIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="10" width="4" height="11" rx="1" />
      <rect x="10" y="4" width="4" height="17" rx="1" />
      <rect x="17" y="14" width="4" height="7" rx="1" />
    </svg>
  );
}

// Department Themes Config matching NJACK Brand
const deptConfig: Record<
  string,
  {
    shortName: string;
    label: string;
    color: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    ringGradient: string;
    glowShadow: string;
  }
> = {
  'Overall Coordinator': {
    shortName: 'OVERALL',
    label: 'Overall Coordinator',
    color: '#FF5722',
    badgeBg: 'bg-[#FF5722]/10',
    badgeBorder: 'border-[#FF5722]/30',
    badgeText: 'text-[#FF5722]',
    ringGradient: 'from-[#FF5722] via-[#FF8A00] to-[#FF5722]',
    glowShadow: 'rgba(255, 87, 34, 0.35)',
  },
  CP: {
    shortName: 'CP',
    label: 'Competitive Programming',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    ringGradient: 'from-cyan-400 via-blue-500 to-cyan-400',
    glowShadow: 'rgba(6, 182, 212, 0.3)',
  },
  'Dev&OS': {
    shortName: 'DEV & OS',
    label: 'Development & OS',
    color: '#10B981',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    ringGradient: 'from-emerald-400 via-teal-500 to-emerald-400',
    glowShadow: 'rgba(16, 185, 129, 0.3)',
  },
  ML: {
    shortName: 'AI / ML',
    label: 'Machine Learning',
    color: '#A855F7',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    ringGradient: 'from-purple-400 via-indigo-500 to-purple-400',
    glowShadow: 'rgba(168, 85, 247, 0.3)',
  },
  Cybersec: {
    shortName: 'CSEC',
    label: 'Cyber Security',
    color: '#F43F5E',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    ringGradient: 'from-rose-400 via-pink-500 to-rose-400',
    glowShadow: 'rgba(244, 63, 94, 0.3)',
  },
};

// Cyber Monogram Avatar matching NJACK Obsidian Theme
function CyberMonogramAvatar({
  name,
  committee,
  size = 'md',
}: {
  name: string;
  committee: string;
  size?: 'md' | 'lg';
}) {
  const theme = deptConfig[committee] || deptConfig['Dev&OS'];
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  const dims = size === 'lg' ? 'h-24 w-24 text-xl' : 'h-16 w-16 text-sm';
  const ringPad = size === 'lg' ? 'p-1' : 'p-[3px]';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr ${theme.ringGradient} ${ringPad} shadow-[0_0_20px_var(--glow)] transition-transform duration-300 group-hover:scale-105`}
      style={{ ['--glow' as string]: theme.glowShadow }}
    >
      <div
        className={`${dims} rounded-full bg-[#0B0D13] flex flex-col items-center justify-center font-display font-extrabold tracking-wider text-white border border-white/10 relative overflow-hidden`}
      >
        {/* Subtle radial sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <span className="relative z-10">{initials}</span>
        <span className="text-[8px] font-mono tracking-tighter opacity-40 uppercase">
          {theme.shortName}
        </span>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  const overallCoords = coordinatorsData.filter(
    (c) => c.committee === 'Overall Coordinator'
  );
  const deptCoords = coordinatorsData.filter(
    (c) => c.committee !== 'Overall Coordinator'
  );

  const filteredDeptCoords =
    selectedDept === 'ALL'
      ? deptCoords
      : deptCoords.filter((c) => c.committee === selectedDept);

  // Sub-coordinators categorized
  const cpSubcoords = subCoordinatorsData.filter((s) => s.committee === 'CP');
  const devSubcoords = subCoordinatorsData.filter(
    (s) => s.committee === 'Dev&OS'
  );
  const mlSubcoords = subCoordinatorsData.filter((s) => s.committee === 'ML');
  const cyberSubcoords = subCoordinatorsData.filter(
    (s) => s.committee === 'Cybersec'
  );

  return (
    <section className="relative z-10 py-24 border-t border-white/[0.08] text-[#F3F4F6] overflow-hidden">
      {/* Ambient Top Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FF5722]/5 via-transparent to-transparent opacity-80"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION HEADER
        ======================================================== */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            <span>STUDENT LEADERSHIP // CORE COUNCIL</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F3F4F6]">
            The Architects of NJACK.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8A8F98] leading-relaxed">
            Coordinators and sub-coordinators driving competitive programming contests, mentoring open-source initiatives, managing club server infrastructure, and directing research divisions at IIT Patna.
          </p>
        </div>

        {/* ========================================================
            2. OVERALL COORDINATORS (FEATURED 2-COLUMN SPOTLIGHT)
        ======================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
            <Crown className="h-4 w-4 text-[#FF5722]" />
            <span>EXECUTIVE LEADERSHIP // OVERALL COORDINATORS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overallCoords.map((coord) => (
              <div
                key={coord.name}
                className="group relative rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-8 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-[#FF5722]/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Glowing Flame Monogram Avatar */}
                  <CyberMonogramAvatar
                    name={coord.name}
                    committee={coord.committee}
                    size="lg"
                  />

                  {/* Member Details */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                      <span className="h-1 w-1 rounded-full bg-[#FF5722]" />
                      <span>OVERALL COORDINATOR</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#FF5722] transition-colors">
                      {coord.name}
                    </h3>

                    <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                      Overseeing club operations, institute-wide hackathons, community outreach, and technical initiatives for the academic session 2025–2026.
                    </p>

                    {/* Social Links */}
                    <div className="pt-3 flex items-center justify-center sm:justify-start gap-2.5">
                      {coord.linkedin && coord.linkedin !== 'NA' && (
                        <a
                          href={coord.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-neutral-300 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-white transition-all"
                          title="LinkedIn Profile"
                        >
                          <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                          <span>LinkedIn</span>
                        </a>
                      )}

                      {coord.github && coord.github !== 'NA' && (
                        <a
                          href={coord.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-neutral-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-all"
                          title="GitHub Profile"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {coord.cfhandle && coord.cfhandle !== 'NA' && (
                        <a
                          href={coord.cfhandle}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-neutral-300 hover:border-[#FF5722]/50 hover:bg-[#FF5722]/10 hover:text-[#FF5722] transition-all"
                          title="Codeforces Profile"
                        >
                          <CodeforcesIcon className="w-3.5 h-3.5 text-[#FF5722]" />
                          <span>Codeforces</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. DIVISION COORDINATORS (WITH INTERACTIVE FILTER TABS)
        ======================================================== */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
                <span>DOMAIN LEADS</span>
              </div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
                Department Coordinators
              </h3>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#0B0D13] p-1 rounded-full border border-white/[0.08]">
              {[
                { id: 'ALL', label: 'All Divisions' },
                { id: 'CP', label: 'Competitive Programming' },
                { id: 'Dev&OS', label: 'Dev & OS' },
                { id: 'ML', label: 'AI / ML' },
                { id: 'Cybersec', label: 'Cyber Security' },
              ].map((tab) => {
                const isActive = selectedDept === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDept(tab.id)}
                    className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
                      isActive
                        ? 'bg-[#FF5722] text-white font-semibold shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coordinators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredDeptCoords.map((coord) => {
              const theme = deptConfig[coord.committee] || deptConfig['Dev&OS'];
              return (
                <div
                  key={coord.name}
                  className="group relative rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_25px_-5px_rgba(0,0,0,0.5)] hover:border-[#FF5722]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between"
                >
                  <div className="space-y-3 w-full">
                    {/* Cyber Avatar with Department Glow */}
                    <div className="pt-2 flex justify-center">
                      <CyberMonogramAvatar
                        name={coord.name}
                        committee={coord.committee}
                        size="md"
                      />
                    </div>

                    {/* Member Name */}
                    <div>
                      <h4 className="font-display text-sm font-bold text-white tracking-tight group-hover:text-[#FF5722] transition-colors line-clamp-1">
                        {coord.name}
                      </h4>
                      {/* Department Badge */}
                      <div className="mt-1.5 flex justify-center">
                        <span
                          className={`font-mono text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} border`}
                        >
                          {theme.shortName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-center gap-2">
                    {coord.linkedin && coord.linkedin !== 'NA' && (
                      <a
                        href={coord.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-colors"
                        title={`${coord.name} on LinkedIn`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {coord.github && coord.github !== 'NA' && (
                      <a
                        href={coord.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                        title={`${coord.name} on GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {coord.cfhandle && coord.cfhandle !== 'NA' && (
                      <a
                        href={coord.cfhandle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-neutral-400 hover:text-[#FF5722] hover:border-[#FF5722]/40 hover:bg-[#FF5722]/10 transition-colors"
                        title={`${coord.name} on Codeforces`}
                      >
                        <CodeforcesIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            4. SUB-COORDINATORS (4-COLUMN OBSIDIAN BENTO CARDS)
        ======================================================== */}
        <div>
          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
              <span>SUB-COORDINATOR CORPS</span>
            </div>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
              Domain Mentors &amp; Sub-Coordinators
            </h3>
            <p className="mt-2 text-sm text-[#8A8F98]">
              Rising sophomore and junior leaders driving regular problem-solving rounds, managing repositories, and coordinating tech events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Column 1: Competitive Programming */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-display font-bold text-sm">
                    <Binary className="h-4 w-4" />
                    <span>Competitive Prog.</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    {cpSubcoords.length} Mentors
                  </span>
                </div>

                <div className="space-y-2">
                  {cpSubcoords.map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all"
                    >
                      <span className="font-sans text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {member.name}
                      </span>
                      <span className="p-1 rounded bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                        <LinkedInIcon className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Development & Open Source */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-display font-bold text-sm">
                    <Code2 className="h-4 w-4" />
                    <span>Dev &amp; Open Source</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    {devSubcoords.length} Mentors
                  </span>
                </div>

                <div className="space-y-2">
                  {devSubcoords.map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all"
                    >
                      <span className="font-sans text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {member.name}
                      </span>
                      <span className="p-1 rounded bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                        <LinkedInIcon className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Machine Learning */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2 text-purple-400 font-display font-bold text-sm">
                    <Brain className="h-4 w-4" />
                    <span>Machine Learning</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    {mlSubcoords.length} Mentors
                  </span>
                </div>

                <div className="space-y-2">
                  {mlSubcoords.map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all"
                    >
                      <span className="font-sans text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {member.name}
                      </span>
                      <span className="p-1 rounded bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                        <LinkedInIcon className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Cyber Security */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2 text-rose-400 font-display font-bold text-sm">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Cyber Security</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
                    {cyberSubcoords.length} Mentors
                  </span>
                </div>

                <div className="space-y-2">
                  {cyberSubcoords.map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all"
                    >
                      <span className="font-sans text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {member.name}
                      </span>
                      <span className="p-1 rounded bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                        <LinkedInIcon className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
