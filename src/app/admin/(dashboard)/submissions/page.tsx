import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminSubmissionsManager from '@/components/AdminSubmissionsManager';
import { Inbox } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FF5722]">
          <Inbox className="h-3.5 w-3.5" />
          <span>Council Communication Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Submissions & Plagiarism Inbox
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review general contact messages and anonymous Codeforces plagiarism evidence reports submitted by members.
        </p>
      </div>

      <AdminSubmissionsManager
        initialSubmissions={submissions.map((s) => ({
          ...s,
          createdAt: s.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
