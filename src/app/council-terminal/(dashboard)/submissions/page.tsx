import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getAdminSession, isSuperAdmin } from '@/lib/auth';
import AdminSubmissionsManager from '@/components/AdminSubmissionsManager';
import { PageHeader } from '@/components/admin/ui';

export const dynamic = 'force-dynamic';

export default async function AdminSubmissionsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/council-terminal/login');
  // Submissions are club-wide and carry no division, so they stay with super admins.
  if (!isSuperAdmin(session)) redirect('/council-terminal');

  const submissions = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-10">
      <PageHeader
        eyebrow="Inbox"
        title="Submissions & Reports"
        description="Contact messages and anonymous plagiarism reports sent from the public site."
      />
      <AdminSubmissionsManager
        initialSubmissions={submissions.map((s) => ({
          ...s,
          createdAt: s.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
