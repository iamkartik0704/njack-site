import React from 'react';
import TeamSection from '@/components/TeamSection';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Team & Coordinators | NJACK IIT Patna',
  description:
    'Meet the student leaders, department coordinators, and sub-coordinators steering NJACK (Not Just Another Coding Klub) at IIT Patna.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black text-[#F3F4F6] pt-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-4">
              <Users className="h-3.5 w-3.5" />
              <span>STUDENT LEADERSHIP &amp; COUNCIL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Meet the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FF8A00]">
                NJACK Team
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
              The coordinators and sub-coordinators driving hackathons, mentoring competitive programmers, organizing open-source initiatives, managing research clusters, and curating technical roadmaps for IIT Patna.
            </p>
          </div>
        </div>
      </section>

      {/* Official Coordinators & Sub-Coordinators Roster */}
      <TeamSection />
    </div>
  );
}
