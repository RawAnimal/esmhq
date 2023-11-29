import { Button, Box, Typography, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

interface emailProps {
  email: string;
}

const EmailClientButton = ({ email }: emailProps) => {
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
          href={`mailto:${email}`}
          variant="contained"
          color="primary"
          target="_blank"
          fullWidth
          startIcon={<EmailIcon />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Email Client
        </Button>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Email">
          <IconButton
            aria-label="email client"
            size="large"
            href={`mailto:${email}`}
            target="_blank"
            color="primary"
          >
            <EmailIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default EmailClientButton;
