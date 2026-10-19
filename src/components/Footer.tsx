'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  ArrowUp,
} from 'lucide-react';
import Magnetic from '@/components/Magnetic';
import NjackLogo from '@/components/NjackLogo';
import FooterSparkText from '@/components/FooterSparkText';

// Canvas interactive ASCII / Matrix wireframe stream in NJACK Orange
function FooterCanvasVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const chars = '01{}[]$//<>~#_.*+';
    const cols = Math.floor(width / 18);
    const drops = new Array(cols).fill(1);

    const render = () => {
      ctx.fillStyle = 'rgba(7, 8, 10, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 87, 34, 0.18)';
      ctx.font = '10px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 18, drops[i] * 16);

        if (drops[i] * 16 > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#07080A] pt-20 pb-12">
      {/* Background Matrix/ASCII Stream Canvas in NJACK Orange */}
      <FooterCanvasVisualizer />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Location & Return Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.08] pb-8 mb-14 gap-4">
          <div className="flex items-center gap-2.5 font-sans text-xs text-[#8A8F98]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            <span className="text-white font-medium">IIT Patna Campus</span>
            <span className="text-white/20">•</span>
            <span>Bihta, Patna, Bihar 801106, India</span>
          </div>

          <Magnetic pullFactor={0.15}>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-sans text-xs text-[#8A8F98] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 text-[#FF5722] transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>

        {/* 4-Column Navigation Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* Col 1: Brand & Synopsis with NjackLogo */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <NjackLogo size={36} />
              <span className="font-display text-lg font-bold text-[#F3F4F6]">
                NJACK
              </span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-[#8A8F98]">
              The official Coding Club of IIT Patna (Not Just Another Coding Klub). Fostering algorithmic supremacy, production systems, and artificial intelligence research.
            </p>
            <div className="pt-2 font-sans text-[11px] text-[#8A8F98]">
              Est. 2008 • Indian Institute of Technology Patna
            </div>
          </div>

          {/* Col 2: Divisions */}
          <div className="space-y-3 font-sans text-xs">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]">
              [ DIVISIONS ]
            </h4>
            <ul className="space-y-2 text-[#8A8F98]">
              <li>
                <Link href="/departments/cp" className="hover:text-[#FF5722] transition-colors">
                  Competitive Programming
                </Link>
              </li>
              <li>
                <Link href="/departments/dev-os" className="hover:text-[#FF5722] transition-colors">
                  Development & OS
                </Link>
              </li>
              <li>
                <Link href="/departments/ml" className="hover:text-[#FF5722] transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/departments/cyber-security" className="hover:text-[#FF5722] transition-colors">
                  Cybersecurity & InfoSec
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Apparatus */}
          <div className="space-y-3 font-sans text-xs">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]">
              [ APPARATUS ]
            </h4>
            <ul className="space-y-2 text-[#8A8F98]">
              <li>
                <Link href="/resources" className="hover:text-[#FF5722] transition-colors">
                  Resource Catalog
                </Link>
              </li>
              <li>
                <Link href="/resources/tracks" className="hover:text-[#FF5722] transition-colors">
                  Learning Tracks
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-[#FF5722] transition-colors">
                  Technical Quizzes
                </Link>
              </li>
              <li>
                <Link href="/apeireon" className="hover:text-[#FF5722] transition-colors">
                  Apeireon Hackathon
                </Link>
              </li>
              <li>
                <Link href="/nwoc" className="hover:text-[#FF5722] transition-colors">
                  NWoC Open Source
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Council & Integrity */}
          <div className="space-y-3 font-sans text-xs">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]">
              [ GOVERNANCE ]
            </h4>
            <ul className="space-y-2 text-[#8A8F98]">
              <li>
                <Link href="/team" className="hover:text-[#FF5722] transition-colors">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="/report-cheating" className="hover:text-[#FF5722] transition-colors text-red-400/80">
                  Academic Integrity Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FF5722] transition-colors">
                  Council Terminal Login
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/iamkartik0704/njack-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5722] transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Author Attribution & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/[0.08] pt-8 font-mono text-[11px] text-[#8A8F98] gap-4">
          <p>
            © {new Date().getFullYear()} NJACK IIT PATNA. ALL RIGHTS RESERVED.
          </p>

          <p className="flex items-center gap-1.5 text-center">
            <span>DEVELOPED WITH RIGOR BY</span>
            <Link
              href="https://github.com/iamkartik0704"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF5722] font-semibold hover:underline"
            >
              iamkartik0704
            </Link>
            <span>(KARTIK CHAWLA)</span>
          </p>
        </div>
      </div>

      {/* Interactive Display Typography with Particle Sparks and Orange Glow */}
      <div className="mt-10 w-full overflow-hidden">
        <FooterSparkText />
      </div>
    </footer>
  );
}
