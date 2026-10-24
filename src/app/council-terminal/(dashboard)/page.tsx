import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { isSuperAdmin } from '@/lib/auth';
import { getAdminPageContext, scopeWhere } from '@/lib/adminPage';
import { Badge, Panel, PageHeader, EmptyState } from '@/components/admin/ui';
import { formatEventDate } from '@/lib/utils';
import {
  BookOpen,
  Calendar,
  Trophy,
  Inbox,
  FolderGit2,
  FileText,
  Users,
  Images,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const { session, lockedDivisionName } = await getAdminPageContext();
  const where = scopeWhere(session);
  const superAdmin = isSuperAdmin(session);

  const [
    eventsCount,
    resourcesCount,
    quizzesCount,
    teamCount,
    postsCount,
    projectsCount,
    albumsCount,
    pendingSubmissionsCount,
    recentSubmissions,
  ] = await Promise.all([
    prisma.event.count({ where }),
    prisma.resource.count({ where }),
    prisma.quiz.count({ where }),
    prisma.teamMember.count({ where }),
    prisma.post.count({ where }),
    prisma.project.count({ where }),
    prisma.galleryAlbum.count({ where }),
    superAdmin ? prisma.submission.count({ where: { status: 'pending' } }) : 0,
    superAdmin
      ? prisma.submission.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
      : Promise.resolve([]),
  ]);

  const cards = [
    { label: 'Events', count: eventsCount, icon: Calendar, href: '/council-terminal/events' },
    { label: 'Resources', count: resourcesCount, icon: BookOpen, href: '/council-terminal/resources' },
    { label: 'Quizzes', count: quizzesCount, icon: Trophy, href: '/council-terminal/quizzes' },
    { label: 'Team', count: teamCount, icon: Users, href: '/council-terminal/team' },
    { label: 'Posts', count: postsCount, icon: FileText, href: '/council-terminal/blog' },
    { label: 'Projects', count: projectsCount, icon: FolderGit2, href: '/council-terminal/projects' },
    { label: 'Albums', count: albumsCount, icon: Images, href: '/council-terminal/gallery' },
    ...(superAdmin
      ? [
          {
            label: 'Pending Inbox',
            count: pendingSubmissionsCount,
            icon: Inbox,
            href: '/council-terminal/submissions',
          },
        ]
      : []),
  ];

  const firstName = session.name.split(' ')[0];

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-10">
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${firstName}`}
        description={
          lockedDivisionName
            ? `You are managing ${lockedDivisionName} content.`
            : 'You have full control over every division.'
        }
        actions={
          <Link href="/" target="_blank">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-[0.98]">
              View live site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {cards.map(({ label, count, icon: Icon, href }) => (
          <Link key={label} href={href} className="group">
            <Panel className="flex h-full flex-col justify-between gap-6 p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                  {label}
                </span>
                <Icon className="h-4 w-4 text-[#FF5722] opacity-70 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="flex items-end justify-between">
                <span className="font-display text-3xl font-extrabold tracking-tight text-[#F3F4F6]">
                  {count}
                </span>
                <ArrowRight className="h-4 w-4 -translate-x-1 text-[#FF5722] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Panel>
          </Link>
        ))}
      </div>

      {superAdmin && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FF5722] shadow-[0_0_10px_#FF5722]" />
              Latest submissions
            </h2>
            <Link
              href="/council-terminal/submissions"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#FF5722] hover:underline"
            >
              Open inbox
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <Panel hover={false} className="overflow-hidden">
            {recentSubmissions.length === 0 ? (
              <EmptyState message="No submissions yet" />
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {recentSubmissions.map((s) => (
                  <li
                    key={s.id}
                    className="flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <Badge tone={s.kind === 'report' ? 'danger' : 'neutral'}>{s.kind}</Badge>
                      <Badge tone={s.status === 'pending' ? 'warning' : 'success'}>{s.status}</Badge>
                    </span>
                    <span className="font-mono text-[11px] text-[#5A5F68]">
                      {formatEventDate(s.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </section>
      )}
    </div>
  );
}
