'use client';

import React from 'react';
import Link from 'next/link';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import SplitTextReveal from '@/components/SplitTextReveal';

// ============================================================================
// 1. STATIC GRAPHIC 1: COMPETITIVE PROGRAMMING (Abstract Algorithm Topology)
// ============================================================================
function CpTopologyGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-[#FF5722]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
          GRAPH_TOPOLOGY // DAG
        </span>
        <span className="text-white/70">O((V + E) log V)</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 460 140" fill="none">
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF5722" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Grid background reference lines */}
          <line x1="30" y1="70" x2="430" y2="70" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="120" y1="20" x2="120" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="230" y1="20" x2="230" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="340" y1="20" x2="340" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Inactive Secondary Edges */}
          <path d="M 50 70 L 140 25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M 140 25 L 320 25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M 140 115 L 230 70" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M 320 115 L 410 70" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* Active Shortest Path / Optimal Spanning Tree Edges (Glowing) */}
          <path d="M 50 70 L 140 115" stroke="url(#edgeGrad)" strokeWidth="2.5" filter="url(#glowOrange)" />
          <path d="M 140 115 L 230 70" stroke="url(#edgeGrad)" strokeWidth="2.5" filter="url(#glowOrange)" />
          <path d="M 230 70 L 320 25" stroke="url(#edgeGrad)" strokeWidth="2.5" filter="url(#glowOrange)" />
          <path d="M 320 25 L 410 70" stroke="url(#edgeGrad)" strokeWidth="2.5" filter="url(#glowOrange)" />

          {/* Edge Weights */}
          <rect x="88" y="93" width="18" height="13" rx="3" fill="#0C0E14" stroke="#FF5722" strokeWidth="0.8" />
          <text x="97" y="103" fill="#FF8A00" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">2</text>

          <rect x="178" y="93" width="18" height="13" rx="3" fill="#0C0E14" stroke="#FF5722" strokeWidth="0.8" />
          <text x="187" y="103" fill="#FF8A00" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">1</text>

          <rect x="270" y="40" width="18" height="13" rx="3" fill="#0C0E14" stroke="#FF5722" strokeWidth="0.8" />
          <text x="279" y="50" fill="#FF8A00" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">3</text>

          <rect x="360" y="40" width="18" height="13" rx="3" fill="#0C0E14" stroke="#FF5722" strokeWidth="0.8" />
          <text x="369" y="50" fill="#FF8A00" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">2</text>

          {/* Secondary Edge Weights */}
          <text x="90" y="44" fill="#666D7D" fontSize="8" fontFamily="monospace" textAnchor="middle">w=5</text>
          <text x="230" y="21" fill="#666D7D" fontSize="8" fontFamily="monospace" textAnchor="middle">w=8</text>
          <text x="370" y="99" fill="#666D7D" fontSize="8" fontFamily="monospace" textAnchor="middle">w=4</text>

          {/* Nodes */}
          {/* Node S (Start) */}
          <circle cx="50" cy="70" r="14" fill="#131722" stroke="#FF5722" strokeWidth="2" filter="url(#glowOrange)" />
          <text x="50" y="74" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">S</text>

          {/* Node A */}
          <circle cx="140" cy="25" r="12" fill="#131722" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text x="140" y="29" fill="#8A8F98" fontSize="10" fontFamily="monospace" textAnchor="middle">A</text>

          {/* Node B (in optimal path) */}
          <circle cx="140" cy="115" r="13" fill="#131722" stroke="#FF5722" strokeWidth="2" filter="url(#glowOrange)" />
          <text x="140" y="119" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B</text>

          {/* Node C (in optimal path) */}
          <circle cx="230" cy="70" r="13" fill="#131722" stroke="#FF5722" strokeWidth="2" filter="url(#glowOrange)" />
          <text x="230" y="74" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">C</text>

          {/* Node D (in optimal path) */}
          <circle cx="320" cy="25" r="13" fill="#131722" stroke="#FF5722" strokeWidth="2" filter="url(#glowOrange)" />
          <text x="320" y="29" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D</text>

          {/* Node E */}
          <circle cx="320" cy="115" r="12" fill="#131722" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text x="320" y="119" fill="#8A8F98" fontSize="10" fontFamily="monospace" textAnchor="middle">E</text>

          {/* Node T (Target) */}
          <circle cx="410" cy="70" r="14" fill="#131722" stroke="#FF8A00" strokeWidth="2" filter="url(#glowOrange)" />
          <text x="410" y="74" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">T</text>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>TRAVERSAL: <span className="text-[#FF5722] font-semibold">S → B → C → D → T</span></span>
        <span>MIN_COST: <span className="text-white font-semibold">8</span></span>
        <span>STATUS: <span className="text-emerald-400 font-semibold">OPTIMAL</span></span>
      </div>
    </div>
  );
}

// ============================================================================
// 2. STATIC GRAPHIC 2: DEV & OS (Git Tree & Open Source PR Workflow)
// ============================================================================
function DevGitWorkflowGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          GIT_TREE // WORKFLOW
        </span>
        <span className="text-white/70">njack/nwoc • ★ 1,420</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
          <defs>
            <filter id="glowCyanGit" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06B6D4" floodOpacity="0.5" />
            </filter>
            <linearGradient id="gitMergeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Background Branch Tracks */}
          <line x1="30" y1="46" x2="350" y2="46" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="92" x2="270" y2="92" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Main branch (Cyan line) */}
          <path d="M 35 46 L 345 46" stroke="#06B6D4" strokeWidth="2.2" filter="url(#glowCyanGit)" />

          {/* Feature branch (Purple-to-Cyan curve branching out and merging back) */}
          <path
            d="M 95 46 C 115 46, 120 92, 145 92 L 230 92 C 255 92, 260 46, 280 46"
            stroke="url(#gitMergeGrad)"
            strokeWidth="2"
            fill="none"
          />

          {/* Hotfix/Patch branch (Amber curve on top) */}
          <path
            d="M 165 46 C 180 46, 185 18, 205 18 C 220 18, 225 46, 235 46"
            stroke="#FF8A00"
            strokeWidth="1.6"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Commit Nodes on Main */}
          <circle cx="55" cy="46" r="6" fill="#0C1017" stroke="#06B6D4" strokeWidth="2" />
          <text x="55" y="32" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">#a81e</text>

          <circle cx="95" cy="46" r="6.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />

          <circle cx="165" cy="46" r="5.5" fill="#0C1017" stroke="#06B6D4" strokeWidth="2" />
          <text x="165" y="60" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">#b42d</text>

          {/* Commit on Hotfix */}
          <circle cx="205" cy="18" r="5" fill="#1C1307" stroke="#FF8A00" strokeWidth="1.8" />
          <text x="205" y="10" fill="#FF8A00" fontSize="7.5" fontFamily="monospace" textAnchor="middle">fix:cache</text>

          {/* Commit on Feature branch 1 & 2 */}
          <circle cx="150" cy="92" r="5.5" fill="#180C26" stroke="#A855F7" strokeWidth="1.8" />
          <text x="150" y="107" fill="#C084FC" fontSize="8" fontFamily="monospace" textAnchor="middle">#f102</text>

          <circle cx="215" cy="92" r="5.5" fill="#180C26" stroke="#A855F7" strokeWidth="1.8" />
          <text x="215" y="107" fill="#C084FC" fontSize="8" fontFamily="monospace" textAnchor="middle">#c89b</text>

          {/* Merge Commit on Main */}
          <circle cx="280" cy="46" r="8" fill="#0C1017" stroke="#06B6D4" strokeWidth="2.5" filter="url(#glowCyanGit)" />
          <circle cx="280" cy="46" r="3" fill="#06B6D4" />

          {/* Head Commit on Main */}
          <circle cx="330" cy="46" r="6" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
          <text x="330" y="32" fill="#38BDF8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">HEAD</text>

          {/* Tags & Badges */}
          <rect x="18" y="58" width="34" height="15" rx="3.5" fill="#0B1320" stroke="#06B6D4" strokeWidth="0.8" />
          <text x="35" y="69" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">main</text>

          <rect x="152" y="118" width="60" height="15" rx="3.5" fill="#180C26" stroke="#A855F7" strokeWidth="0.8" />
          <text x="182" y="129" fill="#E9D5FF" fontSize="7.5" fontFamily="monospace" textAnchor="middle">feat/nwoc</text>

          <rect x="250" y="60" width="60" height="16" rx="3.5" fill="#091B13" stroke="#10B981" strokeWidth="0.8" />
          <text x="280" y="71.5" fill="#34D399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PR #142 ✓</text>

          <rect x="312" y="58" width="36" height="15" rx="3.5" fill="#0B1320" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <text x="330" y="69" fill="#E2E8F0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">v2.4.0</text>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>WORKFLOW: <span className="text-cyan-400 font-semibold">PR #142 MERGED</span></span>
        <span>CI/CD: <span className="text-emerald-400 font-semibold">ALL CHECKS PASS</span></span>
        <span>REPOS: <span className="text-white font-semibold">85 ACTIVE</span></span>
      </div>
    </div>
  );
}

// ============================================================================
// 3. STATIC GRAPHIC 3: AI & ML (Multi-Head Self-Attention Matrix & Token Embeddings)
// ============================================================================
function AiAttentionHeatmapGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-purple-400">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          SELF_ATTENTION // QK^T MATRIX
        </span>
        <span className="text-white/70">HEADS: 8 • DIM: 768</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
          <defs>
            <filter id="glowPurpleAttn" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#A855F7" floodOpacity="0.5" />
            </filter>
            <linearGradient id="tokenFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF5722" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Left Column: Token Embedding Representation */}
          <text x="50" y="14" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TOKENS [T_n]</text>

          {/* Token 1 */}
          <g transform="translate(10, 22)">
            <rect x="0" y="0" width="44" height="18" rx="3.5" fill="#140D22" stroke="#A855F7" strokeWidth="1" />
            <text x="22" y="12" fill="#E9D5FF" fontSize="8" fontFamily="monospace" textAnchor="middle">&quot;IIT&quot;</text>
            <rect x="48" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.9" />
            <rect x="57" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.4" />
            <rect x="66" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.8" />
            <rect x="75" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.3" />
          </g>

          {/* Token 2 */}
          <g transform="translate(10, 48)">
            <rect x="0" y="0" width="44" height="18" rx="3.5" fill="#140D22" stroke="#A855F7" strokeWidth="1" />
            <text x="22" y="12" fill="#E9D5FF" fontSize="8" fontFamily="monospace" textAnchor="middle">&quot;NJACK&quot;</text>
            <rect x="48" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.9" />
            <rect x="57" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.8" />
            <rect x="66" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.5" />
            <rect x="75" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.6" />
          </g>

          {/* Token 3 */}
          <g transform="translate(10, 74)">
            <rect x="0" y="0" width="44" height="18" rx="3.5" fill="#140D22" stroke="#A855F7" strokeWidth="1" />
            <text x="22" y="12" fill="#E9D5FF" fontSize="8" fontFamily="monospace" textAnchor="middle">&quot;Model&quot;</text>
            <rect x="48" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.5" />
            <rect x="57" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.7" />
            <rect x="66" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.9" />
            <rect x="75" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.2" />
          </g>

          {/* Token 4 */}
          <g transform="translate(10, 100)">
            <rect x="0" y="0" width="44" height="18" rx="3.5" fill="#140D22" stroke="#A855F7" strokeWidth="1" />
            <text x="22" y="12" fill="#E9D5FF" fontSize="8" fontFamily="monospace" textAnchor="middle">&quot;Learn&quot;</text>
            <rect x="48" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.8" />
            <rect x="57" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.4" />
            <rect x="66" y="3" width="7" height="12" rx="1.5" fill="#A855F7" fillOpacity="0.7" />
            <rect x="75" y="3" width="7" height="12" rx="1.5" fill="#FF5722" fillOpacity="0.85" />
          </g>

          {/* Projection Arrows to Matrix */}
          <path d="M 96 31 L 150 48" stroke="url(#tokenFlowGrad)" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M 96 57 L 150 64" stroke="url(#tokenFlowGrad)" strokeWidth="1.5" />
          <path d="M 96 83 L 150 80" stroke="url(#tokenFlowGrad)" strokeWidth="1.5" />
          <path d="M 96 109 L 150 96" stroke="url(#tokenFlowGrad)" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Right Column: 4x4 Attention Heatmap Matrix */}
          <g transform="translate(160, 16)">
            {/* Header Column Labels */}
            <text x="96" y="-3" fill="#C084FC" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KEY [Kᵀ] ATTENTION SCORES</text>
            <text x="24" y="9" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">k_1</text>
            <text x="68" y="9" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">k_2</text>
            <text x="112" y="9" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">k_3</text>
            <text x="156" y="9" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">k_4</text>

            {/* Matrix Row 1 */}
            <rect x="4" y="14" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.88" stroke="#E9D5FF" strokeWidth="0.8" filter="url(#glowPurpleAttn)" />
            <text x="24" y="28" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">0.88</text>
            <rect x="48" y="14" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.45" />
            <text x="68" y="28" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.45</text>
            <rect x="92" y="14" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.15" />
            <text x="112" y="28" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.15</text>
            <rect x="136" y="14" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.32" />
            <text x="156" y="28" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.32</text>

            {/* Matrix Row 2 */}
            <rect x="4" y="40" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.38" />
            <text x="24" y="54" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.38</text>
            <rect x="48" y="40" width="40" height="22" rx="3" fill="#FF5722" fillOpacity="0.95" stroke="#FFA07A" strokeWidth="1" filter="url(#glowPurpleAttn)" />
            <text x="68" y="54" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">0.96</text>
            <rect x="92" y="40" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.52" />
            <text x="112" y="54" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.52</text>
            <rect x="136" y="40" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.22" />
            <text x="156" y="54" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.22</text>

            {/* Matrix Row 3 */}
            <rect x="4" y="66" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.20" />
            <text x="24" y="80" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.20</text>
            <rect x="48" y="66" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.65" />
            <text x="68" y="80" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.65</text>
            <rect x="92" y="66" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.91" stroke="#E9D5FF" strokeWidth="0.8" filter="url(#glowPurpleAttn)" />
            <text x="112" y="80" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">0.91</text>
            <rect x="136" y="66" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.41" />
            <text x="156" y="80" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.41</text>

            {/* Matrix Row 4 */}
            <rect x="4" y="92" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.28" />
            <text x="24" y="106" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.28</text>
            <rect x="48" y="92" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.48" />
            <text x="68" y="106" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.48</text>
            <rect x="92" y="92" width="40" height="22" rx="3" fill="#A855F7" fillOpacity="0.58" />
            <text x="112" y="106" fill="#E9D5FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">0.58</text>
            <rect x="136" y="92" width="40" height="22" rx="3" fill="#FF5722" fillOpacity="0.86" stroke="#FFA07A" strokeWidth="0.8" />
            <text x="156" y="106" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">0.86</text>
          </g>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>SOFTMAX: <span className="text-purple-400 font-semibold">QKᵀ / √d_k</span></span>
        <span>HEADS: <span className="text-white font-semibold">8 PARALLEL</span></span>
        <span>PEAK_ATTN: <span className="text-[#FF5722] font-semibold">0.96 [NJACK]</span></span>
      </div>
    </div>
  );
}

// ============================================================================
// 4. STATIC GRAPHIC 4: CYBER SECURITY (CSEC) (Perimeter & Cryptographic Shield)
// ============================================================================
function CyberSecurityGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          SECURITY_PERIMETER // ZERO_TRUST
        </span>
        <span className="text-white/70">EXPLOIT_DEFENSE: ARMED</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
          <defs>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
            </filter>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Hexagonal Radar Grid background */}
          <polygon points="190,20 240,48 240,92 190,120 140,92 140,48" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
          <polygon points="190,32 225,52 225,88 190,108 155,88 155,52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

          {/* Concentric Defense Orbit Rings */}
          <circle cx="190" cy="70" r="54" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="190" cy="70" r="38" stroke="rgba(16,185,129,0.35)" strokeWidth="1" />

          {/* Central Hardened Security Shield */}
          <path
            d="M 190 44 L 212 53 C 212 73 190 88 190 88 C 190 88 168 73 168 53 Z"
            fill="url(#shieldGrad)"
            stroke="#10B981"
            strokeWidth="1.8"
            filter="url(#glowGreen)"
          />
          {/* Lock Core inside Shield */}
          <circle cx="190" cy="62" r="3" fill="#10B981" />
          <path d="M 189 65 L 191 65 L 192 73 L 188 73 Z" fill="#10B981" />

          {/* Perimeter Node Callouts */}
          {/* Left: Memory Canary Protection */}
          <line x1="140" y1="52" x2="80" y2="35" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="25" y="24" width="95" height="20" rx="4" fill="#091410" stroke="#10B981" strokeWidth="1" />
          <text x="72" y="37" fill="#6EE7B7" fontSize="8" fontFamily="monospace" textAnchor="middle">STACK_CANARY: OK</text>

          {/* Bottom Left: ASLR & PIE */}
          <line x1="145" y1="88" x2="85" y2="105" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="25" y="96" width="95" height="20" rx="4" fill="#091410" stroke="#10B981" strokeWidth="1" />
          <text x="72" y="109" fill="#6EE7B7" fontSize="8" fontFamily="monospace" textAnchor="middle">ASLR // FULL_RELRO</text>

          {/* Right: Cryptographic Cipher */}
          <line x1="240" y1="52" x2="300" y2="35" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="260" y="24" width="95" height="20" rx="4" fill="#091410" stroke="#10B981" strokeWidth="1" />
          <text x="307" y="37" fill="#6EE7B7" fontSize="8" fontFamily="monospace" textAnchor="middle">RSA_4096 // ECDSA</text>

          {/* Bottom Right: eBPF Network Firewall */}
          <line x1="235" y1="88" x2="295" y2="105" stroke="#10B981" strokeWidth="1" strokeOpacity="0.6" />
          <rect x="260" y="96" width="95" height="20" rx="4" fill="#091410" stroke="#10B981" strokeWidth="1" />
          <text x="307" y="109" fill="#6EE7B7" fontSize="8" fontFamily="monospace" textAnchor="middle">eBPF_ISOLATION</text>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>HARDENING: <span className="text-emerald-400 font-semibold">CANARY + NX + PIE</span></span>
        <span>CTF_PODIUM: <span className="text-white font-semibold">JEOPARDY</span></span>
        <span>STATUS: <span className="text-emerald-400 font-semibold">VERIFIED</span></span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: INTERACTIVE BENTO DIVISIONS
// ============================================================================
export default function InteractiveBentoDivisions() {
  return (
    <section id="divisions" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            <span>Four Specialized Divisions</span>
          </div>

          <div className="mt-4 max-w-3xl space-y-4">
            <SplitTextReveal
              text="Engineered Across Four Core Disciplines."
              as="h2"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6]"
            />
            <p className="max-w-2xl font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed">
              NJACK operates as four deeply integrated divisions—from algorithmic contest supremacy to production cloud systems, AI research, and CSEC offensive security.
            </p>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Competitive Programming (col-span-7) */}
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-7">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <Binary className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                      Competitive Programming
                    </h3>
                  </div>

                  <Link
                    href="/departments/cp"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-4">
                  Committed to honing students&apos; problem-solving skills, algorithmic thinking, and programming prowess through regular coding contests, workshops, and practice sessions to solve complex challenges efficiently.
                </p>
              </div>

              {/* Static Abstract Algorithm Topology Graphic */}
              <CpTopologyGraphic />
            </div>
          </SpotlightBentoCard>

          {/* Card 2: Development & OS (col-span-5) */}
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-5">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                      Development &amp; OS
                    </h3>
                  </div>

                  <Link
                    href="/departments/dev-os"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-4">
                  Encourages students to delve into software development and contribute to open-source through hands-on workshops, collaborative projects, and mentorship—building robust, scalable solutions.
                </p>
              </div>

              {/* Static Git Workflow Graphic */}
              <DevGitWorkflowGraphic />
            </div>
          </SpotlightBentoCard>

          {/* Card 3: AI & Machine Learning Division (col-span-6) */}
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-6">
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <Brain className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                      Artificial Intelligence &amp; ML
                    </h3>
                  </div>

                  <Link
                    href="/departments/ml"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-3">
                  Dedicated to exploring artificial intelligence and machine learning through workshops, lectures, and practical sessions—equipping members with the tools to solve complex problems.
                </p>
              </div>

              {/* Static Multi-Head Attention Heatmap Graphic */}
              <AiAttentionHeatmapGraphic />
            </div>
          </SpotlightBentoCard>

          {/* Card 4: Cyber Security (CSEC) (col-span-6) */}
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-6">
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                      Cyber Security (CSEC)
                    </h3>
                  </div>

                  <Link
                    href="/departments/cyber-security"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-colors hover:border-[#FF5722] hover:text-[#FF5722]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-3">
                  Focuses on promoting awareness and technical understanding across cybersecurity through workshops, seminars, and hands-on sessions covering threats, exploitation techniques, and countermeasures.
                </p>
              </div>

              {/* Static Cryptographic Security Shield Graphic */}
              <CyberSecurityGraphic />
            </div>
          </SpotlightBentoCard>

        </div>
      </div>
    </section>
  );
}
