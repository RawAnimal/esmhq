'use client';

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
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ReopenSiteButton = ({ siteId }: { siteId: number }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleReopen = () => {
    setDialogOpen(false);
    router.push(`/sites/${siteId}/reopen`);
    router.refresh();
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
          color="primary"
          startIcon={<EventRepeatIcon />}
          onClick={handleClickOpen}
          disabled={dialogOpen}
        >
          Reopen Site
          {dialogOpen && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle id="end-site-dialog-title">{'Reopen Site?'}</DialogTitle>
        <DialogContent>
          <Box display={'flex'} flexDirection={'column'}>
            <DialogContentText id="end-site-dialog-description">
              Are you sure you wish reopen this site?.
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="warning"
            variant="contained"
            onClick={handleReopen}
            autoFocus
            type="submit"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReopenSiteButton;
