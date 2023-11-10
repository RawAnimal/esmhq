import type { Metadata } from 'next';
import QueryClientProvider from './utilities/QueryClientProvider';
import LocaleProvider from './utilities/LocalizationProvider';
//import ThemeProvider from './utilities/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from './utilities/AuthProvider';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './_components/NavBar';
import MUIWrapper from './utilities/MUIWrapper';

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
      <MUIWrapper>
        <QueryClientProvider>
          <AuthProvider>
            <LocaleProvider>
              <CssBaseline>
                <body className={inter.variable}>
                  <NavBar />
                  <main>{children}</main>
                </body>
              </CssBaseline>
            </LocaleProvider>
          </AuthProvider>
        </QueryClientProvider>
      </MUIWrapper>
    </html>
  );
}
