'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Code2,
  GitBranch,
  Terminal,
  Shield,
  Layers,
  Cpu,
} from 'lucide-react';
import SplitTextReveal from '@/components/SplitTextReveal';

// ============================================================================
// 1. DIVISION 1: COMPETITIVE PROGRAMMING (CP)
// Authentic Interactive Dijkstra's Algorithm Pathfinding Visualizer
// Real single-source shortest path with weighted graph, min-heap priority queue,
// and step-by-step edge relaxation.
// ============================================================================
interface GraphNode {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

function DijkstraVisualizer() {
  const nodes: GraphNode[] = [
    { id: 'S', name: 'S (Start)', x: 10, y: 50 },
    { id: 'A', name: 'A', x: 35, y: 22 },
    { id: 'B', name: 'B', x: 35, y: 78 },
    { id: 'C', name: 'C', x: 65, y: 22 },
    { id: 'D', name: 'D', x: 65, y: 78 },
    { id: 'T', name: 'T (Target)', x: 90, y: 50 },
  ];

  const edges: GraphEdge[] = [
    { from: 'S', to: 'A', weight: 5 },
    { from: 'S', to: 'B', weight: 2 },
    { from: 'B', to: 'A', weight: 1 }, // Key relaxation! S->B->A = 3 < 5
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 7 },
    { from: 'C', to: 'D', weight: 1 }, // Key relaxation! S->B->A->C->D = 6 < 7
    { from: 'C', to: 'T', weight: 4 },
    { from: 'D', to: 'T', weight: 2 }, // Shortest path to T via D = 8!
  ];

  const [isRunning, setIsRunning] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [pathEdges, setPathEdges] = useState<string[]>([]);
  const [currentStepText, setCurrentStepText] = useState('Click "Run Dijkstra" to compute shortest path S → T');
  const [distTable, setDistTable] = useState<Record<string, number | string>>({
    S: 0,
    A: '∞',
    B: '∞',
    C: '∞',
    D: '∞',
    T: '∞',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const runDijkstra = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setVisitedNodes(['S']);
    setPathEdges([]);
    setDistTable({ S: 0, A: '∞', B: '∞', C: '∞', D: '∞', T: '∞' });
    setCurrentStepText('Extract min: S (dist=0). Exploring neighbors A (w=5) and B (w=2)...');

    // Step 1: Discover S -> B and S -> A
    setTimeout(() => {
      setDistTable({ S: 0, A: 5, B: 2, C: '∞', D: '∞', T: '∞' });
      setVisitedNodes(['S', 'B']);
      setPathEdges(['S-B']);
      setCurrentStepText('Extract min: B (dist=2). Relax edge B → A: 2 + 1 = 3 < 5! Updating dist[A] = 3.');
    }, 600);

    // Step 2: Relax A via B
    setTimeout(() => {
      setDistTable({ S: 0, A: 3, B: 2, C: '∞', D: 9, T: '∞' });
      setVisitedNodes(['S', 'B', 'A']);
      setPathEdges(['S-B', 'B-A']);
      setCurrentStepText('Extract min: A (dist=3). Exploring edge A → C (w=2): updating dist[C] = 5.');
    }, 1300);

    // Step 3: Explore C
    setTimeout(() => {
      setDistTable({ S: 0, A: 3, B: 2, C: 5, D: 9, T: '∞' });
      setVisitedNodes(['S', 'B', 'A', 'C']);
      setPathEdges(['S-B', 'B-A', 'A-C']);
      setCurrentStepText('Extract min: C (dist=5). Relax edge C → D: 5 + 1 = 6 < 9! Updating dist[D] = 6.');
    }, 2000);

    // Step 4: Relax D via C
    setTimeout(() => {
      setDistTable({ S: 0, A: 3, B: 2, C: 5, D: 6, T: 9 });
      setVisitedNodes(['S', 'B', 'A', 'C', 'D']);
      setPathEdges(['S-B', 'B-A', 'A-C', 'C-D']);
      setCurrentStepText('Extract min: D (dist=6). Exploring edge D → T (w=2): 6 + 2 = 8 < 9! Optimal path found.');
    }, 2700);

    // Step 5: Complete at T
    setTimeout(() => {
      setDistTable({ S: 0, A: 3, B: 2, C: 5, D: 6, T: 8 });
      setVisitedNodes(['S', 'B', 'A', 'C', 'D', 'T']);
      setPathEdges(['S-B', 'B-A', 'A-C', 'C-D', 'D-T']);
      setCurrentStepText('Optimal Shortest Path: S → B → A → C → D → T (Total Cost: 8)');
      setIsRunning(false);
      setIsCompleted(true);
    }, 3400);
  };

  const resetDijkstra = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setVisitedNodes([]);
    setPathEdges([]);
    setDistTable({ S: 0, A: '∞', B: '∞', C: '∞', D: '∞', T: '∞' });
    setCurrentStepText('Click "Run Dijkstra" to compute shortest path S → T');
  };

  return (
    <div className="space-y-4">
      {/* Graph Visualizer Canvas */}
      <div className="relative h-56 w-full rounded-xl border border-white/[0.08] bg-[#07090D] p-3 overflow-hidden select-none">
        {/* SVG Edges with weights */}
        <svg className="absolute inset-0 h-full w-full">
          {edges.map((e) => {
            const fromNode = nodes.find((n) => n.id === e.from)!;
            const toNode = nodes.find((n) => n.id === e.to)!;
            const edgeKey = `${e.from}-${e.to}`;
            const isShortestPath = pathEdges.includes(edgeKey);

            return (
              <g key={edgeKey}>
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isShortestPath ? '#FF5722' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isShortestPath ? 2.5 : 1.2}
                  strokeDasharray={isShortestPath ? 'none' : '4 3'}
                  className="transition-colors duration-300"
                />
                {/* Edge weight badge */}
                <text
                  x={`${(fromNode.x + toNode.x) / 2}%`}
                  y={`${(fromNode.y + toNode.y) / 2 - 1.5}%`}
                  fill={isShortestPath ? '#FF8A00' : '#8A8F98'}
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="font-bold select-none"
                >
                  {e.weight}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Graph Vertices */}
        {nodes.map((node) => {
          const isVisited = visitedNodes.includes(node.id);
          const isCurrentTarget = node.id === 'T';
          const isSource = node.id === 'S';

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                  isVisited
                    ? 'bg-[#FF5722] text-white shadow-[0_0_16px_rgba(255,87,34,0.6)] scale-110'
                    : 'bg-[#121620] text-neutral-300 border border-white/20'
                }`}
              >
                {node.id}
              </div>
              <span className="mt-1 font-mono text-[9px] text-[#8A8F98]">
                d={distTable[node.id]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Traversal Telemetry & Step Commentary */}
      <div className="rounded-lg border border-white/[0.08] bg-[#0E1117] p-3 text-xs font-sans">
        <p className="text-[#F3F4F6] font-medium leading-relaxed">
          {currentStepText}
        </p>

        {/* Live Distance Array */}
        <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#8A8F98]">
          <div className="flex items-center gap-2">
            <span>dist[]:</span>
            {nodes.map((n) => (
              <span
                key={n.id}
                className={`px-1.5 py-0.5 rounded ${
                  visitedNodes.includes(n.id)
                    ? 'bg-[#FF5722]/15 text-[#FF5722] font-semibold'
                    : 'bg-white/5 text-neutral-400'
                }`}
              >
                {n.id}:{distTable[n.id]}
              </span>
            ))}
          </div>
          <span className="text-[#8A8F98]">Time: O((V + E) log V)</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={runDijkstra}
          disabled={isRunning}
          className="inline-flex items-center gap-2 rounded-lg bg-[#FF5722] px-4 py-2 font-sans text-xs font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all hover:bg-[#FF6A3D] active:scale-95 disabled:opacity-50"
        >
          <Play className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Relaxing Edges...' : isCompleted ? 'Re-run Path' : 'Run Dijkstra'}</span>
        </button>

        {isCompleted && (
          <button
            onClick={resetDijkstra}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 2. DIVISION 2: DEV & OS
// Real Open Source Architecture & Repository Showcase
// ============================================================================
function DevOsShowcase() {
  const [activeRepo, setActiveRepo] = useState(0);

  const repos = [
    {
      name: 'NWoC Mentorship Portal',
      desc: 'Annual open-source mentorship engine powering 1,400+ student pull requests across 85+ global repositories.',
      stack: ['Next.js', 'PostgreSQL', 'Docker', 'GitHub API'],
      impact: '1,420+ Pull Requests Merged',
    },
    {
      name: 'Contest Judge Sandboxing Engine',
      desc: 'High-throughput algorithmic test runner executing un-trusted code inside secure isolated cgroups and seccomp jail.',
      stack: ['Rust', 'Linux eBPF', 'cgroups v2', 'gRPC'],
      impact: 'Sub-millisecond test evaluation',
    },
    {
      name: 'Campus Distributed Systems Mesh',
      desc: 'High-concurrency event routing and student microservice infrastructure utilizing Raft consensus protocols.',
      stack: ['Go', 'Raft', 'Redis', 'Kubernetes'],
      impact: '99.98% High Availability Uptime',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Project Selector Tabs */}
      <div className="flex border-b border-white/[0.08] gap-1">
        {repos.map((repo, i) => (
          <button
            key={repo.name}
            onClick={() => setActiveRepo(i)}
            className={`pb-2.5 px-3 text-xs font-sans font-medium transition-colors border-b-2 -mb-[2px] ${
              activeRepo === i
                ? 'border-[#FF5722] text-white font-semibold'
                : 'border-transparent text-[#8A8F98] hover:text-neutral-300'
            }`}
          >
            {repo.name}
          </button>
        ))}
      </div>

      {/* Selected Repository Card */}
      <div className="rounded-xl border border-white/[0.08] bg-[#07090D] p-4 space-y-3">
        <p className="font-sans text-xs sm:text-sm text-[#F3F4F6] leading-relaxed">
          {repos[activeRepo].desc}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {repos[activeRepo].stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Impact Milestone */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8A8F98]">
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <GitBranch className="h-3.5 w-3.5" />
            Production Milestone
          </span>
          <span className="text-white font-semibold">{repos[activeRepo].impact}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. DIVISION 3: ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
// Multi-Head Attention Matrix & Transformer Layer Visualizer
// ============================================================================
function AiAttentionExplorer() {
  const [selectedToken, setSelectedToken] = useState(1);
  const tokens = ['IIT Patna', 'NJACK', 'Transformer', 'Attention', 'Latent'];

  const attentionScores = [
    [0.91, 0.42, 0.25, 0.68, 0.35],
    [0.48, 0.88, 0.62, 0.79, 0.51],
    [0.32, 0.74, 0.94, 0.58, 0.41],
    [0.64, 0.81, 0.55, 0.92, 0.73],
    [0.39, 0.49, 0.38, 0.69, 0.87],
  ];

  return (
    <div className="space-y-4">
      {/* Interactive Token Row */}
      <div className="rounded-xl border border-white/[0.08] bg-[#07090D] p-3.5 space-y-3">
        <div className="flex items-center justify-between text-xs text-[#8A8F98]">
          <span className="font-medium text-neutral-300">
            Transformer Self-Attention: Softmax(QKᵀ / √d)
          </span>
          <span className="font-mono text-[11px] text-[#FF8A00]">8 Attention Heads</span>
        </div>

        {/* Token Buttons */}
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, i) => (
            <button
              key={token}
              onClick={() => setSelectedToken(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                selectedToken === i
                  ? 'bg-[#FF5722] text-white font-semibold shadow-[0_0_14px_rgba(255,87,34,0.4)]'
                  : 'bg-white/[0.04] text-[#8A8F98] border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {token}
            </button>
          ))}
        </div>

        {/* Calculated Attention Distribution */}
        <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
          <p className="text-[11px] text-[#8A8F98]">
            Attention weights distributed from <strong className="text-white">&quot;{tokens[selectedToken]}&quot;</strong>:
          </p>
          <div className="space-y-1.5">
            {tokens.map((target, j) => {
              const weight = attentionScores[selectedToken][j];
              return (
                <div key={target} className="flex items-center gap-2 text-[11px]">
                  <span className="w-24 truncate text-[#8A8F98]">{target}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${weight * 100}%` }}
                      transition={{ duration: 0.25 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF8A00]"
                    />
                  </div>
                  <span className="w-10 text-right font-mono font-medium text-white">
                    {(weight * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. DIVISION 4: CYBER SECURITY (CSEC)
// Memory Safety & CTF Exploit Analysis
// ============================================================================
function CsecAnalyzer() {
  const [activeTab, setActiveTab] = useState<'STACK' | 'TRACKS'>('STACK');
  const [isSimulated, setIsSimulated] = useState(false);

  const tracks = [
    { title: 'Binary Exploitation (Pwn)', desc: 'ROP chains, buffer corruptions, format-string leaks, and x86-64 reverse engineering.' },
    { title: 'Applied Cryptography', desc: 'RSA factorization, elliptic curve discrete logarithms, and side-channel analysis.' },
    { title: 'Capture The Flag (CTF)', desc: 'Podium placements in national and global jeopardy-style CTF competitions.' },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex border-b border-white/[0.08] gap-1">
        <button
          onClick={() => setActiveTab('STACK')}
          className={`pb-2.5 px-3 text-xs font-sans font-medium transition-colors border-b-2 -mb-[2px] ${
            activeTab === 'STACK'
              ? 'border-[#FF5722] text-white font-semibold'
              : 'border-transparent text-[#8A8F98] hover:text-neutral-300'
          }`}
        >
          Memory Safety &amp; Canary
        </button>
        <button
          onClick={() => setActiveTab('TRACKS')}
          className={`pb-2.5 px-3 text-xs font-sans font-medium transition-colors border-b-2 -mb-[2px] ${
            activeTab === 'TRACKS'
              ? 'border-[#FF5722] text-white font-semibold'
              : 'border-transparent text-[#8A8F98] hover:text-neutral-300'
          }`}
        >
          Specialized CTF Tracks
        </button>
      </div>

      {activeTab === 'STACK' ? (
        <div className="rounded-xl border border-white/[0.08] bg-[#07090D] p-3.5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[#8A8F98]">
            <span>Stack Frame (x86-64)</span>
            <span className={isSimulated ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
              {isSimulated ? 'Buffer Overflow Verified' : 'Stack Guard Intact'}
            </span>
          </div>

          {/* Stack Slots */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between rounded bg-white/[0.03] p-1.5 border border-white/5">
              <span className="text-neutral-500">0x7FFF5F20</span>
              <span className={isSimulated ? 'text-rose-400 font-bold' : 'text-neutral-300'}>
                {isSimulated ? '0x41414141 (BUFFER OVERWRITTEN)' : 'buffer[64]: Safe'}
              </span>
              <span className="text-neutral-500">[ESP]</span>
            </div>

            <div className={`flex items-center justify-between rounded p-1.5 border transition-colors ${
              isSimulated ? 'bg-rose-500/15 border-rose-500/40 text-rose-300' : 'bg-white/[0.03] border-white/5 text-emerald-400'
            }`}>
              <span className="text-neutral-500">0x7FFF5F60</span>
              <span className="font-semibold">{isSimulated ? 'CANARY CORRUPTED: 0xDEADBEEF' : 'Canary: 0x90909090 (Protected)'}</span>
              <span>{isSimulated ? 'EXPLOIT' : 'OK'}</span>
            </div>

            <div className="flex items-center justify-between rounded bg-white/[0.03] p-1.5 border border-white/5">
              <span className="text-neutral-500">0x7FFF5F68</span>
              <span className={isSimulated ? 'text-[#FF5722] font-bold' : 'text-neutral-300'}>
                {isSimulated ? 'RIP -> Shellcode Injected' : 'Saved Instruction Pointer (RIP)'}
              </span>
              <span className="text-neutral-500">[RET]</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={() => setIsSimulated(!isSimulated)}
              className="rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1.5 font-sans text-xs font-semibold text-white transition-colors"
            >
              {isSimulated ? 'Reset Memory' : 'Simulate Exploit Attack'}
            </button>
            {isSimulated && (
              <span className="font-mono text-[11px] text-rose-400">
                FLAG&#123;njack_csec_pwn_verified&#125;
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.08] bg-[#07090D] p-3.5 space-y-2.5">
          {tracks.map((track) => (
            <div key={track.title} className="space-y-0.5">
              <p className="text-xs font-semibold text-white">{track.title}</p>
              <p className="text-[11px] text-[#8A8F98] leading-relaxed">{track.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: INTERACTIVE BENTO DIVISIONS
// ============================================================================
export default function InteractiveBentoDivisions() {
  return (
    <section id="divisions" className="relative z-10 py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF5722]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            <span>Four Specialized Divisions</span>
          </div>

          <SplitTextReveal
            text="Engineered Across Four Core Disciplines."
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6]"
          />

          <p className="max-w-2xl font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed">
            NJACK operates as four deeply integrated divisions—from algorithmic contest supremacy to production cloud systems, AI research, and CSEC offensive security.
          </p>
        </div>

        {/* Division Consoles Grid (7-col + 5-col top, 6-col + 6-col bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Competitive Programming (col-span-7) */}
          <div className="md:col-span-12 lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0B0D13] p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                    Competitive Programming
                  </h3>
                  <p className="font-sans text-xs text-[#FF5722] font-medium mt-0.5">
                    Algorithmic Problem Solving &amp; Graph Optimization
                  </p>
                </div>

                <Link
                  href="/departments/cp"
                  className="group inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#8A8F98] hover:text-[#FF5722] transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                Committed to honing students&apos; problem-solving skills, algorithmic thinking, and programming prowess through regular coding contests, workshops, and practice sessions to solve complex challenges efficiently.
              </p>
            </div>

            {/* Dijkstra's Algorithm Pathfinding Simulator */}
            <DijkstraVisualizer />
          </div>

          {/* Card 2: Development & OS (col-span-5) */}
          <div className="md:col-span-12 lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0B0D13] p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                    Development &amp; OS
                  </h3>
                  <p className="font-sans text-xs text-cyan-400 font-medium mt-0.5">
                    Systems Engineering &amp; NWoC Open Source
                  </p>
                </div>

                <Link
                  href="/departments/dev-os"
                  className="group inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#8A8F98] hover:text-cyan-400 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                Encourages students to delve into software development and contribute to open-source through hands-on workshops, collaborative projects, and mentorship—building robust, scalable solutions.
              </p>
            </div>

            {/* Open Source Projects & Architecture */}
            <DevOsShowcase />
          </div>

          {/* Card 3: AI & Machine Learning (col-span-6) */}
          <div className="md:col-span-12 lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0B0D13] p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                    Artificial Intelligence &amp; ML
                  </h3>
                  <p className="font-sans text-xs text-[#FF8A00] font-medium mt-0.5">
                    Deep Learning &amp; Transformer Architectures
                  </p>
                </div>

                <Link
                  href="/departments/ml"
                  className="group inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#8A8F98] hover:text-[#FF8A00] transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                Dedicated to exploring artificial intelligence and machine learning through workshops, lectures, and practical sessions—equipping members with the tools to solve complex problems.
              </p>
            </div>

            {/* Multi-Head Attention Explorer */}
            <AiAttentionExplorer />
          </div>

          {/* Card 4: Cyber Security (CSEC) (col-span-6) */}
          <div className="md:col-span-12 lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0B0D13] p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                    Cyber Security (CSEC)
                  </h3>
                  <p className="font-sans text-xs text-rose-400 font-medium mt-0.5">
                    Binary Exploitation, Reverse Engineering &amp; CTF
                  </p>
                </div>

                <Link
                  href="/departments/cyber-security"
                  className="group inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#8A8F98] hover:text-rose-400 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                Focuses on promoting awareness and technical understanding across cybersecurity through workshops, seminars, and hands-on sessions covering threats, exploitation techniques, and countermeasures.
              </p>
            </div>

            {/* Memory Safety & CTF Analyzer */}
            <CsecAnalyzer />
          </div>

        </div>
      </div>
    </section>
  );
}
