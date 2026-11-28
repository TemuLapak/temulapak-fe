'use client';

import { useEffect } from 'react';
import { ALERT_CONFIG, ALERT_VARIANT_THEMES } from '@/constants/alert';
import { AlertItem, AlertVariant } from '@/types/alert';

interface PopupAlertProps {
  alert: AlertItem;
  onDismiss: (id: string) => void;
}

function AlertVariantIcon({ variant }: { variant: AlertVariant }) {
  if (variant === 'success') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (variant === 'error') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }

  if (variant === 'warning') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function PopupAlert({ alert, onDismiss }: PopupAlertProps) {
  const theme = ALERT_VARIANT_THEMES[alert.variant];

  useEffect(() => {
    if (alert.durationMs <= 0) return;

    const timer = window.setTimeout(() => {
      onDismiss(alert.id);
    }, alert.durationMs);

    return () => window.clearTimeout(timer);
  }, [alert.id, alert.durationMs, onDismiss]);

  return (
    <div
      role={alert.variant === 'error' ? 'alert' : 'status'}
      aria-live={alert.variant === 'error' ? 'assertive' : 'polite'}
      className={`tl-fade-in pointer-events-auto overflow-hidden rounded-2xl bg-white border-2 ${theme.borderClass} shadow-[0_10px_0_#1F2937]`}
    >
      <div className={`h-1.5 w-full ${theme.accentBgClass}`} />

      <div className="p-4 flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-full shrink-0 grid place-items-center ${theme.badgeBgClass} ${theme.badgeTextClass}`}
        >
          <AlertVariantIcon variant={alert.variant} />
        </div>

        <div className="flex-1 min-w-0">
          {alert.title && (
            <strong className="block text-[14px] font-extrabold text-[#1F2937] mb-0.5">
              {alert.title}
            </strong>
          )}
          <p className="text-[13px] sm:text-[14px] font-semibold leading-snug text-[#374151] m-0 break-words">
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDismiss(alert.id)}
          aria-label={ALERT_CONFIG.CLOSE_BUTTON_ARIA_LABEL}
          className="w-7 h-7 rounded-full shrink-0 grid place-items-center text-[#6B7280] hover:text-[#1F2937] hover:bg-[#FFF7ED] transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface PopupAlertViewportProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

export function PopupAlertViewport({
  alerts,
  onDismiss,
}: PopupAlertViewportProps) {
  if (alerts.length === 0) return null;

  return (
    <div
      aria-label={ALERT_CONFIG.REGION_ARIA_LABEL}
      className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-[calc(100vw-2.5rem)] max-w-[400px] pointer-events-none"
    >
      {alerts.map((item) => (
        <PopupAlert key={item.id} alert={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
}