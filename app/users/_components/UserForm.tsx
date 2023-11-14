'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { userPatchSchema } from '@/app/utilities/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextFieldElement, SelectElement } from 'react-hook-form-mui';
import {
  Container,
  Alert,
  Button,
  CircularProgress,
  Card,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BackButton from '@/app/_components/BackButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { roles } from '@/app/utilities/RoleList';

type UserForm = z.infer<typeof userPatchSchema>;

const UserForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState } = useForm<UserForm>({
    mode: 'onChange',
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      email: user.email!,
      phone: user.phone,
      role: user.role,
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
            await axios.patch('/api/users/' + user.id, data);
            router.push('/users/' + user?.id);
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError('An enxpected error occurred.');
          }
        })}
      >
        <Grid container spacing={2} direction="column">
          <Grid xs={12}>
            <Card
              variant="outlined"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                borderRadius: 1,
                padding: 3,
              }}
            >
              <Typography
                variant="h6"
                textTransform="uppercase"
                lineHeight={1}
                textAlign={'center'}
                noWrap
              >
                Edit: {user.firstName} {user.lastName}
              </Typography>
            </Card>
          </Grid>
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
          <Grid container spacing={2}>
            <Grid flexGrow={1}>
              <BackButton label="Cancel" icon={<CancelIcon />} />
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

export default UserForm;
