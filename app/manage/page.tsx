import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Card, CardContent, CardHeader, Container, Box } from '@mui/material';
import IndividualSiteList from './_components/IndividualSiteList';
import StatsCardIndSitesActive from './_components/StatsCardIndSitesActive';
import StatsCardIndSitesClosed from './_components/StatsCardIndSitesClosed';
import StatsCardIndSitesNew from './_components/StatsCardIndSitesNew';
import StatsCardIndEstHours from './_components/StatsCardIndEstHours';
import StatsCardIndAvgHours from './_components/StatsCardIndAvgHours';

const IndividualManagePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      <Card variant="outlined">
        <CardHeader
          title={`${session?.user.firstName} ${session?.user.lastName}`}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <StatsCardIndSitesActive manager={session?.user.id} />
            <StatsCardIndSitesNew manager={session?.user.id} />
            <StatsCardIndSitesClosed manager={session?.user.id} />
            <StatsCardIndEstHours manager={session?.user.id} />
            <StatsCardIndAvgHours manager={session?.user.id} />
          </Box>
          <IndividualSiteList manager={session?.user.id} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default IndividualManagePage;
