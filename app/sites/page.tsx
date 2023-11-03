import React from 'react';
import SitesTable from '@/app/sites/_components/SitesTable';
import SiteStatusBadge from './_components/SiteStatusBadge';
import NavBar from '../_components/NavBar';

const SitesPage = () => {
  return (
    <>
      <NavBar />
      <SitesTable />
    </>
  );
};

export default SitesPage;
