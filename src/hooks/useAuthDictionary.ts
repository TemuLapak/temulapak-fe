'use client';

import { useEffect, useRef, useState } from 'react';
import { DEFAULT_AUTH_DICTIONARY } from '@/constants/auth';
import {
  DEFAULT_LOCALE,
  INTERNAL_TRANSLATE_ENDPOINT,
  UI_TERM_OVERRIDES,
} from '@/constants/i18n';
import { useLanguage } from '@/context/LanguageContext';
import { AuthDictionary } from '@/types/auth';
import {
  SupportedLocale,
  TranslateRequestPayload,
  TranslateResponsePayload,
} from '@/types/i18n';

function flattenAuthDictionary(dict: AuthDictionary): string[] {
  return [
    dict.shared.emailLabel,
    dict.shared.emailPlaceholder,
    dict.shared.passwordLabel,
    dict.shared.passwordPlaceholder,
    dict.shared.showPasswordLabel,
    dict.shared.hidePasswordLabel,
    dict.shared.processingLabel,
    dict.shared.backToHomeLabel,
    dict.login.badge,
    dict.login.titleHighlight,
    dict.login.titleMain,
    dict.login.subtitle,
    dict.login.forgotPasswordLink,
    dict.login.submitButton,
    dict.login.noAccountPrompt,
    dict.login.registerLink,
    dict.register.badge,
    dict.register.titleHighlight,
    dict.register.titleMain,
    dict.register.subtitle,
    dict.register.roleSectionLabel,
    ...dict.register.roles.flatMap((role) => [
      role.badge,
      role.title,
      role.description,
    ]),
    dict.register.nameLabel,
    dict.register.namePlaceholder,
    dict.register.phoneLabel,
    dict.register.phoneOptionalHint,
    dict.register.phonePlaceholder,
    dict.register.confirmPasswordLabel,
    dict.register.confirmPasswordPlaceholder,
    dict.register.passwordHint,
    dict.register.submitButton,
    dict.register.hasAccountPrompt,
    dict.register.loginLink,
    dict.register.successMessage,
    dict.forgotPassword.badge,
    dict.forgotPassword.titleHighlight,
    dict.forgotPassword.titleMain,
    dict.forgotPassword.subtitle,
    dict.forgotPassword.submitButton,
    dict.forgotPassword.backToLoginLink,
    dict.forgotPassword.successTitle,
    dict.forgotPassword.successDescription,
    dict.validation.emailRequired,
    dict.validation.emailInvalid,
    dict.validation.passwordRequired,
    dict.validation.passwordMinLength,
    dict.validation.nameRequired,
    dict.validation.confirmPasswordMismatch,
    dict.validation.genericError,
  ];
}

function unflattenAuthDictionary(
  base: AuthDictionary,
  translated: string[]
): AuthDictionary {
  let cursor = 0;
  const next = () => translated[cursor++] ?? '';

  return {
    shared: {
      emailLabel: next(),
      emailPlaceholder: next(),
      passwordLabel: next(),
      passwordPlaceholder: next(),
      showPasswordLabel: next(),
      hidePasswordLabel: next(),
      processingLabel: next(),
      backToHomeLabel: next(),
    },
    login: {
      badge: next(),
      titleHighlight: next(),
      titleMain: next(),
      subtitle: next(),
      forgotPasswordLink: next(),
      submitButton: next(),
      noAccountPrompt: next(),
      registerLink: next(),
    },
    register: {
      badge: next(),
      titleHighlight: next(),
      titleMain: next(),
      subtitle: next(),
      roleSectionLabel: next(),
      roles: base.register.roles.map((role) => ({
        value: role.value,
        badge: next(),
        title: next(),
        description: next(),
      })),
      nameLabel: next(),
      namePlaceholder: next(),
      phoneLabel: next(),
      phoneOptionalHint: next(),
      phonePlaceholder: next(),
      confirmPasswordLabel: next(),
      confirmPasswordPlaceholder: next(),
      passwordHint: next(),
      submitButton: next(),
      hasAccountPrompt: next(),
      loginLink: next(),
      successMessage: next(),
    },
    forgotPassword: {
      badge: next(),
      titleHighlight: next(),
      titleMain: next(),
      subtitle: next(),
      submitButton: next(),
      backToLoginLink: next(),
      successTitle: next(),
      successDescription: next(),
    },
    validation: {
      emailRequired: next(),
      emailInvalid: next(),
      passwordRequired: next(),
      passwordMinLength: next(),
      nameRequired: next(),
      confirmPasswordMismatch: next(),
      genericError: next(),
    },
  };
}

export function useAuthDictionary(): AuthDictionary {
  const { locale } = useLanguage();
  const [authDict, setAuthDict] = useState<AuthDictionary>(
    DEFAULT_AUTH_DICTIONARY
  );

  const cacheRef = useRef(
    new Map([[DEFAULT_LOCALE as SupportedLocale, DEFAULT_AUTH_DICTIONARY]])
  );

  useEffect(() => {
    let active = true;

    async function translateAuthContent() {
      const cached = cacheRef.current.get(locale);
      if (cached) {
        setAuthDict(cached);
        return;
      }

      const flatTexts = flattenAuthDictionary(DEFAULT_AUTH_DICTIONARY);
      const overrides = UI_TERM_OVERRIDES[locale] ?? {};
      const pendingIndices: number[] = [];
      const textsToTranslate: string[] = [];
      const mergedTexts: string[] = new Array<string>(flatTexts.length);

      flatTexts.forEach((text, index) => {
        const overridden = overrides[text];
        if (overridden !== undefined) {
          mergedTexts[index] = overridden;
        } else {
          pendingIndices.push(index);
          textsToTranslate.push(text);
        }
      });

      if (textsToTranslate.length === 0) {
        const nextDict = unflattenAuthDictionary(
          DEFAULT_AUTH_DICTIONARY,
          mergedTexts
        );
        cacheRef.current.set(locale, nextDict);
        if (active) setAuthDict(nextDict);
        return;
      }

      try {
        const payload: TranslateRequestPayload = {
          texts: textsToTranslate,
          sourceLang: DEFAULT_LOCALE,
          targetLang: locale,
        };

        const response = await fetch(INTERNAL_TRANSLATE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) return;

        const data = (await response.json()) as TranslateResponsePayload;
        if (
          data.source === 'fallback' ||
          !Array.isArray(data.translations) ||
          data.translations.length !== textsToTranslate.length
        ) {
          return;
        }

        pendingIndices.forEach((originalIndex, translatedIndex) => {
          mergedTexts[originalIndex] = data.translations[translatedIndex];
        });

        const nextDict = unflattenAuthDictionary(
          DEFAULT_AUTH_DICTIONARY,
          mergedTexts
        );
        cacheRef.current.set(locale, nextDict);
        if (active) setAuthDict(nextDict);
      } catch {
        if (active) setAuthDict(DEFAULT_AUTH_DICTIONARY);
      }
    }

    void translateAuthContent();
    return () => {
      active = false;
    };
  }, [locale]);

  return authDict;
}