import SitesTable from '@/app/sites/_components/SitesTable';
import { Container } from '@mui/material';

const SitesPage = () => {
  return (
    <Container sx={{ p: 2 }}>
      <SitesTable />
    </Container>
  );
};

export default SitesPage;
