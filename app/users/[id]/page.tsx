import prisma from '@/prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Button,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import DeleteUserButton from '../_components/DeleteUserButton';
import ChangePasswordButton from '../_components/ChangePasswordButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BackButton from '@/app/_components/BackButton';

interface Props {
  params: { id: string };
}

const UserPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) notFound();

  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      <Grid container spacing={2} direction={'column'}>
        <Grid xs={12}>
          <Card
            variant="outlined"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'column',
              borderRadius: 1,
              padding: 3,
            }}
          >
            <Typography
              variant="h6"
              textTransform="uppercase"
              lineHeight={1}
              textAlign={'center'}
              noWrap
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" width={100}>
                    <Typography fontWeight={600}>Title</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>{user.title}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography fontWeight={600}>Phone</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>{user.phone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography fontWeight={600}>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography noWrap>{user.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography noWrap fontWeight={600}>
                      User Image
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {user.image ? user.image : 'No image'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container spacing={2}>
          <Grid flexGrow={1}>
            <BackButton label="Back" icon={<KeyboardDoubleArrowLeftIcon />} />
          </Grid>
          <Grid flexGrow={1}>
            <Link href={`/users/${user.id}/edit`} passHref>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Link>
          </Grid>
          <Grid flexGrow={1}>
            <DeleteUserButton userId={user.id} />
          </Grid>
          <Grid flexGrow={1}>
            <ChangePasswordButton userId={user.id} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
