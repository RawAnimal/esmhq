import { Chip } from '@mui/material';

const SiteStatusBadge = ({ status }: { status: boolean }) => {
  return (
    <Chip
      label={`${!status ? 'Inactive' : 'Active'}`}
      color={`${!status ? 'error' : 'success'}`}
      size="small"
    />
  );
};

export default SiteStatusBadge;
