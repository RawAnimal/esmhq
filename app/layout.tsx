import type { Metadata } from 'next';
import QueryClientProvider from './utilities/QueryClientProvider';
import LocaleProvider from './utilities/LocalizationProvider';
import ThemeProvider from './utilities/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

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
      <ThemeProvider>
        <QueryClientProvider>
          <LocaleProvider>
            <CssBaseline>
              <body className={inter.variable}>
                <main>{children}</main>
              </body>
            </CssBaseline>
          </LocaleProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
