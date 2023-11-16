'use client';

import { signIn as nextAuthSignIn } from 'next-auth/react';
import { Box, Button, TextField, Alert } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import LogoESM from '@/app/public/LogoESM.svg';
import LogoSheild from '@/app/public/LogoSheild.svg';

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
        <Grid
          container
          display="flex"
          flexDirection={'column'}
          sx={{ xs: { width: '100%' }, md: { width: '50%' } }}
          alignItems={'center'}
        >
          <Image
            src={LogoSheild}
            alt="ESM Sheild"
            priority
            sizes="100vw"
            style={{
              width: '50%',
              height: 'auto',
            }}
          />
          <Grid width={'100%'}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              autoComplete="email"
              required
              defaultValue=""
              sx={{ mt: 3, mb: 1, width: '100%' }}
              {...register('email')}
            />
          </Grid>
          <Grid width={'100%'}>
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              autoComplete="off"
              aria-autocomplete="none"
              required
              defaultValue=""
              {...register('password')}
              sx={{ mt: 1, mb: 1, width: '100%' }}
            />
          </Grid>
          <Button
            id="loginSubmit"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1, width: '100%' }}
          >
            Sign In
          </Button>
          {error && (
            <Grid>
              <Alert severity="error" sx={{ mt: 1, ml: 1, mr: 1 }}>
                Incorrect credentials.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </form>
  );
};

export default SignIn;
