'use client';

import { signIn as nextAuthSignIn } from 'next-auth/react';
import { Box, Button, TextField, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Image
            src={LogoESM}
            alt="ESM Logo"
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            required
            defaultValue=""
            sx={{ mt: 2, ml: 1, mb: 1, mr: 1 }}
            {...register('email')}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            required
            defaultValue=""
            {...register('password')}
            sx={{ mt: 1, ml: 1, mb: 1, mr: 1 }}
          />
          <Button
            id="loginSubmit"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1, ml: 1, mr: 1 }}
          >
            Sign In
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 1, ml: 1, mr: 1 }}>
              Incorrect credentials.
            </Alert>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
