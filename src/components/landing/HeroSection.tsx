'use client';

import { ActionButton } from '@/components/ui/actionbutton';
import { AwningBanner } from '@/components/ui/awningbanner';
import { Chip } from '@/components/ui/chip';
import { SparkleStar } from '@/components/ui/sparklestar';
import { WaveDivider } from '@/components/ui/wavedivider';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { dictionary, translatedEvents } = useLanguage();
  const { hero } = dictionary;

  const tickerItems =
    translatedEvents.length > 0
      ? [...translatedEvents.slice(0, 3), translatedEvents[0]]
      : [];

  return (
    <section className="pt-14 overflow-hidden">
      <div className="tl-wrap grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12 items-center">
        <div>
          <Chip className="tl-fade-in">{hero.badge}</Chip>

          <h1
            style={{ animationDelay: '0.1s' }}
            className="tl-fade-in text-[clamp(38px,5.6vw,64px)] leading-[1.06] font-extrabold mt-[18px] mb-4"
          >
            <span className="text-[#0F766E]">{hero.titleHighlight}</span>
            <br />
            {hero.titleMain}
          </h1>

          <p
            style={{ animationDelay: '0.25s' }}
            className="tl-fade-in text-[20px] font-bold mb-2.5"
          >
            {hero.subtitleBold}
          </p>

          <p
            style={{ animationDelay: '0.4s' }}
            className="tl-fade-in max-w-[480px] text-[17px] text-[#374151] mb-[26px]"
          >
            {hero.description}
          </p>

          <div
            style={{ animationDelay: '0.55s' }}
            className="tl-fade-in flex gap-[14px] flex-wrap"
          >
            <ActionButton href={hero.primaryCta.href} variant="orange">
              {hero.primaryCta.label}
            </ActionButton>
            <ActionButton href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ActionButton>
          </div>
        </div>

        <div
          style={{ animationDelay: '0.3s' }}
          className="tl-fade-in relative max-w-[420px] w-full justify-self-center"
        >
          <SparkleStar
            size={34}
            fill="#FDBA74"
            className="absolute -left-[18px] top-[40px]"
          />
          <SparkleStar
            size={28}
            fill="#5EEAD4"
            className="absolute left-[92%] -top-[14px]"
          />
          <SparkleStar
            size={22}
            fill="#FDBA74"
            className="absolute left-[96%] top-[62%]"
          />

          <div className="border-2 border-[#1F2937] rounded-[26px] overflow-hidden bg-[#F97316] shadow-[0_18px_40px_rgba(31,41,55,0.18)]">
            <AwningBanner flapCount={9} size="sm" colorScheme="teal" />

            <div className="pt-4 px-[22px] pb-[26px]">
              <div className="bg-white border-2 border-[#1F2937] rounded-[18px] pt-[14px] px-[18px] pb-2.5">
                <div className="text-[13px] font-extrabold tracking-[0.06em] uppercase text-[#0F766E] mb-1.5">
                  {hero.tickerHeader}
                </div>

                <div className="tl-ticker-viewport">
                  <div className="tl-ticker-track">
                    {tickerItems.map((event, index) => (
                      <div
                        key={`${event.id}-${index}`}
                        className="tl-ticker-item"
                      >
                        <Chip className="self-start">{event.theme}</Chip>
                        <strong className="text-[18px] text-[#1F2937] truncate">
                          {event.title}
                        </strong>
                        <small className="text-[#4B5563]">
                          {event.city} · {event.dateLabel}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center font-extrabold text-[14px] tracking-[0.08em] uppercase text-[#1F2937]">
                {hero.tickerFooter}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}