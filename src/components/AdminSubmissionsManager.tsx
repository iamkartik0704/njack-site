'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Badge, Button, ErrorNote, IconButton, Modal, Panel, EmptyState } from '@/components/admin/ui';
import { cn } from '@/lib/utils';
import { formatEventDate, formatEventTime } from '@/lib/utils';

export interface SubmissionItem {
  id: string;
  kind: string; // 'contact' | 'report'
  payload: string;
  status: string; // 'pending' | 'reviewed' | 'resolved'
  createdAt: string;
}

const STATUS_TONE = {
  pending: 'warning',
  reviewed: 'accent',
  resolved: 'success',
} as const;

function parsePayload(payload: string): Record<string, string> {
  try {
    const parsed = JSON.parse(payload);
    return typeof parsed === 'object' && parsed !== null ? parsed : { value: String(parsed) };
  } catch {
    return { value: payload };
  }
}

export default function AdminSubmissionsManager({
  initialSubmissions,
}: {
  initialSubmissions: SubmissionItem[];
}) {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(initialSubmissions);
  const [filterKind, setFilterKind] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SubmissionItem | null>(null);
  const [error, setError] = useState('');

  const filtered = submissions.filter(
    (s) =>
      (filterKind === 'all' || s.kind === filterKind) &&
      (filterStatus === 'all' || s.status === filterStatus)
  );

  const countOf = (kind: string) => submissions.filter((s) => s.kind === kind).length;

  const changeStatus = async (id: string, status: string) => {
    setBusyId(id);
    setError('');
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        setError('Could not update that submission.');
        return;
      }
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusyId(pendingDelete.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/submissions?id=${pendingDelete.id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('Could not delete that submission.');
        return;
      }
      setSubmissions((prev) => prev.filter((s) => s.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const Tab = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]',
        active
          ? 'border border-[#FF5722]/40 bg-[#FF5722]/15 text-[#FF5722] shadow-[0_0_18px_-6px_rgba(255,87,34,0.6)]'
          : 'border border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.07] hover:text-white'
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      <Panel hover={false} className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <Tab active={filterKind === 'all'} onClick={() => setFilterKind('all')}>
              All ({submissions.length})
            </Tab>
            <Tab active={filterKind === 'report'} onClick={() => setFilterKind('report')}>
              <ShieldAlert className="h-3.5 w-3.5" />
              Reports ({countOf('report')})
            </Tab>
            <Tab active={filterKind === 'contact'} onClick={() => setFilterKind('contact')}>
              <Mail className="h-3.5 w-3.5" />
              Contact ({countOf('contact')})
            </Tab>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {['all', 'pending', 'reviewed', 'resolved'].map((s) => (
              <Tab key={s} active={filterStatus === s} onClick={() => setFilterStatus(s)}>
                {s[0].toUpperCase() + s.slice(1)}
              </Tab>
            ))}
          </div>
        </div>
      </Panel>

      {error && (
        <ErrorNote>
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </ErrorNote>
      )}

      {filtered.length === 0 ? (
        <Panel hover={false}>
          <EmptyState message="Nothing matches these filters" />
        </Panel>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => {
            const data = parsePayload(s.payload);
            const isReport = s.kind === 'report';
            return (
              <Panel key={s.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={isReport ? 'danger' : 'neutral'}>
                        {isReport ? (
                          <ShieldAlert className="h-3 w-3" />
                        ) : (
                          <Mail className="h-3 w-3" />
                        )}
                        {s.kind}
                      </Badge>
                      <Badge tone={STATUS_TONE[s.status as keyof typeof STATUS_TONE] ?? 'neutral'}>
                        {s.status}
                      </Badge>
                      <span className="font-mono text-[10px] text-[#5A5F68]">
                        {formatEventDate(s.createdAt)} · {formatEventTime(s.createdAt)}
                      </span>
                    </div>

                    <dl className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                      {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="min-w-0">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5A5F68]">
                            {key}
                          </dt>
                          <dd className="break-words text-xs text-neutral-300">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3 sm:border-0 sm:pt-0">
                    {busyId === s.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#FF5722]" />
                    ) : (
                      <>
                        {s.status !== 'reviewed' && (
                          <Button
                            variant="secondary"
                            onClick={() => changeStatus(s.id, 'reviewed')}
                          >
                            <Clock className="h-3.5 w-3.5" />
                            Reviewed
                          </Button>
                        )}
                        {s.status !== 'resolved' && (
                          <Button onClick={() => changeStatus(s.id, 'resolved')}>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Resolve
                          </Button>
                        )}
                        <IconButton
                          danger
                          label="Delete submission"
                          onClick={() => setPendingDelete(s)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconButton>
                      </>
                    )}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title="Delete this submission?"
        description="This cannot be undone."
      >
        <div className="flex justify-end gap-2 border-t border-white/[0.08] pt-4">
          <Button variant="secondary" onClick={() => setPendingDelete(null)}>
            Keep it
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={!!busyId}>
            {busyId && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
