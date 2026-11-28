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

export const GOOGLE_TRANSLATE_CONFIG = {
  DEFAULT_API_URL: 'https://translation.googleapis.com/language/translate/v2',
  FORMAT: 'text',
  MAX_BATCH_SIZE: 50,
} as const;

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === 'string' &&
    SUPPORTED_LOCALES.some((item) => item.code === value)
  );
}