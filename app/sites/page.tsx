import React from 'react';
import SitesTable from '@/app/sites/_components/SitesTable';
import NavBar from '../_components/NavBar';
import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';

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
