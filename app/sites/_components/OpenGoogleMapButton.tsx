import React from 'react';
import { Button, Box } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

interface LatLong {
  lat: string;
  lng: string;
}

const OpenGoogleMapButton = ({ lat, lng }: LatLong) => {
  return (
    <Box
      sx={{ flex: { xs: '1', md: '0' } }}
      p={0}
      mb={2}
      marginLeft={2}
      marginRight={2}
    >
      <Button
        variant="contained"
        fullWidth
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noreferrer"
        startIcon={<MapIcon />}
      >
        Map
      </Button>
    </Box>
  );
};

export default OpenGoogleMapButton;
