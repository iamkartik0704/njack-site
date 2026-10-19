'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Terminal, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  FolderGit2, 
  FileText, 
  Users, 
  ShieldAlert, 
  Menu, 
  X, 
  Lock,
  Compass,
  Trophy
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Departments', href: '/departments/dev-os', icon: Compass },
    { name: 'Resource Hub', href: '/resources', icon: BookOpen, badge: 'Hub' },
    { name: 'Tracks', href: '/resources/tracks', icon: Sparkles },
    { name: 'Quizzes', href: '/quizzes', icon: Trophy, badge: 'New' },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Projects', href: '/projects', icon: FolderGit2 },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'About', href: '/about', icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-500/10 bg-[#060709]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Official NJACK Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          id="nav-brand-logo"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-black border border-orange-500/30 p-1.5 shadow-glow-orange overflow-hidden">
            <Image
              src="/njack-logo.png"
              alt="NJACK Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-white">
              <span className="text-lg font-mono">NJACK</span>
              <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#ff5500] animate-pulse" />
            </div>
            <span className="text-[10px] uppercase font-mono text-orange-400/90 tracking-widest">
              Not Just Another Coding Club
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-orange-400 bg-orange-500/10 border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4 opacity-75" />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1 rounded-full bg-orange-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-orange-300 border border-orange-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/report-cheating"
            id="nav-report-cheating-btn"
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
            title="Anonymous Codeforces Plagiarism Report"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span>Report Cheating</span>
          </Link>

          <Link
            href="/admin"
            id="nav-admin-btn"
            className="flex items-center gap-1.5 rounded-lg border border-orange-500/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-orange-500/50 hover:text-orange-300 hover:bg-orange-950/20"
          >
            <Lock className="h-3.5 w-3.5 text-orange-400/80" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/report-cheating"
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-amber-300"
            aria-label="Report Cheating"
          >
            <ShieldAlert className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#070a12]/95 px-4 pt-3 pb-6 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span>Home</span>
            </Link>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive(link.href)
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="my-2 border-t border-white/10" />
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <Trophy className="h-4 w-4 text-purple-400" />
              <span>Gallery & Moments</span>
            </Link>
            <Link
              href="/achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span>Achievements Wall</span>
            </Link>
            <Link
              href="/nwoc"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>NJACK Winter of Code (NWoC)</span>
            </Link>
            <Link
              href="/apeireon"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <Sparkles className="h-4 w-4 text-pink-400" />
              <span>Apeireon CS Fest</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <Users className="h-4 w-4 text-emerald-400" />
              <span>Contact Us</span>
            </Link>
            <div className="pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-sm font-semibold text-cyan-300"
              >
                <Lock className="h-4 w-4" />
                <span>Super-Admin CMS</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
