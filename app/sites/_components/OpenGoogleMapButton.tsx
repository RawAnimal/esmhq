import React from 'react';
import { Button, Box, IconButton, Tooltip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

interface LatLong {
  lat: string;
  lng: string;
}

const OpenGoogleMapButton = ({ lat, lng }: LatLong) => {
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, md: 2 },
        marginRight: { xs: 0, md: 2 },
      }}
      p={0}
      mb={2}
    >
      <Box display={{ xs: 'none', md: 'block' }}>
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
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Map">
          <IconButton
            aria-label="open map"
            size="large"
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            color="primary"
          >
            <MapIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default OpenGoogleMapButton;
