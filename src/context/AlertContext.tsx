'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { PopupAlertViewport } from '@/components/ui/PopupAlert';
import { ALERT_CONFIG } from '@/constants/alert';
import { AlertItem, TriggerAlertOptions } from '@/types/alert';

interface AlertContextValue {
  showAlert: (options: TriggerAlertOptions) => string;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;
  success: (message: string, title?: string, durationMs?: number) => string;
  error: (message: string, title?: string, durationMs?: number) => string;
  warning: (message: string, title?: string, durationMs?: number) => string;
  info: (message: string, title?: string, durationMs?: number) => string;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

function generateAlertId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const showAlert = useCallback((options: TriggerAlertOptions): string => {
    const id = generateAlertId();
    const nextAlert: AlertItem = {
      id,
      variant: options.variant ?? 'info',
      title: options.title,
      message: options.message,
      durationMs: options.durationMs ?? ALERT_CONFIG.DEFAULT_DURATION_MS,
    };

    setAlerts((prev) => {
      const trimmed = prev.slice(-(ALERT_CONFIG.MAX_VISIBLE_ALERTS - 1));
      return [...trimmed, nextAlert];
    });

    return id;
  }, []);

  const success = useCallback(
    (message: string, title?: string, durationMs?: number) =>
      showAlert({ variant: 'success', message, title, durationMs }),
    [showAlert]
  );

  const error = useCallback(
    (message: string, title?: string, durationMs?: number) =>
      showAlert({ variant: 'error', message, title, durationMs }),
    [showAlert]
  );

  const warning = useCallback(
    (message: string, title?: string, durationMs?: number) =>
      showAlert({ variant: 'warning', message, title, durationMs }),
    [showAlert]
  );

  const info = useCallback(
    (message: string, title?: string, durationMs?: number) =>
      showAlert({ variant: 'info', message, title, durationMs }),
    [showAlert]
  );

  const value = useMemo(
    () => ({
      showAlert,
      dismissAlert,
      clearAlerts,
      success,
      error,
      warning,
      info,
    }),
    [showAlert, dismissAlert, clearAlerts, success, error, warning, info]
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <PopupAlertViewport alerts={alerts} onDismiss={dismissAlert} />
    </AlertContext.Provider>
  );
}

export function useAlert(): AlertContextValue {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}