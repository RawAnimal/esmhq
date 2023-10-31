import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

export default function Home() {
  const data = [
    {
      name: 'John', // key "name" matches `accessorKey` in ColumnDef down below
      age: 30, // key "age" matches `accessorKey` in ColumnDef down below
    },
    {
      name: 'Sara',
      age: 25,
    },
  ];

  return <div>Main Page</div>;
}
