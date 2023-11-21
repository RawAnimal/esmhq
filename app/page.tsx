import { Container, Card, CardHeader, CardContent, Grid } from '@mui/material';
import LatestSites from './_components/LatestSites';
import StatsCardSitesActive from './_components/StatsCardSitesActive';
import StatsCardSitesNew from './_components/StatsCardSitesNew';
import StatsCardEstHours from './_components/StatsCardEstHours';
import StatsCardSitesClosed from './_components/StatsCardSitesClosed';
import StatsCardAvgHours from './_components/StatsCardAvgHours';
import StatsChartWeeklyHours from './_components/StatsChartWeeklyHours';

export const dynamic = 'force-dynamic';

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
                  <div>
                    <StatsCardSitesActive />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <StatsCardEstHours />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <StatsCardAvgHours />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <StatsCardSitesNew />
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <StatsCardSitesClosed />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <div>
                <LatestSites />
              </div>
            </Grid>
            <Grid item>
              <div>
                <StatsChartWeeklyHours />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
