'use client';

import { AwningBanner } from '@/components/ui/awningbanner';
import { TRUST_PILLARS } from '@/constants/landing';
import { useLanguage } from '@/context/LanguageContext';
import { TrustPillarItem } from '@/types/landing';

function TrustIcon({ type }: { type: TrustPillarItem['iconType'] }) {
  if (type === 'shield') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (type === 'payment') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M10 12h6M10 16h6" />
    </svg>
  );
}

export function TrustSection() {
  const { dictionary } = useLanguage();
  const { trustSection } = dictionary;

  return (
    <section
      id="aman"
      className="bg-[#FFEDD5] py-20 border-t-2 border-b-2 border-[#1F2937]"
    >
      <div className="tl-wrap">
        <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.2] text-center mb-9">
          {trustSection.headingPrefix}{' '}
          <span className="text-[#0F766E]">{trustSection.headingAccent}</span>
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
          {TRUST_PILLARS.map((pillar) => {
            const localizedPillar = trustSection.pillars.find(
              (item) => item.id === pillar.id
            );

            return (
              <article key={pillar.id} className="tl-card-shadow overflow-hidden">
                <AwningBanner flapCount={10} size="sm" colorScheme="teal" />
                <div className="pt-[22px] px-[26px] pb-[30px]">
                  <div className="w-12 h-12 rounded-full bg-[#CCFBF1] grid place-items-center mb-[14px]">
                    <TrustIcon type={pillar.iconType} />
                  </div>
                  <strong className="text-[20px] font-extrabold">
                    {localizedPillar?.title ?? pillar.title}
                  </strong>
                  <p className="mt-1.5 mb-0 text-[#4B5563]">
                    {localizedPillar?.description ?? pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}