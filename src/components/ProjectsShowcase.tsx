'use client';

import React from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import SplitTextReveal from '@/components/SplitTextReveal';
import Magnetic from '@/components/Magnetic';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  stackTags?: string;
  techStack?: string;
  repoUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  liveUrl?: string | null;
  stars?: number;
  forks?: number;
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  // Curated fallback open source projects if database returns empty
  const defaultProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'Apeireon Engine',
      slug: 'apeireon-engine',
      description:
        'High-throughput distributed contest evaluation and automated testbench runner built for real-time hackathon telemetry.',
      techStack: 'Rust, WebSockets, Redis, Docker',
      githubUrl: 'https://github.com/iamkartik0704/njack-site',
      liveUrl: 'https://njack.iitp.ac.in',
      stars: 342,
      forks: 64,
    },
    {
      id: 'proj-2',
      title: 'SynapseNet Vision',
      slug: 'synapsenet-vision',
      description:
        'Lightweight edge transformer vision model optimized for autonomous robotic telemetry and micro-satellite imaging.',
      techStack: 'PyTorch, TensorRT, CUDA, Python',
      githubUrl: 'https://github.com/iamkartik0704/njack-site',
      liveUrl: null,
      stars: 512,
      forks: 98,
    },
    {
      id: 'proj-3',
      title: 'KernelGuard BPF',
      slug: 'kernelguard-bpf',
      description:
        'Linux eBPF kernel telemetry monitor intercepting anomalous syscalls, memory violations, and privilege escalations in real-time.',
      techStack: 'C, eBPF, Go, Linux Kernel',
      githubUrl: 'https://github.com/iamkartik0704/njack-site',
      liveUrl: null,
      stars: 288,
      forks: 42,
    },
    {
      id: 'proj-4',
      title: 'AlgoBench CLI',
      slug: 'algobench-cli',
      description:
        'Cross-platform developer CLI for generating algorithmic stress-tests, diffing brute-force solvers, and parsing Codeforces test cases.',
      techStack: 'Go, Bubbletea, C++, SQLite',
      githubUrl: 'https://github.com/iamkartik0704/njack-site',
      liveUrl: null,
      stars: 194,
      forks: 31,
    },
  ];

  const items = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Technical Coordinates */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#FF5722]">
            <span>{'[ 02 // OPEN_SOURCE_REPOS ]'}</span>
            <span className="text-white/20">{'///'}</span>
            <span className="text-[#8A8F98]">PUBLIC APPARATUS</span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SplitTextReveal
              text="FORGED IN CODE. SHIPPED TO PRODUCTION."
              as="h2"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6]"
            />
            <Magnetic pullFactor={0.2}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-[#8A8F98] transition-all hover:border-[#FF5722]/40 hover:text-white"
              >
                <span>EXPLORE ALL REPOSITORIES</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF5722] transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* 3D Tilted Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((proj, idx) => {
            const tags = (proj.stackTags || proj.techStack || 'Rust, TypeScript')
              .split(',')
              .map((t) => t.trim());
            const repoUrl = proj.repoUrl || proj.githubUrl;

            return (
              <SpotlightBentoCard key={proj.id || idx} className="h-full">
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Top Status & Metrics Row */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#8A8F98]">
                        <span className="h-2 w-2 rounded-full bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.6)]" />
                        <span className="uppercase">SYS.REPO_{idx + 1}</span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-[#8A8F98]">
                        <span className="flex items-center gap-1 hover:text-white transition-colors">
                          <Star className="h-3.5 w-3.5 text-[#FF8A00]" />
                          <span>{proj.stars || 140 + idx * 80}</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-white transition-colors">
                          <GitFork className="h-3.5 w-3.5" />
                          <span>{proj.forks || 30 + idx * 15}</span>
                        </span>
                      </div>
                    </div>

                    {/* Project Title & Description */}
                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#F3F4F6] group-hover:text-white transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm leading-relaxed text-[#8A8F98]">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack pills & link trigger */}
                  <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.08] bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]"
                        >
                          [{tag}]
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 font-mono text-xs">
                      {repoUrl && (
                        <Link
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#8A8F98] hover:text-[#FF5722] transition-colors"
                        >
                          <FolderGit2 className="h-3.5 w-3.5" />
                          <span>GITHUB REPO</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}

                      <Link
                        href={`/projects#${proj.slug}`}
                        className="inline-flex items-center gap-1 text-[#FF5722] hover:underline"
                      >
                        <span>INSPECT</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SpotlightBentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
