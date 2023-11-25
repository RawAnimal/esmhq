import { Button, Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

interface emailProps {
  email: string;
}

const EmailClientButton = ({ email }: emailProps) => {
  return (
    <Box
      sx={{ flex: { xs: '1', md: '0' } }}
      p={0}
      mb={2}
      marginLeft={2}
      marginRight={2}
    >
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
  );
};

export default EmailClientButton;
