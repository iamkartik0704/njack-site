'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  Calendar,
  Trophy,
  Users,
  FileText,
  FolderGit2,
  Images,
  Boxes,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminRole } from '@/lib/auth';

interface AdminSidebarProps {
  userEmail: string;
  userName: string;
  role: AdminRole;
  divisionName: string | null;
  pendingSubmissionsCount: number;
}

const ROLE_LABEL: Record<AdminRole, string> = {
  'super-admin': 'Super Admin',
  coordinator: 'Coordinator',
  'sub-coordinator': 'Sub-Coordinator',
};

export default function AdminSidebar({
  userEmail,
  userName,
  role,
  divisionName,
  pendingSubmissionsCount,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isSuper = role === 'super-admin';

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navItems = [
    { name: 'Overview', href: '/council-terminal', icon: LayoutDashboard },
    {
      name: 'Submissions',
      href: '/council-terminal/submissions',
      icon: Inbox,
      badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : null,
      superOnly: true,
    },
    { name: 'Events', href: '/council-terminal/events', icon: Calendar },
    { name: 'Resources', href: '/council-terminal/resources', icon: BookOpen },
    { name: 'Quizzes', href: '/council-terminal/quizzes', icon: Trophy },
    { name: 'Team', href: '/council-terminal/team', icon: Users },
    { name: 'Blog', href: '/council-terminal/blog', icon: FileText },
    { name: 'Projects', href: '/council-terminal/projects', icon: FolderGit2 },
    { name: 'Gallery', href: '/council-terminal/gallery', icon: Images },
    { name: 'Divisions', href: '/council-terminal/divisions', icon: Boxes, superOnly: true },
    { name: 'Accounts', href: '/council-terminal/accounts', icon: ShieldCheck, superOnly: true },
  ].filter((item) => isSuper || !item.superOnly);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/council-terminal/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isActive = (href: string) =>
    href === '/council-terminal' ? pathname === href : pathname.startsWith(href);

  const initials =
    userName
      .split(' ')
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'NJ';

  const panel = (
    <div className="flex h-full flex-col justify-between gap-6 p-4 sm:p-5">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/council-terminal" className="group flex items-center gap-2.5">
            <Image
              src="/icon.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 p-1 shadow-[0_0_18px_rgba(255,87,34,0.25)]"
            />
            <span className="block">
              <span className="block font-display text-sm font-bold tracking-tight text-[#F3F4F6]">
                Council Terminal
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#FF5722]">
                {ROLE_LABEL[role]}
                {divisionName ? ` · ${divisionName}` : ''}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              title="View live site"
              className="rounded-lg p-1.5 text-[#8A8F98] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-[#8A8F98] transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition-all',
                  active
                    ? 'border border-[#FF5722]/30 bg-[#FF5722]/10 font-semibold text-[#FF5722] shadow-[0_0_18px_-6px_rgba(255,87,34,0.5)]'
                    : 'border border-transparent font-medium text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={cn('h-4 w-4', active ? 'opacity-100' : 'opacity-70')} />
                  {item.name}
                </span>
                {item.badge ? (
                  <span className="rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FF8A00]">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 border-t border-white/[0.08] pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#FF5722]/30 bg-[#FF5722]/15 font-mono text-[11px] font-bold text-[#FF5722]">
            {initials}
          </span>
          <span className="overflow-hidden">
            <span className="block truncate text-xs font-semibold text-white">{userName}</span>
            <span className="block truncate font-mono text-[10px] text-[#8A8F98]">{userEmail}</span>
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-300 transition-all hover:border-rose-500/40 hover:bg-rose-500/20 active:scale-[0.98]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.08] bg-[#07080A]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/council-terminal" className="flex items-center gap-2">
          <Image src="/icon.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
          <span className="font-display text-sm font-bold tracking-tight text-[#F3F4F6]">
            Council Terminal
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="relative rounded-lg border border-white/10 bg-white/[0.03] p-2 text-[#8A8F98] transition-colors hover:text-white"
        >
          <Menu className="h-4 w-4" />
          {pendingSubmissionsCount > 0 && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#FF5722] shadow-[0_0_8px_#FF5722]" />
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[85%] max-w-xs animate-slide-up overflow-y-auto border-r border-white/[0.08] bg-[#0E1016]/95 backdrop-blur-xl">
            {panel}
          </aside>
        </div>
      )}

      {/* Desktop rail */}
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.08] bg-[#0E1016]/60 backdrop-blur-xl lg:sticky lg:top-0 lg:block lg:h-screen">
        {panel}
      </aside>
    </>
  );
}
