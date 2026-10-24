import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { FolderGit2, ExternalLink, Sparkles, Users } from 'lucide-react';

export const revalidate = 300; // Cache 5 min for ultra-fast loads

export const metadata = {
  title: 'Projects & Open Source | NJACK IIT Patna',
  description:
    'Real-world software systems, campus portals, algorithmic platforms, and open-source packages engineered by NJACK and NWoC contributors.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16"> {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-20 sm:py-28"> <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-3xl"> <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-4"> <FolderGit2 className="h-3.5 w-3.5" /> <span>PRODUCTION SYSTEMS &amp; OPEN SOURCE</span> </div> <h1 className="font-display text-[2.5rem] sm:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] text-[#F3F4F6]"> Projects &amp;                Open Source
               </h1> <p className="mt-3 text-sm sm:text-base text-[#8A8F98] leading-relaxed"> Real-world systems engineered by NJACK club members and NWoC contributors, spanning scalable campus platforms, automated grading engines, neural agents, and competitive programming telemetry suites.
            </p> </div> </div> </section> {/* Projects Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"> <div className="grid grid-cols-1 md:grid-cols-6 [&>*]:md:col-span-2 [&>*:first-child]:md:col-span-4 [&>*:nth-child(5)]:md:col-span-3 [&>*:nth-child(6)]:md:col-span-3 gap-6"> {projects.map((project) => {
            const tags = project.stackTags
              ? project.stackTags.split(',').map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden border-t border-white/[0.10] pt-5 transition-colors hover:border-[#FF5722]/50" > <div> {/* Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#07080A]"> <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw" /> <div className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-transparent to-transparent" /> {project.featured && (
                      <div className="absolute top-3 left-3"> <span className="flex items-center gap-1 rounded-full bg-[#FF5722] px-2.5 py-0.5 text-[10px] font-mono font-bold text-white"> <Sparkles className="h-3 w-3" /> FEATURED
                        </span> </div> )}
                  </div> {/* Body */}
                  <div className="p-6 space-y-3"> <h2 className="font-display text-lg font-bold text-white group-hover:text-[#FF5722] transition-colors"> {project.title}
                    </h2> <p className="text-xs text-[#8A8F98] leading-relaxed line-clamp-3"> {project.description}
                    </p> {/* Stack Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1"> {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]" > {tag}
                          </span> ))}
                      </div> )}

                    {/* Contributors */}
                    {project.contributors && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8A8F98] pt-2 border-t border-white/[0.06]"> <Users className="h-3.5 w-3.5 text-[#8A8F98]/60" /> <span>By {project.contributors}</span> </div> )}
                  </div> </div> {/* Footer Links */}
                <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4"> {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-semibold text-neutral-300 hover:text-[#FF5722] transition-colors" > View GitHub Repo →
                    </a> ) : (
                    <span className="text-xs font-mono text-[#8A8F98]/60">Internal Codebase</span> )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-sm bg-[#FF5722] px-3.5 py-1.5 text-xs font-semibold text-[#F3F4F6] transition-all hover:bg-[#FF3D00]" > <span>Live App</span> <ExternalLink className="h-3 w-3" /> </a> )}
                </div> </div> );
          })}
        </div> </main> </div> );
}
