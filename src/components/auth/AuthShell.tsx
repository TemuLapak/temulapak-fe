import { ReactNode } from 'react';
import { AwningBanner } from '@/components/ui/awningbanner';
import { BrandLogo } from '@/components/ui/brandlogo';
import { Chip } from '@/components/ui/chip';
import { SparkleStar } from '@/components/ui/sparklestar';
import { AUTH_WATERMARKS } from '@/constants/auth';

interface AuthShellProps {
  badge: string;
  titleHighlight: string;
  titleMain: string;
  subtitle: string;
  awningScheme?: 'teal' | 'orange';
  maxWidthClass?: string;
  children: ReactNode;
}

export function AuthShell({
  badge,
  titleHighlight,
  titleMain,
  subtitle,
  awningScheme = 'teal',
  maxWidthClass = 'max-w-[480px]',
  children,
}: AuthShellProps) {
  return (
    <section className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-12">
      {AUTH_WATERMARKS.map((wm) => (
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

      <div className={`relative z-10 w-full ${maxWidthClass}`}>
        <SparkleStar
          size={30}
          fill="#FDBA74"
          className="absolute -left-4 -top-4 pointer-events-none"
        />
        <SparkleStar
          size={24}
          fill="#5EEAD4"
          className="absolute -right-3 top-14 pointer-events-none"
        />

        <div className="tl-card-shadow tl-fade-in overflow-hidden bg-white border-2 border-[#1F2937]">
          <AwningBanner flapCount={10} size="sm" colorScheme={awningScheme} />

          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <Chip>{badge}</Chip>
              <h1 className="text-[clamp(26px,4vw,34px)] font-extrabold leading-[1.15] text-[#1F2937] mt-3 mb-2">
                <span className="text-[#0F766E]">{titleHighlight}</span>{' '}
                {titleMain}
              </h1>
              <p className="text-[14px] sm:text-[15px] text-[#4B5563] m-0">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}