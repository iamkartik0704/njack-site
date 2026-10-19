'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Brain, Calendar, FolderGit2 } from 'lucide-react';

interface StatsCounterProps {
  resources: number;
  quizzes: number;
  events: number;
  projects: number;
}

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(easedProgress * target));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value}+</span>;
}

export default function StatsCounter({ resources, quizzes, events, projects }: StatsCounterProps) {
  const stats = [
    { label: 'Resources', value: resources, icon: BookOpen, color: 'text-orange-400' },
    { label: 'Quizzes', value: quizzes, icon: Brain, color: 'text-amber-400' },
    { label: 'Events', value: events, icon: Calendar, color: 'text-orange-500' },
    { label: 'Projects', value: projects, icon: FolderGit2, color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-lg border border-white/10 bg-[#0c0e14] px-4 py-3 text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 font-medium">
                {stat.label}
              </span>
              <Icon className={`h-4 w-4 ${stat.color} opacity-80`} />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              <AnimatedNumber target={stat.value} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
