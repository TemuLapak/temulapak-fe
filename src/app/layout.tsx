import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { BRAND_INFO } from '@/constants/navigation';
import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { getFeaturedEvents } from '@/lib/api/events';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_INFO.name} — ${BRAND_INFO.tagline}`,
    template: `%s | ${BRAND_INFO.name}`,
  },
  description: BRAND_INFO.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialEvents = await getFeaturedEvents();

  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <LanguageProvider initialEvents={initialEvents}>
            <AlertProvider>
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </AlertProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}