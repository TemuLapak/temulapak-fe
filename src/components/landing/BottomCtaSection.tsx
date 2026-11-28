'use client';

import { ActionButton } from '@/components/ui/actionbutton';
import { AwningBanner } from '@/components/ui/awningbanner';
import { BOTTOM_CTA_CONTENT } from '@/constants/landing';
import { useLanguage } from '@/context/LanguageContext';

export function BottomCtaSection() {
  const { dictionary } = useLanguage();
  const { bottomCta } = dictionary;

  return (
    <section className="py-20">
      <div className="tl-wrap">
        <div className="tl-card-shadow overflow-hidden text-center border-2 border-[#1F2937]">
          <AwningBanner flapCount={8} size="cta" colorScheme="teal" />

          <div className="pt-10 px-6 pb-[52px]">
            <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.2] mb-3">
              {bottomCta.title}
            </h2>
            <p className="mx-auto mb-6 max-w-[480px] text-[#374151]">
              {bottomCta.description}
            </p>
            <ActionButton href={BOTTOM_CTA_CONTENT.ctaHref} variant="orange">
              {bottomCta.ctaLabel}
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}