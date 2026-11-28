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
    'Masuk': 'Sign In',
    'ke Lapakmu': 'to Your Booth',
    'Daftar': 'Register',
    'Akun Baru': 'New Account',
    'Mulai Perjalanan Bazarmu': 'Start Your Bazaar Journey',
    'Daftar Sebagai': 'Register As',
    'UMKM / Tenant': 'MSME / Tenant',
    'Pelaku Usaha': 'Business Owner',
    'Penyelenggara': 'Event Organizer',
    'Buat Akun TemuLapak': 'Create TemuLapak Account',
    'Daftar Gratis': 'Register for Free',
    'Masuk di sini': 'Sign in here',
    'Masuk Sekarang': 'Sign In Now',
    'Masuk dengan Google': 'Sign in with Google',
    'Daftar dengan Google': 'Sign up with Google',
    'Menghubungkan ke Google...': 'Connecting to Google...',
    'atau lanjutkan dengan': 'or continue with',
    'Lupa kata sandi?': 'Forgot password?',
    'Atur Ulang': 'Reset',
    'Kata Sandi': 'Password',
    'Kata Sandi Baru': 'New Password',
    'Simpan Kata Sandi Baru': 'Save New Password',
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