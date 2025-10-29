'use client';

import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useJobStore } from '@/lib/store/useJobStore';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JobListPage() {
  const { jobs, loading, fetchJobs } = useJobStore((state) => state);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PageContainer scrollable={false}>
      <main className='flex space-x-6 bg-red-100 flex-1 flex-col space-y-2'>
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
    return <div>empty data</div>;
  }

  const [activeId, setActiveId] = useState(data[0].id);
  const filterDataByStatus = data.filter((item) => item.status === 'active');
  const activeJob = filterDataByStatus.find((job) => job.id === activeId);

  function handleClick(id) {
    setActiveId(id);
  }

  return (
    <div className='flex space-x-6 flex-1'>
      <div className='flex-1 space-y-4'>
        {filterDataByStatus.map((job, idx) => {
          const { id, title, salary_range } = job;
          return <CardJob id={id} title={title} display_text={salary_range.display_text} onClick={handleClick} key={idx} isActive={activeId === id} />;
        })}
      </div>
      <div className='flex-2'>
        <CardDescription data={activeJob} />
      </div>
    </div>
  );
}

function CardJob({ id, title, display_text, onClick, isActive }) {
  return (
    <Card className={clsx('transition border-2 cursor-pointer', isActive ? 'border-primary-hover ' : 'hover:border-primary-hover')} onClick={() => onClick(id)}>
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
    <Card>
      <CardHeader className='flex justify-between'>
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
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className='list-disc list-outside pl-6'>
          <li>{jobDesc}sfdfsfsd</li>
          <li>{jobDesc}sfdfsfsd</li>
          <li>{jobDesc}sfdfsfsd</li>
          <li>{jobDesc}sfdfsfsd</li>
          <li>{jobDesc}sfdfsfsd</li>
        </ul>
      </CardContent>
    </Card>
  );
}
