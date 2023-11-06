'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => router.back()}
      startIcon={<KeyboardDoubleArrowLeftIcon />}
    >
      Back
    </Button>
  );
};

export default BackButton;
