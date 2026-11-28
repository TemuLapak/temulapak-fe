import {
  AUTH_API_ENDPOINTS,
  AUTH_URL_PARAMS,
  DEFAULT_REGISTER_ROLE,
  VALID_USER_ROLES,
} from '@/constants/auth';
import {
  AuthSession,
  AuthUser,
  ForgotPasswordPayload,
  GoogleCallbackPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SelectableRegisterRole,
  UserRole,
  VerifyRecoveryPayload,
} from '@/types/auth';

interface RawSupabaseUser {
  id: string;
  email?: string;
  phone?: string | null;
  user_metadata?: {
    name?: string;
    full_name?: string;
    phone?: string | null;
    role?: string;
  };
}

interface RawProfile {
  id: string;
  name?: string | null;
  phone?: string | null;
  role?: string | null;
}

interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL belum dikonfigurasi pada environment');
  }
  return baseUrl.replace(/\/+$/, '');
}

function isValidUserRole(value: unknown): value is UserRole {
  return (
    typeof value === 'string' &&
    (VALID_USER_ROLES as readonly string[]).includes(value)
  );
}

function mapAuthUser(
  rawUser: RawSupabaseUser,
  rawProfile?: RawProfile | null
): AuthUser {
  const meta = rawUser.user_metadata ?? {};
  const candidateRole =
    rawProfile?.role ?? meta.role ?? DEFAULT_REGISTER_ROLE;
  const resolvedRole = isValidUserRole(candidateRole)
    ? candidateRole
    : DEFAULT_REGISTER_ROLE;

  const resolvedName =
    rawProfile?.name?.trim() ||
    meta.name?.trim() ||
    meta.full_name?.trim() ||
    rawUser.email ||
    '';

  return {
    id: rawUser.id,
    email: rawUser.email ?? '',
    name: resolvedName,
    phone: rawProfile?.phone ?? meta.phone ?? rawUser.phone ?? null,
    role: resolvedRole,
  };
}

async function requestAuthApi<T>(
  endpoint: string,
  init: RequestInit
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const json = (await response.json().catch(() => ({}))) as ApiEnvelope<T> & T;

  if (!response.ok || json.success === false) {
    throw new Error(json.message || 'Permintaan autentikasi gagal');
  }

  const payload =
    json &&
    typeof json === 'object' &&
    json.data !== null &&
    json.data !== undefined
      ? json.data
      : json;

  return payload as T;
}

export async function loginUser(payload: LoginPayload): Promise<AuthSession> {
  const result = await requestAuthApi<{
    access_token: string;
    refresh_token?: string | null;
    user: RawSupabaseUser;
    profile?: RawProfile | null;
  }>(AUTH_API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return {
    accessToken: result.access_token,
    refreshToken: result.refresh_token ?? null,
    user: mapAuthUser(result.user, result.profile),
  };
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthUser> {
  const result = await requestAuthApi<{
    user: RawSupabaseUser;
  }>(AUTH_API_ENDPOINTS.REGISTER, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapAuthUser(result.user, {
    id: result.user.id,
    name: payload.name,
    phone: payload.phone,
    role: payload.role,
  });
}

export async function fetchGoogleAuthUrl(
  role?: SelectableRegisterRole
): Promise<string> {
  const query = role
    ? `?${AUTH_URL_PARAMS.ROLE}=${encodeURIComponent(role)}`
    : '';
  const result = await requestAuthApi<{ url?: string }>(
    `${AUTH_API_ENDPOINTS.GOOGLE_URL}${query}`,
    {
      method: 'GET',
    }
  );

  if (!result?.url) {
    throw new Error('Server tidak mengembalikan URL autentikasi Google');
  }

  return result.url;
}

export async function completeGoogleAuth(
  payload: GoogleCallbackPayload
): Promise<AuthSession> {
  const result = await requestAuthApi<{
    access_token: string;
    refresh_token?: string | null;
    user: RawSupabaseUser;
    profile?: RawProfile | null;
  }>(AUTH_API_ENDPOINTS.GOOGLE_CALLBACK, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return {
    accessToken: result.access_token,
    refreshToken: result.refresh_token ?? null,
    user: mapAuthUser(result.user, result.profile),
  };
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload
): Promise<void> {
  await requestAuthApi<unknown>(AUTH_API_ENDPOINTS.FORGOT_PASSWORD, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verifyPasswordRecovery(
  payload: VerifyRecoveryPayload
): Promise<{ access_token: string; refresh_token?: string }> {
  return requestAuthApi<{ access_token: string; refresh_token?: string }>(
    AUTH_API_ENDPOINTS.VERIFY_RECOVERY,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

export async function submitNewPassword(
  payload: ResetPasswordPayload
): Promise<void> {
  await requestAuthApi<unknown>(AUTH_API_ENDPOINTS.RESET_PASSWORD, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}