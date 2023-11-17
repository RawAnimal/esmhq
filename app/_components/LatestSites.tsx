import prisma from '@/prisma/client';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link as MuiLink,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SiteStatusBadge from '../sites/_components/SiteStatusBadge';
import Link from 'next/link';
import { Site } from '@prisma/client';

const LatestSites = async () => {
  const sites = await prisma.site.findMany({
    orderBy: { startDate: 'desc' },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  const addHyphen = (site: Site) => {
    if (site.clPrefix || site.locID) {
      return ' - ';
    }
    return null;
  };
  return (
    <Card variant="outlined">
      <CardHeader title="Recent Activity" />
      <CardContent sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={600}>Address</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={600}>Client</Typography>
              </TableCell>
              <TableCell width="95px" sx={{ textAlign: 'center' }}>
                <Typography fontWeight={600}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>
                  <Link href={`/sites/${site.id}`} passHref>
                    <MuiLink
                      sx={{
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '1rem',
                      }}
                      underline="none"
                      component="button"
                      align="left"
                    >
                      {site.clPrefix && <span>{site.clPrefix} </span>}
                      {site.locID && <span>{site.locID} </span>}
                      {addHyphen(site)}
                      {site.streetNumberName}, {site.cityTown}, {site.province}
                    </MuiLink>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography noWrap display="inline">
                    {site.clName} -{' '}
                  </Typography>
                  <Typography noWrap fontWeight={600} display="inline">
                    {site.clCompany}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <SiteStatusBadge status={site.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardContent sx={{ display: { xs: 'block', md: 'none' } }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={600}>Details</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell component="th" scope="row">
                  <Grid container direction="column">
                    <Grid>
                      <Link href={`/sites/${site.id}`} passHref>
                        <MuiLink
                          sx={{
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontSize: '1rem',
                          }}
                          underline="none"
                          component="button"
                          noWrap
                        >
                          {site.clPrefix && <span>{site.clPrefix} </span>}
                          {site.locID && <span>{site.locID} </span>}
                          {addHyphen(site)}
                          {site.streetNumberName}, {site.cityTown},{' '}
                          {site.province}
                        </MuiLink>
                      </Link>
                    </Grid>
                    <Grid>
                      <Typography display="inline">
                        {site.clName} -{' '}
                      </Typography>
                      <Typography noWrap fontWeight={600} display="inline">
                        {site.clCompany}
                      </Typography>
                      {site.status ? (
                        <Typography fontWeight={600} color="success.main">
                          Active
                        </Typography>
                      ) : (
                        <Typography fontWeight={600} color="error.main">
                          Inactive
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    //     <Card>
    //       <Heading size="3" mb="3">
    //         Recent Sites
    //       </Heading>
    //       <Table.Root>
    //         <Table.Body>
    //           {sites.map((site) => (
    //             <Table.Row key={site.id}>
    //               <Table.Cell>
    //                 <Flex justify="between">
    //                   <Flex direction="column" align="start" gap="1">
    //                     <Link href={`/sites/${site.id}`} target="">
    //                       {site.clPrefix && <span>{site.clPrefix} </span>}
    //                       {site.locID && <span>{site.locID} </span>}
    //                       {addHyphen(site)}
    //                       {site.streetNumberName}, {site.cityTown}, {site.province}
    //                     </Link>
    //                     <Flex gap="1">
    //                       <SiteStatusBadge status={site.status} />
    //                       <div>
    //                         {site.clName} -{' '}
    //                         <Text className="font-bold text-gray-600">
    //                           {site.clCompany}
    //                         </Text>
    //                       </div>
    //                     </Flex>
    //                   </Flex>

    //                   {site.assignedToUser && (
    //                     <UserAvatar
    //                       whoIsIt={site.assignedToUserId!}
    //                       avatarSize="1"
    //                     />
    //                   )}
    //                 </Flex>
    //               </Table.Cell>
    //             </Table.Row>
    //           ))}
    //         </Table.Body>
    //       </Table.Root>
    //     </Card>
  );
};

export default LatestSites;
