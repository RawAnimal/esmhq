import NavBar from '@/app/_components/NavBar';
import prisma from '@/prisma/client';
import { Container } from '@mui/material';
import { notFound } from 'next/navigation';
import SiteForm from '../../_components/SiteForm';

interface Props {
  params: { id: string };
}

const ReopenSitePage = async ({ params }: Props) => {
  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!site) notFound();

  return (
    <>
      <NavBar />
      <Container sx={{ pt: 2, flexGrow: 1 }}>
        <SiteForm site={site} reopen={true} />
      </Container>
    </>
  );
};

export default ReopenSitePage;
