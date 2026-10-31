'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, AlertTriangle, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ReportCheatingPage() {
  const [formData, setFormData] = useState({
    contestLink: '',
    reportedHandle: '',
    suspectedCollaborator: '',
    proofDetails: '',
    codeSubmissionLinks: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/report-cheating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit report.');
      }

      setSuccess(true);
      setFormData({
        contestLink: '',
        reportedHandle: '',
        suspectedCollaborator: '',
        proofDetails: '',
        codeSubmissionLinks: '',
      });
    } catch (err: any) {
      setError(err.message || 'Error transmitting confidential report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Security Banner */}
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 backdrop-blur-md flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">100% Confidential & Anonymous</h2>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                PROTECTED
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No personal identity, email address, or tracking telemetry is recorded with your submission. Reports are decrypted and examined solely by the NJACK CP Division council to ensure fair play across Codeforces contests.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-mono text-rose-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Integrity Enforcement</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Report Contest Plagiarism
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Witnessed cheating, Telegram solution sharing, or coordinated multi-account submission in a recent Codeforces or rated contest? Submit the evidence below.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Report Securely Logged</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for upholding academic and competitive integrity. The CP council will audit the submission diffs and contest logs against our automated similarity detection tools.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 rounded-xl bg-amber-500/20 px-5 py-2.5 text-xs font-semibold text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Contest URL / Round *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contestLink}
                    onChange={(e) => setFormData({ ...formData, contestLink: e.target.value })}
                    placeholder="e.g. https://codeforces.com/contest/1982 or Round 954"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Reported CF Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.reportedHandle}
                      onChange={(e) => setFormData({ ...formData, reportedHandle: e.target.value })}
                      placeholder="e.g. suspect_handle"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Suspected Collaborator (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.suspectedCollaborator}
                      onChange={(e) => setFormData({ ...formData, suspectedCollaborator: e.target.value })}
                      placeholder="e.g. collaborator_handle"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Submission Links / Code Diffs (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.codeSubmissionLinks}
                    onChange={(e) => setFormData({ ...formData, codeSubmissionLinks: e.target.value })}
                    placeholder="e.g. https://codeforces.com/contest/1982/submission/26781290"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Evidence & Proof Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.proofDetails}
                    onChange={(e) => setFormData({ ...formData, proofDetails: e.target.value })}
                    placeholder="Describe specific patterns: identical custom templates, token variable renamings, identical wrong-answer bug logic, screenshot links, or timestamp correlation..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-xs font-bold text-slate-950 shadow-glow-amber transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>{loading ? 'Encrypting & Sending...' : 'Submit Anonymous Integrity Report'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
