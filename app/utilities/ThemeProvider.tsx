'use client';
import { ThemeProvider as TProvider, createTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CCC',
    },
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <TProvider theme={theme}>{children}</TProvider>;
};

export default ThemeProvider;
