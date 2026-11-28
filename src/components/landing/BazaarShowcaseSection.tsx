'use client';

import { ActionButton } from '@/components/ui/actionbutton';
import { BrandLogo } from '@/components/ui/brandlogo';
import {
  BAZAAR_ACCORDION_ITEMS,
  BAZAAR_SHOWCASE_CONTENT,
  BAZAAR_WATERMARKS,
} from '@/constants/landing';
import { useLanguage } from '@/context/LanguageContext';
import { BazaarAccordion } from './BazaarAccordion';
import { EventPreviewStack } from './EventPreviewStack';

export function BazaarShowcaseSection() {
  const { dictionary, translatedEvents } = useLanguage();
  const { bazaarShowcase } = dictionary;

  const localizedAccordion = BAZAAR_ACCORDION_ITEMS.map((item) => {
    const translated = bazaarShowcase.accordion.find((t) => t.id === item.id);
    return translated
      ? { ...item, title: translated.title, description: translated.description }
      : item;
  });

  return (
    <section
      id="event"
      className="bg-white pt-10 pb-[88px] relative overflow-hidden"
    >
      {BAZAAR_WATERMARKS.map((wm) => (
        <div
          key={wm.id}
          aria-hidden="true"
          style={{
            left: wm.left,
            top: wm.top,
            transform: `rotate(${wm.rotateDeg}deg)`,
          }}
          className="absolute opacity-[0.12] pointer-events-none"
        >
          <BrandLogo size={wm.sizePx} />
        </div>
      ))}

      <div className="tl-wrap grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-14 items-center relative z-10">
        <EventPreviewStack events={translatedEvents} />

        <div className="tl-fade-in">
          <h2 className="text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.2] mb-7">
            <span className="text-[#C2410C]">
              {bazaarShowcase.headingAccent}
            </span>
            <br />
            {bazaarShowcase.headingMain}
          </h2>

          <BazaarAccordion items={localizedAccordion} />

          <ActionButton
            href={BAZAAR_SHOWCASE_CONTENT.ctaHref}
            variant="orange"
            className="mt-5"
          >
            {bazaarShowcase.ctaLabel}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}