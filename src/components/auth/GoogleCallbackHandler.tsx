'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AUTH_URL_PARAMS, DEFAULT_REGISTER_ROLE } from '@/constants/auth';
import { APP_ROUTES } from '@/constants/routes';
import { useAlert } from '@/context/AlertContext';
import { useAuth } from '@/context/AuthContext';
import { useAuthDictionary } from '@/hooks/useAuthDictionary';
import { SelectableRegisterRole } from '@/types/auth';
import { AuthShell } from './AuthShell';

export function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeGoogleLogin } = useAuth();
  const alert = useAlert();
  const dict = useAuthDictionary();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    async function syncGoogleSession() {
      const hashContent = window.location.hash.replace(/^#/, '');
      const hashParams = new URLSearchParams(hashContent);

      const providerError =
        hashParams.get(AUTH_URL_PARAMS.ERROR_DESCRIPTION) ||
        searchParams.get(AUTH_URL_PARAMS.ERROR_DESCRIPTION);

      if (providerError) {
        setErrorMessage(providerError);
        alert.error(providerError);
        return;
      }

      const accessToken =
        hashParams.get(AUTH_URL_PARAMS.ACCESS_TOKEN) ||
        searchParams.get(AUTH_URL_PARAMS.ACCESS_TOKEN);
      const refreshToken =
        hashParams.get(AUTH_URL_PARAMS.REFRESH_TOKEN) ||
        searchParams.get(AUTH_URL_PARAMS.REFRESH_TOKEN);
      const rawRole = searchParams.get(AUTH_URL_PARAMS.ROLE);
      const resolvedRole: SelectableRegisterRole =
        rawRole === 'eo' || rawRole === 'msme'
          ? rawRole
          : DEFAULT_REGISTER_ROLE;

      if (!accessToken) {
        setErrorMessage(dict.googleCallback.missingTokenError);
        alert.error(dict.googleCallback.missingTokenError);
        return;
      }

      try {
        const session = await completeGoogleLogin({
          access_token: accessToken,
          refresh_token: refreshToken,
          role: resolvedRole,
        });

        alert.success(
          session.user.name,
          dict.googleCallback.successMessage
        );
        router.replace(APP_ROUTES.HOME);
        router.refresh();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : dict.validation.genericError;
        setErrorMessage(message);
        alert.error(message);
      }
    }

    syncGoogleSession();
  }, [alert, completeGoogleLogin, dict, router, searchParams]);

  return (
    <AuthShell
      badge={dict.googleCallback.badge}
      titleHighlight={dict.googleCallback.titleHighlight}
      titleMain={dict.googleCallback.titleMain}
      subtitle={dict.googleCallback.subtitle}
      awningScheme="teal"
    >
      {errorMessage ? (
        <div className="flex flex-col gap-5 text-center">
          <div className="rounded-2xl border-2 border-[#DC2626] bg-[#FEF2F2] p-5">
            <p className="text-[14px] font-semibold text-[#991B1B] m-0">
              {errorMessage}
            </p>
          </div>

          <Link
            href={APP_ROUTES.LOGIN}
            className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full font-extrabold text-[15px] bg-[#0F766E] text-white border-2 border-[#1F2937] hover:bg-[#115E59] no-underline transition-colors"
          >
            {dict.googleCallback.backToLoginLabel}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div
            aria-hidden="true"
            className="w-11 h-11 rounded-full border-4 border-[#CCFBF1] border-t-[#0F766E] animate-spin"
          />
          <p className="text-[14px] font-semibold text-[#374151] m-0">
            {dict.googleCallback.verifyingMessage}
          </p>
        </div>
      )}
    </AuthShell>
  );
}