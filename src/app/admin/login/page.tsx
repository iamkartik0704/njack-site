'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="admin-theme relative flex min-h-screen items-center justify-center bg-[#07080A] p-4 text-[#F3F4F6]">
      <div aria-hidden="true" className="architectural-grid pointer-events-none fixed inset-0" />
      <div className="relative w-full max-w-md">
        <div className="relative space-y-6 rounded-lg border border-white/[0.08] bg-[#0E1016]/95 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-9">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722] shadow-[0_0_28px_rgba(255,87,34,0.3)]"><Lock className="h-6 w-6" /></div>
            <div><h1 className="font-display text-2xl font-extrabold tracking-tight"><span className="text-gradient-njack">Council Terminal</span></h1><p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">Restricted access</p></div>
          </div>
          {error && <div role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300"><AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span></div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">Email</label><div className="relative"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5F68]" /><input id="email" type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@njack.iitp.ac.in" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-[#5A5F68] transition-colors focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]" /></div></div>
            <div><label htmlFor="password" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">Password</label><div className="relative"><Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5F68]" /><input id="password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-[#5A5F68] transition-colors focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]" /></div></div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5722] py-3 text-xs font-semibold text-white shadow-[0_0_24px_rgba(255,87,34,0.3)] transition-all hover:bg-[#FF6A3D] hover:shadow-[0_0_36px_rgba(255,87,34,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">{loading ? <><Loader2 className="h-4 w-4 animate-spin" />Authenticating</> : <>Enter Terminal<ArrowRight className="h-3.5 w-3.5" /></>}</button>
          </form>
          <div className="text-center"><Link href="/" className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] transition-colors hover:text-white">Return to public site</Link></div>
        </div>
      </div>
    </div>
  );
}
