import NavBar from '@/app/_components/NavBar';
import prisma from '@/prisma/client';
import { Container } from '@mui/material';
import { notFound } from 'next/navigation';
import SiteForm from '../../_components/SiteForm';

interface Props {
  params: { id: string };
}

const EditSitePage = async ({ params }: Props) => {
  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!site) notFound();

  return (
    <Container sx={{ pt: 2, flexGrow: 1 }}>
      <SiteForm site={site} />
    </Container>
  );
};

export default EditSitePage;
