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
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#070a12] text-slate-100">
      <AdminSidebar
        userEmail={session.email}
        userName={session.name}
        pendingSubmissionsCount={pendingSubmissionsCount}
      />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
