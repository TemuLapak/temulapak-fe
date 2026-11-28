'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { AUTH_VALIDATION_RULES } from '@/constants/auth';
import { APP_ROUTES } from '@/constants/routes';
import { useAlert } from '@/context/AlertContext';
import { useAuthDictionary } from '@/hooks/useAuthDictionary';
import { requestPasswordReset } from '@/services/auth/authService';
import { AuthShell } from './AuthShell';

export function ForgotPasswordForm() {
  const alert = useAlert();
  const dict = useAuthDictionary();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError(dict.validation.emailRequired);
      return false;
    }
    if (!AUTH_VALIDATION_RULES.EMAIL_REGEX.test(email.trim())) {
      setEmailError(dict.validation.emailInvalid);
      return false;
    }
    setEmailError(undefined);
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await requestPasswordReset({ email: email.trim() });
      setIsSubmitted(true);
      alert.success(
        dict.forgotPassword.successDescription,
        dict.forgotPassword.successTitle
      );
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
      badge={dict.forgotPassword.badge}
      titleHighlight={dict.forgotPassword.titleHighlight}
      titleMain={dict.forgotPassword.titleMain}
      subtitle={dict.forgotPassword.subtitle}
      awningScheme="teal"
    >
      {isSubmitted ? (
        <div className="flex flex-col gap-5 text-center">
          <div className="rounded-2xl border-2 border-[#0F766E] bg-[#CCFBF1]/45 p-5">
            <strong className="block text-[18px] font-extrabold text-[#0F766E] mb-1">
              {dict.forgotPassword.successTitle}
            </strong>
            <p className="text-[14px] text-[#1F2937] m-0">
              {dict.forgotPassword.successDescription}
            </p>
          </div>

          <Link
            href={APP_ROUTES.LOGIN}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#0F766E] text-white border-2 border-[#1F2937] hover:bg-[#115E59] no-underline transition-colors"
          >
            {dict.forgotPassword.backToLoginLink}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField
            id="forgot-email"
            type="email"
            autoComplete="email"
            label={dict.shared.emailLabel}
            placeholder={dict.shared.emailPlaceholder}
            value={email}
            error={emailError}
            disabled={isSubmitting}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(undefined);
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#F97316] text-[#1F2937] border-2 border-[#1F2937] hover:bg-[#FB923C] transition-colors cursor-pointer disabled:opacity-60"
          >
            {isSubmitting
              ? dict.shared.processingLabel
              : dict.forgotPassword.submitButton}
          </button>

          <p className="text-center text-[14px] mt-2 mb-0">
            <Link
              href={APP_ROUTES.LOGIN}
              className="font-extrabold text-[#0F766E] hover:underline no-underline"
            >
              {dict.forgotPassword.backToLoginLink}
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}