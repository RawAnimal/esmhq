import { Button, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface phoneProps {
  phoneNumber: string;
}

const CallClientButton = ({ phoneNumber }: phoneProps) => {
  return (
    <Box
      sx={{ flex: { xs: '1', md: '0' } }}
      p={0}
      mb={2}
      marginLeft={2}
      marginRight={2}
    >
      <Button
        href={`tel:${phoneNumber}`}
        variant="contained"
        color="primary"
        target="_blank"
        fullWidth
        startIcon={<PhoneIcon />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Call Client
      </Button>
    </Box>
  );
};

export default CallClientButton;
