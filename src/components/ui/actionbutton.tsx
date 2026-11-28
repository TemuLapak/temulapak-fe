import Link from 'next/link';
import { ReactNode } from 'react';

interface ActionButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'orange' | 'teal' | 'outline';
  compact?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<ActionButtonProps['variant']>, string> = {
  orange: 'bg-[#F97316] text-[#1F2937] hover:bg-[#FB923C]',
  teal: 'bg-[#0F766E] text-white hover:bg-[#115E59]',
  outline:
    'bg-white border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#CCFBF1]/40',
};

export function ActionButton({
  href,
  children,
  variant = 'orange',
  compact = false,
  className = '',
}: ActionButtonProps) {
  const heightClass = compact ? 'min-h-[44px]' : 'min-h-[48px]';

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center ${heightClass} px-7 rounded-full font-bold no-underline transition-colors ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}