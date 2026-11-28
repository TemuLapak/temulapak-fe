export type AccordionColorVariant = 'c1' | 'c2' | 'c3';

export interface AccordionFeatureItem {
  id: string;
  title: string;
  description: string;
  variant: AccordionColorVariant;
  defaultOpen?: boolean;
}

export interface EoStepItem {
  stepNumber: number;
  title: string;
  description: string;
  awningVariant: 'teal' | 'orange';
  offsetTopPx: number;
}

export interface TrustPillarItem {
  id: string;
  title: string;
  description: string;
  iconType: 'shield' | 'payment' | 'document';
}

export interface WatermarkPosition {
  id: string;
  left: string;
  top: string;
  sizePx: number;
  rotateDeg: number;
}

export interface HeroContent {
  badge: string;
  titleHighlight: string;
  titleMain: string;
  subtitleBold: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tickerHeader: string;
  tickerFooter: string;
}