'use client';

import { Button, Box, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import CancelIcon from '@mui/icons-material/Cancel';

const CancelButton = () => {
  const router = useRouter();
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => router.back()}
        startIcon={<CancelIcon />}
      >
        Cancel
      </Button>
    </>
  );
};

export default CancelButton;
