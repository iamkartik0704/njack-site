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
    { label: 'Total Resources', count: resourcesCount, icon: BookOpen, color: 'text-cyan-400', href: '/admin/resources' },
    { label: 'Active Quizzes', count: quizzesCount, icon: Trophy, color: 'text-amber-400', href: '/admin/quizzes' },
    { label: 'Club Events', count: eventsCount, icon: Calendar, color: 'text-blue-400', href: '/admin/events' },
    {
      label: 'Pending Inquiries',
      count: pendingSubmissionsCount,
      icon: Inbox,
      color: pendingSubmissionsCount > 0 ? 'text-rose-400' : 'text-emerald-400',
      href: '/admin/submissions',
    },
    { label: 'Projects Showcase', count: projectsCount, icon: FolderGit2, color: 'text-purple-400', href: '/projects' },
    { label: 'Blog Posts', count: postsCount, icon: FileText, color: 'text-teal-400', href: '/blog' },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Command Center Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time management for NJACK 2.0 club platform, resources, and student submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/resources"
            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/15 px-3.5 py-2 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all shadow-glow-cyan"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Resource</span>
          </Link>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3.5 py-2 text-xs font-semibold text-white border border-white/10 hover:bg-white/10 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Event</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md hover:border-white/20 hover:bg-slate-900/60 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 truncate">{c.label}</span>
                <Icon className={`h-4 w-4 ${c.color}`} />
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
            <Inbox className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Recent Inquiries & Plagiarism Reports</h2>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs font-mono font-semibold text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View All Submissions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
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
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
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
