'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { RoleSelector } from '@/components/ui/RoleSelector';
import {
  AUTH_VALIDATION_RULES,
  DEFAULT_REGISTER_ROLE,
} from '@/constants/auth';
import { APP_ROUTES } from '@/constants/routes';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useAuthDictionary } from '@/hooks/useAuthDictionary';
import { SelectableRegisterRole } from '@/types/auth';
import { AuthShell } from './AuthShell';

interface RegisterFieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterForm() {
  const router = useRouter();
  const { register, login } = useAuth();
  const alert = useAlert();
  const dict = useAuthDictionary();

  const [role, setRole] = useState<SelectableRegisterRole>(
    DEFAULT_REGISTER_ROLE
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const errors: RegisterFieldErrors = {};

    if (!name.trim()) {
      errors.name = dict.validation.nameRequired;
    }

    if (!email.trim()) {
      errors.email = dict.validation.emailRequired;
    } else if (!AUTH_VALIDATION_RULES.EMAIL_REGEX.test(email.trim())) {
      errors.email = dict.validation.emailInvalid;
    }

    if (!password) {
      errors.password = dict.validation.passwordRequired;
    } else if (password.length < AUTH_VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
      errors.password = dict.validation.passwordMinLength;
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = dict.validation.confirmPasswordMismatch;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        password,
        role,
      });

      alert.success(dict.register.successMessage);

      try {
        await login({ email: email.trim(), password });
        router.push(APP_ROUTES.HOME);
        router.refresh();
      } catch {
        router.push(APP_ROUTES.LOGIN);
      }
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
      badge={dict.register.badge}
      titleHighlight={dict.register.titleHighlight}
      titleMain={dict.register.titleMain}
      subtitle={dict.register.subtitle}
      awningScheme="orange"
      maxWidthClass="max-w-[540px]"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <RoleSelector
          label={dict.register.roleSectionLabel}
          options={dict.register.roles}
          value={role}
          onChange={setRole}
          disabled={isSubmitting}
        />

        <FormField
          id="register-name"
          type="text"
          autoComplete="name"
          label={dict.register.nameLabel}
          placeholder={dict.register.namePlaceholder}
          value={name}
          error={fieldErrors.name}
          disabled={isSubmitting}
          onChange={(e) => {
            setName(e.target.value);
            if (fieldErrors.name) {
              setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="register-email"
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
            id="register-phone"
            type="tel"
            autoComplete="tel"
            label={dict.register.phoneLabel}
            optionalTag={dict.register.phoneOptionalHint}
            placeholder={dict.register.phonePlaceholder}
            value={phone}
            disabled={isSubmitting}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <FormField
          id="register-password"
          type="password"
          autoComplete="new-password"
          label={dict.shared.passwordLabel}
          placeholder={dict.shared.passwordPlaceholder}
          helperText={dict.register.passwordHint}
          value={password}
          error={fieldErrors.password}
          disabled={isSubmitting}
          showPasswordToggle
          showPasswordAriaLabel={dict.shared.showPasswordLabel}
          hidePasswordAriaLabel={dict.shared.hidePasswordLabel}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
        />

        <FormField
          id="register-confirm-password"
          type="password"
          autoComplete="new-password"
          label={dict.register.confirmPasswordLabel}
          placeholder={dict.register.confirmPasswordPlaceholder}
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
            : dict.register.submitButton}
        </button>

        <p className="text-center text-[14px] text-[#4B5563] mt-2 mb-0">
          {dict.register.hasAccountPrompt}{' '}
          <Link
            href={APP_ROUTES.LOGIN}
            className="font-extrabold text-[#C2410C] hover:underline no-underline"
          >
            {dict.register.loginLink}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}