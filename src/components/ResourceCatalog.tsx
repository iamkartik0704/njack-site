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

  // Extract unique topics for filtering
  const allTopics = useMemo(() => {
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
              className={`rounded-full px-3.5 py-1 text-xs font-mono transition-all whitespace-nowrap ${
                selectedDept === 'all'
                  ? 'bg-[#FF5722] text-white font-semibold shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'bg-white/[0.04] text-[#8A8F98] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
              }`}
            >
              All Divisions
            </button>
            {departments.map((dept) => {
              const active = selectedDept === dept.slug;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.slug)}
                  className={`rounded-full px-3.5 py-1 text-xs font-mono transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#FF5722] text-white font-semibold shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                      : 'bg-white/[0.04] text-[#8A8F98] hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                  }`}
                >
                  {dept.name}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Topic, Difficulty, Resource Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
            {/* Topic Selector */}
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

            {/* Difficulty Selector */}
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

            {/* Resource Type Selector */}
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

            return (
              <div
                key={resource.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Card Header: Type Badge & Department */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2.5 py-1 text-[11px] font-mono font-medium text-neutral-300 border border-white/[0.06]">
                      <TypeIcon className="h-3 w-3 text-[#FF5722]" />
                      <span className="capitalize">{resource.type}</span>
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-[#FF5722] transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Department & Topic subtitle */}
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#8A8F98]">
                    <span className="font-medium text-[#FF8A00]">{resource.department.name}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-neutral-300">{resource.topic}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-[#8A8F98] leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Tags */}
                  {tagsList.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tagsList.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-[#8A8F98] border border-white/[0.06]"
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
                    className="flex items-center gap-1.5 rounded-xl bg-[#FF5722] px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#FF3D00] hover:shadow-[0_0_15px_rgba(255,87,34,0.35)]"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
