'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { AUTH_URL_PARAMS, AUTH_VALIDATION_RULES } from '@/constants/auth';
import { APP_ROUTES } from '@/constants/routes';
import { useAlert } from '@/context/AlertContext';
import { useAuthDictionary } from '@/hooks/useAuthDictionary';
import {
  submitNewPassword,
  verifyPasswordRecovery,
} from '@/services/auth/authService';
import { AuthShell } from './AuthShell';

interface ResetPasswordFieldErrors {
  newPassword?: string;
  confirmPassword?: string;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const alert = useAlert();
  const dict = useAuthDictionary();

  const [recoveryAccessToken, setRecoveryAccessToken] = useState<string | null>(
    null
  );
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ResetPasswordFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifiedRef = useRef(false);

  useEffect(() => {
    if (verifiedRef.current) return;
    verifiedRef.current = true;

    async function verifyRecoveryLink() {
      const hashContent = window.location.hash.replace(/^#/, '');
      const hashParams = new URLSearchParams(hashContent);

      const tokenHash = searchParams.get(AUTH_URL_PARAMS.TOKEN_HASH);
      const accessToken =
        hashParams.get(AUTH_URL_PARAMS.ACCESS_TOKEN) ||
        searchParams.get(AUTH_URL_PARAMS.ACCESS_TOKEN);

      if (!tokenHash && !accessToken) {
        setVerificationError(dict.resetPassword.invalidTokenDescription);
        setIsVerifying(false);
        return;
      }

      try {
        const verified = await verifyPasswordRecovery({
          token_hash: tokenHash ?? undefined,
          access_token: accessToken ?? undefined,
        });
        setRecoveryAccessToken(verified.access_token);
      } catch (err) {
        setVerificationError(
          err instanceof Error
            ? err.message
            : dict.resetPassword.invalidTokenDescription
        );
      } finally {
        setIsVerifying(false);
      }
    }

    verifyRecoveryLink();
  }, [dict, searchParams]);

  function validate(): boolean {
    const errors: ResetPasswordFieldErrors = {};

    if (!newPassword) {
      errors.newPassword = dict.validation.passwordRequired;
    } else if (
      newPassword.length < AUTH_VALIDATION_RULES.MIN_PASSWORD_LENGTH
    ) {
      errors.newPassword = dict.validation.passwordMinLength;
    }

    if (confirmPassword !== newPassword) {
      errors.confirmPassword = dict.validation.confirmPasswordMismatch;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!recoveryAccessToken || !validate()) return;

    setIsSubmitting(true);
    try {
      await submitNewPassword({
        access_token: recoveryAccessToken,
        new_password: newPassword,
      });

      alert.success(dict.resetPassword.successMessage);
      router.push(APP_ROUTES.LOGIN);
    } catch (err) {
      alert.error(
        err instanceof Error ? err.message : dict.validation.genericError
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      badge={dict.resetPassword.badge}
      titleHighlight={dict.resetPassword.titleHighlight}
      titleMain={dict.resetPassword.titleMain}
      subtitle={dict.resetPassword.subtitle}
      awningScheme="orange"
    >
      {isVerifying ? (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-full border-4 border-[#FFEDD5] border-t-[#F97316] animate-spin"
          />
          <p className="text-[14px] font-semibold text-[#374151] m-0">
            {dict.resetPassword.verifyingLabel}
          </p>
        </div>
      ) : verificationError ? (
        <div className="flex flex-col gap-5 text-center">
          <div className="rounded-2xl border-2 border-[#DC2626] bg-[#FEF2F2] p-5">
            <strong className="block text-[17px] font-extrabold text-[#991B1B] mb-1">
              {dict.resetPassword.invalidTokenTitle}
            </strong>
            <p className="text-[14px] text-[#7F1D1D] m-0">
              {verificationError}
            </p>
          </div>

          <Link
            href={APP_ROUTES.FORGOT_PASSWORD}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#F97316] text-[#1F2937] border-2 border-[#1F2937] hover:bg-[#FB923C] no-underline transition-colors"
          >
            {dict.resetPassword.requestNewLinkLabel}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField
            id="reset-new-password"
            type="password"
            autoComplete="new-password"
            label={dict.resetPassword.newPasswordLabel}
            placeholder={dict.resetPassword.newPasswordPlaceholder}
            helperText={dict.resetPassword.passwordHint}
            value={newPassword}
            error={fieldErrors.newPassword}
            disabled={isSubmitting}
            showPasswordToggle
            showPasswordAriaLabel={dict.shared.showPasswordLabel}
            hidePasswordAriaLabel={dict.shared.hidePasswordLabel}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (fieldErrors.newPassword) {
                setFieldErrors((prev) => ({
                  ...prev,
                  newPassword: undefined,
                }));
              }
            }}
          />

          <FormField
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            label={dict.resetPassword.confirmPasswordLabel}
            placeholder={dict.resetPassword.confirmPasswordPlaceholder}
            value={confirmPassword}
            error={fieldErrors.confirmPassword}
            disabled={isSubmitting}
            showPasswordToggle
            showPasswordAriaLabel={dict.shared.showPasswordLabel}
            hidePasswordAriaLabel={dict.shared.hidePasswordLabel}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (fieldErrors.confirmPassword) {
                setFieldErrors((prev) => ({
                  ...prev,
                  confirmPassword: undefined,
                }));
              }
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#0F766E] text-white border-2 border-[#1F2937] hover:bg-[#115E59] transition-colors cursor-pointer disabled:opacity-60"
          >
            {isSubmitting
              ? dict.shared.processingLabel
              : dict.resetPassword.submitButton}
          </button>
        </form>
      )}
    </AuthShell>
  );
}