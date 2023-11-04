'use client';
import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  type MRT_ColumnDef,
} from 'material-react-table';
import SiteStatusBadge from './SiteStatusBadge';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, IconButton, Tooltip } from '@mui/material';
import IconTT from '@/app/icons/IconTT';
import { PrintSharp } from '@mui/icons-material';

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
        Header: ({ column }) => (
          <Tooltip title="Tracktik">
            <IconTT fSize="small" bgFill="#757575" />
          </Tooltip>
        ),
        header: 'Tracktik',
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
    muiPaginationProps: {
      rowsPerPageOptions: [25, 50, 75, 100],
    },
    renderTopToolbarCustomActions: () => (
      <Typography variant="h6">ESM Sites</Typography>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* add your own custom print button or something */}
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <Tooltip title="Print">
          <IconButton onClick={() => window.print()}>
            <PrintSharp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add New Site">
          <Link href="/sites/new">
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </>
    ),
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
