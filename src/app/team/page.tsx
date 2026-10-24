import React from 'react';
import TeamSection from '@/components/TeamSection';
import { Users } from 'lucide-react';

export const revalidate = 300; // Cache 5 min for instant loads

export const metadata = {
  title: 'Team & Coordinators | NJACK IIT Patna',
  description:
    'Meet the student leaders, department coordinators, and sub-coordinators steering NJACK (Not Just Another Computer Science Club) at IIT Patna.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] pt-16"> {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-white/[0.10] bg-gradient-to-b from-[#FF5722]/10 via-transparent to-transparent py-20 sm:py-28"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-3xl"> <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 text-xs font-mono text-[#FF5722] mb-4"> <Users className="h-3.5 w-3.5" /> <span>STUDENT LEADERSHIP &amp; COUNCIL</span> </div> <h1 className="font-display text-[1.5rem] sm:text-2xl font-medium tracking-[-0.02em] text-[#F3F4F6]"> Meet the                NJACK Team
               </h1> <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed"> The coordinators and sub-coordinators driving hackathons, mentoring competitive programmers, organizing open-source initiatives, managing research clusters, and curating technical roadmaps for IIT Patna.
            </p> </div> </div> </section> {/* Official Coordinators & Sub-Coordinators Roster */}
      <TeamSection /> </div> );
}
