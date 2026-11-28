import { ActionButton } from '@/components/ui/actionbutton';
import { BrandLogo } from '@/components/ui/brandlogo';
import {
  NOT_FOUND_CONTENT,
  NOT_FOUND_WATERMARKS,
} from '@/constants/notFound';

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-16">
      {NOT_FOUND_WATERMARKS.map((wm) => (
        <div
          key={wm.id}
          aria-hidden="true"
          style={{
            top: wm.top,
            bottom: wm.bottom,
            left: wm.left,
            right: wm.right,
            transform: `rotate(${wm.rotateDeg}deg)`,
          }}
          className="absolute opacity-[0.10] pointer-events-none select-none"
        >
          <BrandLogo size={wm.sizePx} />
        </div>
      ))}

      <div className="tl-card-shadow relative z-10 bg-white border-2 border-[#1F2937] p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold mb-2">
          {NOT_FOUND_CONTENT.title}
        </h2>
        <p className="text-[#4B5563] mb-6">
          {NOT_FOUND_CONTENT.description}
        </p>
        <ActionButton href={NOT_FOUND_CONTENT.ctaHref} variant="teal">
          {NOT_FOUND_CONTENT.ctaLabel}
        </ActionButton>
      </div>
    </section>
  );
}