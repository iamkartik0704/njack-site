'use client';

import React from 'react';
import { Terminal, Cpu, Shield, Code, Sparkles, Layers, Network, Award } from 'lucide-react';

const techBadges = [
  { label: 'Competitive Programming', icon: Award, color: 'border-orange-500/20 bg-orange-500/10 text-orange-300' },
  { label: 'Open Source & Linux', icon: Terminal, color: 'border-orange-600/20 bg-orange-600/10 text-orange-400' },
  { label: 'Machine Learning & LLMs', icon: Cpu, color: 'border-[#FF8A00]/20 bg-[#FF8A00]/10 text-[#FF8A00]' },
  { label: 'Cybersecurity & CTF', icon: Shield, color: 'border-[#FF8A00]/20 bg-[#FF8A00]/10 text-[#FF8A00]' },
  { label: 'Distributed Systems', icon: Network, color: 'border-orange-500/20 bg-orange-500/10 text-orange-300' },
  { label: 'Algorithm Design', icon: Code, color: 'border-orange-600/20 bg-orange-600/10 text-orange-400' },
  { label: 'Cloud Native & Docker', icon: Layers, color: 'border-[#FF8A00]/20 bg-[#FF8A00]/10 text-[#FF8A00]' },
  { label: 'Deep Learning & Vision', icon: Sparkles, color: 'border-orange-500/20 bg-orange-500/10 text-orange-300' },
];

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.10] bg-[#07080c] py-3.5"> <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-3"> {[...techBadges, ...techBadges, ...techBadges].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-medium ${item.color}`}
            > <Icon className="h-3.5 w-3.5" /> <span>{item.label}</span> </div> );
        })}
      </div> </div> );
}
