'use client';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

/**
  TypeScript and React inconvenience:
  These functions are in here purely for types! 
  They will be overwritten - it's just that
  createContext must have an initial value.
  Providing a type that could be 'null | something' 
  and initiating it with *null* would be uncomfortable :)
*/
export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});

export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <MUIWrapperContext.Provider value={muiWrapperUtils}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}
