'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowUpRight,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  Unlock,
  GitBranch,
} from 'lucide-react';
import SplitTextReveal from '@/components/SplitTextReveal';

// ============================================================================
// 1. HARDWARE CHASSIS CARD (NO GENERIC GLASSMORPHISM)
// Engineered matte carbon-obsidian chassis with precision technical frame,
// corner crosshairs, laser perimeter tracking, and 3D perspective physics.
// ============================================================================
interface HardwareCardProps {
  children: React.ReactNode;
  className?: string;
  tag: string;
  accentColor?: string;
}

function HardwareCard({
  children,
  className = '',
  tag,
  accentColor = '#FF5722',
}: HardwareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D perspective tilt springs
  const rotX = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotX.set(-((y - centerY) / centerY) * 4);
    rotY.set(((x - centerX) / centerX) * 4);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`group relative rounded-2xl transition-all duration-300 ${className}`}
    >
      {/* Dynamic Laser Perimeter Glow */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor} 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`
            : 'rgba(255, 255, 255, 0.06)',
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Solid Obsidian Matte Chassis (No generic blurry glass) */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0C10] p-6 sm:p-7 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)]">
        {/* Subtle Technical Dot Grid Texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]"
        />

        {/* Ambient Corner Accent Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: accentColor }}
        />

        {/* Corner Precision Crosshairs */}
        <span className="pointer-events-none absolute top-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">
          +
        </span>
        <span className="pointer-events-none absolute top-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">
          +
        </span>
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">
          +
        </span>
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">
          +
        </span>

        {/* Technical Coordinate Tag */}
        <div className="pointer-events-none absolute top-3.5 right-6 font-mono text-[9px] tracking-wider text-[#8A8F98]/50 uppercase">
          {tag}
        </div>

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 2. DIVISION 1: COMPETITIVE PROGRAMMING (CP)
// Interactive Binary Segment Tree with real O(log N) query pulses and benchmark
// ============================================================================
function CpInteractiveArena() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryCount, setQueryCount] = useState(1);
  const [latency, setLatency] = useState('0.0014 ms');

  const nodes = [
    { id: 1, label: '[1..4]', val: 42, x: 50, y: 15, level: 0 },
    { id: 2, label: '[1..2]', val: 18, x: 26, y: 52, level: 1 },
    { id: 3, label: '[3..4]', val: 24, x: 74, y: 52, level: 1 },
    { id: 4, label: '[1]', val: 8, x: 14, y: 88, level: 2 },
    { id: 5, label: '[2]', val: 10, x: 38, y: 88, level: 2 },
    { id: 6, label: '[3]', val: 11, x: 62, y: 88, level: 2 },
    { id: 7, label: '[4]', val: 13, x: 86, y: 88, level: 2 },
  ];

  const handleQuery = () => {
    setIsQuerying(true);
    // Cascade pulse down the segment tree
    setActiveNode(1);
    setTimeout(() => setActiveNode(3), 160);
    setTimeout(() => setActiveNode(7), 320);
    setTimeout(() => {
      setActiveNode(null);
      setIsQuerying(false);
      setQueryCount((c) => c + 1);
      setLatency((Math.random() * 0.0008 + 0.001).toFixed(4) + ' ms');
    }, 550);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Tree Visualization Canvas */}
      <div className="relative h-48 w-full rounded-xl border border-white/[0.08] bg-[#060709] p-3 overflow-hidden">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* SVG Connecting Branches */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          <line x1="50%" y1="20%" x2="26%" y2="52%" stroke="rgba(255,87,34,0.3)" strokeWidth="1.5" />
          <line x1="50%" y1="20%" x2="74%" y2="52%" stroke="rgba(255,87,34,0.3)" strokeWidth="1.5" />
          <line x1="26%" y1="52%" x2="14%" y2="88%" stroke="rgba(255,87,34,0.2)" strokeWidth="1.5" />
          <line x1="26%" y1="52%" x2="38%" y2="88%" stroke="rgba(255,87,34,0.2)" strokeWidth="1.5" />
          <line x1="74%" y1="52%" x2="62%" y2="88%" stroke="rgba(255,87,34,0.2)" strokeWidth="1.5" />
          <line x1="74%" y1="52%" x2="86%" y2="88%" stroke="rgba(255,87,34,0.2)" strokeWidth="1.5" />
        </svg>

        {/* Tree Nodes */}
        {nodes.map((node) => {
          const isHighlighted = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] transition-all duration-200 ${
                isHighlighted
                  ? 'bg-[#FF5722] text-white ring-4 ring-[#FF5722]/30 scale-110 shadow-[0_0_16px_rgba(255,87,34,0.8)]'
                  : 'bg-[#12151D] text-neutral-300 border border-white/10 hover:border-[#FF5722]/60 hover:text-white'
              }`}
            >
              <span className="text-[9px] text-neutral-400 font-normal">{node.label}</span>
              <span className="font-bold text-[#FF8A00]">{node.val}</span>
            </button>
          );
        })}

        {/* Live Execution Bar Overlay */}
        <div className="absolute top-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#8A8F98]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-ping" />
            SEGMENT TREE (POINT UPDATE &amp; RANGE SUM)
          </span>
          <span className="text-[#FF8A00] font-semibold">O(log N)</span>
        </div>
      </div>

      {/* Control Strip & Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-white/[0.06] bg-[#0E1117] p-2.5 font-mono text-xs">
        <button
          onClick={handleQuery}
          disabled={isQuerying}
          className="flex items-center gap-2 rounded-lg bg-[#FF5722] px-3 py-1.5 font-sans text-xs font-semibold text-white shadow-[0_0_18px_rgba(255,87,34,0.35)] transition-all hover:bg-[#FF6A3D] active:scale-95 disabled:opacity-60"
        >
          <Play className={`h-3.5 w-3.5 ${isQuerying ? 'animate-spin' : ''}`} />
          <span>{isQuerying ? 'TRAVERSING...' : 'BENCHMARK O(log N)'}</span>
        </button>

        <div className="flex items-center gap-3 text-[11px] text-[#8A8F98]">
          <span>LATENCY: <strong className="text-[#F3F4F6]">{latency}</strong></span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> AC [100/100]
          </span>
          <span className="hidden sm:inline text-neutral-500">#{queryCount}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. DIVISION 2: DEV & OS
// Interactive Git Commit DAG & Microservice Cluster Mesh
// ============================================================================
function DevOsInteractiveMesh() {
  const [nodes, setNodes] = useState([
    { id: 'bihta-01', location: 'Bihta-DC', latency: '2.4ms', load: '18%' },
    { id: 'frankfurt-02', location: 'Frankfurt', latency: '44ms', load: '32%' },
    { id: 'tokyo-03', location: 'Tokyo', latency: '68ms', load: '27%' },
  ]);

  const [activeCommit, setActiveCommit] = useState<string>('NWoC 2026: 1,420+ PRs Merged');

  const commits = [
    { hash: 'e4f89a', branch: 'main', msg: 'NWoC 2026: 1,420+ PRs Merged', author: '@njack' },
    { hash: 'c20b81', branch: 'kernel', msg: 'eBPF TCP Packet Filter Driver', author: '@sys' },
    { hash: '71a93e', branch: 'v2.4', msg: 'GSoC Mentorship Infrastructure', author: '@core' },
  ];

  const spawnNode = () => {
    if (nodes.length >= 5) return;
    const names = ['Singapore', 'US-East', 'Sydney', 'London'];
    const pick = names[nodes.length % names.length];
    const newNode = {
      id: `${pick.toLowerCase()}-0${nodes.length + 1}`,
      location: pick,
      latency: `${Math.floor(Math.random() * 40 + 20)}ms`,
      load: `${Math.floor(Math.random() * 30 + 10)}%`,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Git Commit DAG Topology */}
      <div className="rounded-xl border border-white/[0.08] bg-[#060709] p-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2.5 text-[10px] text-[#8A8F98]">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <GitBranch className="h-3.5 w-3.5" />
            GIT REPOSITORY DAG (NWOC &amp; OPEN SOURCE)
          </span>
          <span className="text-[#8A8F98]">85+ REPOSITORIES</span>
        </div>

        {/* Interactive Commit Nodes */}
        <div className="space-y-2">
          {commits.map((c) => (
            <div
              key={c.hash}
              onClick={() => setActiveCommit(c.msg)}
              className={`flex items-center justify-between rounded-lg p-2 transition-colors cursor-pointer ${
                activeCommit === c.msg
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-white'
                  : 'bg-white/[0.02] border border-white/5 text-[#8A8F98] hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-cyan-400 font-bold">
                  {c.hash}
                </span>
                <span className="text-[11px] truncate">{c.msg}</span>
              </div>
              <span className="text-[10px] text-neutral-500 shrink-0 ml-2">{c.author}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cluster Node Mesh */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0E1117] p-2.5 font-mono text-xs">
        <div className="flex items-center justify-between mb-2 text-[10px]">
          <span className="flex items-center gap-1.5 text-[#F3F4F6]">
            <Server className="h-3 w-3 text-cyan-400" />
            DISTRIBUTED CLUSTER (RAFT CONSENSUS)
          </span>
          <button
            onClick={spawnNode}
            disabled={nodes.length >= 5}
            className="flex items-center gap-1 rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-colors disabled:opacity-40"
          >
            <span>+ SPAWN NODE</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {nodes.map((n) => (
            <div key={n.id} className="rounded-md border border-white/5 bg-black/40 p-1.5 text-center">
              <p className="text-[10px] text-white font-semibold">{n.location}</p>
              <p className="text-[9px] text-cyan-400">{n.latency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. DIVISION 3: AI & MACHINE LEARNING
// Multi-Head Attention Matrix & Latent Tensor Field
// ============================================================================
function AiAttentionInteractive() {
  const [selectedToken, setSelectedToken] = useState<number>(1);
  const [activeHead, setActiveHead] = useState<'HEAD_1' | 'HEAD_2' | 'HEAD_3'>('HEAD_1');

  const tokens = ['IIT Patna', 'NJACK', 'Transformer', 'Attention', 'Latent'];
  const attentionWeights = [
    [0.92, 0.45, 0.28, 0.74, 0.38],
    [0.48, 0.88, 0.65, 0.81, 0.54],
    [0.31, 0.72, 0.95, 0.61, 0.42],
    [0.66, 0.83, 0.58, 0.91, 0.77],
    [0.41, 0.52, 0.39, 0.71, 0.89],
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Interactive Token Strip */}
      <div className="rounded-xl border border-white/[0.08] bg-[#060709] p-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3 text-[10px] text-[#8A8F98]">
          <span className="flex items-center gap-1.5 text-[#FF8A00]">
            <Brain className="h-3.5 w-3.5" />
            MULTI-HEAD SELF-ATTENTION: Softmax(QKᵀ / √d)
          </span>
          <span className="text-[#FF8A00] font-semibold">FLASH-ATTN 3</span>
        </div>

        {/* Tokens Row */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {tokens.map((token, i) => (
            <button
              key={token}
              onClick={() => setSelectedToken(i)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-all ${
                selectedToken === i
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FF8A00] text-white font-bold shadow-[0_0_14px_rgba(255,87,34,0.6)] scale-105'
                  : 'bg-white/5 text-[#8A8F98] border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {token}
            </button>
          ))}
        </div>

        {/* Dynamic Attention Arc Visualization */}
        <div className="rounded-lg border border-white/[0.06] bg-black/50 p-2.5">
          <p className="text-[10px] text-[#8A8F98] mb-1.5">
            ATTENTION WEIGHTS FROM <strong className="text-white">&quot;{tokens[selectedToken]}&quot;</strong>:
          </p>
          <div className="space-y-1.5">
            {tokens.map((target, j) => {
              const weight = attentionWeights[selectedToken][j];
              return (
                <div key={target} className="flex items-center gap-2 text-[10px]">
                  <span className="w-20 truncate text-[#8A8F98]">{target}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${weight * 100}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF8A00]"
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-white">{(weight * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Model Spec Telemetry */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0E1117] p-2.5 font-mono text-[10px] text-[#8A8F98]">
        <span>MoE 8x7B PARAMETERS</span>
        <span className="text-white font-bold">PyTorch 2.5 • CUDA 12.4</span>
        <span className="text-[#FF8A00] font-semibold">TENSORS LIVE</span>
      </div>
    </div>
  );
}

// ============================================================================
// 5. DIVISION 4: CYBER SECURITY (CSEC)
// Memory Stack Buffer Overflow & CTF Flag Decrypter
// ============================================================================
function CsecExploitDeck() {
  const [isExploited, setIsExploited] = useState(false);
  const [flag, setFlag] = useState('FLAG{njack_csec_pwn_root_2026}');
  const [exploitProgress, setExploitProgress] = useState(0);

  const triggerExploit = () => {
    setIsExploited(true);
    setExploitProgress(100);
  };

  const resetExploit = () => {
    setIsExploited(false);
    setExploitProgress(0);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Memory Register Stack */}
      <div className="rounded-xl border border-white/[0.08] bg-[#060709] p-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2.5 text-[10px] text-[#8A8F98]">
          <span className="flex items-center gap-1.5 text-rose-400">
            <ShieldAlert className="h-3.5 w-3.5" />
            X86-64 CALL STACK FRAME &amp; CANARY
          </span>
          <span className={isExploited ? 'text-rose-400 font-bold' : 'text-emerald-400 font-semibold'}>
            {isExploited ? 'STACK SMASHED!' : 'CANARY SECURE'}
          </span>
        </div>

        {/* Stack Memory Slots */}
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between rounded bg-white/[0.02] border border-white/5 p-1.5">
            <span className="text-neutral-500">0x7FFF5F20</span>
            <span className={isExploited ? 'text-rose-400 font-bold' : 'text-[#8A8F98]'}>
              {isExploited ? '0x41414141 (OVERFLOW AAAA)' : 'USER_INPUT_BUFFER [64B]'}
            </span>
            <span className="text-[9px] text-neutral-500">[ESP]</span>
          </div>

          <div
            className={`flex items-center justify-between rounded p-1.5 transition-colors ${
              isExploited
                ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            }`}
          >
            <span className="text-neutral-500">0x7FFF5F60</span>
            <span className="font-bold">
              {isExploited ? 'CANARY CORRUPTED: 0xDEADBEEF' : 'STACK CANARY: 0x90909090'}
            </span>
            <span>{isExploited ? <Unlock className="h-3 w-3 text-rose-400" /> : <Lock className="h-3 w-3" />}</span>
          </div>

          <div className="flex items-center justify-between rounded bg-white/[0.02] border border-white/5 p-1.5">
            <span className="text-neutral-500">0x7FFF5F68</span>
            <span className={isExploited ? 'text-[#FF5722] font-bold' : 'text-[#8A8F98]'}>
              {isExploited ? 'JMP_ESP -> SHELLCODE PAYLOAD' : 'SAVED INSTRUCTION PTR (RIP)'}
            </span>
            <span className="text-[9px] text-neutral-500">[RET]</span>
          </div>
        </div>

        {/* Decrypted Flag Banner */}
        {isExploited && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2.5 rounded-lg border border-rose-500/40 bg-rose-500/15 p-2 text-center"
          >
            <p className="text-[9px] text-rose-300 font-bold uppercase tracking-wider">PWN VERIFIED • FLAG CAPTURED</p>
            <p className="font-mono text-xs font-black text-white mt-0.5">{flag}</p>
          </motion.div>
        )}
      </div>

      {/* Interactive Trigger Strip */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0E1117] p-2.5 font-mono text-xs">
        {isExploited ? (
          <button
            onClick={resetExploit}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>RESET STACK</span>
          </button>
        ) : (
          <button
            onClick={triggerExploit}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 font-sans text-xs font-semibold text-white shadow-[0_0_18px_rgba(225,29,72,0.4)] hover:bg-rose-500 active:scale-95 transition-all"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>EXECUTE BUFFER OVERFLOW</span>
          </button>
        )}

        <div className="text-right text-[10px] text-[#8A8F98]">
          <p>TOP 10 GLOBAL CTF</p>
          <p className="text-rose-400 font-bold">REVERSE ENG &amp; PWN</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORT: INTERACTIVE BENTO DIVISIONS
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
          
          {/* Card 1: Competitive Programming & DSA (col-span-7) */}
          <HardwareCard
            tag="01 // ALGO-ACCELERATOR"
            accentColor="#FF5722"
            className="md:col-span-12 lg:col-span-7"
          >
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722] shadow-[0_0_20px_rgba(255,87,34,0.2)]">
                      <Binary className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                        Competitive Programming
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98] uppercase">
                        ICPC World Finals • Codeforces Div 1 • Segment Trees
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/departments/cp"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-all hover:border-[#FF5722] hover:text-[#FF5722] hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-4 leading-relaxed">
                  Rigorous algorithmic discipline. Training IIT Patna engineers in advanced data structures, dynamic programming, centroid decomposition, and contest velocity for ICPC World Finals.
                </p>
              </div>

              {/* Interactive CP Binary Tree Arena */}
              <CpInteractiveArena />
            </div>
          </HardwareCard>

          {/* Card 2: Systems, Web & DevOS (col-span-5) */}
          <HardwareCard
            tag="02 // DISTRIBUTED-SYSTEMS"
            accentColor="#00D2FF"
            className="md:col-span-12 lg:col-span-5"
          >
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                        Development &amp; OS
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98] uppercase">
                        Systems • Linux Kernel • NWoC Open Source
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/departments/dev-os"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-all hover:border-cyan-400 hover:text-cyan-400 hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-4 leading-relaxed">
                  Building scalable distributed backends, developer tooling, and global open-source software. Home to the NJACK Winter of Code (NWoC) and GSoC leadership.
                </p>
              </div>

              {/* Interactive Git DAG & Cluster Mesh */}
              <DevOsInteractiveMesh />
            </div>
          </HardwareCard>

          {/* Card 3: AI & Machine Learning Division (col-span-6) */}
          <HardwareCard
            tag="03 // NEURAL-ATTENTION"
            accentColor="#FF8A00"
            className="md:col-span-12 lg:col-span-6"
          >
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-[#FF8A00] shadow-[0_0_20px_rgba(255,138,0,0.2)]">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                        Artificial Intelligence &amp; ML
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98] uppercase">
                        Transformers • Vision ViT • Deep Learning
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/departments/ml"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-all hover:border-[#FF8A00] hover:text-[#FF8A00] hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-3 leading-relaxed">
                  Researching modern transformer architectures, parameter-efficient fine-tuning (LoRA), computer vision pipelines, and production inference engines.
                </p>
              </div>

              {/* Interactive Attention Matrix */}
              <AiAttentionInteractive />
            </div>
          </HardwareCard>

          {/* Card 4: Cyber Security (CSEC) (col-span-6) */}
          <HardwareCard
            tag="04 // EXPLOIT-OPERATIONS"
            accentColor="#F43F5E"
            className="md:col-span-12 lg:col-span-6"
          >
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                        Cyber Security (CSEC)
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98] uppercase">
                        CTF Podium • Binary Exploitation • Cryptography
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/departments/cyber-security"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8A8F98] transition-all hover:border-rose-400 hover:text-rose-400 hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="font-sans text-sm text-[#8A8F98] mb-3 leading-relaxed">
                  Offensive and defensive security research. Cracking memory corruptions, reverse-engineering x86-64 binaries, and capturing podium spots in global CTFs.
                </p>
              </div>

              {/* Interactive Memory Exploit Deck */}
              <CsecExploitDeck />
            </div>
          </HardwareCard>

        </div>
      </div>
    </section>
  );
}
