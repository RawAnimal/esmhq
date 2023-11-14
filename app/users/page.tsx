import prisma from '@/prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  Typography,
  Card,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      lastName: 'asc',
    },
  });
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
            >
              ESM Users
            </Typography>
          </Card>
        </Grid>
        <Grid>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={800}>Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={800}>Title</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={800}>Role</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={800}>Phone</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={800}>Email</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={'/users/' + user.id} passHref>
                        <MuiLink
                          sx={{ fontWeight: 600, textDecoration: 'none' }}
                          underline="none"
                          component="button"
                        >
                          <Typography noWrap>
                            {user.lastName}, {user.firstName}
                          </Typography>
                        </MuiLink>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{user.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{user.role}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{user.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{user.email}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container>
          <Grid flex={1}>
            <Link href={'/users/new'} passHref>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Add User
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersPage;
