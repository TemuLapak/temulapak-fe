import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  className?: string;
}

export function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-block px-3 py-[3px] rounded-full bg-[#FFEDD5] text-[#7C2D12] text-[13px] font-bold ${className}`.trim()}
    >
      {children}
    </span>
  );
}