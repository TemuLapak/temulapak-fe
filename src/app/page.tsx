import { Suspense } from 'react';
import { BazaarShowcaseSection } from '@/components/landing/BazaarShowcaseSection';
import { BottomCtaSection } from '@/components/landing/BottomCtaSection';
import { EoStepsSection } from '@/components/landing/EoStepsSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustSection } from '@/components/landing/TrustSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div className="tl-wrap py-16">Memuat bazar pilihan...</div>}>
        <BazaarShowcaseSection />
      </Suspense>
      <EoStepsSection />
      <TrustSection />
      <BottomCtaSection />
    </>
  );
}