import {
  BAZAAR_ACCORDION_ITEMS,
  BAZAAR_SHOWCASE_CONTENT,
  BOTTOM_CTA_CONTENT,
  EO_SECTION_CONTENT,
  EO_STEPS,
  HERO_CONTENT,
  TRUST_PILLARS,
  TRUST_SECTION_CONTENT,
} from '@/constants/landing';
import {
  DEFAULT_LOCALE,
  INTERNAL_TRANSLATE_ENDPOINT,
} from '@/constants/i18n';
import { FOOTER_LINKS, MAIN_NAV_ITEMS } from '@/constants/navigation';
import { BazaarEvent } from '@/types/event';
import {
  LandingDictionary,
  SupportedLocale,
  TranslateRequestPayload,
  TranslateResponsePayload,
} from '@/types/i18n';

export function buildDefaultDictionary(
  events: BazaarEvent[]
): LandingDictionary {
  return {
    nav: {
      items: MAIN_NAV_ITEMS.map(({ id, label }) => ({ id, label })),
      loginButton: 'Masuk',
      dashboardMenu: 'Dashboard Lapak',
      logoutMenu: 'Keluar',
      switcherAriaLabel: 'Pilihan Bahasa',
    },
    hero: { ...HERO_CONTENT },
    bazaarShowcase: {
      headingAccent: BAZAAR_SHOWCASE_CONTENT.headingAccent,
      headingMain: BAZAAR_SHOWCASE_CONTENT.headingMain,
      ctaLabel: BAZAAR_SHOWCASE_CONTENT.ctaLabel,
      accordion: BAZAAR_ACCORDION_ITEMS.map(({ id, title, description }) => ({
        id,
        title,
        description,
      })),
    },
    eoSection: {
      headingAccent: EO_SECTION_CONTENT.headingAccent,
      headingMain: EO_SECTION_CONTENT.headingMain,
      description: EO_SECTION_CONTENT.description,
      ctaLabel: EO_SECTION_CONTENT.ctaLabel,
      steps: EO_STEPS.map(({ stepNumber, title, description }) => ({
        stepNumber,
        title,
        description,
      })),
    },
    trustSection: {
      headingPrefix: TRUST_SECTION_CONTENT.headingPrefix,
      headingAccent: TRUST_SECTION_CONTENT.headingAccent,
      pillars: TRUST_PILLARS.map(({ id, title, description }) => ({
        id,
        title,
        description,
      })),
    },
    bottomCta: {
      title: BOTTOM_CTA_CONTENT.title,
      description: BOTTOM_CTA_CONTENT.description,
      ctaLabel: BOTTOM_CTA_CONTENT.ctaLabel,
    },
    footer: {
      links: FOOTER_LINKS.map(({ id, label }) => ({ id, label })),
    },
    events: events.map(({ id, title, theme, dateLabel }) => ({
      id,
      title,
      theme,
      dateLabel,
    })),
  };
}

function flattenDictionary(dict: LandingDictionary): string[] {
  return [
    ...dict.nav.items.map((item) => item.label),
    dict.nav.loginButton,
    dict.nav.dashboardMenu,
    dict.nav.logoutMenu,
    dict.nav.switcherAriaLabel,
    dict.hero.badge,
    dict.hero.titleHighlight,
    dict.hero.titleMain,
    dict.hero.subtitleBold,
    dict.hero.description,
    dict.hero.primaryCta.label,
    dict.hero.secondaryCta.label,
    dict.hero.tickerHeader,
    dict.hero.tickerFooter,
    dict.bazaarShowcase.headingAccent,
    dict.bazaarShowcase.headingMain,
    dict.bazaarShowcase.ctaLabel,
    ...dict.bazaarShowcase.accordion.flatMap((item) => [
      item.title,
      item.description,
    ]),
    dict.eoSection.headingAccent,
    dict.eoSection.headingMain,
    dict.eoSection.description,
    dict.eoSection.ctaLabel,
    ...dict.eoSection.steps.flatMap((step) => [step.title, step.description]),
    dict.trustSection.headingPrefix,
    dict.trustSection.headingAccent,
    ...dict.trustSection.pillars.flatMap((pillar) => [
      pillar.title,
      pillar.description,
    ]),
    dict.bottomCta.title,
    dict.bottomCta.description,
    dict.bottomCta.ctaLabel,
    ...dict.footer.links.map((link) => link.label),
    ...dict.events.flatMap((event) => [
      event.title,
      event.theme,
      event.dateLabel,
    ]),
  ];
}

function unflattenDictionary(
  base: LandingDictionary,
  translated: string[]
): LandingDictionary {
  let cursor = 0;
  const next = () => translated[cursor++] ?? '';

  return {
    nav: {
      items: base.nav.items.map((item) => ({ id: item.id, label: next() })),
      loginButton: next(),
      dashboardMenu: next(),
      logoutMenu: next(),
      switcherAriaLabel: next(),
    },
    hero: {
      ...base.hero,
      badge: next(),
      titleHighlight: next(),
      titleMain: next(),
      subtitleBold: next(),
      description: next(),
      primaryCta: { ...base.hero.primaryCta, label: next() },
      secondaryCta: { ...base.hero.secondaryCta, label: next() },
      tickerHeader: next(),
      tickerFooter: next(),
    },
    bazaarShowcase: {
      headingAccent: next(),
      headingMain: next(),
      ctaLabel: next(),
      accordion: base.bazaarShowcase.accordion.map((item) => ({
        id: item.id,
        title: next(),
        description: next(),
      })),
    },
    eoSection: {
      headingAccent: next(),
      headingMain: next(),
      description: next(),
      ctaLabel: next(),
      steps: base.eoSection.steps.map((step) => ({
        stepNumber: step.stepNumber,
        title: next(),
        description: next(),
      })),
    },
    trustSection: {
      headingPrefix: next(),
      headingAccent: next(),
      pillars: base.trustSection.pillars.map((pillar) => ({
        id: pillar.id,
        title: next(),
        description: next(),
      })),
    },
    bottomCta: {
      title: next(),
      description: next(),
      ctaLabel: next(),
    },
    footer: {
      links: base.footer.links.map((link) => ({ id: link.id, label: next() })),
    },
    events: base.events.map((event) => ({
      id: event.id,
      title: next(),
      theme: next() as BazaarEvent['theme'],
      dateLabel: next(),
    })),
  };
}

export async function translateLandingDictionary(
  baseDictionary: LandingDictionary,
  targetLang: SupportedLocale
): Promise<LandingDictionary> {
  if (targetLang === DEFAULT_LOCALE) {
    return baseDictionary;
  }

  const flatTexts = flattenDictionary(baseDictionary);
  const payload: TranslateRequestPayload = {
    texts: flatTexts,
    sourceLang: DEFAULT_LOCALE,
    targetLang,
  };

  const response = await fetch(INTERNAL_TRANSLATE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return baseDictionary;
  }

  const data = (await response.json()) as TranslateResponsePayload;
  if (!Array.isArray(data.translations) || data.translations.length !== flatTexts.length) {
    return baseDictionary;
  }

  return unflattenDictionary(baseDictionary, data.translations);
}