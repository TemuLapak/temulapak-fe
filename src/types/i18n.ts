import { BazaarEvent } from './event';
import {
  AccordionFeatureItem,
  EoStepItem,
  HeroContent,
  TrustPillarItem,
} from './landing';
import { FooterLink, NavItem } from './navigation';

export type SupportedLocale = 'id' | 'en';

export interface LocaleOption {
  code: SupportedLocale;
  shortLabel: string;
  fullLabel: string;
  ariaLabel: string;
}

export interface TranslateRequestPayload {
  texts: string[];
  targetLang: SupportedLocale;
  sourceLang?: SupportedLocale;
}

export type TranslationProviderSource =
  | 'google-cloud-v2'
  | 'google-gtx'
  | 'identity'
  | 'fallback';

export interface TranslateResponsePayload {
  translations: string[];
  source: TranslationProviderSource;
  errorMessage?: string;
}

export interface LandingDictionary {
  nav: {
    items: Pick<NavItem, 'id' | 'label'>[];
    loginButton: string;
    dashboardMenu: string;
    logoutMenu: string;
    switcherAriaLabel: string;
  };
  hero: HeroContent;
  bazaarShowcase: {
    headingAccent: string;
    headingMain: string;
    ctaLabel: string;
    accordion: Pick<AccordionFeatureItem, 'id' | 'title' | 'description'>[];
  };
  eoSection: {
    headingAccent: string;
    headingMain: string;
    description: string;
    ctaLabel: string;
    steps: Pick<EoStepItem, 'stepNumber' | 'title' | 'description'>[];
  };
  trustSection: {
    headingPrefix: string;
    headingAccent: string;
    pillars: Pick<TrustPillarItem, 'id' | 'title' | 'description'>[];
  };
  bottomCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  footer: {
    links: Pick<FooterLink, 'id' | 'label'>[];
  };
  eventCard: {
    remainingLabel: string;
  };
  events: Pick<BazaarEvent, 'id' | 'title' | 'theme' | 'dateLabel'>[];
}