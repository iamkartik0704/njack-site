'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import {
  Badge,
  Button,
  DataTable,
  ErrorNote,
  Field,
  IconButton,
  Input,
  Modal,
  PageHeader,
  Select,
  Textarea,
  type Column,
} from './ui';
import { formatEventDate } from '@/lib/utils';

/**
 * Declarative field description. Kept to plain data so a server component can
 * pass it straight into this client component.
 */
export type FieldSpec = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'markdown'
    | 'url'
    | 'number'
    | 'date'
    | 'datetime'
    | 'select'
    | 'checkbox'
    | 'json';
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  /** Render as a column in the records table. */
  inTable?: boolean;
  /** Render the table cell as a pill. */
  badge?: boolean;
  /** Share a row with the next field on wider screens. */
  half?: boolean;
  /** Hide this column in the mobile card view. */
  hideOnMobile?: boolean;
  defaultValue?: string | number | boolean;
};

export type EntityRecord = Record<string, unknown> & { id: string };

type Props = {
  endpoint: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Singular noun used in buttons and dialogs, e.g. "event". */
  noun: string;
  rows: EntityRecord[];
  fields: FieldSpec[];
  /** Public page this content appears on, linked from the header. */
  publicHref?: string;
  /** Set when the signed-in user may not choose the division. */
  lockedDivisionName?: string | null;
  canDelete?: boolean;
  wideForm?: boolean;
};

const emptyFor = (fields: FieldSpec[]): Record<string, string | boolean> =>
  Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.defaultValue !== undefined
        ? (f.defaultValue as string | boolean)
        : f.type === 'checkbox'
          ? false
          : '',
    ])
  );

/** Prisma dates arrive as ISO strings; <input type=date|datetime-local> needs a slice. */
const toInputValue = (value: unknown, type: FieldSpec['type']): string | boolean => {
  if (value === null || value === undefined) return type === 'checkbox' ? false : '';
  if (type === 'checkbox') return Boolean(value);
  if (type === 'date' || type === 'datetime') {
    const d = new Date(value as string);
    if (Number.isNaN(d.getTime())) return '';
    return type === 'date' ? d.toISOString().slice(0, 10) : d.toISOString().slice(0, 16);
  }
  if (type === 'json') {
    if (typeof value === 'string') return value;
    return JSON.stringify(value, null, 2);
  }
  return String(value);
};

/** Green only for genuinely positive states, so "past" or "draft" is not read as success. */
function badgeTone(f: FieldSpec, value: string): 'accent' | 'neutral' | 'success' | 'warning' {
  if (f.name !== 'status') return 'neutral';
  if (value === 'upcoming' || value === 'published') return 'success';
  if (value === 'draft') return 'warning';
  return 'neutral';
}

export default function EntityManager({
  endpoint,
  eyebrow,
  title,
  description,
  noun,
  rows,
  fields,
  publicHref,
  lockedDivisionName,
  canDelete = true,
  wideForm,
}: Props) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EntityRecord | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>(() => emptyFor(fields));
  const [pendingDelete, setPendingDelete] = useState<EntityRecord | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const openCreate = () => {
    setEditing(null);
    setForm(emptyFor(fields));
    setError('');
    setFormOpen(true);
  };

  const openEdit = (row: EntityRecord) => {
    setEditing(row);
    setForm(
      Object.fromEntries(fields.map((f) => [f.name, toInputValue(row[f.name], f.type)]))
    );
    setError('');
    setFormOpen(true);
  };

  const set = (name: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const payload: Record<string, unknown> = { ...form };
      if (editing) payload.id = editing.id;

      const res = await fetch(endpoint, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || `Could not save this ${noun}.`);
        return;
      }

      setFormOpen(false);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    setError('');

    try {
      const res = await fetch(`${endpoint}?id=${encodeURIComponent(pendingDelete.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || `Could not delete this ${noun}.`);
        return;
      }

      setPendingDelete(null);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const columns: Column<EntityRecord>[] = useMemo(
    () =>
      fields
        .filter((f) => f.inTable)
        .map((f) => ({
          key: f.name,
          header: f.label,
          hideOnMobile: f.hideOnMobile,
          cell: (row) => {
            const raw = row[f.name];

            if (f.type === 'checkbox') {
              return raw ? <Badge tone="accent">Yes</Badge> : <span className="text-[#5A5F68]">—</span>;
            }
            if (raw === null || raw === undefined || raw === '') {
              return <span className="text-[#5A5F68]">—</span>;
            }
            if (f.type === 'date' || f.type === 'datetime') {
              return <span className="font-mono text-[11px]">{formatEventDate(raw as string)}</span>;
            }
            if (f.type === 'url') {
              return (
                <a
                  href={String(raw)}
                  target={String(raw).startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex max-w-[16rem] items-center gap-1 truncate text-[#FF5722] hover:underline"
                >
                  <span className="truncate">{String(raw)}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              );
            }
            // A select stores an id or a code; always show its human label.
            const label = f.options?.find((o) => o.value === String(raw))?.label ?? String(raw);

            if (f.badge) {
              return <Badge tone={badgeTone(f, String(raw))}>{label}</Badge>;
            }
            return <span className="line-clamp-2 max-w-[22rem]">{label}</span>;
          },
        })),
    [fields]
  );

  const renderControl = (f: FieldSpec) => {
    const value = form[f.name];

    if (f.type === 'checkbox') {
      return (
        <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => set(f.name, e.target.checked)}
            className="h-4 w-4 accent-[#FF5722]"
          />
          <span className="text-xs text-neutral-300">{f.help ?? f.label}</span>
        </label>
      );
    }

    if (f.type === 'select') {
      return (
        <Select
          required={f.required}
          value={String(value ?? '')}
          onChange={(e) => set(f.name, e.target.value)}
        >
          <option value="">Not set</option>
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      );
    }

    if (f.type === 'textarea' || f.type === 'markdown' || f.type === 'json') {
      return (
        <Textarea
          required={f.required}
          rows={f.type === 'json' ? 6 : f.type === 'markdown' ? 8 : 4}
          placeholder={f.placeholder}
          value={String(value ?? '')}
          onChange={(e) => set(f.name, e.target.value)}
          className={f.type === 'json' ? 'font-mono text-[11px]' : undefined}
        />
      );
    }

    // 'url' fields hold either a full URL or a site-relative path such as
    // /team/default.png, which type="url" rejects — so keep them as text.
    return (
      <Input
        required={f.required}
        type={
          f.type === 'number'
            ? 'number'
            : f.type === 'date'
              ? 'date'
              : f.type === 'datetime'
                ? 'datetime-local'
                : 'text'
        }
        inputMode={f.type === 'url' ? 'url' : undefined}
        placeholder={f.placeholder ?? (f.type === 'url' ? 'https://… or /path/image.png' : undefined)}
        value={String(value ?? '')}
        onChange={(e) => set(f.name, e.target.value)}
      />
    );
  };

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-10">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            {publicHref && (
              <a href={publicHref} target="_blank" rel="noreferrer">
                <Button variant="secondary" type="button">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View live
                </Button>
              </a>
            )}
            <Button onClick={openCreate}>
              <Plus className="h-3.5 w-3.5" />
              New {noun}
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-[#8A8F98]">
          <span className="font-bold text-[#FF5722]">{rows.length}</span>{' '}
          {rows.length === 1 ? noun : `${noun}s`}
        </span>
        {lockedDivisionName && (
          <Badge tone="accent">Scoped to {lockedDivisionName}</Badge>
        )}
      </div>

      {error && !formOpen && !pendingDelete && (
        <ErrorNote>
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </ErrorNote>
      )}

      <DataTable
        rows={rows}
        columns={columns}
        empty={`No ${noun}s yet — create the first one`}
        actions={(row) => (
          <>
            <IconButton label={`Edit ${noun}`} onClick={() => openEdit(row)}>
              <Pencil className="h-3.5 w-3.5" />
            </IconButton>
            {canDelete && (
              <IconButton danger label={`Delete ${noun}`} onClick={() => setPendingDelete(row)}>
                <Trash2 className="h-3.5 w-3.5" />
              </IconButton>
            )}
          </>
        )}
      />

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        wide={wideForm}
        title={editing ? `Edit ${noun}` : `New ${noun}`}
        description={
          lockedDivisionName ? `Filed under ${lockedDivisionName}` : undefined
        }
      >
        <form onSubmit={submit} className="space-y-4">
          {error && (
            <ErrorNote>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </ErrorNote>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <Field
                key={f.name}
                label={f.required ? `${f.label} *` : f.label}
                className={f.half ? 'sm:col-span-1' : 'sm:col-span-2'}
              >
                {renderControl(f)}
                {f.help && f.type !== 'checkbox' && (
                  <p className="mt-1.5 text-[11px] text-[#5A5F68]">{f.help}</p>
                )}
              </Field>
            ))}
          </div>

          <div className="flex justify-end gap-2 border-t border-white/[0.08] pt-4">
            <Button type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {editing ? 'Save changes' : `Create ${noun}`}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title={`Delete this ${noun}?`}
        description="This cannot be undone."
      >
        <div className="space-y-4">
          {error && (
            <ErrorNote>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </ErrorNote>
          )}
          <p className="text-sm text-neutral-300">
            {String(pendingDelete?.[fields[0]?.name] ?? pendingDelete?.id ?? '')}
          </p>
          <div className="flex justify-end gap-2 border-t border-white/[0.08] pt-4">
            <Button type="button" variant="secondary" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button type="button" variant="danger" onClick={confirmDelete} disabled={busy}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Delete {noun}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
