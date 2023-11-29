import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import {
  Alert,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface Props {
  params: {
    id: string;
    type: string;
  };
}

const SiteResponsePage = async ({ params }: Props) => {
  if (!Number(params.id)) notFound();
  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      assignedToUser: true,
    },
  });

  if (!site) notFound();

  if (params.type === 'new' || params.type === 'reopen') {
    return (
      <Container sx={{ pt: 2, flexGrow: 1 }}>
        <Alert severity="success">
          {params.type === 'new' ? 'Site Added!' : 'Site Reopened!'}
        </Alert>
        <Grid container marginTop={2}>
          <Grid
            xs={12}
            sm={12}
            md={9}
            lg={9}
            xl={9}
            order={{ xs: 2, sm: 2, md: 1 }}
          >
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography>
                  A site record for the following address has been{' '}
                  {params.type === 'new' ? 'created' : 'reopened'} and added to
                  the database:
                </Typography>
                <Box
                  bgcolor="#f7f7f7"
                  padding={2}
                  marginTop={1}
                  marginBottom={1}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {site.streetNumberName}, {site.cityTown}, {site.province}{' '}
                    {site.postal}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600} marginTop={2}>
                  Completed
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        params.type === 'new'
                          ? 'Site Created'
                          : 'Site Reopened'
                      }
                      secondary={
                        params.type === 'new'
                          ? 'A new site has been saved to the database under your area of responsibility.'
                          : 'A previously closed site has been reopened and saved to the database under your area of responsibility.'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email Sent - Admin"
                      secondary={
                        params.type === 'new'
                          ? 'An email intake has been sent to the office for processing.'
                          : 'An email has been sent to the office requesting the site be reopened.'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email Sent - You"
                      secondary={
                        params.type === 'new'
                          ? 'An email intake has been sent to your email address for your own records.'
                          : 'An email has been sent to your email address for your own records.'
                      }
                    />
                  </ListItem>
                </List>
                <Typography variant="subtitle1" fontWeight={600} marginTop={1}>
                  Next Steps
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckBoxOutlineBlankIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email - To Client"
                      secondary={
                        params.type === 'new'
                          ? 'Email the client to thank them for choosing ESM for their security needs and to reinforce the expected service we will be providing. Also, reinforce that any changes to the service must go through you directly and ask them for any missing information for the file. It is recommended that you include the office on communications where you ask for missing information so they can get it directly should the client reply to all. Be aware that does not always happen so be prepared to forward the clients response yourself.'
                          : 'Ensure you email the client to confirm the resumption of service and to reinforce service change protocols.'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckBoxOutlineBlankIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        params.type === 'new'
                          ? 'File Number - Add'
                          : 'File Number - Update'
                      }
                      secondary={
                        params.type === 'new'
                          ? 'Once you have been notified that a file has been opened for this site. Please update the file number for the record.'
                          : 'Occasionally the office will create a new file number for a site. If required, please update the record so it has the new file number.'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckBoxOutlineBlankIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        params.type === 'new'
                          ? 'Schedule URL - Add'
                          : 'Schedule URL - Update'
                      }
                      secondary={
                        params.type === 'new'
                          ? 'Once you have been notified that a file has been opened for this site. Please add the scheduler URL to the record.'
                          : 'If the file number has changed, please update the scheduler URL.'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckBoxOutlineBlankIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Estimated Hours - Update"
                      secondary="Please update the estimated hours for the record as service levels change."
                    />
                  </ListItem>
                </List>
                <Typography variant="subtitle1" fontWeight={600} marginTop={1}>
                  Ongoing
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <TextSnippetIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Continual Updates"
                      secondary="It is your responsibility to keep the site record as up to date
              as possible as more information becomes available or changes. You
              are also responsible for collecting and informing the office of
              any missing information for the site record such as
              file/claim/PO/WO numbers and principle information (if relevant)."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <TextSnippetIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Maintain Schedule"
                      secondary="Once established in the scheduler, it is your responsibility to ensure scheduling for this site is completed in advance to support all shifts. This ensures guards can check in and complete reports as required."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <TextSnippetIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Manage Site"
                      secondary="It is your responsibility to asses the requirements of the site and to implement management tools to ensure a high level service. This includes late shift notifications, implementing patrol routes or adding geo-fences to the scheduler, and ensuring all guards are trained and equipped to provide the service required."
                    />
                  </ListItem>
                </List>
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
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1, whiteSpace: 'nowrap' }}
                href={`/sites`}
              >
                Sites List
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1, whiteSpace: 'nowrap' }}
                href={`/sites/${site.id}`}
              >
                Site Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  } else if (params.type === 'close') {
    return (
      <Container sx={{ pt: 2, flexGrow: 1 }}>
        <Alert severity="success">Site Closed!</Alert>
        <Grid container marginTop={2}>
          <Grid
            xs={12}
            sm={12}
            md={9}
            lg={9}
            xl={9}
            order={{ xs: 2, sm: 2, md: 1 }}
          >
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography>
                  The site record for the following address has been closed:
                </Typography>
                <Box
                  bgcolor="#f7f7f7"
                  padding={2}
                  marginTop={1}
                  marginBottom={1}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {site.streetNumberName}, {site.cityTown}, {site.province}{' '}
                    {site.postal}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600} marginTop={2}>
                  Completed
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Site Closed"
                      secondary="The record for this site in the database has been closed."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email Sent - Admin"
                      secondary="An email has been sent to admin asking them to close the site, prepare and send a final invoice to the client."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email Sent - You"
                      secondary="A copy of the site closing email has been sent to you for your records."
                    />
                  </ListItem>
                </List>
                <Typography variant="subtitle1" fontWeight={600} marginTop={1}>
                  Next Steps
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CheckBoxOutlineBlankIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Site Details"
                      secondary="Once a site has been closed it is no longer editable. If you need to make changes to the site record, please contact your manager."
                    />
                  </ListItem>
                </List>
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
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1, whiteSpace: 'nowrap' }}
                href={`/sites`}
              >
                Sites List
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1, whiteSpace: 'nowrap' }}
                href={`/sites/${site.id}`}
              >
                Site Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return notFound();
  }
};

export default SiteResponsePage;
