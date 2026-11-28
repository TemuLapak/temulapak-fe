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
  completeGoogleAuth,
  loginUser,
  registerUser,
} from '@/services/auth/authService';
import {
  AuthSession,
  AuthUser,
  GoogleCallbackPayload,
  LoginPayload,
  RegisterPayload,
} from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  completeGoogleLogin: (payload: GoogleCallbackPayload) => Promise<AuthSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function persistSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(session.user));
  localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, session.accessToken);
  if (session.refreshToken) {
    localStorage.setItem(
      AUTH_STORAGE_KEYS.REFRESH_TOKEN,
      session.refreshToken
    );
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      const storedToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser) as AuthUser);
        setAccessToken(storedToken);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const session = await loginUser(payload);
    persistSession(session);
    setUser(session.user);
    setAccessToken(session.accessToken);
    return session;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    return registerUser(payload);
  }, []);

  const completeGoogleLogin = useCallback(
    async (payload: GoogleCallbackPayload) => {
      const session = await completeGoogleAuth(payload);
      persistSession(session);
      setUser(session.user);
      setAccessToken(session.accessToken);
      return session;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    setUser(null);
    setAccessToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isLoading,
      login,
      register,
      completeGoogleLogin,
      logout,
    }),
    [user, accessToken, isLoading, login, register, completeGoogleLogin, logout]
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