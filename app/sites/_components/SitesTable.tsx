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
import { Link as MuiLink, Box } from '@mui/material/';
import SiteStatusBadge from './SiteStatusBadge';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, IconButton, Tooltip, Alert } from '@mui/material';
import IconTT from '@/app/icons/IconTT';
import { PrintSharp } from '@mui/icons-material';
import LinkOffIcon from '@mui/icons-material/LinkOff';

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Site {
  id: number;
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
  const [isError, setError] = useState(false);

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
        Cell: ({ cell, row }) => (
          <Link href={`/sites/${row.original.id}`} passHref>
            <MuiLink
              sx={{ fontWeight: 600, textDecoration: 'none' }}
              underline="none"
              component="button"
            >
              {row.original.streetNumberName}, {row.original.cityTown},{' '}
              {row.original.province}
            </MuiLink>
          </Link>
        ),
      },
      {
        accessorKey: 'clName',
        header: 'Client',
      },
      {
        accessorFn: (row) =>
          `${row.clCompany} ${row.locID ? ' - ' + row.locID : ''}`,
        id: 'clCompany',
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
        Header: () => <IconTT fSize="small" bgFill="#c23138" />,
        header: 'Tracktik',
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <div>
            {row.original.schedulerURL ? (
              <Link target="_blank" href={row.original.schedulerURL} passHref>
                <MuiLink component="button">
                  <InsertLinkIcon />
                </MuiLink>
              </Link>
            ) : (
              <LinkOffIcon />
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
        // muiFilterCheckboxProps: {
        //   defaultChecked: true,
        // },
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
      <Typography variant="h6">Sites</Typography>
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
  if (!data) setError(true);

  return (
    <>
      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => {
            setError(false);
          }}
          variant="outlined"
        >
          There are issues reaching the database. Please try again.
        </Alert>
      )}
      <MaterialReactTable table={table} />
    </>
  );
};

export default SitesTable;
