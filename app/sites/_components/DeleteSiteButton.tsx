import { Button } from '@mui/material';

const DeleteSiteButton = ({ siteId }: { siteId: number }) => {
  return (
    <Button fullWidth variant="contained" color="warning">
      Delete
    </Button>
  );
};

export default DeleteSiteButton;
