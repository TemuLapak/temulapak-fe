'use client';

import Link from 'next/link';
import { BRAND_INFO, FOOTER_LINKS } from '@/constants/navigation';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { dictionary } = useLanguage();

  return (
    <footer className="mt-auto relative z-10 border-t-2 border-[#1F2937] py-7 bg-white text-center">
      <strong className="text-[#1F2937] font-extrabold">
        {BRAND_INFO.name}
      </strong>
      <nav
        aria-label="Navigasi Footer"
        className="text-[14px] text-[#4B5563] mt-1 flex items-center justify-center gap-2 flex-wrap"
      >
        {FOOTER_LINKS.map((link, index) => {
          const translatedLabel =
            dictionary.footer.links.find((item) => item.id === link.id)
              ?.label ?? link.label;

          return (
            <span key={link.id} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              <Link
                href={link.href}
                className="text-[#4B5563] hover:text-[#0F766E] no-underline"
              >
                {translatedLabel}
              </Link>
            </span>
          );
        })}
      </nav>
    </footer>
  );
}