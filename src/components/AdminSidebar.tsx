'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Terminal,
  LayoutDashboard,
  Inbox,
  BookOpen,
  Calendar,
  Trophy,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AdminSidebarProps {
  userEmail: string;
  userName: string;
  pendingSubmissionsCount: number;
}

export default function AdminSidebar({
  userEmail,
  userName,
  pendingSubmissionsCount,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    {
      name: 'Submissions Inbox',
      href: '/admin/submissions',
      icon: Inbox,
      badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : null,
    },
    { name: 'Resources Hub', href: '/admin/resources', icon: BookOpen },
    { name: 'Events & Contests', href: '/admin/events', icon: Calendar },
    { name: 'Quizzes', href: '/admin/quizzes', icon: Trophy },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-slate-950/80 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">NJACK CMS</div>
              <div className="text-[10px] font-mono text-cyan-400">Super-Admin</div>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="View Live Public Site"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold shadow-glow-cyan'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 opacity-75" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== null && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.2 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile & Logout */}
      <div className="border-t border-white/5 pt-4 space-y-3 mt-6 lg:mt-0">
        <div className="rounded-xl bg-white/5 p-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs font-mono">
            SA
          </div>
          <div className="overflow-hidden">
            <div className="truncate text-xs font-semibold text-white">{userName}</div>
            <div className="truncate text-[10px] font-mono text-slate-400">{userEmail}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
