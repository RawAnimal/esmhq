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
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardActions,
} from '@mui/material';
import {
  TextFieldElement,
  DateTimePickerElement,
  SelectElement,
  CheckboxElement,
} from 'react-hook-form-mui';
import { provinces } from '@/app/utilities/ProvinceList';
import { assignments } from '@/app/utilities/AssignmentList';
import { assignmentTypes } from '@/app/utilities/AssignmentTypeList';
import { siteSchema } from '@/app/utilities/validationSchemas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { useSession } from 'next-auth/react';
import CancelButton from '@/app/_components/CancelButton';

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
              const siteresp = await axios.post('/api/sites', data);
              await fetch('/api/email/site/reopen', {
                method: 'POST',
                body: JSON.stringify({
                  startDate: data.startDate.toString(),
                  fileNumber: data.fileNumber,
                  streetNumberName: data.streetNumberName,
                  cityTown: data.cityTown,
                  province: data.province,
                  postal: data.postal,
                  assignedToFirstName: session?.user.firstName,
                  assignedToLastName: session?.user.lastName,
                  assignedToEmail: session?.user.email,
                }),
              });
              router.push(`/sites/${siteresp.data.id}/response/reopen`);
            } else {
              await axios.patch('/api/sites/' + site?.id, data);
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
            <Card
              variant="outlined"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                borderRadius: 1,
                padding: 3,
              }}
            >
              <Typography
                variant="h6"
                textTransform="uppercase"
                lineHeight={1}
                textAlign={'center'}
              >
                {reopen ? 'Reopen Site' : 'Edit Site'}{' '}
                {reopen && site?.fileNumber ? `- ${site.fileNumber}` : null}
              </Typography>
            </Card>
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
            <Card variant="outlined">
              <CardHeader
                title={
                  <Typography
                    variant="subtitle1"
                    textTransform="uppercase"
                    lineHeight={1}
                    textAlign={'center'}
                  >
                    Site Details
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={{ xs: 2 }}>
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
                </Grid>
              </CardContent>
              <Divider />
              <CardHeader
                title={
                  <Typography
                    variant="subtitle1"
                    textTransform="uppercase"
                    lineHeight={1}
                    textAlign={'center'}
                  >
                    Client Details
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={{ xs: 2 }}>
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
                </Grid>
              </CardContent>
              <Divider />
              <CardHeader
                title={
                  <Typography
                    variant="subtitle1"
                    textTransform="uppercase"
                    lineHeight={1}
                    textAlign={'center'}
                  >
                    Principle Details
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={{ xs: 2 }}>
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
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid xs={12} md={6}>
                  <Box m={1} flexGrow={1}>
                    <CancelButton />
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
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SiteForm;
