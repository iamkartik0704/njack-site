'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Binary,
  Code2,
  Brain,
  ShieldAlert,
  ArrowUpRight,
  Play,
  RefreshCw,
  GitCommit,
  Radio,
} from 'lucide-react';
import SpotlightBentoCard from '@/components/SpotlightBentoCard';
import SplitTextReveal from '@/components/SplitTextReveal';

// Interactive Micro-UI 1: Auto-typing C++ snippet & Rating Graph
function CpMicroUI() {
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState('0.0018 ms');
  const [activeTab, setActiveTab] = useState<'CODE' | 'RATING'>('CODE');

  const fullCode = `#include <bits/stdc++.h>
using namespace std;

// Segment Tree: Point Update Range Sum
void update(int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) {
        tree[v] = new_val;
    } else {
        int tm = (tl + tr) / 2;
        if (pos <= tm) update(v*2, tl, tm, pos, new_val);
        else update(v*2+1, tm+1, tr, pos, new_val);
        tree[v] = tree[v*2] + tree[v*2+1];
    }
}`;

  const [displayedLength, setDisplayedLength] = useState(140);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLength((prev) => (prev >= fullCode.length ? 140 : prev + 6));
    }, 70);
    return () => clearInterval(timer);
  }, [fullCode.length]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecTime((Math.random() * 0.002 + 0.001).toFixed(4) + ' ms');
    }, 450);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Top Bar with tab switches & test trigger */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5 font-mono text-[10px]">
          <button
            onClick={() => setActiveTab('CODE')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'CODE' ? 'bg-[#FF5722] text-white font-semibold' : 'text-[#8A8F98]'
            }`}
          >
            SOLVER.CPP
          </button>
          <button
            onClick={() => setActiveTab('RATING')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'RATING' ? 'bg-[#FF5722] text-white font-semibold' : 'text-[#8A8F98]'
            }`}
          >
            ELO GRAPH
          </button>
        </div>

        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 rounded-lg border border-[#FF5722]/40 bg-[#FF5722]/10 px-2.5 py-1 font-mono text-[10px] text-[#FF5722] transition-colors hover:bg-[#FF5722]/25"
        >
          {isRunning ? (
            <RefreshCw className="h-3 w-3 animate-spin" />
          ) : (
            <Play className="h-3 w-3" />
          )}
          <span>{isRunning ? 'EXEC...' : 'TEST [O(log N)]'}</span>
        </button>
      </div>

      {/* Main Content Pane */}
      {activeTab === 'CODE' ? (
        <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080A]/80 p-3.5 font-mono text-xs text-[#8A8F98]">
          <pre className="overflow-x-auto leading-relaxed scrollbar-hide text-[11px]">
            <code className="text-[#F3F4F6]">
              {fullCode.slice(0, displayedLength)}
              <span className="inline-block w-2 h-3.5 bg-[#FF5722] align-middle ml-0.5 animate-pulse" />
            </code>
          </pre>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10px] text-[#8A8F98]">
            <span>TIME: <span className="text-[#FF5722] font-semibold">{execTime}</span></span>
            <span>MEM: 4.12 MB</span>
            <span className="text-[#FF8A00] font-semibold">• AC 100/100</span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] bg-[#07080A]/80 p-4">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#8A8F98] mb-2">
            <span>PEAK ICPC RATING: <strong className="text-[#FF5722]">2,450 (GRANDMASTER)</strong></span>
            <span>CODEFORCES DIV 1</span>
          </div>
          {/* Animated SVG Sparkline in NJACK Orange */}
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 80">
            <defs>
              <linearGradient id="cpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5722" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 Q40,55 80,45 T160,35 T220,18 T300,8 L300,80 L0,80 Z"
              fill="url(#cpGrad)"
            />
            <path
              d="M0,60 Q40,55 80,45 T160,35 T220,18 T300,8"
              fill="none"
              stroke="#FF5722"
              strokeWidth="2.5"
            />
            <circle cx="300" cy="8" r="4" fill="#FF5722" className="animate-ping" />
            <circle cx="300" cy="8" r="3.5" fill="#07080A" stroke="#FF8A00" strokeWidth="2" />
          </svg>
        </div>
      )}
    </div>
  );
}

// Interactive Micro-UI 2: Embedded Terminal & CI/CD Pipeline
function DevOsMicroUI() {
  const [history, setHistory] = useState<string[]>([
    'njack dev-os --status',
    '-> [CLUSTER: US-EAST] 4 nodes active, 0 alerts',
  ]);
  const [inputVal, setInputVal] = useState('');

  const executeCmd = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    let response = '';

    if (clean === 'help') {
      response = 'Available: help, status, deploy, nwoc, clear';
    } else if (clean === 'status') {
      response = 'Cluster online | Kernel: 6.8.0-arch | Uptime: 99.98%';
    } else if (clean === 'deploy') {
      response = 'Triggered CI/CD pipeline -> Build #1408 deployed successfully!';
    } else if (clean === 'nwoc') {
      response = 'NJACK Winter of Code: 1,400+ contributors, 85 mentored repos';
    } else if (clean === 'clear') {
      setHistory([]);
      return;
    } else {
      response = `Command not recognized: "${cmd}". Type "help" for protocol.`;
    }

    setHistory((prev) => [...prev, `$ ${cmd}`, response]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal) {
      executeCmd(inputVal);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between gap-3">
      {/* CI/CD Simulated Nodes */}
      <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <GitCommit className="h-3.5 w-3.5 text-[#FF5722]" />
          <span className="text-[#F3F4F6]">PIPELINE</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px]">
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-white/70">BUILD ✓</span>
          <span className="text-[#8A8F98]">→</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-white/70">TEST ✓</span>
          <span className="text-[#8A8F98]">→</span>
          <span className="rounded bg-[#FF5722]/15 px-1.5 py-0.5 font-semibold text-[#FF5722]">
            LIVE 99.9%
          </span>
        </div>
      </div>

      {/* Embedded Terminal Body */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080A]/90 p-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-2 text-[10px] text-[#8A8F98]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            DEV_OS_CONTAINER:bash
          </span>
          <span>TTY1</span>
        </div>

        <div className="max-h-[110px] overflow-y-auto scrollbar-hide text-[11px] text-[#8A8F98] space-y-1">
          {history.map((line, idx) => (
            <p key={idx} className={line.startsWith('$') ? 'text-[#F3F4F6]' : 'text-[#FF8A00]'}>
              {line}
            </p>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-white/[0.08] pt-2">
          <span className="text-[#FF5722] font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help', 'status', 'deploy'..."
            className="w-full bg-transparent font-mono text-xs text-[#F3F4F6] placeholder-[#8A8F98]/50 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// Interactive Micro-UI 3: Synaptic Neural Network Canvas in Brand Orange
function AiNeuralMicroUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const nodesCount = 28;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.5,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 87, 34, ${(1 - dist / 65) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw connections to cursor
        const dmx = nodes[i].x - mouse.x;
        const dmy = nodes[i].y - mouse.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < 85) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 138, 0, ${(1 - mouseDist / 85) * 0.65})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Update positions
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF5722';
        ctx.shadowColor = '#FF8A00';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080A]/80">
      <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-[#8A8F98]">
        <span>HOVER TO INJECT ATTENTION WEIGHTS</span>
        <span className="text-[#FF8A00] font-semibold">TENSORS ONLINE</span>
      </div>
    </div>
  );
}

// Interactive Micro-UI 4: Security Packet Hex Visualizer
function CyberMicroUI() {
  const [packets, setPackets] = useState<string[]>([
    '0x7F 0x45 0x4C 0x46 [ELF_X86_64_MAGIC_OK]',
    '0x90 0x90 0x90 0x31 [NOP_SLED_DEFENSE_TRIGGERED]',
    '0xC3 0x55 0x48 0x89 [STACK_CANARY_VERIFIED]',
    '0x00 0x2A 0xFF 0x00 [PORT_SCAN_ISOLATED]',
  ]);

  const [counter, setCounter] = useState(1284);

  useEffect(() => {
    const interval = setInterval(() => {
      const hexVals = ['0x89', '0xE5', '0x5D', '0xC3', '0x48', '0x83', '0xEC', '0x20'];
      const randomHex = hexVals[Math.floor(Math.random() * hexVals.length)];
      const randomId = Math.floor(Math.random() * 9000 + 1000);
      const newPacket = `${randomHex} 0x00 0x${Math.floor(Math.random() * 99)} [PACKET_ACK_${randomId}]`;

      setPackets((prev) => [newPacket, ...prev.slice(0, 3)]);
      setCounter((prev) => prev + 1);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between gap-3">
      <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2 font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-[#FF5722]">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          PACKET_SNIFFER
        </span>
        <span className="text-[#8A8F98]">INSPECTED: {counter}</span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#07080A]/80 p-3 font-mono text-[10px] space-y-1.5">
        {packets.map((pkt, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between transition-opacity ${
              idx === 0 ? 'text-[#FF5722]' : 'text-[#8A8F98]'
            }`}
          >
            <span className="truncate">{pkt}</span>
            <span className="text-[9px] text-white/30 shrink-0 ml-2">PASS</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-7">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <Binary className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                        Competitive Programming
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98]">
                        ICPC • CODEFORCES • ADVANCED ALGORITHMS
                      </p>
                    </div>
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

              {/* Live Interactive CP Micro-UI */}
              <CpMicroUI />
            </div>
          </SpotlightBentoCard>

          {/* Card 2: Systems, Web & DevOS (col-span-5) */}
          <SpotlightBentoCard className="md:col-span-12 lg:col-span-5">
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF5722]">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                        Development &amp; OS
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98]">
                        SYSTEMS • LINUX • NWOC OPEN SOURCE
                      </p>
                    </div>
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

              {/* Live Interactive Terminal Micro-UI */}
              <DevOsMicroUI />
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
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                        Artificial Intelligence &amp; ML
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98]">
                        TRANSFORMERS • VISION • DEEP LEARNING
                      </p>
                    </div>
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

              {/* Interactive Neural Canvas Micro-UI */}
              <AiNeuralMicroUI />
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
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#F3F4F6]">
                        Cyber Security (CSEC)
                      </h3>
                      <p className="font-mono text-[10px] tracking-wider text-[#8A8F98]">
                        CTF • BINARY EXPLOITATION • CRYPTOGRAPHY
                      </p>
                    </div>
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

              {/* Live Packet Sniffer Micro-UI */}
              <CyberMicroUI />
            </div>
          </SpotlightBentoCard>

        </div>
      </div>
    </section>
  );
}
