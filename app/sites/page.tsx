import React from 'react';
import SitesTable from '@/app/sites/_components/SitesTable';
import NavBar from '../_components/NavBar';
import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';

const SitesPage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Box sx={{ p: 2 }}>
          <Button variant="contained">
            <Link href="/sites/new">New Site</Link>
          </Button>
        </Box>
        <SitesTable />
      </Container>
    </>
  );
};

export default SitesPage;
