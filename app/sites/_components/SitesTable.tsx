'use client';
import { useMemo, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import SiteStatusBadge from './SiteStatusBadge';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Link } from '@mui/material';
import IconTT from '@/app/icons/IconTT';

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Site {
  startDate: Date;
  streetNumberName: string;
  cityTown: string;
  province: string;
  locID: string;
  estHours: number;
  schedulerURL: string;
  clName: string;
  clCompany: string;
  status: boolean;
}

const SitesTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sites')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  console.log(data);
  const columns = useMemo<MRT_ColumnDef<Site>[]>(
    () => [
      {
        accessorFn: (row) =>
          `${row.streetNumberName}, ${row.cityTown}, ${row.province}`,
        id: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'clName',
        header: 'Client',
      },
      {
        accessorFn: (row) =>
          `${row.clCompany} ${row.locID ? ' - ' + row.locID : ''}`,
        id: 'company',
        header: 'Company',
      },
      {
        accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
        id: 'startDate',
        header: 'Start Date',
        sortingFn: 'datetime',
        enableColumnFilter: false,
        Cell: ({ cell }) => cell.getValue<Date>()?.toJSON().slice(0, 10),
        maxSize: 100,
      },
      {
        accessorKey: 'estHours',
        header: 'Est Hrs',
        enableColumnFilter: false,
        maxSize: 100,
      },
      {
        accessorFn: (row) => `${row.schedulerURL}`,
        Header: ({ column }) => <IconTT fSize="small" />,
        header: 'scheduleURL',
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <div>
            {row.original.schedulerURL ? (
              <Link target="_blank" href={row.original.schedulerURL}>
                <InsertLinkIcon
                  sx={{
                    ':hover': { color: 'orange' },
                    color: 'black',
                  }}
                />
              </Link>
            ) : (
              ''
            )}
          </div>
        ),
        maxSize: 75,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        accessorFn: (originalRow) => (originalRow.status ? 'true' : 'false'), //must be strings
        id: 'status',
        filterVariant: 'checkbox',
        muiFilterCheckboxProps: {
          defaultChecked: true,
        },
        Cell: ({ cell, row }) => (
          <SiteStatusBadge status={row.original.status} />
        ),
        maxSize: 125,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showColumnFilters: false,
      columnFilters: [{ id: 'status', value: true }],
      sorting: [{ id: 'clCompany', desc: false }],
      pagination: { pageIndex: 0, pageSize: 50 },
      density: 'compact',
      expanded: true,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default SitesTable;
