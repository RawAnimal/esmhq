'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import NavBar from '@/app/_components/NavBar';
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  TextFieldElement,
  DateTimePickerElement,
  SelectElement,
  CheckboxElement,
} from 'react-hook-form-mui';
import Grid from '@mui/material/Unstable_Grid2';
import { grey } from '@mui/material/colors';
import dayjs, { Dayjs } from 'dayjs';
import { provinces } from '@/app/utilities/ProvinceList';
import { assignments } from '@/app/utilities/AssignmentList';
import { assignmentTypes } from '@/app/utilities/AssignmentTypeList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NewSiteForm {
  startDate: Dayjs;
  streetNumberName: string;
  cityTown: string;
  province: string;
  postal: string;
  assignment: string;
  assignmentType: string;
  withVehicle: boolean;
  details: string;
  estHours: number;
  fileNumber: string;
  schedulerURL: string;
  clName: string;
  clCompany: string;
  clPhone: string;
  clEmail: string;
  clAddress: string;
  clSSFNs: string;
  prName: string;
  prCompany: string;
  prPhone: string;
  prEmail: string;
  prAddress: string;
  prSSFNs: string;
}

const NewSitePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm<NewSiteForm>({
    defaultValues: {
      startDate: dayjs(new Date()),
      province: 'ON',
      assignment: 'EMERGENCY',
      assignmentType: 'FIRE',
      withVehicle: true,
    },
  });
  return (
    <>
      <NavBar />
      <Container sx={{ pt: 2, flexGrow: 1 }}>
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
              await axios.post('/api/sites', data);
              router.push('/sites');
            } catch (error) {
              setError('An enxpected error occurred.');
            }
          })}
        >
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  height: 56,
                }}
              >
                <Typography variant="h6" textTransform="uppercase">
                  New Site
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12}>
              <DateTimePickerElement
                name={'startDate'}
                label={'Start Date'}
                control={control}
                ampm={false}
                defaultValue={dayjs(new Date())}
                format="YYYY-MM-DD HH:mm"
              />
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  height: 56,
                }}
              >
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  sx={{ color: grey[400] }}
                >
                  Site Details
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12}>
              <TextFieldElement
                name={'streetNumberName'}
                label={'Street'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'cityTown'}
                label={'City/Town'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <SelectElement
                name={'province'}
                control={control}
                options={provinces}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'postal'}
                label={'Postal'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <SelectElement
                name={'assignment'}
                control={control}
                options={assignments}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <SelectElement
                name={'assignmentType'}
                control={control}
                options={assignmentTypes}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <CheckboxElement
                name="withVehicle"
                id="withVehicle"
                label={'Vehicle'}
                control={control}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 38 },
                  color: '#c4c4c4',
                  '&.Mui-checked': {
                    color: '#c4c4c4',
                  },
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextFieldElement
                id="details"
                name="details"
                label="Details"
                control={control}
                fullWidth
                multiline
                minRows="1"
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'estHours'}
                label={'Est. Hours'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'fileNumber'}
                label={'File Number'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'schedulerURL'}
                label={'Scheduler URL'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  height: 56,
                }}
              >
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  sx={{ color: grey[400] }}
                >
                  Client Details
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextFieldElement
                name={'clName'}
                label={'Client Name'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextFieldElement
                name={'clCompany'}
                label={'Client Company'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TextFieldElement
                name={'clAddress'}
                label={'Client Address'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'clPhone'}
                label={'Client Phone'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'clEmail'}
                label={'Client Email'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'clSSFNs'}
                label={'Client SSFNs'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  bgcolor: '#F4F4F4',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  height: 56,
                }}
              >
                <Typography
                  variant="subtitle1"
                  textTransform="uppercase"
                  sx={{ color: grey[400] }}
                >
                  Principle Details
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextFieldElement
                name={'prName'}
                label={'Principle Name'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextFieldElement
                name={'prCompany'}
                label={'Principle Company'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TextFieldElement
                name={'prAddress'}
                label={'Principle Address'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'prPhone'}
                label={'Principle Phone'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'prEmail'}
                label={'Principle Email'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <TextFieldElement
                name={'prSSFNs'}
                label={'Principle SSFNs'}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E6E6E6',
                  borderRadius: 1,
                  height: 112,
                }}
              >
                <Button variant={'contained'} type="submit">
                  Add New Site
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default NewSitePage;
