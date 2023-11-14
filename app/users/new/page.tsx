import React from 'react';
import { Container } from '@mui/material';
import NewUserForm from '../_components/NewUserForm';

const NewUserPage = () => {
  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      <NewUserForm />
    </Container>
  );
};

export default NewUserPage;
