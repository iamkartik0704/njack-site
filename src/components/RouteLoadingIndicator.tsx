'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

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
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const startNavigation = () => {
    setIsNavigating(true);
    setProgress(35);

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) return prev + Math.random() * 15;
        if (prev < 95) return prev + 1.5;
        return prev;
      });
    }, 150);
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

    // Custom events dispatched by programmatic navigation (e.g. CommandPalette, Navbar)
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

  // Safety fallback: auto-dismiss after 6s in case navigation was cancelled
  useEffect(() => {
    if (isNavigating) {
      const fallbackTimer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 6000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FF8A00] via-[#FF5722] to-[#FF3D00] shadow-[0_0_12px_#FF5722] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
