import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/constants/i18n';
import { requestGoogleTranslation } from '@/services/translation/googleTranslateClient';
import {
  TranslateRequestPayload,
  TranslateResponsePayload,
} from '@/types/i18n';

const serverTranslationCache = new Map<string, TranslateResponsePayload>();

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
      return NextResponse.json(
        {
          translations: texts,
          source: 'identity',
        } satisfies TranslateResponsePayload,
        { status: 200 }
      );
    }

    const cacheKey = `${sourceLang}:${targetLang}:${JSON.stringify(texts)}`;
    const cached = serverTranslationCache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    const result = await requestGoogleTranslation(texts, targetLang, sourceLang);
    const responsePayload: TranslateResponsePayload = {
      translations: result.translations,
      source: result.source,
    };

    serverTranslationCache.set(cacheKey, responsePayload);
    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown translation error';
    console.error('[Translate API Error]:', message);

    return NextResponse.json(
      {
        translations: [],
        source: 'fallback',
        errorMessage: message,
      } satisfies TranslateResponsePayload,
      { status: 200 }
    );
  }
}