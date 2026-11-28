import { GOOGLE_TRANSLATE_CONFIG } from '@/constants/i18n';
import { SupportedLocale, TranslationProviderSource } from '@/types/i18n';

interface GoogleCloudV2Item {
  translatedText: string;
}

interface GoogleCloudV2Response {
  data?: {
    translations?: GoogleCloudV2Item[];
  };
  error?: {
    code: number;
    message: string;
  };
}

export interface GoogleTranslationResult {
  translations: string[];
  source: Extract<TranslationProviderSource, 'google-cloud-v2' | 'google-gtx'>;
}

function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

async function requestCloudV2Translation(
  texts: string[],
  targetLang: SupportedLocale,
  sourceLang: SupportedLocale,
  apiKey: string
): Promise<string[]> {
  const endpoint =
    process.env.GOOGLE_TRANSLATE_API_URL ||
    GOOGLE_TRANSLATE_CONFIG.CLOUD_V2_API_URL;

  const batches = chunkArray(texts, GOOGLE_TRANSLATE_CONFIG.MAX_BATCH_SIZE);
  const translatedResults: string[] = [];

  for (const batch of batches) {
    const url = `${endpoint}?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: batch,
        source: sourceLang,
        target: targetLang,
        format: GOOGLE_TRANSLATE_CONFIG.FORMAT,
      }),
      cache: 'no-store',
    });

    const payload = (await response.json()) as GoogleCloudV2Response;

    if (!response.ok || payload.error) {
      throw new Error(
        payload.error?.message ||
          `Google Cloud Translate responded with status ${response.status}`
      );
    }

    const translations = payload.data?.translations;
    if (!translations || translations.length !== batch.length) {
      throw new Error('Invalid translation payload length from Google Cloud V2');
    }

    translatedResults.push(...translations.map((item) => item.translatedText));
  }

  return translatedResults;
}

async function translateSingleWithGtx(
  text: string,
  targetLang: SupportedLocale,
  sourceLang: SupportedLocale
): Promise<string> {
  if (!text.trim()) {
    return text;
  }

  const params = new URLSearchParams({
    client: GOOGLE_TRANSLATE_CONFIG.GTX_CLIENT,
    sl: sourceLang,
    tl: targetLang,
    dt: 't',
    q: text,
  });

  const response = await fetch(
    `${GOOGLE_TRANSLATE_CONFIG.GTX_API_URL}?${params.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`Google GTX responded with status ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error('Unexpected response format from Google GTX');
  }

  return data[0]
    .map((segment: unknown) =>
      Array.isArray(segment) && typeof segment[0] === 'string' ? segment[0] : ''
    )
    .join('');
}

async function requestGtxTranslation(
  texts: string[],
  targetLang: SupportedLocale,
  sourceLang: SupportedLocale
): Promise<string[]> {
  return Promise.all(
    texts.map((text) => translateSingleWithGtx(text, targetLang, sourceLang))
  );
}

export async function requestGoogleTranslation(
  texts: string[],
  targetLang: SupportedLocale,
  sourceLang: SupportedLocale
): Promise<GoogleTranslationResult> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY?.trim();

  if (apiKey) {
    try {
      const translations = await requestCloudV2Translation(
        texts,
        targetLang,
        sourceLang,
        apiKey
      );
      return { translations, source: 'google-cloud-v2' };
    } catch (cloudError) {
      console.warn('[Translate Cloud V2 Fallback to GTX]:', cloudError);
    }
  }

  const translations = await requestGtxTranslation(
    texts,
    targetLang,
    sourceLang
  );
  return { translations, source: 'google-gtx' };
}