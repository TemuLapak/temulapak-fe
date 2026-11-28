import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/constants/i18n';
import { requestGoogleTranslation } from '@/services/translation/googleTranslateClient';
import {
  TranslateRequestPayload,
  TranslateResponsePayload,
} from '@/types/i18n';

const serverTranslationCache = new Map<string, string[]>();

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<TranslateRequestPayload>;
    const { texts, targetLang, sourceLang = DEFAULT_LOCALE } = body;

    if (
      !Array.isArray(texts) ||
      texts.length === 0 ||
      !texts.every((item) => typeof item === 'string')
    ) {
      return NextResponse.json(
        { message: 'Parameter "texts" harus berupa array string non-kosong.' },
        { status: 400 }
      );
    }

    if (!isSupportedLocale(targetLang) || !isSupportedLocale(sourceLang)) {
      return NextResponse.json(
        { message: 'Kode bahasa tidak didukung.' },
        { status: 400 }
      );
    }

    if (targetLang === sourceLang) {
      const identityPayload: TranslateResponsePayload = {
        translations: texts,
        source: 'identity',
      };
      return NextResponse.json(identityPayload, { status: 200 });
    }

    const cacheKey = `${sourceLang}:${targetLang}:${JSON.stringify(texts)}`;
    const cached = serverTranslationCache.get(cacheKey);
    if (cached) {
      return NextResponse.json(
        { translations: cached, source: 'google-api' } satisfies TranslateResponsePayload,
        { status: 200 }
      );
    }

    const translatedTexts = await requestGoogleTranslation(
      texts,
      targetLang,
      sourceLang
    );
    serverTranslationCache.set(cacheKey, translatedTexts);

    return NextResponse.json(
      {
        translations: translatedTexts,
        source: 'google-api',
      } satisfies TranslateResponsePayload,
      { status: 200 }
    );
  } catch (error) {
    console.error('[Translate API Fallback]:', error);
    return NextResponse.json(
      {
        translations: [],
        source: 'fallback',
      } satisfies TranslateResponsePayload,
      { status: 200 }
    );
  }
}