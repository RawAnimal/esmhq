import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

interface scheduleProps {
  scheduleURL: string;
}

const OpenScheduleButton = ({ scheduleURL }: scheduleProps) => {
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
          href={scheduleURL}
          variant="contained"
          color="primary"
          target="_blank"
          fullWidth
          startIcon={<CalendarMonthIcon />}
        >
          Schedule
        </Button>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Schedule">
          <IconButton
            aria-label="open schedule"
            size="large"
            href={scheduleURL}
            target="_blank"
            color="primary"
          >
            <CalendarMonthIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default OpenScheduleButton;
