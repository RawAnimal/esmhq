import SitesTable from '@/app/sites/_components/SitesTable';
import { Container } from '@mui/material';
import NavBar from '../_components/NavBar';

const SitesPage = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ p: 2 }}>
        <SitesTable />
      </Container>
    </>
  );
};

export default SitesPage;
