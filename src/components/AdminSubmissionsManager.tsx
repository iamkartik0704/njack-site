'use client';

import React, { useState } from 'react';
import {
  Inbox,
  ShieldAlert,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export interface SubmissionItem {
  id: string;
  kind: string; // 'contact' | 'report'
  payload: string;
  status: string; // 'pending' | 'reviewed' | 'resolved'
  createdAt: string;
}

interface AdminSubmissionsManagerProps {
  initialSubmissions: SubmissionItem[];
}

export default function AdminSubmissionsManager({
  initialSubmissions,
}: AdminSubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(initialSubmissions);
  const [filterKind, setFilterKind] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = submissions.filter((s) => {
    if (filterKind !== 'all' && s.kind !== filterKind) return false;
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this submission?')) return;

    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
        
        {/* Kind tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterKind('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterKind === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            All Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setFilterKind('report')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterKind === 'report'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>CF Plagiarism Reports ({submissions.filter((s) => s.kind === 'report').length})</span>
          </button>
          <button
            onClick={() => setFilterKind('contact')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterKind === 'contact'
                ? 'bg-cyan-500 text-white shadow-glow-cyan'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Inquiries ({submissions.filter((s) => s.kind === 'contact').length})</span>
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/30 p-12 text-center text-slate-400">
          <Inbox className="h-10 w-10 text-slate-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-white">No submissions match the current filter</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            let p: any = {};
            try {
              p = JSON.parse(item.payload);
            } catch {
              p = {};
            }

            const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
            });

            const isReport = item.kind === 'report';

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-all hover:border-white/20 space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase ${
                        isReport
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {isReport ? 'Codeforces Plagiarism Report' : 'General Inquiry'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{dateStr}</span>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">Mark as:</span>
                    <select
                      value={item.status}
                      disabled={updatingId === item.id}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-mono font-semibold uppercase ${
                        item.status === 'pending'
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                          : item.status === 'reviewed'
                          ? 'border-blue-500/40 bg-blue-500/10 text-blue-400'
                          : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                {isReport ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400">Reported CF Handle:</span>{' '}
                        <span className="font-mono font-bold text-rose-400">
                          {p.reportedHandle}
                        </span>
                      </div>
                      {p.suspectedCollaborator && (
                        <div>
                          <span className="text-slate-400">Suspected Collaborator:</span>{' '}
                          <span className="font-mono text-amber-400">
                            {p.suspectedCollaborator}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400">Contest / Round:</span>{' '}
                        <a
                          href={p.contestLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>{p.contestLink}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      {p.codeSubmissionLinks && (
                        <div>
                          <span className="text-slate-400">Evidence Submission:</span>{' '}
                          <a
                            href={p.codeSubmissionLinks}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{p.codeSubmissionLinks}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-1">
                      <div className="font-mono uppercase tracking-wider text-slate-500 text-[10px]">
                        Plagiarism Proof & Details:
                      </div>
                      <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                        {p.proofDetails}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4 text-slate-400">
                      <div>
                        Sender: <span className="font-semibold text-white">{p.name}</span>
                      </div>
                      <div>•</div>
                      <div>
                        Email:{' '}
                        <a
                          href={`mailto:${p.email}`}
                          className="font-mono text-cyan-400 hover:underline"
                        >
                          {p.email}
                        </a>
                      </div>
                      <div>•</div>
                      <div>
                        Subject: <span className="font-medium text-slate-200">{p.subject}</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-black/40 p-4 text-slate-200 leading-relaxed whitespace-pre-line">
                      {p.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
