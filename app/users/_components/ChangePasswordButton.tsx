'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import PasswordIcon from '@mui/icons-material/Password';
import { TextFieldElement } from 'react-hook-form-mui';
import { changePasswordSchema } from '@/app/utilities/validationSchemas';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import { signOut, useSession } from 'next-auth/react';

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordButton = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isChangingPassword, setChangingPassword] = useState(false);

  const { control, handleSubmit, formState } = useForm<ChangePasswordForm>({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClickCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  return (
    <>
      <Button
        fullWidth
        disabled={openDialog}
        variant="contained"
        color="error"
        onClick={handleClickOpenDialog}
        startIcon={<PasswordIcon />}
      >
        Change Password{' '}
        {openDialog && <CircularProgress size={20} sx={{ ml: 1 }} />}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setChangingPassword(true);
              setOpenDialog(false);
              await axios.patch('/api/pass/' + userId, data);
              if (session?.user.role === 'WEBADMIN') {
                router.push('/users');
                router.refresh();
              } else {
                signOut();
              }
            } catch (error) {
              setChangingPassword(false);
              setOpenDialog(false);
              setOpenError(true);
            }
          })}
        >
          <DialogTitle id="alert-dialog-title">
            {'Change Password?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {session?.user.role !== 'WEBADMIN' &&
                'Signing in again will be required.'}
            </DialogContentText>
            <Grid container direction="column" spacing={2} mt={1}>
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
            </Grid>
          </DialogContent>
          <DialogActions sx={{ mb: 1, mr: 1 }}>
            <Button
              onClick={handleClickCloseDialog}
              variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              disabled={!formState.isValid || isChangingPassword}
              startIcon={<PasswordIcon />}
              type="submit"
              variant="contained"
              color="error"
            >
              Change Password
              {isChangingPassword && (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openError}
        onClose={handleErrorClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User password could not be changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button
            onClick={handleErrorClose}
            autoFocus
            variant="contained"
            color="secondary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePasswordButton;
