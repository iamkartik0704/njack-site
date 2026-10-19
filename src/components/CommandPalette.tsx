'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  ExternalLink,
  Search,
  Sparkles,
  Command,
  ArrowRight,
  Shield,
  Code2,
  Calendar,
  Layers,
  HelpCircle,
  X,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'NAVIGATION' | 'SYSTEM' | 'DEPARTMENTS' | 'ACTIONS';
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
  badge?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Initialize Telemetry & Hero',
      category: 'NAVIGATION',
      icon: Terminal,
      shortcut: 'H',
      action: () => router.push('/'),
      badge: 'ROOT',
    },
    {
      id: 'divisions',
      title: 'Inspect Club Divisions (CP, DevOS, AI, Cyber)',
      category: 'NAVIGATION',
      icon: Layers,
      shortcut: 'D',
      action: () => {
        router.push('/#divisions');
        const el = document.getElementById('divisions');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: '4 DIVISIONS',
    },
    {
      id: 'projects',
      title: 'Open Source Repositories & Projects',
      category: 'NAVIGATION',
      icon: Code2,
      shortcut: 'P',
      action: () => {
        router.push('/#projects');
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: 'CODE',
    },
    {
      id: 'events',
      title: 'Radar Timeline (Apeireon & NWoC)',
      category: 'NAVIGATION',
      icon: Calendar,
      shortcut: 'E',
      action: () => {
        router.push('/#events');
        const el = document.getElementById('events');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      badge: 'SCHEDULE',
    },
    {
      id: 'resources',
      title: 'Curated Roadmaps & Tech Tracks',
      category: 'NAVIGATION',
      icon: Sparkles,
      shortcut: 'R',
      action: () => router.push('/resources'),
      badge: 'LEARN',
    },
    {
      id: 'quizzes',
      title: 'Interactive Algorithm & Systems Quizzes',
      category: 'NAVIGATION',
      icon: HelpCircle,
      shortcut: 'Q',
      action: () => router.push('/quizzes'),
      badge: 'ARENA',
    },
    {
      id: 'admin',
      title: 'Authenticate Council Terminal',
      category: 'SYSTEM',
      icon: Shield,
      shortcut: 'A',
      action: () => router.push('/admin'),
      badge: 'SECURE',
    },
    {
      id: 'github',
      title: 'Clone NJACK Source on GitHub',
      category: 'ACTIONS',
      icon: ExternalLink,
      action: () => window.open('https://github.com/iamkartik0704/njack-site', '_blank'),
      badge: 'EXTERNAL',
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.badge && cmd.badge.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (cmd: CommandItem) => {
    setIsOpen(false);
    cmd.action();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#07080A]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0E1016]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 bg-[#07080A]/60">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8F98]">
                <Command className="h-3.5 w-3.5 text-[#FF5722]" />
                <span>NJACK // COMMAND_BUS</span>
                <span className="text-[#FF8A00]">• ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-[#8A8F98]">
                  ESC
                </kbd>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-[#8A8F98] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Input field */}
            <div className="relative flex items-center border-b border-white/[0.08] px-4 py-3.5">
              <Search className="h-4 w-4 text-[#8A8F98] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, division, or jump to route..."
                className="w-full bg-transparent font-mono text-sm text-[#F3F4F6] placeholder-[#8A8F98]/60 focus:outline-none"
              />
              <span className="font-mono text-xs text-[#FF5722] shrink-0 animate-pulse">
                _
              </span>
            </div>

            {/* Command items list */}
            <div className="max-h-[380px] overflow-y-auto p-2 scrollbar-hide">
              {filtered.length === 0 ? (
                <div className="py-12 text-center font-mono text-xs text-[#8A8F98]">
                  NO MATCHING COMMAND SPECIFIED IN PROTOCOL
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors duration-150 ${
                        isSelected
                          ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                          : 'text-[#8A8F98] hover:text-[#F3F4F6]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                            isSelected
                              ? 'border-[#FF5722]/40 bg-[#FF5722]/10 text-[#FF5722]'
                              : 'border-white/10 bg-white/5 text-[#8A8F98]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-[#F3F4F6]">
                            {cmd.title}
                          </p>
                          <p className="font-mono text-[10px] tracking-wider text-[#8A8F98]">
                            [{cmd.category}]
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {cmd.badge && (
                          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#8A8F98]">
                            {cmd.badge}
                          </span>
                        )}
                        {cmd.shortcut && (
                          <kbd className="rounded border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-[#FF8A00]">
                            ⌘{cmd.shortcut}
                          </kbd>
                        )}
                        <ArrowRight
                          className={`h-3.5 w-3.5 transition-transform ${
                            isSelected
                              ? 'translate-x-0.5 text-[#FF5722]'
                              : 'opacity-0'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hint bar */}
            <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 font-mono text-[10px] text-[#8A8F98] bg-[#07080A]/60">
              <div className="flex items-center gap-3">
                <span>↑↓ TO NAVIGATE</span>
                <span>↵ TO EXECUTE</span>
              </div>
              <span className="text-[#FF8A00]">NJACK V2 // PROTOCOL ACTIVE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
