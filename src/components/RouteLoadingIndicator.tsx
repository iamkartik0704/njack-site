'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function RouteLoadingIndicator() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname changes, navigation has completed successfully
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 160);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Pre-warm primary navigation routes in the background on browser idle
  useEffect(() => {
    const prewarmRoutes = [
      '/resources',
      '/quizzes',
      '/projects',
      '/events',
      '/team',
      '/about',
    ];

    const warm = () => {
      prewarmRoutes.forEach((route) => {
        if (route !== pathname) {
          fetch(route, { priority: 'low' }).catch(() => {});
        }
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(warm, { timeout: 2500 });
      } else {
        setTimeout(warm, 1200);
      }
    }
  }, [pathname]);

  const startNavigation = () => {
    setIsNavigating(true);
    setProgress(30);

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) return prev + Math.random() * 16;
        if (prev < 92) return prev + 2;
        return prev;
      });
    }, 180);
  };

  // Intercept all internal navigation link clicks for instant 0ms response
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external, download, anchor hash-only, mailto, tel, or modifier keys
      if (
        target.target === '_blank' ||
        target.hasAttribute('download') ||
        target.getAttribute('rel')?.includes('external') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('#') ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if target points to a new pathname on the same origin
      try {
        const targetUrl = new URL(target.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;

        // If it's the exact same pathname (and same search), don't trigger loading screen
        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search
        ) {
          return;
        }

        // Start loading feedback in 0 milliseconds
        startNavigation();
      } catch {
        // Safe fallback
      }
    };

    // Popstate (back / forward navigation)
    const handlePopState = () => {
      startNavigation();
    };

    // Custom events dispatched by programmatic navigation (e.g. CommandPalette)
    const handleCustomNavStart = () => {
      startNavigation();
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('route-navigation-start', handleCustomNavStart);

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('route-navigation-start', handleCustomNavStart);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  // Safety fallback: auto-dismiss after 8s in case navigation was cancelled or completed silently
  useEffect(() => {
    if (isNavigating) {
      const fallbackTimer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 8000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <>
      {/* 1. Ultra-responsive Top Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#FF8A00] via-[#FF5722] to-[#FF3D00] shadow-[0_0_12px_#FF5722] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Authentic NJACK Loading Screen */}
      <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#07080A]/95 backdrop-blur-md transition-opacity duration-200 animate-fadeIn select-none">
        <div className="flex flex-col items-center">
          {/* Official NJACK Logo Mark with Subtle Warm Glow */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-4 rounded-full bg-[#FF5722]/15 blur-xl animate-pulse" />
            <div className="relative h-14 w-14 transition-transform animate-[pulse_2s_ease-in-out_infinite]">
              <Image
                src="/njack-logo-mark.png"
                alt="NJACK"
                width={56}
                height={56}
                priority
                className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(255,87,34,0.45)]"
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
    </>
  );
}
