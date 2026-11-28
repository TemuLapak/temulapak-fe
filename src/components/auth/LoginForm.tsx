'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { AUTH_VALIDATION_RULES } from '@/constants/auth';
import { APP_ROUTES } from '@/constants/routes';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useAuthDictionary } from '@/hooks/useAuthDictionary';
import { AuthShell } from './AuthShell';

interface LoginFieldErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const alert = useAlert();
  const dict = useAuthDictionary();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const errors: LoginFieldErrors = {};

    if (!email.trim()) {
      errors.email = dict.validation.emailRequired;
    } else if (!AUTH_VALIDATION_RULES.EMAIL_REGEX.test(email.trim())) {
      errors.email = dict.validation.emailInvalid;
    }

    if (!password) {
      errors.password = dict.validation.passwordRequired;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const session = await login({ email: email.trim(), password });
      alert.success(session.user.name, dict.login.badge);

      const redirectParam = searchParams.get('redirect');
      const safeTarget =
        redirectParam && redirectParam.startsWith('/')
          ? redirectParam
          : APP_ROUTES.HOME;

      router.push(safeTarget);
      router.refresh();
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
      badge={dict.login.badge}
      titleHighlight={dict.login.titleHighlight}
      titleMain={dict.login.titleMain}
      subtitle={dict.login.subtitle}
      awningScheme="teal"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          id="login-email"
          type="email"
          autoComplete="email"
          label={dict.shared.emailLabel}
          placeholder={dict.shared.emailPlaceholder}
          value={email}
          error={fieldErrors.email}
          disabled={isSubmitting}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
        />

        <FormField
          id="login-password"
          type="password"
          autoComplete="current-password"
          label={dict.shared.passwordLabel}
          placeholder={dict.shared.passwordPlaceholder}
          value={password}
          error={fieldErrors.password}
          disabled={isSubmitting}
          showPasswordToggle
          showPasswordAriaLabel={dict.shared.showPasswordLabel}
          hidePasswordAriaLabel={dict.shared.hidePasswordLabel}
          rightLabelSlot={
            <Link
              href={APP_ROUTES.FORGOT_PASSWORD}
              className="text-[13px] font-bold text-[#0F766E] hover:underline no-underline"
            >
              {dict.login.forgotPasswordLink}
            </Link>
          }
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#F97316] text-[#1F2937] border-2 border-[#1F2937] hover:bg-[#FB923C] transition-colors cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? dict.shared.processingLabel : dict.login.submitButton}
        </button>

        <p className="text-center text-[14px] text-[#4B5563] mt-2 mb-0">
          {dict.login.noAccountPrompt}{' '}
          <Link
            href={APP_ROUTES.REGISTER}
            className="font-extrabold text-[#0F766E] hover:underline no-underline"
          >
            {dict.login.registerLink}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}