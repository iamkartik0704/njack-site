import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FolderGit2, ExternalLink, Sparkles, Code2, Users } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Campus Innovation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Open Source</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Real systems engineered by NJACK club members and NWoC contributors — from scalable campus platforms and ML agents to competitive programming testing suites.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const tags = project.stackTags
              ? project.stackTags.split(',').map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-cyan-500/5"
              >
                <div>
                  {/* Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {project.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="flex items-center gap-1 rounded-full bg-cyan-500/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-950 shadow-md">
                          <Sparkles className="h-3 w-3" />
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Stack Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Contributors */}
                    {project.contributors && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                        <Users className="h-3.5 w-3.5 text-slate-500" />
                        <span>By {project.contributors}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      View GitHub Repo →
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Internal Codebase</span>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all"
                    >
                      <span>Live App</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
