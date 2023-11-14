import { Container } from '@mui/material';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import UserForm from '../../_components/UserForm';

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) notFound();

  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      <UserForm user={user} />
    </Container>
  );
};

export default EditUserPage;
