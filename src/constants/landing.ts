import { BazaarEvent } from '@/types/event';
import {
  AccordionFeatureItem,
  EoStepItem,
  HeroContent,
  TrustPillarItem,
  WatermarkPosition,
} from '@/types/landing';
import { APP_ROUTES } from './routes';

export const HERO_CONTENT: HeroContent = {
  badge: 'Find · Match · Grow',
  titleHighlight: 'Temukan Lapak,',
  titleMain: 'Temui Panggungnya!',
  subtitleBold: 'Tempat UMKM dan penyelenggara bazar saling bertemu',
  description:
    'Ceritakan usahamu sekali saja. Sisanya kami bantu carikan event yang cocok dengan produk, kota, dan tema yang kamu bawa.',
  primaryCta: { label: 'Cari Event', href: APP_ROUTES.EVENT_SECTION },
  secondaryCta: { label: 'Cari UMKM', href: APP_ROUTES.EO_SECTION },
  tickerHeader: 'Rekomendasi untukmu',
  tickerFooter: 'TemuLapak · Toko digital UMKM',
};

export const FALLBACK_FEATURED_EVENTS: BazaarEvent[] = [
  {
    id: 'evt-1',
    slug: 'pasar-rasa-nusantara-jogja',
    title: 'Pasar Rasa Nusantara',
    theme: 'Kuliner',
    city: 'Yogyakarta',
    dateLabel: '12–14 Des 2026',
    boothPriceFormatted: 'Rp 1.250.000',
    remainingQuota: 8,
    cardAccentHex: '#0F766E',
    rotationDeg: -4,
  },
  {
    id: 'evt-2',
    slug: 'lokal-wardrobe-week-bandung',
    title: 'Lokal Wardrobe Week',
    theme: 'Fashion',
    city: 'Bandung',
    dateLabel: '19–21 Des 2026',
    boothPriceFormatted: 'Rp 1.750.000',
    remainingQuota: 5,
    cardAccentHex: '#F97316',
    rotationDeg: 4,
  },
  {
    id: 'evt-3',
    slug: 'pesta-kriya-senayan-jakarta',
    title: 'Pesta Kriya & Keramik',
    theme: 'Kriya',
    city: 'Jakarta',
    dateLabel: '26–28 Des 2026',
    boothPriceFormatted: 'Rp 1.500.000',
    remainingQuota: 11,
    cardAccentHex: '#FDBA74',
    rotationDeg: 0,
  },
];

export const BAZAAR_SHOWCASE_CONTENT = {
  headingAccent: 'Event yang',
  headingMain: 'cocok untukmu',
  ctaLabel: 'Mulai Jelajah',
  ctaHref: APP_ROUTES.EVENTS,
} as const;

export const BAZAAR_ACCORDION_ITEMS: AccordionFeatureItem[] = [
  {
    id: 'explore-events',
    title: 'Jelajahi event',
    description:
      'Telusuri bazar di berbagai kota, lengkap dengan jadwal, tema, dan harga booth.',
    variant: 'c1',
    defaultOpen: true,
  },
  {
    id: 'filter-needs',
    title: 'Saring sesuai kebutuhan',
    description:
      'Pilih kota, tanggal, atau tema, lalu lihat hanya acara yang relevan buat dagangan kamu.',
    variant: 'c2',
  },
  {
    id: 'track-status',
    title: 'Pantau pendaftaran',
    description:
      'Menunggu persetujuan, siap bayar, sampai lunas: semua status terlihat di satu layar.',
    variant: 'c3',
  },
];

export const EO_SECTION_CONTENT = {
  headingAccent: 'Isi booth',
  headingMain: 'dengan UMKM terbaik',
  description:
    'Punya bazar atau pameran? Pasang detailnya, lihat siapa saja yang tertarik, dan pilih UMKM yang membuat acaramu makin hidup.',
  ctaLabel: 'Pasang Event',
  ctaHref: APP_ROUTES.HOST_EVENT,
} as const;

export const EO_STEPS: EoStepItem[] = [
  {
    stepNumber: 1,
    title: 'Buat event',
    description:
      'Isi tanggal, lokasi, harga, dan jumlah booth, lalu unggah banner acaramu.',
    awningVariant: 'teal',
    offsetTopPx: 0,
  },
  {
    stepNumber: 2,
    title: 'Pilih UMKM',
    description:
      'Lihat profil dan produk pendaftar, lalu setujui yang paling pas dengan tema acara.',
    awningVariant: 'orange',
    offsetTopPx: 28,
  },
  {
    stepNumber: 3,
    title: 'Cek pembayaran',
    description:
      'Pantau siapa saja yang sudah melunasi booth tanpa rekap manual.',
    awningVariant: 'teal',
    offsetTopPx: 0,
  },
];

export const TRUST_SECTION_CONTENT = {
  headingPrefix: 'Serius soal',
  headingAccent: 'kepercayaan',
} as const;

export const TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: 'verified-profile',
    title: 'Profil terverifikasi',
    description:
      'Admin memeriksa identitas UMKM dan EO sebelum badge terverifikasi dipasang.',
    iconType: 'shield',
  },
  {
    id: 'clear-payment',
    title: 'Bayar jelas, refund jelas',
    description:
      'Nominal, tenggat, dan aturan pengembalian dana tertulis sejak awal.',
    iconType: 'payment',
  },
  {
    id: 'written-mou',
    title: 'Kesepakatan tertulis',
    description: 'MoU melindungi UMKM sekaligus penyelenggara acara.',
    iconType: 'document',
  },
];

export const BOTTOM_CTA_CONTENT = {
  title: 'Lapakmu siap buka hari ini',
  description:
    'Daftar gratis, lengkapi profil, dan biarkan event yang tepat menghampiri.',
  ctaLabel: 'Daftar Gratis',
  ctaHref: APP_ROUTES.REGISTER,
} as const;

export const BAZAAR_WATERMARKS: WatermarkPosition[] = [
  { id: 'wm-1', left: '3%', top: '8%', sizePx: 70, rotateDeg: -12 },
  { id: 'wm-2', left: '22%', top: '70%', sizePx: 56, rotateDeg: 10 },
  { id: 'wm-3', left: '42%', top: '6%', sizePx: 60, rotateDeg: 8 },
  { id: 'wm-4', left: '48%', top: '78%', sizePx: 80, rotateDeg: -8 },
  { id: 'wm-5', left: '66%', top: '4%', sizePx: 72, rotateDeg: -15 },
  { id: 'wm-6', left: '90%', top: '12%', sizePx: 64, rotateDeg: 14 },
  { id: 'wm-7', left: '92%', top: '72%', sizePx: 78, rotateDeg: -6 },
  { id: 'wm-8', left: '8%', top: '88%', sizePx: 50, rotateDeg: 6 },
];