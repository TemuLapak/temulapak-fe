import { FALLBACK_FEATURED_EVENTS } from '@/constants/landing';
import { BazaarEvent } from '@/types/event';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFeaturedEvents(): Promise<BazaarEvent[]> {
  if (!API_BASE_URL) {
    return FALLBACK_FEATURED_EVENTS;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/events/featured`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return FALLBACK_FEATURED_EVENTS;
    }

    const payload = (await response.json()) as { data?: BazaarEvent[] };
    return payload.data && payload.data.length > 0
      ? payload.data
      : FALLBACK_FEATURED_EVENTS;
  } catch {
    return FALLBACK_FEATURED_EVENTS;
  }
}

export async function getEventBySlug(
  slug: string
): Promise<BazaarEvent | null> {
  const events = await getFeaturedEvents();
  return events.find((item) => item.slug === slug) ?? null;
}