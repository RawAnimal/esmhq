'use client';
import CancelButton from '@/app/_components/CancelButton';
import { roles } from '@/app/utilities/RoleList';
import { userSchema } from '@/app/utilities/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, CircularProgress, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';
import { z } from 'zod';

type NewUserForm = z.infer<typeof userSchema>;

const NewUserForm = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState } = useForm<NewUserForm>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      role: 'WEBUSER',
      password: '',
      confirmPassword: '',
    },
  });
  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => {
            setError('');
          }}
          variant="outlined"
        >
          {error}
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post('/api/users/', data);
            router.push('/users/');
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError('An enxpected error occurred.');
          }
        })}
      >
        <Grid container spacing={2} direction="column">
          <Grid>
            <TextFieldElement
              name={'firstName'}
              label={'First Name'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'lastName'}
              label={'Last Name'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'title'}
              label={'Title'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'email'}
              label={'Email'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'phone'}
              label={'Phone'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <SelectElement
              name={'role'}
              control={control}
              options={roles}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'password'}
              label={'Password'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextFieldElement
              name={'confirmPassword'}
              label={'Confirm Password'}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid flexGrow={1}>
              <CancelButton />
            </Grid>
            <Grid flexGrow={1}>
              <Button
                disabled={!formState.isValid || isSubmitting}
                variant={'contained'}
                type="submit"
                fullWidth
                startIcon={<SaveIcon />}
              >
                Save{' '}
                {isSubmitting && <CircularProgress size={20} sx={{ ml: 1 }} />}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewUserForm;
