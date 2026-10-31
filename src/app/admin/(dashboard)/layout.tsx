import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const pendingSubmissionsCount = await prisma.submission.count({
    where: { status: 'pending' },
  });

  return (
    <div className="admin-theme relative min-h-screen bg-[#07080A] text-[#F3F4F6]">
      <div aria-hidden="true" className="architectural-grid pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar
          userEmail={session.email}
          userName={session.name}
          pendingSubmissionsCount={pendingSubmissionsCount}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
