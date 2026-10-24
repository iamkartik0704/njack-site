import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession, isSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware only checks that a cookie exists; this is the real verification.
  const session = await getAdminSession();
  if (!session) redirect('/council-terminal/login');

  const [pendingSubmissionsCount, division] = await Promise.all([
    isSuperAdmin(session) ? prisma.submission.count({ where: { status: 'pending' } }) : 0,
    session.departmentId
      ? prisma.department.findUnique({
          where: { id: session.departmentId },
          select: { name: true },
        })
      : null,
  ]);

  return (
    <div className="relative min-h-screen bg-[#07080A] text-[#F3F4F6]">
      <div
        aria-hidden="true"
        className="architectural-grid pointer-events-none fixed inset-0 z-0"
      />
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar
          userEmail={session.email}
          userName={session.name}
          role={session.role}
          divisionName={division?.name ?? null}
          pendingSubmissionsCount={pendingSubmissionsCount}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
