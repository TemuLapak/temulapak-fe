'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AUTH_STORAGE_KEYS } from '@/constants/auth';
import {
  loginWithCredentials,
  registerAccount,
} from '@/services/auth/authService';
import {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  AuthWatermarkItem
} from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      const storedToken = window.localStorage.getItem(
        AUTH_STORAGE_KEYS.ACCESS_TOKEN
      );

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser) as AuthUser);
        setAccessToken(storedToken);
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      window.localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      window.localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistSession = useCallback((session: AuthSession) => {
    setUser(session.user);
    setAccessToken(session.accessToken);
    window.localStorage.setItem(
      AUTH_STORAGE_KEYS.USER,
      JSON.stringify(session.user)
    );
    window.localStorage.setItem(
      AUTH_STORAGE_KEYS.ACCESS_TOKEN,
      session.accessToken
    );
    if (session.refreshToken) {
      window.localStorage.setItem(
        AUTH_STORAGE_KEYS.REFRESH_TOKEN,
        session.refreshToken
      );
    }
  }, []);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthSession> => {
      const session = await loginWithCredentials(payload);
      persistSession(session);
      return session;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthUser> => {
      return registerAccount(payload);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, accessToken, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AUTH_WATERMARKS: readonly AuthWatermarkItem[] = [
  { id: 'auth-wm-1', top: '8%', left: '4%', sizePx: 88, rotateDeg: -16 },
  { id: 'auth-wm-2', top: '14%', right: '5%', sizePx: 110, rotateDeg: 20 },
  { id: 'auth-wm-3', bottom: '10%', left: '6%', sizePx: 96, rotateDeg: 18 },
  { id: 'auth-wm-4', bottom: '8%', right: '5%', sizePx: 82, rotateDeg: -22 },
] as const;