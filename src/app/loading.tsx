import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080A]">
      <div className="flex flex-col items-center">
        {/* Authentic NJACK Logo Mark with Subtle Warm Glow */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-[#FF5722]/15 blur-xl animate-pulse" />
          <div className="relative h-14 w-14 transition-transform animate-[pulse_2.2s_ease-in-out_infinite]">
            <Image
              src="/njack-logo-mark.png"
              alt="NJACK"
              width={56}
              height={56}
              priority
              className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(255,87,34,0.4)]"
            />
          </div>
        </div>

        {/* Clean, Understated Club Label */}
        <div className="mt-5 flex items-center gap-2">
          <span className="font-display text-sm font-bold tracking-tight text-[#F3F4F6]">
            NJACK
          </span>
          <span className="text-white/20 text-xs">•</span>
          <span className="font-sans text-xs text-[#8A8F98]">
            IIT Patna
          </span>
        </div>
      </div>
    </div>
  );
}
