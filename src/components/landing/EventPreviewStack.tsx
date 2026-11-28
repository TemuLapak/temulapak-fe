import Link from 'next/link';
import { Chip } from '@/components/ui/chip';
import { BazaarEvent } from '@/types/event';

interface EventPreviewStackProps {
  events: BazaarEvent[];
}

const CARD_POSITIONS = [
  'top-0 left-0 w-[250px]',
  'top-[60px] right-0 w-[250px]',
  'top-[180px] left-[40px] w-[260px]',
] as const;

export function EventPreviewStack({ events }: EventPreviewStackProps) {
  const visibleEvents = events.slice(0, 3);

  return (
    <div className="tl-fade-in relative min-h-[340px]">
      {visibleEvents.map((event, index) => {
        const isLastCard = index === visibleEvents.length - 1;

        return (
          <Link
            key={event.id}
            href={`/event/${event.slug}`}
            style={{ transform: `rotate(${event.rotationDeg}deg)` }}
            className={`tl-card-shadow absolute p-[14px] no-underline text-[#1F2937] transition-transform hover:scale-[1.03] hover:z-20 ${
              CARD_POSITIONS[index] ?? CARD_POSITIONS[0]
            }`}
          >
            <div
              className="h-[90px] rounded-[12px]"
              style={{ backgroundColor: event.cardAccentHex }}
            />
            <Chip className="mt-2.5">{event.theme}</Chip>
            <strong className="block mt-1 font-extrabold">{event.title}</strong>
            <small className="text-[#4B5563]">
              {isLastCard
                ? `Booth ${event.boothPriceFormatted} · sisa ${event.remainingQuota}`
                : `${event.city} · ${event.dateLabel}`}
            </small>
          </Link>
        );
      })}
    </div>
  );
}