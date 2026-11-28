import { AlertVariant } from '@/types/alert';

export const ALERT_CONFIG = {
  DEFAULT_DURATION_MS: 4500,
  MAX_VISIBLE_ALERTS: 4,
  REGION_ARIA_LABEL: 'Notifikasi Sistem',
  CLOSE_BUTTON_ARIA_LABEL: 'Tutup notifikasi',
} as const;

export interface AlertVariantTheme {
  accentBgClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  borderClass: string;
}

export const ALERT_VARIANT_THEMES: Record<AlertVariant, AlertVariantTheme> = {
  success: {
    accentBgClass: 'bg-[#0F766E]',
    badgeBgClass: 'bg-[#CCFBF1]',
    badgeTextClass: 'text-[#0F766E]',
    borderClass: 'border-[#1F2937]',
  },
  error: {
    accentBgClass: 'bg-[#DC2626]',
    badgeBgClass: 'bg-[#FEE2E2]',
    badgeTextClass: 'text-[#DC2626]',
    borderClass: 'border-[#1F2937]',
  },
  warning: {
    accentBgClass: 'bg-[#F97316]',
    badgeBgClass: 'bg-[#FFEDD5]',
    badgeTextClass: 'text-[#C2410C]',
    borderClass: 'border-[#1F2937]',
  },
  info: {
    accentBgClass: 'bg-[#0284C7]',
    badgeBgClass: 'bg-[#E0F2FE]',
    badgeTextClass: 'text-[#0369A1]',
    borderClass: 'border-[#1F2937]',
  },
};