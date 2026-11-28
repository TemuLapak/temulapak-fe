import type { MetadataRoute } from 'next';
import { BRAND_INFO } from '@/constants/navigation';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_INFO.name,
    short_name: BRAND_INFO.name,
    description: BRAND_INFO.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFBF2',
    theme_color: '#0F766E',
  };
}