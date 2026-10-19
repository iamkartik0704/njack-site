import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Mail, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export default async function TeamPage() {
  const [members, departments] = await Promise.all([
    prisma.teamMember.findMany({
      include: {
        department: true,
      },
      orderBy: { order: 'asc' },
    }),
    prisma.department.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-950/20 via-slate-900/40 to-transparent py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
              <Users className="h-3.5 w-3.5" />
              <span>Student Leadership</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Team</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              The coordinators and mentors driving workshops, managing server infrastructure, authoring contest problem sets, and curating learning roadmaps for IIT Patna.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              <div>
                {/* Photo */}
                <div className="relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-inner group-hover:border-cyan-500/40 transition-colors">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Name & Role */}
                <div className="text-center">
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    {member.role}
                  </p>
                  <div className="mt-2 inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-slate-400 border border-white/5">
                    {member.department ? member.department.name : 'Executive Council'}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center justify-center gap-3 border-t border-white/5 pt-4 text-slate-400">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-1.5 hover:bg-white/10 hover:text-white transition-colors"
                    title="GitHub Profile"
                  >
                    <span className="text-xs font-mono font-bold">GH</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-1.5 hover:bg-white/10 hover:text-cyan-400 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <span className="text-xs font-mono font-bold">IN</span>
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="rounded-lg p-1.5 hover:bg-white/10 hover:text-cyan-400 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
