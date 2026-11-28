import {
  AuthDictionary,
  AuthWatermarkItem,
  SelectableRegisterRole,
  UserRole,
} from '@/types/auth';

export const AUTH_API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
} as const;

export const AUTH_STORAGE_KEYS = {
  USER: 'temulapak_user',
  ACCESS_TOKEN: 'temulapak_access_token',
  REFRESH_TOKEN: 'temulapak_refresh_token',
} as const;

export const AUTH_VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const DEFAULT_REGISTER_ROLE: SelectableRegisterRole = 'msme';

export const VALID_USER_ROLES: readonly UserRole[] = [
  'admin',
  'msme',
  'eo',
] as const;

export const AUTH_WATERMARKS: readonly AuthWatermarkItem[] = [
  { id: 'auth-wm-1', top: '8%', left: '4%', sizePx: 88, rotateDeg: -16 },
  { id: 'auth-wm-2', top: '14%', right: '5%', sizePx: 110, rotateDeg: 20 },
  { id: 'auth-wm-3', bottom: '10%', left: '6%', sizePx: 96, rotateDeg: 18 },
  { id: 'auth-wm-4', bottom: '8%', right: '5%', sizePx: 82, rotateDeg: -22 },
];

export const DEFAULT_AUTH_DICTIONARY: AuthDictionary = {
  shared: {
    emailLabel: 'Alamat Email',
    emailPlaceholder: 'umkm@temulapak.id',
    passwordLabel: 'Kata Sandi',
    passwordPlaceholder: 'Minimal 8 karakter',
    showPasswordLabel: 'Tampilkan kata sandi',
    hidePasswordLabel: 'Sembunyikan kata sandi',
    processingLabel: 'Memproses...',
    backToHomeLabel: 'Kembali ke Beranda',
  },
  login: {
    badge: 'Selamat Datang Kembali',
    titleHighlight: 'Masuk',
    titleMain: 'ke Lapakmu',
    subtitle:
      'Kelola pengajuan booth bazar, pantau jadwal event, dan transaksi aman dalam satu tempat.',
    forgotPasswordLink: 'Lupa kata sandi?',
    submitButton: 'Masuk Sekarang',
    noAccountPrompt: 'Belum punya akun TemuLapak?',
    registerLink: 'Daftar Gratis',
  },
  register: {
    badge: 'Mulai Perjalanan Bazarmu',
    titleHighlight: 'Daftar',
    titleMain: 'Akun Baru',
    subtitle:
      'Pilih peranmu dan terhubung langsung dengan ekosistem bazar terkurasi.',
    roleSectionLabel: 'Daftar Sebagai',
    roles: [
      {
        value: 'msme',
        badge: 'UMKM / Tenant',
        title: 'Pelaku Usaha',
        description: 'Cari event bazar dan ajukan sewa booth untuk produkmu.',
      },
      {
        value: 'eo',
        badge: 'Event Organizer',
        title: 'Penyelenggara',
        description: 'Publikasikan event bazar dan kelola kurasi tenant.',
      },
    ],
    nameLabel: 'Nama Lengkap / Nama Brand',
    namePlaceholder: 'Contoh: Hanifatul Nadiva',
    phoneLabel: 'Nomor WhatsApp',
    phoneOptionalHint: 'Opsional',
    phonePlaceholder: '081234567890',
    confirmPasswordLabel: 'Konfirmasi Kata Sandi',
    confirmPasswordPlaceholder: 'Ulangi kata sandi',
    passwordHint: 'Gunakan minimal 8 karakter kombinasi huruf dan angka.',
    submitButton: 'Buat Akun TemuLapak',
    hasAccountPrompt: 'Sudah punya akun?',
    loginLink: 'Masuk di sini',
    successMessage: 'Akun berhasil dibuat! Mengarahkan ke halaman utama...',
  },
  forgotPassword: {
    badge: 'Pemulihan Akun',
    titleHighlight: 'Lupa',
    titleMain: 'Kata Sandi?',
    subtitle:
      'Masukkan email terdaftar akunmu. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.',
    submitButton: 'Kirim Tautan Pemulihan',
    backToLoginLink: 'Kembali ke Halaman Masuk',
    successTitle: 'Tautan Terkirim!',
    successDescription:
      'Silakan periksa kotak masuk atau folder spam email kamu untuk melanjutkan pengaturan ulang kata sandi.',
  },
  validation: {
    emailRequired: 'Alamat email wajib diisi.',
    emailInvalid: 'Format alamat email tidak valid.',
    passwordRequired: 'Kata sandi wajib diisi.',
    passwordMinLength: 'Kata sandi minimal 8 karakter.',
    nameRequired: 'Nama lengkap wajib diisi.',
    confirmPasswordMismatch: 'Konfirmasi kata sandi tidak cocok.',
    genericError: 'Terjadi kesalahan saat menghubungi server. Coba lagi.',
  },
};