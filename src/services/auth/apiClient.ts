export class ApiRequestError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
  }
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new ApiRequestError(
      'Konfigurasi NEXT_PUBLIC_API_BASE_URL belum diatur pada environment.',
      500
    );
  }
  return baseUrl.replace(/\/+$/, '');
}

export async function postJson<TResponse, TBody extends object>(
  endpointPath: string,
  body: TBody
): Promise<TResponse> {
  const baseUrl = getApiBaseUrl();
  const normalizedPath = endpointPath.startsWith('/')
    ? endpointPath
    : `/${endpointPath}`;

  const response = await fetch(`${baseUrl}${normalizedPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const rawText = await response.text();
  let parsed: Record<string, unknown> = {};

  if (rawText) {
    try {
      parsed = JSON.parse(rawText) as Record<string, unknown>;
    } catch {
      throw new ApiRequestError(
        'Respons server tidak valid.',
        response.status
      );
    }
  }

  if (!response.ok) {
    const errorMessage =
      typeof parsed.message === 'string'
        ? parsed.message
        : `Permintaan gagal dengan status ${response.status}`;
    throw new ApiRequestError(errorMessage, response.status);
  }

  return parsed as TResponse;
}