import { NextResponse } from 'next/server';
import { FALLBACK_FEATURED_EVENTS } from '@/constants/landing';

export async function GET() {
  return NextResponse.json(
    {
      data: FALLBACK_FEATURED_EVENTS,
      updatedAt: new Date().toISOString(),
    },
    { status: 200 }
  );
}