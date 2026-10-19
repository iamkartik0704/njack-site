'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Terminal, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@njack.iitp.ac.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070a12] p-4 text-slate-100">
      <div className="relative w-full max-w-md">
        
        {/* Glow backdrop */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-xl opacity-75" />

        <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan mb-3">
              <Terminal className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white">NJACK Super-Admin</h1>
            <p className="text-xs text-slate-400">
              CMS Operations, Content Management & Plagiarism Audit
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@njack.iitp.ac.in"
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Secret Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Access Admin Suite'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 text-center text-xs font-mono text-slate-400 space-y-1">
            <div className="text-[10px] uppercase text-cyan-400 font-semibold tracking-wider">
              Default Super-Admin Credentials
            </div>
            <div>admin@njack.iitp.ac.in / admin123</div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
