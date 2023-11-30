import { Card, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
  title: string;
  data: string;
}

const StatsCardTemplate = ({ title, data }: Props) => {
  return (
    <Box marginBottom={1}>
      <Card
        variant="outlined"
        className="StatsCard"
        sx={{ display: 'inline-block', minWidth: '90px' }}
      >
        <Grid container direction="column">
          <Grid bgcolor="primary.main" p={1} width="100%" textAlign="center">
            <Typography
              color="white"
              fontWeight={600}
              fontSize="0.8rem"
              justifySelf="center"
            >
              {title.toUpperCase()}
            </Typography>
          </Grid>
          <Grid p={1} width="100%" textAlign="center">
            <Typography fontWeight={600} fontSize="1.2rem">
              {data}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default StatsCardTemplate;
