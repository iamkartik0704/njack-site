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

// Clean Uniform GitHub Icon
function GitHubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
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

// Clean Uniform Codeforces Icon
function CodeforcesIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9A1.5 1.5 0 0 1 1.5 7.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 9A1.5 1.5 0 0 1 24 13.5v6a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 18 19.5v-6a1.5 1.5 0 0 1 1.5-1.5h3z" />
    </svg>
  );
}

function TeamAvatar({ src, name, className = 'h-7 w-7' }: { src?: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(' ').filter(Boolean).map((word) => word[0]).slice(0, 2).join('').toUpperCase();
  return failed || !src ? <span className={`${className} flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#171A22] font-mono text-[9px] font-bold text-[#FF5722]`}>{initials}</span> : <img src={src} alt={name} onError={() => setFailed(true)} className={`${className} shrink-0 rounded-full border border-white/10 object-cover`} />;
}

function SocialLinks({ member, compact = false }: { member: { name: string; linkedin?: string; github?: string; codeforces?: string }; compact?: boolean }) {
  const buttonClass = compact
    ? 'flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-neutral-400 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white'
    : 'flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-neutral-400 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white';
  const iconSize = compact ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center justify-center gap-1.5">
      {member.linkedin && member.linkedin !== 'NA' && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`${buttonClass} hover:!border-[#0A66C2]/50 hover:!bg-[#0A66C2]/10`} title={`${member.name} on LinkedIn`} aria-label={`${member.name} on LinkedIn`}><LinkedInIcon className={iconSize} /></a>}
      {member.github && member.github !== 'NA' && <a href={member.github} target="_blank" rel="noopener noreferrer" className={`${buttonClass} hover:!border-white/40 hover:!bg-white/10 hover:!text-white`} title={`${member.name} on GitHub`} aria-label={`${member.name} on GitHub`}><GitHubIcon className={iconSize} /></a>}
      {member.codeforces && member.codeforces !== 'NA' && <a href={member.codeforces} target="_blank" rel="noopener noreferrer" className={`${buttonClass} hover:!border-[#1F8ACB]/50 hover:!bg-[#1F8ACB]/10 hover:!text-[#3B82F6]`} title={`${member.name} on Codeforces`} aria-label={`${member.name} on Codeforces`}><CodeforcesIcon className={iconSize} /></a>}
    </div>
  );
}

function HorizontalSubCoordinatorCard({ member }: { member: { name: string; image?: string; linkedin?: string; github?: string; codeforces?: string } }) {
  return (
    <div className="group flex min-h-[72px] items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.035]">
      <TeamAvatar src={member.image || '/team/default.png'} name={member.name} className="h-11 w-11 sm:h-12 sm:w-12" />
      <div className="min-w-0 flex-1">
        <div className="truncate font-sans text-sm font-semibold text-white tracking-tight" title={member.name}>{member.name}</div>
        <div className="mt-2 flex justify-start">
          <SocialLinks member={member} compact />
        </div>
      </div>
    </div>
  );
}

// Single Unified Coordinator Card (Real Photographs, Zero Colored Borders)
function CoordinatorCard({
  coord,
  isOverall = false,
}: {
  coord: {
    name: string;
    committee: string;
    image?: string;
    linkedin?: string;
    github?: string;
    codeforces?: string;
  };
  isOverall?: boolean;
}) {
  const [imageError] = useState(false);
  const initials = coord.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  const avatarSize = isOverall
    ? 'h-28 w-28 sm:h-32 sm:w-32'
    : 'h-24 w-24 sm:h-28 sm:w-28';

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_25px_-5px_rgba(0,0,0,0.5)] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between w-full">
      <div className="space-y-2 w-full">
        {/* Authentic Circular Photograph without Colored Borders */}
        <div className="pt-0.5 flex justify-center">
          <div className={`${avatarSize} rounded-full overflow-hidden bg-neutral-800 border border-white/10 shadow-md flex items-center justify-center shrink-0`}>
            {coord.image && !imageError ? (
              <TeamAvatar src={coord.image} name={coord.name} className={avatarSize} />
            ) : (
              <span className="font-display font-bold text-lg text-neutral-300">
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Member Name */}
        <div>
          <h4 className={`font-display ${isOverall ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} font-bold text-white tracking-tight group-hover:text-[#FF5722] transition-colors line-clamp-1`}>
            {coord.name}
          </h4>
          {/* Subtle Clean Badge */}
          <div className="mt-1 flex justify-center">
            <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300">
              {coord.committee === 'Overall Coordinator' ? 'OVERALL' : coord.committee}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/[0.06] w-full flex items-center justify-center">
        <SocialLinks member={coord} />
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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. SECTION HEADER (TITLE ONLY, NO FLUFF DESCRIPTION)
        ======================================================== */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            <span>STUDENT LEADERSHIP // CORE COUNCIL</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F3F4F6]">
            The Architects of NJACK.
          </h2>
        </div>

        {/* ========================================================
            2. OVERALL COORDINATORS (PROMINENT TITLE & CLEAN CARDS)
        ======================================================== */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
              Overall Coordinators
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-lg mx-auto">
            {overallCoords.map((coord) => (
              <div key={coord.name} className="w-[200px] sm:w-[220px]">
                <CoordinatorCard coord={coord} isOverall />
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
                NJACK Division Coordinators
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
                    className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-mono rounded-full transition-all ${
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
            4. SUB-COORDINATORS (SIMPLIFIED & CLEAN)
        ======================================================== */}
        <div>
          <div className="mb-8 border-b border-white/[0.08] pb-5">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
              NJACK Sub-Coordinators
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Column 1: Competitive Programming */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 sm:p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4 text-white font-display font-bold text-sm sm:text-base">
                  <Binary className="h-4.5 w-4.5 text-[#FF5722]" />
                  <span>Competitive Prog.</span>
                </div>

                <div className="space-y-2">
                  {cpSubcoords.map((member) => (
                    <HorizontalSubCoordinatorCard key={member.name} member={member} />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Development & Open Source */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 sm:p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4 text-white font-display font-bold text-sm sm:text-base">
                  <Code2 className="h-4.5 w-4.5 text-[#FF5722]" />
                  <span>Dev &amp; Open Source</span>
                </div>

                <div className="space-y-2">
                  {devSubcoords.map((member) => (
                    <HorizontalSubCoordinatorCard key={member.name} member={member} />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Machine Learning */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 sm:p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4 text-white font-display font-bold text-sm sm:text-base">
                  <Brain className="h-4.5 w-4.5 text-[#FF5722]" />
                  <span>Machine Learning</span>
                </div>

                <div className="space-y-2">
                  {mlSubcoords.map((member) => (
                    <HorizontalSubCoordinatorCard key={member.name} member={member} />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Cyber Security */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 sm:p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4 text-white font-display font-bold text-sm sm:text-base">
                  <ShieldAlert className="h-4.5 w-4.5 text-[#FF5722]" />
                  <span>Cyber Security</span>
                </div>

                <div className="space-y-2">
                  {cyberSubcoords.map((member) => (
                    <HorizontalSubCoordinatorCard key={member.name} member={member} />
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
