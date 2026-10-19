import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-orange-500/10 bg-[#060709] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-orange-500/30 p-1 shadow-glow-orange overflow-hidden">
                <Image
                  src="/njack-logo.png"
                  alt="NJACK Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight text-white">
                NJACK <span className="text-orange-500">2.0</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Not Just Another Coding Club</strong> — The official Computer Science & Coding Club of the Indian Institute of Technology Patna. Fostering engineering excellence, open source, algorithmic dominance, and AI research.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
              <span>Gymkhana, IIT Patna Campus, Bihta, Bihar — 801106</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Mail className="h-4 w-4 text-orange-500 shrink-0" />
              <a href="mailto:njack@iitp.ac.in" className="hover:text-orange-400">njack@iitp.ac.in</a>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Departments
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/departments/cp" className="hover:text-orange-400 transition-colors">
                  Competitive Programming
                </Link>
              </li>
              <li>
                <Link href="/departments/dev-os" className="hover:text-orange-400 transition-colors">
                  Development & OS
                </Link>
              </li>
              <li>
                <Link href="/departments/ml" className="hover:text-orange-400 transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/departments/cyber-security" className="hover:text-orange-400 transition-colors">
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning & Hub */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Learning & Portals
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/resources" className="hover:text-orange-400 transition-colors">
                  Resource Hub (Library)
                </Link>
              </li>
              <li>
                <Link href="/resources/tracks" className="hover:text-orange-400 transition-colors">
                  Curated Learning Tracks
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-orange-400 transition-colors">
                  Self-Check Quizzes
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-orange-400 transition-colors">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-orange-400 transition-colors">
                  Club Projects
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-orange-400 transition-colors">
                  Achievements Wall
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagships & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Flagships & Trust
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/apeireon" className="hover:text-orange-400 transition-colors">
                  Apeireon CS Fest
                </Link>
              </li>
              <li>
                <Link href="/nwoc" className="hover:text-orange-400 transition-colors">
                  NJACK Winter of Code (NWoC)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange-400 transition-colors">
                  Moments & Gallery
                </Link>
              </li>
              <li>
                <Link href="/report-cheating" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Report CF Cheating</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-orange-400 text-xs">
                  Super-Admin CMS Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NJACK IIT Patna. Open-source, zero recurring cost.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>by NJACK Dev & OS Department</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
