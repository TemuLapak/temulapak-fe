import {
  AUTH_API_ENDPOINTS,
  DEFAULT_REGISTER_ROLE,
  VALID_USER_ROLES,
} from '@/constants/auth';
import {
  AuthSession,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  UserRole,
} from '@/types/auth';
import { postJson } from './apiClient';

interface RawSupabaseUser {
  id?: string;
  email?: string;
  name?: string;
  phone?: string | null;
  role?: string;
  user_metadata?: {
    name?: string;
    phone?: string | null;
    role?: string;
  };
}

interface RawAuthEnvelope {
  message?: string;
  access_token?: string;
  refresh_token?: string | null;
  user?: RawSupabaseUser;
  data?: {
    access_token?: string;
    refresh_token?: string | null;
    user?: RawSupabaseUser;
  };
}

function normalizeUserRole(rawRole: unknown): UserRole {
  if (
    typeof rawRole === 'string' &&
    VALID_USER_ROLES.includes(rawRole as UserRole)
  ) {
    return rawRole as UserRole;
  }
  return DEFAULT_REGISTER_ROLE;
}

function mapRawUserToAuthUser(
  rawUser: RawSupabaseUser | undefined,
  fallbackEmail: string,
  fallbackName?: string,
  fallbackPhone?: string | null,
  fallbackRole?: UserRole
): AuthUser {
  const metadata = rawUser?.user_metadata;
  const email = rawUser?.email || fallbackEmail;
  const resolvedName =
    metadata?.name ||
    rawUser?.name ||
    fallbackName ||
    email.split('@')[0];

  return {
    id: rawUser?.id || '',
    email,
    name: resolvedName,
    phone: metadata?.phone ?? rawUser?.phone ?? fallbackPhone ?? null,
    role: normalizeUserRole(metadata?.role ?? rawUser?.role ?? fallbackRole),
  };
}

export async function loginWithCredentials(
  payload: LoginPayload
): Promise<AuthSession> {
  const response = await postJson<RawAuthEnvelope, LoginPayload>(
    AUTH_API_ENDPOINTS.LOGIN,
    payload
  );

  const inner = response.data ?? response;
  const accessToken = inner.access_token;

  if (!accessToken) {
    throw new Error('Token akses tidak ditemukan pada respons login.');
  }

  return {
    accessToken,
    refreshToken: inner.refresh_token ?? null,
    user: mapRawUserToAuthUser(inner.user, payload.email),
  };
}

export async function registerAccount(
  payload: RegisterPayload
): Promise<AuthUser> {
  const cleanPayload: RegisterPayload = {
    email: payload.email.trim(),
    password: payload.password,
    name: payload.name.trim(),
    phone: payload.phone?.trim() ? payload.phone.trim() : null,
    role: payload.role,
  };

  const response = await postJson<RawAuthEnvelope, RegisterPayload>(
    AUTH_API_ENDPOINTS.REGISTER,
    cleanPayload
  );

  const inner = response.data ?? response;
  return mapRawUserToAuthUser(
    inner.user,
    cleanPayload.email,
    cleanPayload.name,
    cleanPayload.phone,
    cleanPayload.role
  );
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload
): Promise<void> {
  await postJson<RawAuthEnvelope, ForgotPasswordPayload>(
    AUTH_API_ENDPOINTS.FORGOT_PASSWORD,
    { email: payload.email.trim() }
  );
}