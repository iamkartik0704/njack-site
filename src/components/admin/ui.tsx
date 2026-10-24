'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect } from 'react';

/* Obsidian glass panel — mirrors the public site's card pattern. */
export function Panel({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 backdrop-blur-xl',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_40px_-15px_rgba(0,0,0,0.6)]',
        hover && 'transition-all duration-300 hover:border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FF5722]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] shadow-[0_0_8px_#FF5722]" />
          {eyebrow}
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#F3F4F6] sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-xs leading-relaxed text-[#8A8F98] sm:text-sm">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#FF5722] text-white shadow-[0_0_24px_rgba(255,87,34,0.3)] hover:bg-[#FF6A3D] hover:shadow-[0_0_36px_rgba(255,87,34,0.45)]',
  secondary:
    'border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white',
  danger:
    'border border-rose-500/25 bg-rose-500/10 text-rose-300 hover:border-rose-500/40 hover:bg-rose-500/20 hover:text-rose-200',
  ghost: 'text-[#8A8F98] hover:bg-white/[0.06] hover:text-white',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-xs font-semibold',
        'transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080A]',
        buttonVariants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

/* Square icon-only action, used inside table rows. */
export function IconButton({
  label,
  danger,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button
      {...props}
      title={label}
      aria-label={label}
      className={cn(
        'rounded-lg p-1.5 text-[#8A8F98] transition-colors hover:bg-white/[0.06]',
        danger ? 'hover:text-rose-400' : 'hover:text-[#FF5722]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]',
        className
      )}
    >
      {children}
    </button>
  );
}

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-[#5A5F68] transition-colors focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]';

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]"
    >
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, className)} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldBase, 'resize-none', className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(fieldBase, 'cursor-pointer', className)}>
      {children}
    </select>
  );
}

/* Field wrapper: label + control, stacked. */
export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

type Tone = 'accent' | 'neutral' | 'success' | 'warning' | 'danger';

const badgeTones: Record<Tone, string> = {
  accent: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722]',
  neutral: 'border-white/10 bg-white/[0.05] text-neutral-300',
  success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  danger: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider',
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cn(
          'relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/[0.08] bg-[#0E1016]/95 backdrop-blur-xl',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_60px_-15px_rgba(0,0,0,0.8)]',
          'p-5 sm:rounded-2xl sm:p-7',
          wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-[#F3F4F6]">{title}</h2>
            {description && <p className="mt-1 text-xs text-[#8A8F98]">{description}</p>}
          </div>
          <IconButton label="Close" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-5 py-14 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-[#5A5F68]">{message}</p>
    </div>
  );
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
    >
      {children}
    </div>
  );
}

/**
 * Responsive record list: a real table from `sm` up, stacked cards below it,
 * so narrow screens never get a squashed or sideways-scrolling table.
 */
export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  /** Hide this column on the mobile card view (e.g. redundant metadata). */
  hideOnMobile?: boolean;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  actions,
  empty = 'No records yet',
}: {
  rows: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  empty?: string;
}) {
  if (rows.length === 0) {
    return (
      <Panel hover={false}>
        <EmptyState message={empty} />
      </Panel>
    );
  }

  return (
    <>
      {/* Desktop */}
      <Panel hover={false} className="hidden overflow-hidden sm:block">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/[0.08] bg-black/30 font-mono text-[11px] uppercase tracking-wider text-[#8A8F98]">
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={cn('px-5 py-3.5 font-medium', c.className)}>
                  {c.header}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-5 py-3.5 text-right font-medium">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-white/[0.02]">
                {columns.map((c) => (
                  <td key={c.key} className={cn('px-5 py-4 align-middle', c.className)}>
                    {c.cell(row)}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* Mobile */}
      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <Panel key={row.id} className="p-4">
            <div className="space-y-2.5">
              {columns
                .filter((c) => !c.hideOnMobile)
                .map((c, i) => (
                  <div key={c.key} className={i === 0 ? '' : 'flex items-baseline justify-between gap-3'}>
                    {i !== 0 && (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#5A5F68]">
                        {c.header}
                      </span>
                    )}
                    <div className={cn('text-xs text-neutral-300', i === 0 && 'text-sm font-semibold text-white')}>
                      {c.cell(row)}
                    </div>
                  </div>
                ))}
            </div>
            {actions && (
              <div className="mt-3 flex items-center justify-end gap-1 border-t border-white/[0.06] pt-3">
                {actions(row)}
              </div>
            )}
          </Panel>
        ))}
      </div>
    </>
  );
}
