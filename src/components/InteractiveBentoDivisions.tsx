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
// 2. STATIC GRAPHIC 2: DEV & OS (Distributed Systems Architecture)
// ============================================================================
function DevSystemsGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          SYSTEM_ARCHITECTURE // MESH
        </span>
        <span className="text-white/70">DISTRIBUTED SLA 99.98%</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
          <defs>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06B6D4" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Connection Lines between layers */}
          {/* Layer 1 -> Layer 2 */}
          <path d="M 190 28 L 75 60" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 190 28 L 190 60" stroke="#06B6D4" strokeWidth="1.8" filter="url(#glowCyan)" />
          <path d="M 190 28 L 305 60" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* Layer 2 -> Layer 3 */}
          <path d="M 75 88 L 120 115" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <path d="M 190 88 L 120 115" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M 190 88 L 260 115" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M 305 88 L 260 115" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

          {/* Layer 1: Edge Ingress / Gateway */}
          <rect x="110" y="6" width="160" height="24" rx="6" fill="#0C1019" stroke="#06B6D4" strokeWidth="1.5" filter="url(#glowCyan)" />
          <circle cx="125" cy="18" r="3" fill="#06B6D4" />
          <text x="195" y="22" fill="#E2E8F0" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">EDGE_INGRESS // GATEWAY</text>

          {/* Layer 2: Microservices Cluster */}
          {/* Node A: Auth & Identity */}
          <rect x="15" y="60" width="120" height="28" rx="6" fill="#0C1019" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <text x="75" y="77" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">AUTH_SERVICE</text>

          {/* Node B: Core Engine */}
          <rect x="145" y="60" width="90" height="28" rx="6" fill="#0E1726" stroke="#06B6D4" strokeWidth="1.5" filter="url(#glowCyan)" />
          <text x="190" y="77" fill="#38BDF8" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RAFT_CORE</text>

          {/* Node C: Task Scheduler */}
          <rect x="245" y="60" width="120" height="28" rx="6" fill="#0C1019" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <text x="305" y="77" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">TASK_WORKERS</text>

          {/* Layer 3: Persistence & State Mesh */}
          <rect x="50" y="112" width="140" height="22" rx="5" fill="#0C1019" stroke="#3B82F6" strokeWidth="1.2" />
          <text x="120" y="126" fill="#93C5FD" fontSize="8.5" fontFamily="monospace" textAnchor="middle">DISTRIBUTED_KV_CACHE</text>

          <rect x="200" y="112" width="130" height="22" rx="5" fill="#0C1019" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <text x="265" y="126" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">PRIMARY_STORAGE</text>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>TOPOLOGY: <span className="text-cyan-400 font-semibold">RAFT CONSENSUS</span></span>
        <span>CLUSTERS: <span className="text-white font-semibold">3 TIERS</span></span>
        <span>LATENCY: <span className="text-emerald-400 font-semibold">0.4ms</span></span>
      </div>
    </div>
  );
}

// ============================================================================
// 3. STATIC GRAPHIC 3: AI & ML (Neural Graph & Latent Transformer Architecture)
// ============================================================================
function AiNeuralGraphic() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#07080A]/70 p-4 space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2 text-[#8A8F98]">
        <span className="flex items-center gap-1.5 text-purple-400">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          NEURAL_TRANSFORMER // ATTENTION
        </span>
        <span className="text-white/70">LATENT_DIM: 4096</span>
      </div>

      {/* Static Vector Canvas */}
      <div className="relative h-36 w-full">
        <svg className="w-full h-full" viewBox="0 0 380 140" fill="none">
          <defs>
            <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#A855F7" floodOpacity="0.4" />
            </filter>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5722" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Inter-layer synaptic tensor curves */}
          {[20, 50, 80, 110].map((y1, i) =>
            [25, 55, 85, 115].map((y2, j) => (
              <path
                key={`l1-l2-${i}-${j}`}
                d={`M 55 ${y1} C 95 ${y1}, 105 ${y2}, 145 ${y2}`}
                stroke={(i === 1 && j === 1) || (i === 2 && j === 2) ? '#A855F7' : 'rgba(255,255,255,0.06)'}
                strokeWidth={(i === 1 && j === 1) || (i === 2 && j === 2) ? 1.8 : 0.8}
              />
            ))
          )}

          {/* Layer 2 to Layer 3 */}
          {[25, 55, 85, 115].map((y1, i) =>
            [35, 70, 105].map((y2, j) => (
              <path
                key={`l2-l3-${i}-${j}`}
                d={`M 175 ${y1} C 215 ${y1}, 225 ${y2}, 265 ${y2}`}
                stroke={(i === 1 && j === 1) ? 'url(#neuralGrad)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={(i === 1 && j === 1) ? 2 : 0.8}
              />
            ))
          )}

          {/* Layer 3 to Layer 4 */}
          {[35, 70, 105].map((y1, i) => (
            <path
              key={`l3-l4-${i}`}
              d={`M 295 ${y1} C 320 ${y1}, 330 70, 345 70`}
              stroke={i === 1 ? '#FF5722' : 'rgba(255,255,255,0.1)'}
              strokeWidth={i === 1 ? 2 : 1}
            />
          ))}

          {/* Layer 1 Nodes: Input Tokens */}
          <text x="55" y="10" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">INPUT EMBED</text>
          {[20, 50, 80, 110].map((y, idx) => (
            <g key={`in-${idx}`}>
              <circle cx="55" cy={y} r="6" fill="#0F172A" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <circle cx="55" cy={y} r="2" fill="#94A3B8" />
            </g>
          ))}

          {/* Layer 2 Nodes: Multi-Head Attention Matrices */}
          <text x="160" y="10" fill="#C084FC" fontSize="8" fontFamily="monospace" textAnchor="middle">MULTI-HEAD ATTN</text>
          {[25, 55, 85, 115].map((y, idx) => (
            <g key={`attn-${idx}`}>
              <rect x="145" y={y - 8} width="30" height="16" rx="4" fill="#180D2A" stroke="#A855F7" strokeWidth="1.2" filter={idx === 1 ? 'url(#glowPurple)' : undefined} />
              <text x="160" y={y + 3.5} fill="#E9D5FF" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">H_{idx+1}</text>
            </g>
          ))}

          {/* Layer 3 Nodes: Feed Forward Latent Layer */}
          <text x="280" y="10" fill="#F472B6" fontSize="8" fontFamily="monospace" textAnchor="middle">LATENT MLP</text>
          {[35, 70, 105].map((y, idx) => (
            <g key={`mlp-${idx}`}>
              <circle cx="280" cy={y} r="8" fill="#180D2A" stroke={idx === 1 ? '#FF5722' : 'rgba(255,255,255,0.2)'} strokeWidth="1.4" />
              <circle cx="280" cy={y} r="3" fill={idx === 1 ? '#FF5722' : '#64748B'} />
            </g>
          ))}

          {/* Layer 4 Node: Softmax Probability Distribution */}
          <text x="348" y="52" fill="#FF8A00" fontSize="8" fontFamily="monospace" textAnchor="middle">SOFTMAX</text>
          <circle cx="348" cy="70" r="12" fill="#1A1209" stroke="#FF5722" strokeWidth="2" filter="url(#glowPurple)" />
          <text x="348" y="73.5" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">p(x)</text>
        </svg>
      </div>

      {/* Diagram Metadata Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8F98] border-t border-white/[0.06] pt-2">
        <span>ENCODER: <span className="text-purple-400 font-semibold">12 BLOCKS</span></span>
        <span>HEADS: <span className="text-white font-semibold">32 PARALLEL</span></span>
        <span>LOSS: <span className="text-emerald-400 font-semibold">0.0142</span></span>
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

              {/* Static Systems Architecture Graphic */}
              <DevSystemsGraphic />
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

              {/* Static Neural Architecture Graphic */}
              <AiNeuralGraphic />
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
