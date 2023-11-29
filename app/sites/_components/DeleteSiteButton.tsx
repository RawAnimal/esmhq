'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const DeleteSiteButton = ({ siteId }: { siteId: number }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

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
      <Box display={{ xs: 'none', md: 'block' }}>
        <Button
          fullWidth
          disabled={openDialog}
          variant="contained"
          color="error"
          onClick={handleClickOpenDialog}
          startIcon={<DeleteIcon />}
        >
          Delete {openDialog && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Button>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete site"
            color="error"
            size="large"
            disabled={openDialog}
            onClick={handleClickOpenDialog}
          >
            {openDialog ? (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            ) : (
              <DeleteIcon fontSize="inherit" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
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
          <Button
            onClick={handleClickCloseDialog}
            variant="contained"
            color="secondary"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            startIcon={<DeleteIcon />}
            onClick={async () => {
              try {
                setDeleting(true);
                setOpenDialog(false);
                await axios.delete('/api/sites/' + siteId);
                router.push('/sites');
                router.refresh();
              } catch (error) {
                setDeleting(false);
                setOpenDialog(false);
                setOpenError(true);
              }
            }}
            autoFocus
            variant="contained"
            color="error"
          >
            OK
            {isDeleting && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Button>
        </DialogActions>
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
            This site could not be deleted. Please inform the administrator.
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

export default DeleteSiteButton;
