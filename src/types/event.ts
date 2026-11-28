export type EventTheme = 'Kuliner' | 'Fashion' | 'Kriya' | 'Kopi & Minuman';

export interface BazaarEvent {
  id: string;
  slug: string;
  title: string;
  theme: EventTheme;
  city: string;
  dateLabel: string;
  boothPriceFormatted: string;
  remainingQuota: number;
  cardAccentHex: string;
  rotationDeg: number;
}