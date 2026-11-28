export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertItem {
  id: string;
  variant: AlertVariant;
  title?: string;
  message: string;
  durationMs: number;
}

export interface TriggerAlertOptions {
  variant?: AlertVariant;
  title?: string;
  message: string;
  durationMs?: number;
}