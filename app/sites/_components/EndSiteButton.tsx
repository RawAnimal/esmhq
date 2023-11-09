'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
} from '@mui/material';
import { DateTimePickerElement } from 'react-hook-form-mui';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import dayjs, { Dayjs } from 'dayjs';

type Inputs = {
  endDate: Dayjs;
};

const EndSiteButton = ({ siteId }: { siteId: number }) => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isEnding, setEnding] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      endDate: dayjs(new Date()),
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const finalData = {
      ...data,
      status: false,
    };
    try {
      setEnding(true);
      await axios.patch('/api/sites/' + siteId, finalData);
      router.push('/sites/' + siteId);
      router.refresh();
      setEnding(false);
    } catch (error) {
      setEnding(false);
      setOpenError(true);
    }
  };
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };
  return (
    <>
      <Box
        sx={{ flex: { xs: '1', md: '0' } }}
        p={0}
        mb={2}
        marginLeft={2}
        marginRight={2}
      >
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={handleClickOpen}
          disabled={isEnding}
          startIcon={<EventBusyIcon />}
        >
          End Site
          {dialogOpen && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="end-site-dialog-title">{'End Site?'}</DialogTitle>
          <DialogContent>
            <Box display={'flex'} flexDirection={'column'}>
              <DialogContentText id="end-site-dialog-description">
                Are you sure you wish to proceed? This action cannot be undone.
              </DialogContentText>
              <DateTimePickerElement
                name={'endDate'}
                label={'End Date'}
                control={control}
                ampm={false}
                views={['year', 'day', 'hours', 'minutes']}
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ mb: 1, mr: 1 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={handleClose}
              autoFocus
              type="submit"
            >
              OK
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
            This site could not be ended. Please inform the administrator.
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

export default EndSiteButton;
