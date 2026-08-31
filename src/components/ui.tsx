import type { ReactNode } from 'react';
import { classnames } from '../lib/storage';

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={classnames('progress-track', className)}>
      <div className="progress-bar" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Avatar({ emoji, size = 40, ring }: { emoji: string; size?: number; ring?: boolean }) {
  return (
    <span
      className={classnames(
        'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200',
        ring && 'ring-2 ring-brand-300 ring-offset-2',
      )}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {emoji}
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-ink-600">{label}</div>
        <div className="text-lg font-bold text-ink-900 leading-tight">{value}</div>
        {hint && <div className="text-[11px] text-ink-600">{hint}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, hint, action }: { icon: string; title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="card p-10 text-center">
      <div className="text-5xl mb-3 animate-floaty">{icon}</div>
      <div className="text-base font-semibold text-ink-800">{title}</div>
      {hint && <div className="text-sm text-ink-600 mt-1">{hint}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card w-full max-w-lg p-5 animate-pop max-h-[90vh] overflow-auto">
        {title && <div className="text-lg font-bold mb-3">{title}</div>}
        <div>{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-pop">
      <div className="card px-4 py-2.5 flex items-center gap-2 bg-ink-900 text-white border-ink-700">
        <span>🎉</span>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">✕</button>
      </div>
    </div>
  );
}

export function Pill({ children, tone = 'brand' }: { children: ReactNode; tone?: 'brand' | 'accent' | 'gray' }) {
  const toneMap = {
    brand: 'bg-brand-50 text-brand-700',
    accent: 'bg-accent-400/20 text-accent-600',
    gray: 'bg-slate-100 text-ink-700',
  };
  return <span className={classnames('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', toneMap[tone])}>{children}</span>;
}
