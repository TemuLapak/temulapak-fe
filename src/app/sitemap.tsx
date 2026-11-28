import type { MetadataRoute } from 'next';
import { FALLBACK_FEATURED_EVENTS } from '@/constants/landing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://temulapak.id';
  const eventEntries = FALLBACK_FEATURED_EVENTS.map((event) => ({
    url: `${baseUrl}/event/${event.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: baseUrl, lastModified: new Date() }, ...eventEntries];
}