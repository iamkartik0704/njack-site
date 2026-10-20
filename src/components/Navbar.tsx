'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Command,
  Shield,
} from 'lucide-react';
import NjackLogo from '@/components/NjackLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Removed 'Tracks' per request for clean, streamlined navigation
  const navLinks = [
    { name: 'Divisions', href: '/#divisions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Quizzes', href: '/quizzes' },
    // { name: 'Projects', href: '/projects' }, // Commented out for now; will add back in future if required
    { name: 'Events', href: '/events' },
    { name: 'Team', href: '/team' },
  ];

  const [pendingHref, setPendingHref] = useState<string | null>(null);

  React.useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      if (pathname === '/') {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (href !== pathname) {
      setPendingHref(href);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('route-navigation-start'));
      }
    }
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Floating Pill Dock */}
      <div className="relative flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0B0D12]/90 px-4 py-2 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_15px_35px_-10px_rgba(0,0,0,0.6)]">
        
        {/* Left: Brand Identity with Official NJACK Hexagonal Logo Mark */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            prefetch={true}
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
            id="nav-brand-logo"
          >
            <div className="relative flex items-center justify-center rounded-xl p-0.5 transition-transform group-hover:scale-105">
              <NjackLogo size={32} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-[#F3F4F6] transition-colors group-hover:text-white">
                NJACK
              </span>
              <span className="font-sans text-[11px] font-normal text-[#8A8F98]">
                IIT Patna
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Nav Links - Snappy 0ms CSS hover & prefetch for instantaneous response */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            const isPending = pendingHref === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-150 active:scale-95 select-none ${
                  isPending
                    ? 'text-white bg-[#FF5722]/25 border border-[#FF5722]/40 shadow-[0_0_12px_rgba(255,87,34,0.3)] font-semibold'
                    : active
                    ? 'text-white bg-white/[0.1] shadow-sm font-semibold'
                    : 'text-[#8A8F98] hover:text-[#F3F4F6] hover:bg-white/[0.06]'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.name}
                  {isPending && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-ping" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Command Trigger + Admin Terminal */}
        <div className="flex items-center gap-2">
          {/* Search Trigger (⌘K) */}
          <button
            onClick={triggerCommandPalette}
            className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-sans text-xs text-[#8A8F98] transition-all duration-150 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-95"
          >
            <Command className="h-3.5 w-3.5 text-[#8A8F98] transition-colors group-hover:text-[#FF5722]" />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-[#8A8F98] group-hover:text-white">
              ⌘K
            </kbd>
          </button>

          {/* Admin Terminal Link */}
          <Link
            href="/admin"
            prefetch={true}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8A8F98] transition-all duration-150 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-95"
            title="Council Portal"
          >
            <Shield className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] md:hidden hover:text-white active:scale-95 transition-all duration-150"
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
            className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D12]/95 p-4 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3 text-xs text-[#8A8F98]">
              <span className="font-medium text-white">NJACK Navigation</span>
              <span>IIT Patna</span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const active = isActive(item.href);
                const isPending = pendingHref === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors active:scale-[0.98] ${
                      isPending
                        ? 'text-white bg-[#FF5722]/20 font-semibold'
                        : active
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-[#8A8F98] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.name}
                      {isPending && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-ping" />
                      )}
                    </span>
                    <span className="text-xs text-[#8A8F98]/50">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 pt-3 border-t border-white/[0.08] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerCommandPalette();
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2 font-sans text-xs text-white hover:bg-white/[0.08] transition-colors active:scale-95"
              >
                <Command className="h-3.5 w-3.5 text-[#FF5722]" />
                <span>Search ⌘K</span>
              </button>
              <Link
                href="/admin"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#8A8F98] hover:text-white transition-colors active:scale-95"
                title="Council Portal"
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
