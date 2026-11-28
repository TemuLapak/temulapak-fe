import { GOOGLE_TRANSLATE_CONFIG } from '@/constants/i18n';
import { SupportedLocale } from '@/types/i18n';

interface GoogleTranslateApiItem {
  translatedText: string;
}

interface GoogleTranslateApiResponse {
  data?: {
    translations?: GoogleTranslateApiItem[];
  };
  error?: {
    code: number;
    message: string;
  };
}

function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function requestGoogleTranslation(
  texts: string[],
  targetLang: SupportedLocale,
  sourceLang: SupportedLocale
): Promise<string[]> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
  }

  const endpoint =
    process.env.GOOGLE_TRANSLATE_API_URL ||
    GOOGLE_TRANSLATE_CONFIG.DEFAULT_API_URL;

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

    const payload = (await response.json()) as GoogleTranslateApiResponse;

    if (!response.ok || payload.error) {
      throw new Error(
        payload.error?.message ||
          `Google Translate API responded with status ${response.status}`
      );
    }

    const translations = payload.data?.translations;
    if (!translations || translations.length !== batch.length) {
      throw new Error('Invalid translation payload length from Google API');
    }

    translatedResults.push(
      ...translations.map((item) => item.translatedText)
    );
  }

  return translatedResults;
}