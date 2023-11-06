'use client';
import { ThemeProvider as TProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2961c5',
    },
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <TProvider theme={theme}>{children}</TProvider>;
};

export default ThemeProvider;
