'use client';
import BackButton from '@/app/_components/BackButton';
import { assignments } from '@/app/utilities/AssignmentList';
import { assignmentTypes } from '@/app/utilities/AssignmentTypeList';
import { provinces } from '@/app/utilities/ProvinceList';
import { siteSchema } from '@/app/utilities/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveIcon from '@mui/icons-material/Save';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckboxElement,
  DateTimePickerElement,
  SelectElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import { z } from 'zod';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSession } from 'next-auth/react';

type SiteForm = z.infer<typeof siteSchema>;
type SiteFormMinus = Omit<SiteForm, 'startDate'>;
interface NewSiteForm extends SiteFormMinus {
  startDate: Dayjs;
}

const NewSitePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { control, handleSubmit, formState } = useForm<NewSiteForm>({
    mode: 'onChange',
    resolver: zodResolver(siteSchema),
    defaultValues: {
      startDate: dayjs(new Date()),
      province: 'ON',
      assignment: 'EMERGENCY',
      assignmentType: 'FIRE',
      withVehicle: true,
    },
  });
  return (
    <Container sx={{ pt: 2, flexGrow: 1, mb: 2 }}>
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
            const newData = Object.assign(data, {
              assignedToUserId: session?.user.id,
            });
            const siteresp = await axios.post('/api/sites', newData);
            await fetch('/api/email/site/new', {
              method: 'POST',
              body: JSON.stringify({
                startDate: data.startDate.toString(),
                streetNumberName: data.streetNumberName,
                cityTown: data.cityTown,
                province: data.province,
                postal: data.postal,
                assignment: data.assignment,
                assignmentType: data.assignmentType,
                withVehicle: data.withVehicle,
                details: data.details,
                clName: data.clName,
                clCompany: data.clCompany,
                clPhone: data.clPhone,
                clEmail: data.clEmail,
                clAddress: data.clAddress,
                clSSFNs: data.clSSFNs,
                prName: data.prName,
                prCompany: data.prCompany,
                prPhone: data.prPhone,
                prEmail: data.prEmail,
                prAddress: data.prAddress,
                prSSFNs: data.prSSFNs,
                assignedToFirstName: session?.user.firstName,
                assignedToLastName: session?.user.lastName,
                assignedToEmail: session?.user.email,
              }),
            });
            router.push(`/sites/${siteresp.data.id}/response/new`);
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError('An enxpected error occurred.');
          }
        })}
      >
        <Grid xs={12}>
          <Card
            variant="outlined"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'column',
              borderRadius: 1,
              marginBottom: 2,
              padding: 3,
            }}
          >
            <Typography
              variant="h6"
              textTransform="uppercase"
              lineHeight={1}
              textAlign={'center'}
            >
              New Site
            </Typography>
          </Card>
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
        <Grid xs={12} mt={2}>
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
              <Grid container flex={1}>
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
                      Add New Site{' '}
                      {isSubmitting && (
                        <CircularProgress size={20} sx={{ ml: 1 }} />
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </form>
    </Container>
  );
};

export default NewSitePage;
