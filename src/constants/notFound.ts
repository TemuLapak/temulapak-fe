import { APP_ROUTES } from './routes';

export interface NotFoundWatermarkItem {
  id: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  sizePx: number;
  rotateDeg: number;
}

export const NOT_FOUND_CONTENT = {
  title: '404 — Lapak Kosong',
  description:
    'Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.',
  ctaLabel: 'Kembali ke Beranda',
  ctaHref: APP_ROUTES.HOME,
} as const;

export const NOT_FOUND_WATERMARKS: readonly NotFoundWatermarkItem[] = [
  { id: 'wm-1', top: '8%', left: '6%', sizePx: 84, rotateDeg: -18 },
  { id: 'wm-2', top: '14%', right: '9%', sizePx: 112, rotateDeg: 22 },
  { id: 'wm-3', top: '46%', left: '14%', sizePx: 62, rotateDeg: 14 },
  { id: 'wm-4', top: '52%', right: '16%', sizePx: 74, rotateDeg: -24 },
  { id: 'wm-5', bottom: '12%', left: '8%', sizePx: 104, rotateDeg: 26 },
  { id: 'wm-6', bottom: '10%', right: '7%', sizePx: 92, rotateDeg: -15 },
  { id: 'wm-7', top: '22%', left: '44%', sizePx: 56, rotateDeg: -12 },
] as const;