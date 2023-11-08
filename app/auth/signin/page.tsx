'use client';

import { signIn as nextAuthSignIn } from 'next-auth/react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from "next/legacy/image";
import LogoESM from '@/public/LogoESM.svg';

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response: any = await nextAuthSignIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response.error) return setError(true);
    router.push('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        height="100vh"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          display="flex"
          flexDirection={'column'}
          sx={{ xs: { width: '100%' }, md: { width: '25%' } }}
        >
          <Image src={LogoESM} alt="ESM Logo" layout="responsive" priority />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ mt: 2, ml: 1, mb: 1, mr: 1 }}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            sx={{ mt: 1, ml: 1, mb: 1, mr: 1 }}
          />
          <Button
            id="loginSubmit"
            type="submit"
            variant="outlined"
            color="primary"
            sx={{ mt: 1, ml: 1, mr: 1 }}
          >
            Sign In
          </Button>
          {error && <div>there is an error</div>}
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
