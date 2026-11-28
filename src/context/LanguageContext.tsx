'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_STORAGE_KEY,
} from '@/constants/i18n';
import { FALLBACK_FEATURED_EVENTS } from '@/constants/landing';
import {
  buildDefaultDictionary,
  translateLandingDictionary,
} from '@/services/translation/translationUseCase';
import { BazaarEvent } from '@/types/event';
import { LandingDictionary, SupportedLocale } from '@/types/i18n';

interface LanguageContextValue {
  locale: SupportedLocale;
  isTranslating: boolean;
  dictionary: LandingDictionary;
  translatedEvents: BazaarEvent[];
  setLocale: (nextLocale: SupportedLocale) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialEvents?: BazaarEvent[];
}

export function LanguageProvider({
  children,
  initialEvents = FALLBACK_FEATURED_EVENTS,
}: LanguageProviderProps) {
  const baseDictionary = useMemo(
    () => buildDefaultDictionary(initialEvents),
    [initialEvents]
  );

  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [dictionary, setDictionary] =
    useState<LandingDictionary>(baseDictionary);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const clientCacheRef = useRef(
    new Map([[DEFAULT_LOCALE as SupportedLocale, baseDictionary]])
  );

  const applyLocale = useCallback(
    async (nextLocale: SupportedLocale) => {
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);

      const cachedDict = clientCacheRef.current.get(nextLocale);
      if (cachedDict) {
        setDictionary(cachedDict);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await translateLandingDictionary(
          baseDictionary,
          nextLocale
        );
        if (!result.isFallback) {
          clientCacheRef.current.set(nextLocale, result.dictionary);
        }
        setDictionary(result.dictionary);
      } finally {
        setIsTranslating(false);
      }
    },
    [baseDictionary]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(saved) && saved !== DEFAULT_LOCALE) {
      void applyLocale(saved);
    }
  }, [applyLocale]);

  const translatedEvents = useMemo<BazaarEvent[]>(() => {
    return initialEvents.map((event) => {
      const localized = dictionary.events.find((item) => item.id === event.id);
      if (!localized) return event;
      return {
        ...event,
        title: localized.title,
        theme: localized.theme,
        dateLabel: localized.dateLabel,
      };
    });
  }, [initialEvents, dictionary.events]);

  const value = useMemo(
    () => ({
      locale,
      isTranslating,
      dictionary,
      translatedEvents,
      setLocale: applyLocale,
    }),
    [locale, isTranslating, dictionary, translatedEvents, applyLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}