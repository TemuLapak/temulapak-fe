'use client';

import { SUPPORTED_LOCALES } from '@/constants/i18n';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
  const { locale, isTranslating, dictionary, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label={dictionary.nav.switcherAriaLabel}
      className="inline-flex items-center rounded-full border-2 border-[#1F2937] bg-[#FFF7ED] p-0.5"
    >
      {SUPPORTED_LOCALES.map((option) => {
        const isActive = locale === option.code;

        return (
          <button
            key={option.code}
            type="button"
            disabled={isTranslating}
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            onClick={() => void setLocale(option.code)}
            className={`min-h-[34px] px-3 rounded-full text-xs font-extrabold tracking-wide transition-colors cursor-pointer disabled:opacity-60 ${
              isActive
                ? 'bg-[#0F766E] text-white'
                : 'text-[#1F2937] hover:text-[#0F766E]'
            }`}
          >
            {isTranslating && !isActive ? '...' : option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}