'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Command,
  Shield,
} from 'lucide-react';
import Magnetic from '@/components/Magnetic';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('00:00:00 UTC');

  // Real-time technical UTC timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTimestamp(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Divisions', href: '/#divisions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Tracks', href: '/resources/tracks' },
    { name: 'Quizzes', href: '/quizzes' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Team', href: '/team' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* HUD Floating Pill Dock */}
      <div className="relative flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0E1016]/75 px-4 py-2.5 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_15px_35px_-10px_rgba(0,0,0,0.6)]">
        
        {/* Left: Brand Identity + System Status Indicator */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            id="nav-brand-logo"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-colors group-hover:border-[#CCFF00]/40">
              <Image
                src="/njack-logo.png"
                alt="NJACK Logo"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-[#F3F4F6] transition-colors group-hover:text-white">
                NJACK
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8A8F98]">
                {'IIT PATNA // CS_CLUB'}
              </span>
            </div>
          </Link>

          {/* Telemetry Status Dot + Timestamp (Desktop) */}
          <div className="hidden xl:flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-black/40 px-3 py-1 font-mono text-[10px] text-[#8A8F98]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CCFF00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CCFF00]" />
            </span>
            <span className="text-[#CCFF00] font-semibold">SYS.ONLINE</span>
            <span className="text-white/20">|</span>
            <span className="text-white/70">{timestamp}</span>
          </div>
        </div>

        {/* Center: Magnetic Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Magnetic key={item.name} pullFactor={0.25}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-colors ${
                    active
                      ? 'text-[#07080A]'
                      : 'text-[#8A8F98] hover:text-[#F3F4F6]'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        {/* Right: Command Trigger + Admin Terminal */}
        <div className="flex items-center gap-2">
          {/* Command Palette Button (⌘K) */}
          <Magnetic pullFactor={0.2}>
            <button
              onClick={triggerCommandPalette}
              className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[#8A8F98] transition-all hover:border-[#CCFF00]/40 hover:bg-[#CCFF00]/10 hover:text-white"
            >
              <Command className="h-3.5 w-3.5 text-[#CCFF00]" />
              <span className="hidden sm:inline text-[11px]">COMMAND</span>
              <kbd className="hidden sm:inline rounded border border-white/10 bg-black/50 px-1 py-0.2 font-mono text-[9px] text-[#CCFF00]">
                ⌘K
              </kbd>
            </button>
          </Magnetic>

          {/* Admin Terminal Link */}
          <Magnetic pullFactor={0.2}>
            <Link
              href="/admin"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#8A8F98] transition-colors hover:border-white/20 hover:text-white"
              title="Admin Terminal"
            >
              <Shield className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] md:hidden hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0E1016]/95 p-4 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 font-mono text-[10px] text-[#8A8F98]">
              <span className="text-[#CCFF00]">• SYS.ONLINE</span>
              <span>{timestamp}</span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#8A8F98] hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-[10px] text-[#8A8F98]/50">→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerCommandPalette();
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 font-mono text-xs text-[#CCFF00]"
              >
                <Command className="h-3.5 w-3.5" />
                <span>EXECUTE ⌘K</span>
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-[#8A8F98]"
              >
                <Shield className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
