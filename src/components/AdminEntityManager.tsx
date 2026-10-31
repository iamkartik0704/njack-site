'use client';

import React, { useState } from 'react';
import { AlertCircle, ExternalLink, Loader2, Plus, Trash2, X } from 'lucide-react';

export type AdminField = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'url' | 'checkbox' | 'select' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  half?: boolean;
};

export default function AdminEntityManager({
  title,
  eyebrow,
  description,
  endpoint,
  noun,
  fields,
  initialRows,
  previewHref,
}: {
  title: string;
  eyebrow: string;
  description: string;
  endpoint: string;
  noun: string;
  fields: AdminField[];
  initialRows: Record<string, any>[];
  previewHref?: string;
}) {
  const initialForm = Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? false : field.type === 'number' ? 0 : '']));
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Record<string, any>>(initialForm);

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Failed to create ${noun}`);
      const created = data[noun] || data.member || data.post || data.project || data.album;
      if (!created) throw new Error(`No ${noun} returned by the server`);
      setRows((current) => [created, ...current]);
      setForm(initialForm);
      setOpen(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to create ${noun}`);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(`Delete this ${noun}? This cannot be undone.`)) return;
    setDeletingId(id);
    setError('');
    try {
      const response = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Failed to delete ${noun}`);
      setRows((current) => current.filter((row) => row.id !== id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to delete ${noun}`);
    } finally {
      setDeletingId(null);
    }
  };

  const updateTitleSlug = (name: string, value: string) => {
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === 'title' && Object.prototype.hasOwnProperty.call(current, 'slug')) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#FF5722]"><span className="h-1.5 w-1.5 bg-[#FF5722]" />{eyebrow}</span><h1 className="font-display text-2xl font-extrabold tracking-tight text-[#F3F4F6] sm:text-3xl">{title}</h1><p className="mt-1.5 text-xs leading-relaxed text-[#8A8F98] sm:text-sm">{description}</p></div>
        <button type="button" onClick={() => { setError(''); setOpen(true); }} className="inline-flex items-center gap-1.5 rounded-md bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#FF6A3D] active:scale-[0.98]"><Plus className="h-4 w-4" />Add {noun}</button>
      </div>

      {error && <div role="alert" className="flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      <div className="overflow-hidden rounded-md border border-white/[0.08] bg-[#0E1016]/80">
        <div className="hidden border-b border-white/[0.08] px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] sm:grid sm:grid-cols-[minmax(0,1fr)_180px_100px]"><span>{noun}</span><span>Department / Status</span><span className="text-right">Actions</span></div>
        {rows.length === 0 ? <div className="px-5 py-12 text-center font-mono text-xs uppercase tracking-wider text-[#5A5F68]">No {noun}s yet</div> : rows.map((row) => {
          const secondary = row.department?.name || row.status || row.year || 'NJACK';
          const preview = previewHref;
          return <div key={row.id} className="grid gap-3 border-b border-white/[0.06] px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_180px_100px] sm:items-center sm:px-5"><div className="min-w-0"><div className="truncate text-sm font-semibold text-white">{row.title || row.name || row.slug}</div><div className="mt-1 truncate text-xs text-[#8A8F98]">{row.topic || row.role || row.description || row.slug || ''}</div></div><div className="font-mono text-[10px] uppercase tracking-wider text-[#FF5722]">{secondary}</div><div className="flex items-center justify-end gap-1">{preview && <a href={preview} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-[#8A8F98] hover:bg-white/[0.05] hover:text-[#FF5722]" aria-label={`Preview ${noun}`}><ExternalLink className="h-4 w-4" /></a>}<button type="button" onClick={() => remove(row.id)} disabled={deletingId === row.id} className="rounded-md p-2 text-[#8A8F98] hover:bg-white/[0.05] hover:text-rose-400 disabled:opacity-50" aria-label={`Delete ${noun}`}><Trash2 className={`h-4 w-4 ${deletingId === row.id ? 'animate-pulse' : ''}`} /></button></div></div>;
        })}
      </div>

      {open && <div role="dialog" aria-modal="true" aria-label={`Add ${noun}`} className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-md sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><div className="max-h-[92vh] w-full overflow-y-auto rounded-t-lg border border-white/[0.08] bg-[#0E1016] p-5 sm:max-w-2xl sm:rounded-lg sm:p-7"><div className="mb-5 flex items-start justify-between border-b border-white/[0.08] pb-4"><div><h2 className="font-display text-lg font-bold text-[#F3F4F6]">Add {noun}</h2><p className="mt-1 text-xs text-[#8A8F98]">Create a new {noun} record.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1.5 text-[#8A8F98] hover:bg-white/[0.05] hover:text-white"><X className="h-4 w-4" /></button></div><form onSubmit={create} className="grid gap-4 sm:grid-cols-2">{fields.map((field) => { const common = 'w-full rounded-md border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-[#5A5F68] focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]'; return <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}><label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]" htmlFor={`field-${field.name}`}>{field.label}</label>{field.type === 'textarea' ? <textarea id={`field-${field.name}`} rows={4} required={field.required} placeholder={field.placeholder} value={form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))} className={`${common} resize-none`} /> : field.type === 'select' ? <select id={`field-${field.name}`} required={field.required} value={form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))} className={common}><option value="">Select...</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === 'checkbox' ? <label className="flex items-center gap-2 text-xs text-neutral-300"><input id={`field-${field.name}`} type="checkbox" checked={!!form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))} className="accent-[#FF5722]" />{field.placeholder || 'Enabled'}</label> : <input id={`field-${field.name}`} type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'} required={field.required} placeholder={field.placeholder} value={form[field.name]} onChange={(event) => updateTitleSlug(field.name, event.target.value)} className={common} />}</div>; })}<div className="mt-1 flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => setOpen(false)} className="rounded-md border border-white/10 px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-white/[0.05]">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">{saving && <Loader2 className="h-4 w-4 animate-spin" />}{saving ? 'Saving' : `Create ${noun}`}</button></div></form></div></div>}
    </div>
  );
}
