'use client';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';

interface MapProps {
  lat: string | null;
  lng: string | null;
}

const SiteGoogleMap = ({ lat, lng }: MapProps) => {
  if (!lat || !lng) {
    return (
      <Box textAlign={'center'}>
        <Typography>MAP NOT AVAILABLE</Typography>
      </Box>
    );
  }
  const containerStyle = {
    width: '100%',
    height: '200px',
  };
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
        zoom={16}
      >
        <MarkerF position={center} />
      </GoogleMap>
    )
  );
};

export default SiteGoogleMap;
