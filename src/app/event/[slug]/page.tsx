import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ActionButton } from '@/components/ui/actionbutton';
import { Chip } from '@/components/ui/chip';
import { APP_ROUTES } from '@/constants/routes';
import { getEventBySlug, getFeaturedEvents } from '@/lib/api/events';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getFeaturedEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Event Tidak Ditemukan' };

  return {
    title: `${event.title} (${event.city})`,
    description: `Bazar ${event.theme} di ${event.city} pada ${event.dateLabel}. Booth mulai ${event.boothPriceFormatted}.`,
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <section className="py-16">
      <div className="tl-wrap max-w-[760px]">
        <div className="tl-card-shadow border-2 border-[#1F2937] p-8">
          <Chip>{event.theme}</Chip>
          <h1 className="text-3xl font-extrabold mt-3 mb-2">{event.title}</h1>
          <p className="text-[#4B5563] mb-6">
            {event.city} · {event.dateLabel} · Sisa {event.remainingQuota} booth
          </p>
          <p className="text-xl font-extrabold text-[#0F766E] mb-6">
            Biaya Booth: {event.boothPriceFormatted}
          </p>
          <ActionButton href={APP_ROUTES.HOME} variant="teal">
            Kembali ke Beranda
          </ActionButton>
        </div>
      </div>
    </section>
  );
}