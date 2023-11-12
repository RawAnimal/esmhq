import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import DefaultAvatar from '@/app/public/defaultAvatar.png';
import Image from 'next/image';

const ProfilePage = () => {
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
                >
                  Site Details
                </Typography>
              }
            />
            <Divider />
            <CardContent></CardContent>
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
            <Button fullWidth variant="contained">
              Actions
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
