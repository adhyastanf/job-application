'use client';

import { EmptyState } from '@/components/EmptyState';
import PageContainer from '@/components/layout/page-container';
import TableSkeleton from '@/components/Loading/LoadingTableSkeleton';
import { DataTable } from '@/components/Table/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCandidateStore } from '@/lib/store/useCandidateStore';
import { useEffect } from 'react';

export default function ManageJobPage() {
  const { candidates, loading, fetchCandidates } = useCandidateStore((state) => state);

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-6 h-full'>
        <h2 className='font-bold'>Frontend Developer</h2>
        <Card className='flex-1'>
          <CardContent className='h-full '>
            <TableManageCandidate data={candidates} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

function TableManageCandidate({ data, loading }) {
  if (loading) {
    return <TableSkeleton columnCount={7} rowCount={6} />;
  }

  if (data.length === 0) {
    return <EmptyState title='No candidates found' description='Share your job vacancies so that more candidates will apply' />;
  }

  const candidates = data.data.map((item) => {
    const flat = item.attributes.reduce((acc, attr) => {
      acc[attr.label] = attr.value;
      return acc;
    }, {});
    flat.id = item.id;
    return flat;
  });

  const dynamicColumns = Object.keys(candidates[0])
    .filter((label) => label !== 'id')
    .map((label) => ({
      accessorKey: label,
      header: label,
      cell: ({ row }) => {
        const value = row.getValue(label);
        if (label === 'LinkedIn') {
          return (
            <a href={value} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
              {value}
            </a>
          );
        }
        return value;
      },
    }));

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='border-primary'
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
      enableSorting: false,
      enableHiding: false,
    },
    ...dynamicColumns,
  ];

  return <DataTable columns={columns} data={candidates} />;
}
