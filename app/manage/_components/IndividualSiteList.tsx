import prisma from '@/prisma/client';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Typography,
} from '@mui/material';
import IconTT from '@/app/icons/IconTT';

interface managerProps {
  manager: string | undefined;
}

const IndividualSiteList = async (props: managerProps) => {
  const sites = await prisma.site.findMany({
    where: {
      AND: [{ assignedToUserId: props.manager }, { status: true }],
    },
    orderBy: [
      {
        clCompany: 'asc',
      },
      {
        locID: 'asc',
      },
      {
        streetNumberName: 'asc',
      },
    ],
  });
  return (
    <>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Est Hrs</TableCell>
              <TableCell>
                <IconTT fSize="small" bgFill="#c23138" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((row, index) => (
              <TableRow key={index}>
                <TableCell width={45}>{index + 1}</TableCell>
                <TableCell>
                  <Link
                    sx={{ fontWeight: 600, textDecoration: 'none' }}
                    underline="none"
                    href={`/sites/${row.id}`}
                    noWrap
                  >
                    {row.streetNumberName}, {row.cityTown}, {row.province}
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize="inherit">
                    {row.clName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize="inherit">
                    {row.clCompany} {row.locID ? ' - ' + row.locID : ''}
                  </Typography>
                </TableCell>
                <TableCell width={120}>
                  <Typography noWrap fontSize="inherit">
                    {row.startDate.toJSON().slice(0, 10)}
                  </Typography>
                </TableCell>
                <TableCell width={85}>{row.estHours.toString()}</TableCell>
                <TableCell width={45}>
                  <Link
                    target="_blank"
                    href={`${row.schedulerURL}`}
                    fontWeight={600}
                    underline="none"
                  >
                    {String.fromCharCode(8680)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sites</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((row, index) => (
              <TableRow key={index}>
                <TableCell width={45}>{index + 1}</TableCell>
                <TableCell>
                  <Link
                    sx={{ fontWeight: 600, textDecoration: 'none' }}
                    underline="none"
                    href={`/sites/${row.id}`}
                    noWrap
                  >
                    {row.streetNumberName}, {row.cityTown}, {row.province}
                  </Link>
                  <Typography noWrap fontSize="inherit">
                    {row.clCompany} {row.locID ? ' - ' + row.locID : ''}
                  </Typography>
                  <Typography noWrap fontSize="inherit">
                    Client: {row.clName}
                  </Typography>
                  <Typography noWrap fontSize="inherit">
                    Start Date: {row.startDate.toJSON().slice(0, 10)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IndividualSiteList;
