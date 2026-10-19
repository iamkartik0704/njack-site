'use client';

import React, { useState, useEffect } from 'react';

export default function HeroTerminalTyping() {
  const fullText = './init_club --divisions="CP, Dev & OS, AI/ML, CyberSec"';
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    // Initial delay before typing begins
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedLength((prev) => {
          if (prev >= fullText.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 45);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(timeout);
  }, [fullText.length]);

  return (
    <div className="relative inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0E1016]/90 px-4 py-2.5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_28px_-8px_rgba(0,0,0,0.7)] font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 shrink-0 text-[#8A8F98]">
        <span className="text-[#FF5722] font-semibold">root@njack-iitp</span>
        <span className="text-white/30">:</span>
        <span className="text-[#FF8A00]">~#</span>
      </div>

      <div className="flex items-center text-[#F3F4F6] font-mono tracking-tight overflow-x-auto scrollbar-hide">
        <span>{fullText.slice(0, typedLength)}</span>
        <span className="inline-block text-[#FF5722] ml-0.5 animate-pulse font-bold text-sm">
          █
        </span>
      </div>
    </div>
  );
}
