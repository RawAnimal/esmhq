'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  label: string;
  icon: React.ReactNode;
}

const BackButton = ({ label, icon }: Props) => {
  const router = useRouter();
  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      onClick={() => router.back()}
      startIcon={icon}
    >
      {label}
    </Button>
  );
};

export default BackButton;
