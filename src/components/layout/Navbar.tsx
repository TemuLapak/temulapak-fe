'use client';

import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ActionButton } from '@/components/ui/actionbutton';
import { AwningBanner } from '@/components/ui/awningbanner';
import { BrandLogo } from '@/components/ui/brandlogo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { BRAND_INFO, MAIN_NAV_ITEMS } from '@/constants/navigation';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types/navigation';

export function Navbar() {
  const pathname = usePathname();
  const activeSegment = useSelectedLayoutSegment();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { dictionary } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) {
    if (item.protected && !isLoading && !user) {
      event.preventDefault();
      router.push(
        `${APP_ROUTES.LOGIN}?redirect=${encodeURIComponent(item.href)}`
      );
    }
  }

  return (
    <>
      <header className="bg-white border-b-2 border-[#1F2937]">
        <div className="tl-wrap flex items-center justify-between gap-4 min-h-[72px] flex-wrap">
          <Link
            href={APP_ROUTES.HOME}
            className="flex items-center gap-2.5 font-extrabold text-[22px] text-[#1F2937] no-underline"
          >
            <BrandLogo size={38} />
            <span>{BRAND_INFO.name}</span>
          </Link>

          <nav
            aria-label="Navigasi Utama"
            className="flex items-center gap-[30px] flex-wrap"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === APP_ROUTES.HOME
                  ? pathname === APP_ROUTES.HOME
                  : activeSegment === item.segment;
              const translatedLabel =
                dictionary.nav.items.find((nav) => nav.id === item.id)?.label ??
                item.label;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`font-medium no-underline transition-colors hover:text-[#0F766E] ${
                    isActive ? 'text-[#0F766E] font-bold' : 'text-[#1F2937]'
                  }`}
                >
                  {translatedLabel}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle />

            {!isLoading && user ? (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full font-bold bg-[#0F766E] text-white cursor-pointer border-2 border-[#1F2937]"
                >
                  <span>{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border-2 border-[#1F2937] shadow-lg p-2 z-50">
                    <Link
                      href={APP_ROUTES.EVENTS}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 py-2 rounded-xl text-sm font-semibold text-[#1F2937] hover:bg-[#FFEDD5] no-underline"
                    >
                      {dictionary.nav.dashboardMenu}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        router.refresh();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#C2410C] hover:bg-[#FFEDD5] cursor-pointer"
                    >
                      {dictionary.nav.logoutMenu}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <ActionButton href={APP_ROUTES.LOGIN} variant="teal" compact>
                {dictionary.nav.loginButton}
              </ActionButton>
            )}
          </div>
        </div>
      </header>

      <AwningBanner flapCount={14} size="default" colorScheme="teal" />
    </>
  );
}