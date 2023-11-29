import { Button, Box, Typography, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface phoneProps {
  phoneNumber: string;
}

const CallClientButton = ({ phoneNumber }: phoneProps) => {
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
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Call">
          <IconButton
            aria-label="call client"
            size="large"
            href={`tel:${phoneNumber}`}
            target="_blank"
            color="primary"
          >
            <PhoneIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CallClientButton;
