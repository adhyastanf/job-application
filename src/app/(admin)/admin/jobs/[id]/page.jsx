'use client';

import { EmptyState } from '@/components/EmptyState';
import PageContainer from '@/components/layout/page-container';
import { DataTable } from '@/components/Table/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { useCandidateStore } from '@/lib/store/useCandidateStore';
import { useEffect } from 'react';
import { columns } from '../constant';

export default function ManageJob() {
  const { candidates, loading, fetchCandidates } = useCandidateStore((state) => state);

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-6'>
        <h2 className='font-bold'>Frontend Developer</h2>
        <Card className='flex-1'>
          <CardContent>
            <TableManageCandidate data={candidates} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

function TableManageCandidate({ data, loading }) {
  if (loading) {
    return <div>loading...</div>;
  }

  if (data.length === 0) {
    return <EmptyState title='No candidates found' description='Share ypur job vacancies so that more candidates will apply' />;
  }
  return <DataTable columns={columns} data={data} />;
}
