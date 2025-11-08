'use client';

import { EmptyStateListIcon } from '@/components/assets/EmptyStateList';
import { EmptyState } from '@/components/EmptyState';
import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useJobStore } from '@/lib/store/useJobStore';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CandidateJobListPage() {
  const { jobs, loading, fetchJobs } = useJobStore((state) => state);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PageContainer scrollable={false}>
      <main className='h-full flex-col'>
        <CardJobList data={jobs} loading={loading} />
      </main>
    </PageContainer>
  );
}

function CardJobList({ data, loading }) {
  const isEmpty = data.length === 0;

  if (loading) {
    return <div>loading...</div>;
  }

  if (isEmpty) {
    return <EmptyState icon={<EmptyStateListIcon />} title='No job openings available' description='Please wait for the next batch of openings.' />;
  }

  const [activeId, setActiveId] = useState(data[0].id);
  const filterDataByStatus = data.filter((item) => item.status === 'active');
  const activeJob = filterDataByStatus.find((job) => job.id === activeId);

  function handleClick(id) {
    setActiveId(id);
  }

  return (
    <div className='flex space-x-6 h-full'>
      <ScrollArea className='min-w-[406px] pr-4'>
        <div className='space-y-4'>
          {filterDataByStatus.map((job, idx) => {
            const { id, title, salary_range } = job;
            return <CardJob id={id} title={title} display_text={salary_range.display_text} onClick={handleClick} key={idx} isActive={activeId === id} />;
          })}
        </div>
      </ScrollArea>

      <div className='h-full flex-1'>
        <CardDescription data={activeJob} />
      </div>
    </div>
  );
}

function CardJob({ id, title, display_text, onClick, isActive }) {
  return (
    <Card className={clsx('transition border-2 cursor-pointer', isActive ? 'border-primary-hover bg-success-surface' : 'hover:border-primary-hover')} onClick={() => onClick(id)}>
      <CardHeader className='flex space-x-4'>
        <Avatar className='rounded-sm w-12 h-12 border-neutral/40'>
          <AvatarImage src='https://github.com/evilrabbit.png' alt='@evilrabbit' />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <div className='space-y-1 text-sm text-neutral/90'>
          <p className='font-bold'>{title}</p>
          <p className='text-neutral/70'>Rakamin</p>
        </div>
      </CardHeader>
      <CardContent className='space-y-1 text-neutral/80 text-xs'>
        <p>Jakarta Selatan</p>
        <p>{display_text}</p>
      </CardContent>
    </Card>
  );
}

function CardDescription({ data }) {
  const { id, title, jobDesc, slug } = data;

  return (
    <Card className='h-full flex flex-col gap-0'>
      <CardHeader className='gap-0'>
        <div className='flex justify-between shrink-0'>
          <div className='flex space-x-4'>
            <Avatar className='rounded-sm w-12 h-12 border-neutral/40'>
              <AvatarImage src='https://github.com/evilrabbit.png' alt='@evilrabbit' />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <Badge className='rounded-sm border-success px-2 py-1'>Full-Time</Badge>
              <p className='font-bold text-sm'>{title}</p>
              <p className='text-sm text-neutral/70'>Rakamin</p>
            </div>
          </div>
          <Link href={`/applicant/jobs/${slug}`}>
            <Button variant='secondary'>Apply Job</Button>
          </Link>
        </div>
        <Separator className='my-6' />
      </CardHeader>
      <CardContent className='flex-1 overflow-hidden'>
        <ScrollArea className='h-full '>
          <ul className='list-disc list-outside pl-6 space-y-2'>
            <li>Additional job description item 1</li>
            <li>Additional job description item 2</li>
            <li>Additional job description item 3</li>
            <li>Additional job description item 4</li>
            <li>Additional job description item 5</li>
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
