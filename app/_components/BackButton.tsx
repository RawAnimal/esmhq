'use client';

import { Button, Box, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const BackButton = () => {
  const router = useRouter();
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
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
          startIcon={<KeyboardDoubleArrowLeftIcon />}
        >
          Back
        </Button>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Back">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => router.back()}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default BackButton;
