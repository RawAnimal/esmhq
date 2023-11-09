'use client';
import { ThemeProvider as TProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e87422',
    },
    secondary: {
      main: '#656669',
    },
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <TProvider theme={theme}>{children}</TProvider>;
};

export default ThemeProvider;
