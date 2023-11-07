'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteSiteButton = ({ siteId }: { siteId: number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this site? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await axios.delete('/api/sites/' + siteId);
              setOpen(false);
              router.push('/sites');
              router.refresh();
            }}
            autoFocus
            variant="contained"
            color="warning"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSiteButton;
