'use client';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import DefaultAvatar from '@/app/public/defaultAvatar.png';
import Image from 'next/image';
import ChangePasswordButton from '../_components/ChangePasswordButton';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
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
                  noWrap
                >
                  {session?.user.firstName} {session?.user.lastName}
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container>
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
                      fontWeight={600}
                    >
                      Title:
                    </Typography>
                    <Typography display={'inline-block'} variant="body1">
                      {session?.user.title}
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
                      fontWeight={600}
                    >
                      Phone:
                    </Typography>
                    <Typography display={'inline-block'} variant="body1">
                      {session?.user.phone}
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
                      fontWeight={600}
                    >
                      Email:
                    </Typography>
                    <Typography display={'inline-block'} variant="body1">
                      {session?.user.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          order={{ xs: 1, sm: 1, md: 2 }}
          flexDirection={{ xs: 'row', md: 'column' }}
        >
          <Box sx={{ flex: { xs: '1', md: '0' } }}>
            <Box p={1}>
              <Box
                height={180}
                width={180}
                sx={{ borderRadius: '50%', overflow: 'hidden' }}
                m={2}
                margin={'auto'}
                alignItems={'center'}
                alignContent={'center'}
                justifyContent={'center'}
                justifyItems={'center'}
                alignSelf={'center'}
              >
                <Image
                  src={DefaultAvatar}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ flex: { xs: '1', md: '0' } }}
            p={0}
            mb={2}
            marginLeft={2}
            marginRight={2}
          >
            <ChangePasswordButton userId={session?.user.id!} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
