import { Suspense } from 'react';
import { GoogleCallbackHandler } from '@/components/auth/GoogleCallbackHandler';

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <GoogleCallbackHandler />
    </Suspense>
  );
}