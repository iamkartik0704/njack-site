import React from 'react';
import { prisma } from '@/lib/prisma';
import ResourceCatalog from '@/components/ResourceCatalog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

export const revalidate = 60;

interface DeptResourcePageProps {
  params: {
    department: string;
  };
}

export default async function DepartmentResourcePage({ params }: DeptResourcePageProps) {
  const { department: deptSlug } = params;

  // Verify department exists
  const dept = await prisma.department.findUnique({
    where: { slug: deptSlug },
  });

  if (!dept) {
    notFound();
  }

  const [resources, departments] = await Promise.all([
    prisma.resource.findMany({
      include: {
        department: {
          select: { name: true, slug: true },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.department.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-900/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Resources</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {dept.name} <span className="text-cyan-400">Resources</span>
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            {dept.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <ResourceCatalog
          initialResources={resources}
          departments={departments}
          defaultDept={deptSlug}
        />
      </main>
    </div>
  );
}
