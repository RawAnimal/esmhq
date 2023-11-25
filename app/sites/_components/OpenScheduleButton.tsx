import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button } from '@mui/material';

interface scheduleProps {
  scheduleURL: string;
}

const OpenScheduleButton = ({ scheduleURL }: scheduleProps) => {
  return (
    <Box
      sx={{ flex: { xs: '1', md: '0' } }}
      p={0}
      mb={2}
      marginLeft={2}
      marginRight={2}
    >
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
  );
};

export default OpenScheduleButton;
