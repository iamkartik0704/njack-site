'use client';

import React, { useState } from 'react';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
} from 'lucide-react';
import coordinatorsData from '@/data/coordinators.json';
import subCoordinatorsData from '@/data/sub-coordinators.json';

// Clean Uniform LinkedIn Icon
function LinkedInIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// Division Themes Config matching NJACK Obsidian Theme
const divisionConfig: Record<
  string,
  {
    shortName: string;
    label: string;
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
    badgeBg: 'bg-[#FF5722]/10',
    badgeBorder: 'border-[#FF5722]/30',
    badgeText: 'text-[#FF5722]',
    ringGradient: 'from-[#FF5722] via-[#FF8A00] to-[#FF5722]',
    glowShadow: 'rgba(255, 87, 34, 0.35)',
  },
  CP: {
    shortName: 'CP',
    label: 'Competitive Programming',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    ringGradient: 'from-cyan-400 via-blue-500 to-cyan-400',
    glowShadow: 'rgba(6, 182, 212, 0.3)',
  },
  'Dev&OS': {
    shortName: 'DEV & OS',
    label: 'Development & OS',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    ringGradient: 'from-emerald-400 via-teal-500 to-emerald-400',
    glowShadow: 'rgba(16, 185, 129, 0.3)',
  },
  ML: {
    shortName: 'AI / ML',
    label: 'Machine Learning',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-400',
    ringGradient: 'from-purple-400 via-indigo-500 to-purple-400',
    glowShadow: 'rgba(168, 85, 247, 0.3)',
  },
  Cybersec: {
    shortName: 'CSEC',
    label: 'Cyber Security',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    ringGradient: 'from-rose-400 via-pink-500 to-rose-400',
    glowShadow: 'rgba(244, 63, 94, 0.3)',
  },
};

// Cyber Monogram Avatar
function CyberMonogramAvatar({
  name,
  committee,
}: {
  name: string;
  committee: string;
}) {
  const theme = divisionConfig[committee] || divisionConfig['Dev&OS'];
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr ${theme.ringGradient} p-[3px] shadow-[0_0_18px_var(--glow)] transition-transform duration-300 group-hover:scale-105`}
      style={{ ['--glow' as string]: theme.glowShadow }}
    >
      <div className="h-16 w-16 rounded-full bg-[#0B0D13] flex flex-col items-center justify-center font-display font-extrabold tracking-wider text-white border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <span className="relative z-10 text-sm">{initials}</span>
        <span className="text-[8px] font-mono tracking-tighter opacity-40 uppercase">
          {theme.shortName}
        </span>
      </div>
    </div>
  );
}

// Single Unified Coordinator Card (Identical for Overall & Division Coordinators)
function CoordinatorCard({
  coord,
}: {
  coord: {
    name: string;
    committee: string;
    linkedin?: string;
  };
}) {
  const theme = divisionConfig[coord.committee] || divisionConfig['Dev&OS'];

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_25px_-5px_rgba(0,0,0,0.5)] hover:border-[#FF5722]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between w-full">
      <div className="space-y-3 w-full">
        {/* Cyber Avatar with Division Ring */}
        <div className="pt-2 flex justify-center">
          <CyberMonogramAvatar
            name={coord.name}
            committee={coord.committee}
          />
        </div>

        {/* Member Name */}
        <div>
          <h4 className="font-display text-sm font-bold text-white tracking-tight group-hover:text-[#FF5722] transition-colors line-clamp-1">
            {coord.name}
          </h4>
          {/* Division Badge */}
          <div className="mt-1.5 flex justify-center">
            <span
              className={`font-mono text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText} border`}
            >
              {theme.shortName}
            </span>
          </div>
        </div>
      </div>

      {/* Social Button: Uniformly Only LinkedIn */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-center">
        {coord.linkedin && coord.linkedin !== 'NA' ? (
          <a
            href={coord.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-colors"
            title={`${coord.name} on LinkedIn`}
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="p-1.5 opacity-0">
            <LinkedInIcon className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');

  const overallCoords = coordinatorsData.filter(
    (c) => c.committee === 'Overall Coordinator'
  );
  const divisionCoords = coordinatorsData.filter(
    (c) => c.committee !== 'Overall Coordinator'
  );

  const filteredDivisionCoords =
    selectedDivision === 'ALL'
      ? divisionCoords
      : divisionCoords.filter((c) => c.committee === selectedDivision);

  // Sub-coordinators categorized by division
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
            2. OVERALL COORDINATORS (SAME COMPONENT/CARD DESIGN)
        ======================================================== */}
        <div className="mb-20">
          <div className="flex justify-center mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              OVERALL COORDINATORS
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-5 max-w-md mx-auto">
            {overallCoords.map((coord) => (
              <div key={coord.name} className="w-[190px] sm:w-[200px]">
                <CoordinatorCard coord={coord} />
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
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
                Division Coordinators
              </h3>
            </div>

            {/* Division Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#0B0D13] p-1 rounded-full border border-white/[0.08]">
              {[
                { id: 'ALL', label: 'All Divisions' },
                { id: 'CP', label: 'Competitive Programming' },
                { id: 'Dev&OS', label: 'Dev & OS' },
                { id: 'ML', label: 'AI / ML' },
                { id: 'Cybersec', label: 'Cyber Security' },
              ].map((tab) => {
                const isActive = selectedDivision === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDivision(tab.id)}
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

          {/* Division Coordinators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredDivisionCoords.map((coord) => (
              <CoordinatorCard key={coord.name} coord={coord} />
            ))}
          </div>
        </div>

        {/* ========================================================
            4. SUB-COORDINATORS (CLEAN & DIRECT)
        ======================================================== */}
        <div>
          <div className="mb-8 border-b border-white/[0.08] pb-5">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
              Sub-Coordinators
            </h3>
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
