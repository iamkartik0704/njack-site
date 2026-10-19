'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import coordinatorsData from '@/data/coordinators.json';
import subCoordinatorsData from '@/data/sub-coordinators.json';

// LinkedIn Icon matching the clean square style in NJACK design
function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// GitHub Icon
function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
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

// Codeforces 3-bar chart icon
function CodeforcesIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="10" width="4" height="11" rx="1" />
      <rect x="10" y="4" width="4" height="17" rx="1" />
      <rect x="17" y="14" width="4" height="7" rx="1" />
    </svg>
  );
}

// Avatar image with graceful fallback to styled initial monogram
function CoordinatorAvatar({ src, name }: { src: string; name: string }) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  if (hasError || !src) {
    return (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center text-white font-display font-bold text-sm tracking-wider">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover rounded-full"
      loading="lazy"
    />
  );
}

export default function TeamSection() {
  const overallCoords = coordinatorsData.filter(
    (c) => c.committee === 'Overall Coordinator'
  );
  const deptCoords = coordinatorsData.filter(
    (c) => c.committee !== 'Overall Coordinator'
  );

  // Group sub-coordinators by their committee
  const cpSubcoords = subCoordinatorsData.filter((s) => s.committee === 'CP');
  const devSubcoords = subCoordinatorsData.filter(
    (s) => s.committee === 'Dev&OS'
  );
  const mlSubcoords = subCoordinatorsData.filter((s) => s.committee === 'ML');
  const cyberSubcoords = subCoordinatorsData.filter(
    (s) => s.committee === 'Cybersec'
  );

  return (
    <section className="relative z-10 py-24 overflow-hidden bg-black text-white">
      {/* Dynamic Ambient Constellation Network Pattern (Subtle nodes & links) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle network lines */}
          <line x1="8%" y1="12%" x2="22%" y2="8%" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.4" />
          <line x1="22%" y1="8%" x2="38%" y2="15%" stroke="#10B981" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="72%" y1="10%" x2="86%" y2="18%" stroke="#EC4899" strokeWidth="0.75" strokeOpacity="0.4" />
          <line x1="86%" y1="18%" x2="94%" y2="28%" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="12%" y1="45%" x2="28%" y2="48%" stroke="#F59E0B" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="75%" y1="52%" x2="88%" y2="60%" stroke="#10B981" strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1="88%" y1="60%" x2="82%" y2="72%" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="10%" y1="80%" x2="18%" y2="86%" stroke="#EF4444" strokeWidth="0.75" strokeOpacity="0.4" />
          <line x1="18%" y1="86%" x2="14%" y2="92%" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="45%" y1="78%" x2="52%" y2="82%" stroke="#10B981" strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1="68%" y1="75%" x2="74%" y2="84%" stroke="#8B5CF6" strokeWidth="0.75" strokeOpacity="0.3" />
          <line x1="84%" y1="85%" x2="92%" y2="92%" stroke="#EC4899" strokeWidth="0.75" strokeOpacity="0.4" />

          {/* Constellation Nodes */}
          <circle cx="8%" cy="12%" r="2.5" fill="#3B82F6" />
          <circle cx="22%" cy="8%" r="3" fill="#10B981" />
          <circle cx="38%" cy="15%" r="2" fill="#F59E0B" />
          <circle cx="72%" cy="10%" r="2.5" fill="#EC4899" />
          <circle cx="86%" cy="18%" r="3" fill="#8B5CF6" />
          <circle cx="94%" cy="28%" r="2" fill="#3B82F6" />
          <circle cx="12%" cy="45%" r="2.5" fill="#EF4444" />
          <circle cx="28%" cy="48%" r="3" fill="#10B981" />
          <circle cx="75%" cy="52%" r="2.5" fill="#3B82F6" />
          <circle cx="88%" cy="60%" r="3" fill="#10B981" />
          <circle cx="82%" cy="72%" r="2" fill="#EC4899" />
          <circle cx="10%" cy="80%" r="2.5" fill="#EF4444" />
          <circle cx="18%" cy="86%" r="3" fill="#3B82F6" />
          <circle cx="14%" cy="92%" r="2" fill="#10B981" />
          <circle cx="45%" cy="78%" r="2.5" fill="#F59E0B" />
          <circle cx="52%" cy="82%" r="2" fill="#10B981" />
          <circle cx="68%" cy="75%" r="3" fill="#8B5CF6" />
          <circle cx="74%" cy="84%" r="2" fill="#3B82F6" />
          <circle cx="84%" cy="85%" r="2.5" fill="#EC4899" />
          <circle cx="92%" cy="92%" r="2" fill="#3B82F6" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            PART 1: COORDINATORS SECTION HEADING
        ======================================================== */}
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider uppercase text-white">
            COORDINATORS
          </h2>
        </div>

        {/* ========================================================
            PART 2: OVERALL COORDINATORS (CENTERED ROW)
        ======================================================== */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          {overallCoords.map((coord) => (
            <div
              key={coord.name}
              className="w-[210px] sm:w-[220px] rounded-[30px] bg-[#161616] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col items-center group"
            >
              {/* Circular Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border border-white/10 shadow-inner">
                <CoordinatorAvatar src={coord.image} name={coord.name} />
              </div>

              {/* Name */}
              <h3 className="font-display font-semibold text-white text-base text-center tracking-tight group-hover:text-[#FF5722] transition-colors">
                {coord.name}
              </h3>

              {/* Role */}
              <p className="font-sans text-xs text-neutral-400 text-center mt-1">
                {coord.committee}
              </p>

              {/* Social Link Icons */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-1 text-white">
                {coord.linkedin && coord.linkedin !== 'NA' && (
                  <a
                    href={coord.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-[#0A66C2] transition-colors"
                    title={`${coord.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {coord.github && coord.github !== 'NA' && (
                  <a
                    href={coord.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-neutral-300 transition-colors"
                    title={`${coord.name} on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {coord.cfhandle && coord.cfhandle !== 'NA' && (
                  <a
                    href={coord.cfhandle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-[#FF5722] transition-colors"
                    title={`${coord.name} on Codeforces`}
                  >
                    <CodeforcesIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            PART 3: DEPARTMENT COORDINATORS (5-COL GRID ON DESKTOP)
        ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {deptCoords.map((coord) => (
            <div
              key={coord.name}
              className="w-full rounded-[28px] bg-[#161616] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col items-center group"
            >
              {/* Circular Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border border-white/10 shadow-inner">
                <CoordinatorAvatar src={coord.image} name={coord.name} />
              </div>

              {/* Name */}
              <h3 className="font-display font-semibold text-white text-sm text-center line-clamp-1 group-hover:text-[#FF5722] transition-colors">
                {coord.name}
              </h3>

              {/* Committee / Role */}
              <p className="font-sans text-xs text-neutral-400 text-center mt-1">
                {coord.committee}
              </p>

              {/* Social Link Icons */}
              <div className="flex items-center justify-center gap-3.5 mt-3 pt-1 text-white">
                {coord.linkedin && coord.linkedin !== 'NA' && (
                  <a
                    href={coord.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-[#0A66C2] transition-colors"
                    title={`${coord.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {coord.github && coord.github !== 'NA' && (
                  <a
                    href={coord.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-neutral-300 transition-colors"
                    title={`${coord.name} on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {coord.cfhandle && coord.cfhandle !== 'NA' && (
                  <a
                    href={coord.cfhandle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-[#FF5722] transition-colors"
                    title={`${coord.name} on Codeforces`}
                  >
                    <CodeforcesIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            PART 4: SUB-COORDINATORS (4 DISTINCT COLUMNS)
        ======================================================== */}
        <div className="mt-28">
          <div className="text-center mb-14">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wider uppercase text-white">
              SUB-COORDINATORS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-4">
            
            {/* Column 1: Competitive Programming */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-semibold text-white tracking-wide border-b border-white/10 pb-2.5">
                Competitive Programming
              </h3>
              <div className="space-y-2.5 pt-1">
                {cpSubcoords.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group py-1 transition-transform hover:translate-x-1"
                  >
                    <span className="p-1 rounded bg-white text-black shrink-0 transition-transform group-hover:scale-110">
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-sans text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Development & Open Source */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-semibold text-white tracking-wide border-b border-white/10 pb-2.5">
                Development &amp; Open Source
              </h3>
              <div className="space-y-2.5 pt-1">
                {devSubcoords.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group py-1 transition-transform hover:translate-x-1"
                  >
                    <span className="p-1 rounded bg-white text-black shrink-0 transition-transform group-hover:scale-110">
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-sans text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Machine Learning */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-semibold text-white tracking-wide border-b border-white/10 pb-2.5">
                Machine Learning
              </h3>
              <div className="space-y-2.5 pt-1">
                {mlSubcoords.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group py-1 transition-transform hover:translate-x-1"
                  >
                    <span className="p-1 rounded bg-white text-black shrink-0 transition-transform group-hover:scale-110">
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-sans text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 4: Cyber Security */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-semibold text-white tracking-wide border-b border-white/10 pb-2.5">
                Cyber Security
              </h3>
              <div className="space-y-2.5 pt-1">
                {cyberSubcoords.map((member) => (
                  <a
                    key={member.name}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group py-1 transition-transform hover:translate-x-1"
                  >
                    <span className="p-1 rounded bg-white text-black shrink-0 transition-transform group-hover:scale-110">
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-sans text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Teamwork Illustration Graphic at Bottom Right */}
        <div className="mt-16 flex justify-end px-4">
          <div className="relative max-w-sm opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/home/team.png"
              alt="NJACK Teamwork"
              width={380}
              height={140}
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
