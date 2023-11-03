import React from 'react';
import SitesTable from '@/app/sites/_components/SitesTable';
import NavBar from '../_components/NavBar';
import { Container } from '@mui/material';

const SitesPage = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ pt: 2 }}>
        <SitesTable />
      </Container>
    </>
  );
};

export default SitesPage;
