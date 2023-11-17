import { Container, Card, CardHeader, CardContent, Grid } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import LatestSites from './_components/LatestSites';
import StatsCardSitesActive from './_components/StatsCardSitesActive';
import StatsCardSitesNew from './_components/StatsCardSitesNew';
import StatsCardEstHours from './_components/StatsCardEstHours';
import StatsCardSitesClosed from './_components/StatsCardSitesClosed';
import StatsCardAvgHours from './_components/StatsCardAvgHours';

export default function Home() {
  return (
    <Container sx={{ pt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardHeader title="Weekly Site Stats" />
            <CardContent>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <StatsCardSitesActive />
                </Grid>
                <Grid item>
                  <StatsCardEstHours />
                </Grid>
                <Grid item>
                  <StatsCardAvgHours />
                </Grid>
                <Grid item>
                  <StatsCardSitesNew />
                </Grid>
                <Grid item>
                  <StatsCardSitesClosed />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <LatestSites />
        </Grid>
      </Grid>
    </Container>
  );
}
