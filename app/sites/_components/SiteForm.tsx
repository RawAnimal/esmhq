'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Site } from '@prisma/client';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  TextFieldElement,
  DateTimePickerElement,
  SelectElement,
  CheckboxElement,
} from 'react-hook-form-mui';
import { grey } from '@mui/material/colors';
import { provinces } from '@/app/utilities/ProvinceList';
import { assignments } from '@/app/utilities/AssignmentList';
import { assignmentTypes } from '@/app/utilities/AssignmentTypeList';
import { siteSchema } from '@/app/utilities/validationSchemas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from '@/app/_components/BackButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useSession } from 'next-auth/react';

type SiteForm = z.infer<typeof siteSchema>;
type SiteFormMinus = Omit<SiteForm, 'startDate'>;
interface NewSiteForm extends SiteFormMinus {
  startDate: Dayjs;
}

const SiteForm = ({ site, reopen }: { site?: Site; reopen?: boolean }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const defaultDate = () => {
    if (reopen) return dayjs(new Date());
    return dayjs(site?.startDate);
  };
  const { control, handleSubmit, formState } = useForm<NewSiteForm>({
    mode: 'onChange',
    resolver: zodResolver(siteSchema),
    defaultValues: {
      startDate: defaultDate(),
      streetNumberName: site?.streetNumberName,
      cityTown: site?.cityTown,
      province: site?.province,
      postal: site?.postal,
      assignment: site?.assignment,
      assignmentType: site?.assignmentType,
      withVehicle: site?.withVehicle,
      details: site?.details,
      estHours: site?.estHours,
      fileNumber: site?.fileNumber,
      schedulerURL: site?.schedulerURL,
      clName: site?.clName,
      clCompany: site?.clCompany,
      clAddress: site?.clAddress,
      clPhone: site?.clPhone,
      clEmail: site?.clEmail,
      clSSFNs: site?.clSSFNs,
      prName: site?.prName,
      prCompany: site?.prCompany,
      prAddress: site?.prAddress,
      prPhone: site?.prPhone,
      prEmail: site?.prEmail,
      prSSFNs: site?.prSSFNs,
      assignedToUserId: session?.user.id,
    },
  });
  return (
    <>
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
            setSubmitting(true);
            if (reopen) {
              await axios.post('/api/sites', data);
            } else {
              await axios.patch('/api/sites/' + site?.id, data);
            }
            if (reopen) {
              router.push('/sites/');
            } else {
              router.push('/sites/' + site?.id);
            }
            router.refresh();
          } catch (error) {
            setSubmitting(false);
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
                {reopen ? 'Reopen Site' : 'Edit Site'}{' '}
                {reopen && site?.fileNumber ? `- ${site.fileNumber}` : null}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <DateTimePickerElement
              name={'startDate'}
              label={'Start Date'}
              control={control}
              ampm={false}
              format="YYYY-MM-DD HH:mm"
              disabled={reopen ? false : true}
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
                bgcolor: '#F4F4F4',
                borderRadius: 1,
                height: 112,
              }}
            >
              <Grid container flexGrow={1}>
                <Grid xs={12} md={6}>
                  <Box m={1} flexGrow={1}>
                    <BackButton label="Cancel" icon={<CancelIcon />} />
                  </Box>
                </Grid>
                <Grid xs={12} md={6}>
                  <Box m={1} flexGrow={1}>
                    <Button
                      disabled={!formState.isValid || isSubmitting}
                      variant={'contained'}
                      type="submit"
                      fullWidth
                      startIcon={<SaveIcon />}
                    >
                      Save{' '}
                      {isSubmitting && (
                        <CircularProgress size={20} sx={{ ml: 1 }} />
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SiteForm;
