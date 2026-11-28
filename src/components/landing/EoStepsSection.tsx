'use client';

import { ActionButton } from '@/components/ui/actionbutton';
import { AwningBanner } from '@/components/ui/awningbanner';
import { EO_SECTION_CONTENT, EO_STEPS } from '@/constants/landing';
import { useLanguage } from '@/context/LanguageContext';

export function EoStepsSection() {
  const { dictionary } = useLanguage();
  const { eoSection } = dictionary;

  return (
    <section id="eo" className="py-20">
      <div className="tl-wrap">
        <div className="tl-fade-in flex justify-between items-end gap-6 flex-wrap mb-11">
          <div className="max-w-[560px]">
            <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.2] mb-3">
              <span className="text-[#0F766E]">{eoSection.headingAccent}</span>{' '}
              {eoSection.headingMain}
            </h2>
            <p className="m-0 text-[#374151] text-[18px]">
              {eoSection.description}
            </p>
          </div>
          <ActionButton href={EO_SECTION_CONTENT.ctaHref} variant="orange">
            {eoSection.ctaLabel}
          </ActionButton>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7 items-start">
          {EO_STEPS.map((step) => {
            const localizedStep = eoSection.steps.find(
              (item) => item.stepNumber === step.stepNumber
            );

            return (
              <article
                key={step.stepNumber}
                style={{ marginTop: `${step.offsetTopPx}px` }}
                className="tl-card-shadow tl-fade-in overflow-hidden"
              >
                <AwningBanner
                  flapCount={9}
                  size="sm"
                  colorScheme={step.awningVariant}
                />
                <div className="pt-5 px-6 pb-7">
                  <span className="w-[38px] h-[38px] rounded-full border-2 border-[#0F766E] text-[#0F766E] grid place-items-center font-extrabold">
                    {step.stepNumber}
                  </span>
                  <strong className="block text-[20px] font-extrabold mt-3">
                    {localizedStep?.title ?? step.title}
                  </strong>
                  <p className="mt-1.5 mb-0 text-[#4B5563]">
                    {localizedStep?.description ?? step.description}
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