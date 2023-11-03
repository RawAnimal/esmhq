import type { Metadata } from 'next';
import QueryClientProvider from './utilities/QueryClientProvider';
import LocaleProvider from './utilities/LocalizationProvider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ESMhq',
  description: 'A security field management app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <LocaleProvider>
            <main>{children}</main>
          </LocaleProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
