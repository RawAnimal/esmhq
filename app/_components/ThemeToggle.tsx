'use client';
import { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { MUIWrapperContext } from '../utilities/MUIWrapper';

const ThemeToggle = () => {
  const theme = useTheme();
  const muiUtils = useContext(MUIWrapperContext);
  return (
    <IconButton
      sx={{ ml: 1 }}
      color="inherit"
      onClick={muiUtils.toggleColorMode}
    >
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
