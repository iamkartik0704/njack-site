import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Trophy,
  Inbox,
  FolderGit2,
  FileText,
  Users,
  ShieldAlert,
  ArrowRight,
  PlusCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const [
    resourcesCount,
    quizzesCount,
    eventsCount,
    submissionsCount,
    pendingSubmissionsCount,
    projectsCount,
    postsCount,
    recentSubmissions,
  ] = await Promise.all([
    prisma.resource.count(),
    prisma.quiz.count(),
    prisma.event.count(),
    prisma.submission.count(),
    prisma.submission.count({ where: { status: 'pending' } }),
    prisma.project.count(),
    prisma.post.count(),
    prisma.submission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const cards = [
    { label: 'Total Resources', count: resourcesCount, icon: BookOpen, href: '/admin/resources' },
    { label: 'Active Quizzes', count: quizzesCount, icon: Trophy, href: '/admin/quizzes' },
    { label: 'Club Events', count: eventsCount, icon: Calendar, href: '/admin/events' },
    { label: 'Pending Inquiries', count: pendingSubmissionsCount, icon: Inbox, href: '/admin/submissions' },
    { label: 'Projects Showcase', count: projectsCount, icon: FolderGit2, href: '/projects' },
    { label: 'Blog Posts', count: postsCount, icon: FileText, href: '/blog' },
  ];

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#FF5722]">
            <span className="h-1.5 w-1.5 bg-[#FF5722]" />Overview
          </span>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#F3F4F6] sm:text-3xl">Command Center</h1>
          <p className="mt-1.5 text-xs leading-relaxed text-[#8A8F98] sm:text-sm">Manage NJACK content, resources, events, and submissions.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/resources"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#FF6A3D] active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Resource</span>
          </Link>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Event</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="group flex h-full flex-col justify-between gap-6 rounded-lg border border-white/[0.08] bg-[#0E1016]/80 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all hover:border-white/20 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 truncate">{c.label}</span>
                <Icon className="h-4 w-4 text-[#FF5722] opacity-70 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="text-2xl font-black font-mono text-white mt-3">
                {c.count}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Submissions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-[#FF5722]" />
            <h2 className="text-lg font-bold text-white">Recent Inquiries & Plagiarism Reports</h2>
          </div>
          <Link
            href="/admin/submissions"
            className="flex items-center gap-1 font-mono text-xs font-semibold text-[#FF5722] hover:text-[#FF8A00]"
          >
            <span>View All Submissions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0E1016]/80 backdrop-blur-xl">
          {recentSubmissions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No submissions recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentSubmissions.map((sub) => {
                let payload: any = {};
                try {
                  payload = JSON.parse(sub.payload);
                } catch {
                  payload = {};
                }

                const dateStr = new Date(sub.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC',
                });

                const isReport = sub.kind === 'report';

                return (
                  <div key={sub.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isReport
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'border border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722]'
                          }`}
                        >
                          {isReport ? 'CF Plagiarism Report' : 'General Contact'}
                        </span>

                        <span className="text-[11px] font-mono text-slate-500">
                          {dateStr}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {isReport
                          ? `Suspect: ${payload.reportedHandle || 'Anonymous'} (${payload.contestLink || 'CF Contest'})`
                          : `${payload.name || 'Visitor'} — ${payload.subject || 'Inquiry'}`}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {isReport ? payload.proofDetails : payload.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold capitalize ${
                          sub.status === 'pending'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : sub.status === 'reviewed'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {sub.status}
                      </span>

                      <Link
                        href="/admin/submissions"
                        className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Manage →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
