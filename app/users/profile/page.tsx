import NavBar from '@/app/_components/NavBar';
import { Container } from '@mui/material';
import React from 'react';

const ProfilePage = () => {
  return (
    <div>
      <NavBar />
      <Container sx={{ pt: 2 }}>
        <h1>User Profile</h1>
      </Container>
    </div>
  );
};

export default ProfilePage;
