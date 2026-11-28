'use client';

import { useState } from 'react';
import { AccordionColorVariant, AccordionFeatureItem } from '@/types/landing';

interface BazaarAccordionProps {
  items: AccordionFeatureItem[];
}

const OPEN_VARIANT_STYLES: Record<AccordionColorVariant, string> = {
  c1: 'bg-[#F97316] text-[#1F2937]',
  c2: 'bg-[#0F766E] text-white',
  c3: 'bg-[#FDBA74] text-[#1F2937]',
};

export function BazaarAccordion({ items }: BazaarAccordionProps) {
  const initialOpen =
    items.find((item) => item.defaultOpen)?.id ?? items[0]?.id ?? '';
  const [openId, setOpenId] = useState<string>(initialOpen);

  return (
    <div>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-[16px] mb-3 overflow-hidden transition-colors ${
              isOpen ? OPEN_VARIANT_STYLES[item.variant] : 'bg-[#F3F4F6]'
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(item.id)}
              className="w-full flex justify-between items-center min-h-[56px] px-[22px] font-bold text-left cursor-pointer"
            >
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                className={`w-[9px] h-[9px] border-r-2 border-b-2 border-current transition-transform duration-200 ${
                  isOpen ? '-rotate-[135deg]' : 'rotate-45'
                }`}
              />
            </button>
            {isOpen && (
              <p className="m-0 px-[22px] pb-5 text-[15px] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}