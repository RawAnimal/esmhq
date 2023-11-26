import BackButton from '@/app/_components/BackButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getTel from '@/app/utilities/GetTel';
import prettify from '@/app/utilities/Prettify';
import prisma from '@/prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AssignManagerSelect from '../_components/AssignManagerSelect';
import DeleteSiteButton from '../_components/DeleteSiteButton';
import EndSiteButton from '../_components/EndSiteButton';
import ReopenSiteButton from '../_components/ReopenSiteButton';
import SiteGoogleMap from '../_components/SiteGoogleMap';
import OpenGoogleMapButton from '../_components/OpenGoogleMapButton';
import OpenScheduleButton from '../_components/OpenScheduleButton';
import EmailClientButton from '../_components/EmailClientButton';
import CallClientButton from '../_components/CallClientButton';

interface Props {
  params: {
    id: string;
  };
}

const SiteDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!Number(params.id)) notFound();
  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      assignedToUser: true,
    },
  });

  if (!site) notFound();

  const showEditButton = () => {
    // Show Edit If
    // Site is active and you are assigned to it
    // OR
    // You are Webadmin
    if (
      (site.status === true && site.assignedToUserId === session?.user.id) ||
      (site.status === true && session?.user.role === 'WEBADMIN')
    )
      return (
        <Box
          sx={{ flex: { xs: '1', md: '0' } }}
          p={0}
          mb={2}
          marginLeft={2}
          marginRight={2}
        >
          <Link href={`/sites/${site.id}/edit`} passHref>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Link>
        </Box>
      );
  };

  const showOpenMapButton = () => {
    // Show if site if current site is inactive for Webadmin and Webusers
    if (site.latitude && site.longitude)
      return <OpenGoogleMapButton lat={site.latitude} lng={site.longitude} />;
  };

  const showOpenScheduleButton = () => {
    if (site.schedulerURL)
      return <OpenScheduleButton scheduleURL={site.schedulerURL} />;
  };

  const showEmailClientButton = () => {
    if (site.clEmail) return <EmailClientButton email={site.clEmail} />;
  };

  const showGoogleMap = () => {
    if (site.latitude && site.longitude)
      return (
        <Grid xs={12}>
          <Card
            variant="outlined"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'column',
              borderRadius: 1,
              marginBottom: 2,
              minHeight: 70,
            }}
          >
            <SiteGoogleMap
              markerlat={site.latitude}
              markerlng={site.longitude}
            />
          </Card>
        </Grid>
      );
  };

  const showCallClientButton = () => {
    if (site.clPhone) return <CallClientButton phoneNumber={site.clPhone} />;
  };

  const showReopenSiteButton = () => {
    // Show if site if current site is inactive for Webadmin and Webusers
    if (
      site.status !== true &&
      (session?.user.role === 'WEBADMIN' || session?.user.role === 'WEBUSER')
    )
      return <ReopenSiteButton siteId={site.id} />;
  };

  const showEndSiteButton = () => {
    // Show if active and you are assigned to it
    // OR
    // if active and you are Webadmin
    if (
      (site.status === true && site.assignedToUserId === session?.user.id) ||
      (site.status === true && session?.user.role === 'WEBADMIN')
    )
      return <EndSiteButton site={site} />;
  };

  const showAssignButton = () => {
    // Show if active and you are Webadmin
    if (site.status === true && session?.user.role === 'WEBADMIN')
      return (
        <Box
          sx={{ flex: { xs: '1', md: '0' } }}
          p={0}
          mb={2}
          marginLeft={2}
          marginRight={2}
        >
          <AssignManagerSelect site={site} />
        </Box>
      );
  };

  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      <Grid xs={12}>
        <Card
          variant="outlined"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            borderRadius: 1,
            marginBottom: 2,
            padding: 3,
          }}
        >
          <Typography
            variant="h6"
            textTransform="uppercase"
            lineHeight={1}
            textAlign={'center'}
          >
            {site.streetNumberName}, {site.cityTown}, {site.province}
          </Typography>
          <Typography
            variant="subtitle2"
            textTransform="uppercase"
            lineHeight={1}
            textAlign={'center'}
          >
            {site.clPrefix && site.clPrefix} {site.locID && site.locID}
          </Typography>
        </Card>
      </Grid>
      {showGoogleMap()}
      <Grid container>
        <Grid
          xs={12}
          sm={12}
          md={9}
          lg={9}
          xl={9}
          order={{ xs: 2, sm: 2, md: 1 }}
        >
          <Card variant="outlined">
            <CardHeader
              title={
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  lineHeight={1}
                  textAlign={'center'}
                >
                  Site Details
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              {/* File Number - Assignment Details */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    File #:
                  </Typography>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    color={`${site.fileNumber ? '' : '#bb271a'}`}
                    fontWeight={`${site.fileNumber ? '' : 'bold'}`}
                  >
                    {site.fileNumber ? site.fileNumber : 'INCOMPLETE'}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Assignment:
                  </Typography>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100, whiteSpace: 'nowrap' }}
                  >
                    {`${prettify(site.assignment!)} / ${prettify(
                      site.assignmentType
                    )}`}
                  </Typography>
                </Box>
              </Grid>
              {/* Start Date - End Date */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Start Date:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {`${site.startDate.toLocaleDateString()} ${site.startDate.toLocaleTimeString(
                      'en-US',
                      { hour: '2-digit', minute: '2-digit', hour12: false }
                    )}`}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  {!site.endDate ? (
                    <>
                      <Typography
                        display={'inline-block'}
                        variant="body1"
                        sx={{ width: 100 }}
                      >
                        Site Status:
                      </Typography>
                      <Typography display={'inline-block'} variant="body1">
                        Active
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        display={'inline-block'}
                        variant="body1"
                        sx={{ width: 100 }}
                      >
                        End Date:
                      </Typography>
                      <Typography display={'inline-block'} variant="body1">
                        {site.endDate
                          ? `${site.endDate.toLocaleDateString()} ${site.endDate.toLocaleTimeString(
                              'en-US',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              }
                            )}`
                          : 'Currently Active'}
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
              {/* Assignee and Vehicle */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Assignee:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.assignedToUser?.firstName}{' '}
                    {site.assignedToUser?.lastName}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Vehicle:
                  </Typography>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100, whiteSpace: 'nowrap' }}
                  >
                    {site.withVehicle ? 'Yes' : 'No'}
                  </Typography>
                </Box>
              </Grid>
              {/* Address */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Address:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {`${site.streetNumberName}, ${site.cityTown}, ${site.province} ${site.postal}`}
                  </Typography>
                </Box>
              </Grid>
              {/* Est Hours and Scheduler */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Est. Hours:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.estHours}
                  </Typography>
                </Box>
                <Box flex={1} ml={1}>
                  <Typography
                    display={'inline-block'}
                    lineHeight={'1'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Scheduler:
                  </Typography>
                  <Box display={'inline-block'}>
                    {site.schedulerURL ? (
                      <MuiLink
                        target="_blank"
                        underline="none"
                        href={site.schedulerURL}
                      >
                        <Typography fontWeight={600}>
                          Go To Schedule
                        </Typography>
                      </MuiLink>
                    ) : (
                      <Typography color="#bb271a" fontWeight={600}>
                        INCOMPLETE
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              {/* Address */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Details:
                  </Typography>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ mt: 1.5 }}
                  >
                    {site.details}
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
            <Divider />
            {/* Client Details Header */}
            <CardHeader
              title={
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  lineHeight={1}
                  textAlign={'center'}
                >
                  Client Details
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              {/* Client Details */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Name:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.clName}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Phone:
                  </Typography>
                  <MuiLink
                    href={getTel(site.clPhone)}
                    sx={{ fontWeight: 600, textDecoration: 'none' }}
                    underline="none"
                  >
                    {String.fromCharCode(9742) + ' ' + site.clPhone}
                  </MuiLink>
                </Box>
              </Grid>
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Email:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    <MuiLink
                      href={`mailto:${site.clEmail}`}
                      sx={{ fontWeight: 600, textDecoration: 'none' }}
                      underline="none"
                    >
                      {site.clEmail}
                    </MuiLink>
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    SSFNs:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.clSSFNs ? site.clSSFNs : ''}
                  </Typography>
                </Box>
              </Grid>
              {/* Client Company */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Company:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.clCompany}
                  </Typography>
                </Box>
              </Grid>
              {/* Client Company Address */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Address:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.clAddress}
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
            <Divider />
            {/* Principle Header */}
            <CardHeader
              title={
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  lineHeight={1}
                  textAlign={'center'}
                >
                  Principle Details
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              {/* Principle Details */}
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Name:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.prName ? site.prName : ''}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Phone:
                  </Typography>
                  {site.prPhone ? (
                    <MuiLink
                      href={getTel(site.prPhone)}
                      sx={{ fontWeight: 600, textDecoration: 'none' }}
                      underline="none"
                    >
                      {String.fromCharCode(9742) + ' ' + site.prPhone}
                    </MuiLink>
                  ) : (
                    ''
                  )}
                </Box>
              </Grid>
              <Grid
                container
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Email:
                  </Typography>
                  {site.prEmail ? (
                    <MuiLink
                      href={`mailto:${site.prEmail}`}
                      sx={{ fontWeight: 600, textDecoration: 'none' }}
                      underline="none"
                    >
                      {site.prEmail}
                    </MuiLink>
                  ) : (
                    ''
                  )}
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    SSFNs:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.prSSFNs ? site.prSSFNs : ''}
                  </Typography>
                </Box>
              </Grid>
              {/* Principle Company */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Company:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.prCompany ? site.prCompany : ''}
                  </Typography>
                </Box>
              </Grid>
              {/* Principle Company Address */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                marginBottom={1}
              >
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Address:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.prAddress ? site.prAddress : ''}
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          container
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          order={{ xs: 1, sm: 1, md: 2 }}
          flexDirection={{ xs: 'row', md: 'column' }}
        >
          <Box
            sx={{ flex: { xs: '1', md: '0' } }}
            p={0}
            mb={2}
            marginLeft={2}
            marginRight={2}
          >
            <BackButton label="Back" icon={<KeyboardDoubleArrowLeftIcon />} />
          </Box>

          {showAssignButton()}
          {showEditButton()}
          {showOpenMapButton()}
          {showOpenScheduleButton()}
          {showCallClientButton()}
          {showEmailClientButton()}
          {showReopenSiteButton()}
          {showEndSiteButton()}
          {session?.user.role === 'WEBADMIN' && (
            <Box
              sx={{ flex: { xs: '1', md: '0' } }}
              p={0}
              mb={2}
              marginLeft={2}
              marginRight={2}
            >
              <DeleteSiteButton siteId={site.id} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SiteDetailsPage;
