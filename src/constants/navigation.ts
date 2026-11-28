import { FooterLink, NavItem } from '@/types/navigation';
import { APP_ROUTES } from './routes';

export const BRAND_INFO = {
  name: 'TemuLapak',
  tagline: 'Temukan Lapak, Temui Panggungnya!',
  description:
    'Platform kurasi yang mempertemukan UMKM dan penyelenggara bazar terverifikasi secara transparan.',
} as const;

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Beranda',
    href: APP_ROUTES.HOME,
    segment: null,
  },
  {
    id: 'explore',
    label: 'Jelajah Event',
    href: APP_ROUTES.EVENT_SECTION,
    segment: 'event',
  },
  {
    id: 'eo',
    label: 'Pasang Event',
    href: APP_ROUTES.EO_SECTION,
    segment: 'host-event',
  },
  {
    id: 'trust',
    label: 'Keamanan',
    href: APP_ROUTES.TRUST_SECTION,
    segment: 'aman',
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { id: 'refund', label: 'Refund dan MoU', href: APP_ROUTES.REFUND_MOU },
  { id: 'privacy', label: 'Kebijakan Privasi', href: APP_ROUTES.PRIVACY },
  { id: 'contact', label: 'Hubungi Kami', href: APP_ROUTES.CONTACT },
];