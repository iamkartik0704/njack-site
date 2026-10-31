'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  PlayCircle,
  ExternalLink,
  Code,
  Layers,
  Share2,
  Check,
  ArrowUpRight,
} from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  topic: string;
  tags: string;
  difficulty: string;
  featured: boolean;
  departmentId: string;
  department: {
    name: string;
    slug: string;
  };
}

export interface DepartmentItem {
  id: string;
  name: string;
  slug: string;
}

interface ResourceCatalogProps {
  initialResources: ResourceItem[];
  departments: DepartmentItem[];
  defaultDept?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  note: FileText,
  article: BookOpen,
  youtube: PlayCircle,
  repo: Code,
  slides: Layers,
  link: ExternalLink,
};

const difficultyColors: Record<string, { bg: string; text: string; border: string }> = {
  beginner: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  intermediate: { bg: 'bg-[#FF8A00]/10', text: 'text-[#FF8A00]', border: 'border-[#FF8A00]/20' },
  advanced: { bg: 'bg-[#FF5722]/10', text: 'text-[#FF5722]', border: 'border-[#FF5722]/20' },
};

// Short names for division tabs
const DEPT_SHORT_NAMES: Record<string, string> = {
  cp: 'CP',
  'dev-os': 'DevOS',
  ml: 'AI-ML',
  'cyber-security': 'CSEC',
};

const DEPT_COLORS: Record<string, string> = {
  cp: '#FF5722',
  'dev-os': '#2563EB',
  ml: '#FFAC2A',
  'cyber-security': '#EC4899',
};

export default function ResourceCatalog({
  initialResources,
  departments,
  defaultDept = 'all',
}: ResourceCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState(defaultDept);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique topics for filtering (used when sub-filters are active)
  const _allTopics = useMemo(() => {
    const topics = new Set<string>();
    initialResources.forEach((r) => {
      if (r.topic) topics.add(r.topic);
    });
    return Array.from(topics);
  }, [initialResources]);

  const [selectedTopic, setSelectedTopic] = useState('all');

  const filteredResources = useMemo(() => {
    return initialResources.filter((r) => {
      // Dept filter
      if (selectedDept !== 'all' && r.department.slug !== selectedDept) {
        return false;
      }
      // Topic filter
      if (selectedTopic !== 'all' && r.topic !== selectedTopic) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && r.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      // Type filter
      if (selectedType !== 'all' && r.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(query);
        const matchDesc = r.description.toLowerCase().includes(query);
        const matchTopic = r.topic.toLowerCase().includes(query);
        const matchTags = r.tags.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchTopic && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [initialResources, selectedDept, selectedTopic, selectedDifficulty, selectedType, search]);

  const handleCopyLink = (id: string, url: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Controls Bar: Search & Filters */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-4 sm:p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="flex flex-col gap-4">
          
          {/* Top row: Search input & quick stats */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A8F98]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources by title, topic, or technology (e.g. Dynamic Programming, Docker, PyTorch)..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#07080A]/70 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#8A8F98] transition-colors focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                id="resource-search-input"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A8F98] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 justify-between sm:justify-end text-xs font-mono text-[#8A8F98]">
              <span className="rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.08] text-neutral-300 font-semibold">
                Showing {filteredResources.length} of {initialResources.length} items
              </span>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedDept('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap border ${
                selectedDept === 'all'
                  ? 'bg-white/10 text-white border-white/30 shadow-sm'
                  : 'bg-white/[0.03] text-[#8A8F98] hover:text-white hover:bg-white/[0.06] border-white/[0.08]'
              }`}
            >
              All Divisions
            </button>
            {departments.map((dept) => {
              const active = selectedDept === dept.slug;
              const deptColor = DEPT_COLORS[dept.slug] || '#FF5722';
              const label = DEPT_SHORT_NAMES[dept.slug] || dept.name;

              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.slug)}
                  style={{
                    backgroundColor: active ? `${deptColor}20` : undefined,
                    borderColor: active ? `${deptColor}60` : undefined,
                    color: active ? deptColor : undefined,
                  }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition-all whitespace-nowrap border ${
                    active
                      ? 'border-current shadow-sm'
                      : 'bg-white/[0.03] text-[#8A8F98] hover:text-white hover:bg-white/[0.06] border-white/[0.08]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Topic, Difficulty, Resource Type (Commented out per user request) */}
          {/*
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
            <div>
              <label className="block text-[11px] font-mono text-[#8A8F98] uppercase tracking-wider mb-1">
                Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#07080A]/90 px-3 py-2 text-xs text-white transition-colors focus:border-[#FF5722] focus:outline-none"
              >
                <option value="all">All Topics</option>
                {allTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#8A8F98] uppercase tracking-wider mb-1">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#07080A]/90 px-3 py-2 text-xs text-white transition-colors focus:border-[#FF5722] focus:outline-none"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#8A8F98] uppercase tracking-wider mb-1">
                Content Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-[#07080A]/90 px-3 py-2 text-xs text-white transition-colors focus:border-[#FF5722] focus:outline-none"
              >
                <option value="all">All Media Types</option>
                <option value="note">Notes & Cheat Sheets</option>
                <option value="article">Deep-Dive Articles</option>
                <option value="youtube">Video Playlists & Talks</option>
                <option value="repo">GitHub Repos & Code</option>
                <option value="slides">Presentation Slides</option>
                <option value="link">Official Docs & Links</option>
              </select>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-[#0E1016]/40 p-12 text-center">
          <BookOpen className="h-12 w-12 text-[#8A8F98]/50 mb-3" />
          <h3 className="text-lg font-semibold text-white">No matching resources found</h3>
          <p className="mt-1 text-sm text-[#8A8F98] max-w-md">
            Try adjusting your search terms, changing the division filter, or resetting difficulty levels.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedDept('all');
              setSelectedDifficulty('all');
              setSelectedType('all');
              setSelectedTopic('all');
            }}
            className="mt-4 rounded-xl bg-[#FF5722]/15 px-4 py-2 text-xs font-semibold text-[#FF5722] border border-[#FF5722]/30 hover:bg-[#FF5722]/25 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((resource) => {
            const TypeIcon = typeIcons[resource.type.toLowerCase()] || ExternalLink;
            const diffStyle =
              difficultyColors[resource.difficulty.toLowerCase()] || difficultyColors.beginner;
            const tagsList = resource.tags
              ? resource.tags.split(',').map((t) => t.trim()).filter(Boolean)
              : [];
            const deptColor = DEPT_COLORS[resource.department.slug] || '#FF5722';
            const deptLabel = DEPT_SHORT_NAMES[resource.department.slug] || resource.department.name;

            return (
              <div
                key={resource.id}
                style={{
                  backgroundColor: '#0A0D14',
                  boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                }}
                className="group relative flex flex-col justify-between rounded-xl border border-white/[0.08] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Razor-Sharp Accent Line per Division */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: deptColor }}
                />

                <div className="space-y-3">
                  {/* Card Header: Type Badge & Division */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider border"
                      style={{
                        backgroundColor: `${deptColor}15`,
                        borderColor: `${deptColor}40`,
                        color: deptColor,
                      }}
                    >
                      <TypeIcon className="h-3 w-3" />
                      <span>{deptLabel} // {resource.type}</span>
                    </span>

                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-neutral-100 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Topic Subtitle */}
                  <div className="font-mono text-[11px] text-neutral-400">
                    Topic // <span className="text-neutral-200">{resource.topic}</span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Tags */}
                  {tagsList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tagsList.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]"
                        >
                          #{tag}
                        </span>
                      ))}
                      {tagsList.length > 3 && (
                        <span className="text-[10px] font-mono text-[#8A8F98]/60 self-center">
                          +{tagsList.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Action Links */}
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <button
                    onClick={() => handleCopyLink(resource.id, resource.url)}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-[#8A8F98] hover:text-white transition-colors"
                    title="Copy resource URL"
                  >
                    {copiedId === resource.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 shadow-sm"
                    style={{ backgroundColor: deptColor }}
                  >
                    <span>Open Resource</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
