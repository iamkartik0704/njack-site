'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Play, Sparkles } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const PRESET_COMMANDS = [
  { cmd: 'njack divisions', label: 'Divisions' },
  { cmd: 'njack icpc', label: 'ICPC Records' },
  { cmd: 'njack nwoc', label: 'NWoC 2026' },
  { cmd: 'njack events', label: 'Upcoming' },
  { cmd: 'njack help', label: 'Help' },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'njack info',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-white font-semibold">NJACK — Not Just Another Coding Klub</p>
          <p className="text-slate-400">Official Coding Club, IIT Patna</p>
          <p className="text-xs text-orange-400/90 pt-1">
            Status: Active · Session 2026-27 · 4 Specialized Divisions
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    let res: React.ReactNode;

    switch (cmd) {
      case 'njack divisions':
      case 'divisions':
        res = (
          <div className="space-y-2 text-xs">
            <div className="border-l-2 border-orange-500 pl-2.5 py-0.5">
              <span className="text-white font-bold">1. Competitive Programming (CP)</span>
              <p className="text-slate-400">ICPC Regional ladder, weekly Codeforces & AtCoder virtual rounds.</p>
            </div>
            <div className="border-l-2 border-amber-500 pl-2.5 py-0.5">
              <span className="text-white font-bold">2. Development & Open Source (Dev & OS)</span>
              <p className="text-slate-400">Full-stack systems, Docker, Kubernetes, Linux kernel & NWoC mentorship.</p>
            </div>
            <div className="border-l-2 border-orange-600 pl-2.5 py-0.5">
              <span className="text-white font-bold">3. Machine Learning (ML)</span>
              <p className="text-slate-400">Deep learning, LLMs, computer vision, PyTorch & Kaggle competitions.</p>
            </div>
            <div className="border-l-2 border-amber-600 pl-2.5 py-0.5">
              <span className="text-white font-bold">4. Cyber Security (CyberSec)</span>
              <p className="text-slate-400">Binary exploitation, web security, cryptography & CTF championships.</p>
            </div>
          </div>
        );
        break;

      case 'njack icpc':
      case 'icpc':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-white font-semibold">🏆 ICPC Asia-West Regional Records</p>
            <p>• Rank 47 — Team IITP_BinaryBeasts (Asia-West 2025)</p>
            <p>• 4 teams qualified for Asia Regional Finals (Kanpur & Amritapuri)</p>
            <p>• 15+ Candidate Masters & Masters on Codeforces</p>
          </div>
        );
        break;

      case 'njack nwoc':
      case 'nwoc':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-white font-semibold">❄️ NJACK Winter of Code (NWoC)</p>
            <p>• India&apos;s premier student-run month-long open source initiative</p>
            <p>• 500+ Pull Requests merged across 35 production repos</p>
            <p>• Mentorship feeder into Google Summer of Code (GSoC)</p>
          </div>
        );
        break;

      case 'njack events':
      case 'events':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-white font-semibold">📅 Active & Upcoming Sessions</p>
            <p>• <span className="text-orange-400">Weekly CP Contest #14</span> — Saturday 21:00 IST</p>
            <p>• <span className="text-orange-400">Systems & OS Workshop</span> — Sunday 16:00 IST (Room CS-101)</p>
            <p>• <span className="text-orange-400">Apeireon 2026 Hackathon</span> — Registrations open now</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
      case 'njack help':
      default:
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-slate-200">Available NJACK commands:</p>
            <p className="text-orange-300 font-mono">
              njack divisions <span className="text-slate-500">— view 4 technical departments</span>
            </p>
            <p className="text-orange-300 font-mono">
              njack icpc      <span className="text-slate-500">— ICPC regional & finals records</span>
            </p>
            <p className="text-orange-300 font-mono">
              njack nwoc      <span className="text-slate-500">— NJACK Winter of Code statistics</span>
            </p>
            <p className="text-orange-300 font-mono">
              njack events    <span className="text-slate-500">— list live contests and workshops</span>
            </p>
            <p className="text-orange-300 font-mono">
              clear           <span className="text-slate-500">— clear terminal output</span>
            </p>
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: res }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      data-ui="terminal"
      className="relative w-full rounded-xl border border-white/10 bg-[#0a0c10] text-left overflow-hidden shadow-2xl"
    >
      <BorderBeam size={220} duration={8} colorFrom="#ff5500" colorTo="#ff9900" />
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0e1117] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5500]/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-orange-400" />
            <span>njack@iitp:~ (bash)</span>
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">interactive shell</span>
      </div>

      {/* Quick Action Chips */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#08090d] px-3.5 py-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <Play className="h-2.5 w-2.5 text-orange-400" />
          <span>Quick:</span>
        </span>
        {PRESET_COMMANDS.map((p) => (
          <button
            key={p.cmd}
            type="button"
            onClick={() => executeCommand(p.cmd)}
            className="rounded border border-white/10 bg-[#12151d] px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-300 active:scale-95 transition-colors whitespace-nowrap"
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => executeCommand('clear')}
          className="ml-auto rounded border border-white/5 bg-[#12151d] px-2 py-1 text-[11px] font-mono text-slate-400 hover:text-white"
        >
          Clear
        </button>
      </div>

      {/* Terminal Body */}
      <div className="max-h-[290px] min-h-[200px] overflow-y-auto p-4 font-mono text-xs space-y-3.5">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-orange-400 font-bold">njack@iitp:~$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input Line */}
      <div className="flex items-center gap-2 border-t border-white/10 bg-[#0d1016] px-4 py-2.5">
        <span className="text-orange-400 font-mono font-bold text-xs whitespace-nowrap">
          njack@iitp:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'divisions', 'icpc', 'events' or click a command..."
          className="w-full bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (inputVal.trim()) executeCommand(inputVal);
            inputRef.current?.focus();
          }}
          aria-label="Run command"
          className="rounded p-1 text-slate-400 hover:text-orange-400 transition-colors"
        >
          <CornerDownLeft className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
