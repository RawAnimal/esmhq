import NavBar from '@/app/_components/NavBar';
import { getServerSession } from 'next-auth';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Button, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import prettify from '@/app/utilities/Prettify';
import getTel from '@/app/utilities/GetTel';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from '@/app/_components/BackButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DeleteSiteButton from '../_components/DeleteSiteButton';
import AssignManagerSelect from '../_components/AssignManagerSelect';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EndSiteButton from '../_components/EndSiteButton';
import ReopenSiteButton from '../_components/ReopenSiteButton';

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
      return <EndSiteButton siteId={site.id} />;
  };

  return (
    <>
      <NavBar />
      <Container sx={{ pt: 2, flexGrow: 1 }}>
        <Grid xs={12}>
          <Box
            display={'flex'}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              bgcolor: '#F4F4F4',
              border: '1px solid #E6E6E6',
              borderRadius: 1,
              minHeight: 56,
              marginBottom: 2,
              padding: 1,
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
          </Box>
        </Grid>

        <Grid container>
          <Grid
            xs={12}
            sm={12}
            md={9}
            lg={10}
            xl={10}
            order={{ xs: 2, sm: 2, md: 1 }}
          >
            <Card>
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
                    color={`${site.fileNumber ? '' : 'red'}`}
                    fontWeight={`${site.fileNumber ? '' : 'bold'}`}
                  >
                    {site.fileNumber ? site.fileNumber : 'Incomplete'}
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
                    Est. Hours:
                  </Typography>
                  <Typography display={'inline-block'} variant="body1">
                    {site.estHours}
                  </Typography>
                </Box>
                <Box flex={1} margin={1}>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100 }}
                  >
                    Scheduler:
                  </Typography>
                  <Typography
                    display={'inline-block'}
                    variant="body1"
                    sx={{ width: 100, whiteSpace: 'nowrap' }}
                  >
                    {site.schedulerURL ? (
                      <Link href={site.schedulerURL} target="_blank">
                        TrackTik
                      </Link>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Box>
              </Grid>
              {/* Details */}
              <Grid
                container
                sm={12}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={1} margin={1}>
                  <Typography display={'inline-block'} variant="body1">
                    {site.details}
                  </Typography>
                </Box>
              </Grid>
              {/* Client Details Header */}
              <Box
                display={'flex'}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  minHeight: 56,
                  marginTop: 1,
                  marginBottom: 2,
                  padding: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  lineHeight={1}
                  textAlign={'center'}
                >
                  Client Details
                </Typography>
              </Box>
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
                  <Typography display={'inline-block'} variant="body1">
                    <a href={getTel(site.clPhone)}>{site.clPhone}</a>
                  </Typography>
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
                    <Link href={`mailto:${site.clEmail}`}>{site.clEmail}</Link>
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
              {/* Principle Header */}
              <Box
                display={'flex'}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  minHeight: 56,
                  marginTop: 1,
                  marginBottom: 2,
                  padding: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  lineHeight={1}
                  textAlign={'center'}
                >
                  Principle Details
                </Typography>
              </Box>
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
                  <Typography display={'inline-block'} variant="body1">
                    {site.prPhone ? (
                      <a href={getTel(site.prPhone)}>{site.prPhone}</a>
                    ) : (
                      ''
                    )}
                  </Typography>
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
                    <Link href={`mailto:${site.prEmail}`}>{site.prEmail}</Link>
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
            </Card>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            md={3}
            lg={2}
            xl={2}
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
              <BackButton
                label="Back"
                icon={<KeyboardDoubleArrowLeftIcon />}
              />
            </Box>

            {session?.user.role === 'WEBADMIN' && (
              <Box
                sx={{ flex: { xs: '1', md: '0' } }}
                p={0}
                mb={2}
                marginLeft={2}
                marginRight={2}
              >
                <AssignManagerSelect site={site} />
              </Box>
            )}
            {showEditButton()}
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
    </>
  );
};

export default SiteDetailsPage;
