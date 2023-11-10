'use client';
import { ThemeProvider as TProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const lightTheme = createTheme({
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <TProvider theme={lightTheme}>{children}</TProvider>;
};

export default ThemeProvider;
