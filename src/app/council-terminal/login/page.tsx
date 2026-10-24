'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
        setLoading(false);
        return;
      }

      router.push('/council-terminal');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const field =
    'w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-[#5A5F68] transition-colors focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07080A] p-4 text-[#F3F4F6]">
      <div aria-hidden="true" className="architectural-grid pointer-events-none fixed inset-0" />

      <div className="relative w-full max-w-md">
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#FF8A00]/25 via-[#FF5722]/20 to-[#D9381E]/25 blur-xl"
        />

        <div className="relative space-y-6 rounded-2xl border border-white/[0.08] bg-[#0E1016]/90 p-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_60px_-15px_rgba(0,0,0,0.8)] sm:p-9">
          <div className="space-y-3 text-center">
            <Image
              src="/icon.png"
              alt=""
              width={48}
              height={48}
              className="mx-auto h-12 w-12 rounded-2xl border border-[#FF5722]/30 bg-[#FF5722]/10 p-1.5 shadow-[0_0_28px_rgba(255,87,34,0.3)]"
            />
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-gradient-njack">Council Terminal</span>
              </h1>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">
                Restricted Access
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5F68]" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@njack.iitp.ac.in"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5F68]" />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={field}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5722] py-3 text-xs font-semibold text-white shadow-[0_0_24px_rgba(255,87,34,0.3)] transition-all hover:bg-[#FF6A3D] hover:shadow-[0_0_36px_rgba(255,87,34,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating
                </>
              ) : (
                <>
                  Enter Terminal
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
