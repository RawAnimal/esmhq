'use client';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Site, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// export const managers = [
//   { id: '1', label: 'Sean Sweeney' },
//   { id: '2', label: 'Alex Ray' },
//   { id: '3', label: 'Hamza Desai' },
//   { id: '4', label: 'Anchit Pahwa' },
// ];

const AssignManagerSelect = ({ site }: { site: Site }) => {
  const router = useRouter();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/ops').then((res) => res.data),
    staleTime: 60000,
    retry: 3,
  });

  const handleChange = (event: SelectChangeEvent) => {
    axios.patch('/api/sites/' + site.id, {
      assignedToUserId: event.target.value || null,
    });
    router.push('/sites');
    router.refresh();
  };

  if (error) return null;

  if (isLoading) return 'Loading...';

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="manager-label">Manager</InputLabel>
        <Select
          labelId="manager-label"
          id="assignToUserId"
          label="Manager"
          defaultValue={
            site.assignedToUserId ? site.assignedToUserId : undefined
          }
          //defaultValue={site.assignedToUserId || undefined}
          onChange={handleChange}
        >
          {users?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.lastName}, {user.firstName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default AssignManagerSelect;
