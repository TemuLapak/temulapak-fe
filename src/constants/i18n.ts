import { LocaleOption, SupportedLocale } from '@/types/i18n';

export const DEFAULT_LOCALE: SupportedLocale = 'id';

export const LOCALE_STORAGE_KEY = 'temulapak_locale';

export const INTERNAL_TRANSLATE_ENDPOINT = '/api/translate';

export const SUPPORTED_LOCALES: readonly LocaleOption[] = [
  {
    code: 'id',
    shortLabel: 'ID',
    fullLabel: 'Bahasa Indonesia',
    ariaLabel: 'Ubah bahasa ke Bahasa Indonesia',
  },
  {
    code: 'en',
    shortLabel: 'EN',
    fullLabel: 'English',
    ariaLabel: 'Switch language to English',
  },
] as const;

export const UI_TERM_OVERRIDES: Partial<
  Record<SupportedLocale, Record<string, string>>
> = {
  en: {
    Masuk: 'Sign In',
    Keluar: 'Log Out',
    Beranda: 'Home',
    'Jelajah Event': 'Explore Events',
    'Pasang Event': 'Host an Event',
    Keamanan: 'Safety & Trust',
    'Dashboard Lapak': 'Booth Dashboard',
    sisa: 'left',
    'Masuk Sekarang': 'Sign In Now',
    'Daftar Gratis': 'Sign Up Free',
    'Masuk di sini': 'Sign in here',
    'Kembali ke Halaman Masuk': 'Back to Sign In',
  },
};

export const GOOGLE_TRANSLATE_CONFIG = {
  CLOUD_V2_API_URL: 'https://translation.googleapis.com/language/translate/v2',
  GTX_API_URL: 'https://translate.googleapis.com/translate_a/single',
  GTX_CLIENT: 'gtx',
  FORMAT: 'text',
  MAX_BATCH_SIZE: 50,
} as const;

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === 'string' &&
    SUPPORTED_LOCALES.some((item) => item.code === value)
  );
}