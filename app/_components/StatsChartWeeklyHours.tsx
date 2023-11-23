'use client';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Label,
  Tooltip,
  Rectangle,
  ComposedChart,
  Line,
  Legend,
} from 'recharts';

interface Year {
  f0: string;
}

const StatsChartWeeklyHours = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const currentYear = dayjs().year().toString();
    const fetchStats = async () => {
      const response = await fetch(`/api/sites/stats/` + currentYear);
      const newData = await response.json();
      setStats(newData);
    };
    fetchStats();
  }, []);

  const {
    data: years,
    error,
    isLoading,
  } = useQuery<Year[]>({
    queryKey: ['years'],
    queryFn: () => axios.get('/api/sites/year').then((res) => res.data),
    staleTime: 60000,
    retry: 3,
  });
  const handleChange = async (event: SelectChangeEvent) => {
    const fetchStats = async () => {
      const response = await fetch(`/api/sites/stats/` + event.target.value);
      const newData = await response.json();
      setStats(newData);
    };
    fetchStats();
  };

  if (error) return null;

  if (isLoading) return 'Loading...';

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Sites Start/End Per Week" />
        <CardContent>
          <ResponsiveContainer width="99%" aspect={2}>
            <ComposedChart
              data={stats}
              margin={{
                top: 60,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis dataKey="f1" />
              <YAxis />
              <Tooltip
                labelFormatter={(f1) => {
                  return `Week: ${f1}`;
                }}
              />
              <Legend />
              <Line
                name="Started"
                type="monotone"
                dataKey="f2"
                stroke="#d97a39"
                strokeWidth={1.5}
              />
              <Line
                name="Ended"
                type="monotone"
                dataKey="f3"
                stroke="#000000"
                strokeWidth={1.5}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
        <CardHeader title="Total Active Per Week" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 12,
              }}
            >
              <XAxis dataKey="f1">
                <Label value="Week Number" offset={0} position="bottom" />
              </XAxis>
              <YAxis />
              <Tooltip
                labelFormatter={(f1) => {
                  return `Week: ${f1}`;
                }}
              />
              <Bar
                name="Active"
                dataKey="f4"
                fill="#d97a39"
                activeBar={<Rectangle stroke="#656669" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardActions>
          <FormControl fullWidth>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              label="Year"
              onChange={handleChange}
              defaultValue={dayjs().year().toString()}
            >
              <MenuItem key={0} value="ALL">
                All
              </MenuItem>
              {years?.map((year) => (
                <MenuItem key={year.f0} value={year.f0}>
                  {year.f0}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardActions>
      </Card>
    </>
  );
};

export default StatsChartWeeklyHours;
