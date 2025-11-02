'use client';
import { EmptyState } from '@/components/EmptyState';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useJobStore } from '@/lib/store/useJobStore';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ModalJobOpening from './ModalJobOpening';

export default function AdminJobsPage() {
  const { jobs, loading, fetchJobs } = useJobStore((state) => state);
  const [search, setSearch] = useState('');

  const filterData = jobs.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-2'>
        {/* Tambahkan flex-col ke flex-row agar responsif */}
        <div className='flex flex-col lg:flex-row gap-4'>
          <section className='flex-1 space-y-4'>
            <InputGroup>
              <InputGroupInput placeholder='Search by job details' value={search} onChange={(e) => setSearch(e.target.value)} />
              <InputGroupAddon className='text-primary' align='inline-end'>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <JobList data={filterData} loading={loading} />
          </section>

          {/* Tambah class responsif agar pindah ke bawah di layar kecil */}
          <div className='lg:w-auto w-full'>
            <CardSidebar />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function JobList({ data, loading }) {
  const [open, setOpen] = useState(false);
  const isEmpty = data?.length === 0;
  const isLoading = loading;

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isEmpty) {
    return (
      <EmptyState>
        <p className='text-lg font-semibold'>No job openings available</p>
        <p className='text-gray-500'>Create a job opening now and start the candidate process.</p>
        <Button variant='secondary' onClick={() => setOpen(true)}>
          Create a new job
        </Button>
        <ModalJobOpening isOpen={open} onClose={() => setOpen(false)} />
      </EmptyState>
    );
  }

  return (
    <div className='space-y-4'>
      {data.map((job, idx) => {
        const { id, title, list_card, salary_range, status, slug } = job;
        const { display_text } = salary_range;
        const { cta, started_on_text } = list_card;
        return <CardJob id={id} title={title} display_text={display_text} status={status} cta={cta} slug={slug} started_on_text={started_on_text} key={idx} />;
      })}
    </div>
  );
}

function CardJob({ id, slug, title, display_text, cta, started_on_text, status }) {
  function badgeComponent(status) {
    const baseClass = 'border rounded-sm px-4 py-2 cursor-pointer select-none transition';

    if (status === 'active') {
      return <Badge className={`${baseClass} bg-success-surface text-success border-success-border hover:opacity-80`}>Active</Badge>;
    } else if (status === 'draft') {
      return <Badge className={`${baseClass} bg-secondary-surface text-secondary border-secondary-border hover:opacity-80`}>Draft</Badge>;
    } else {
      return <Badge className={`${baseClass} bg-destructive-surface text-destructive border-destructive-border hover:opacity-80`}>Inactive</Badge>;
    }
  }

  return (
    <>
      <Card className='gap-3 rounded-lg'>
        <CardHeader>
          <div className='flex flex-wrap gap-2'>
            {badgeComponent(status)}
            <Badge variant='outline' className='border border-neutral/10 rounded-sm px-4 py-2'>
              {started_on_text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col md:flex-row justify-between gap-4'>
          <div>
            <p className='font-bold text-xl'>{title}</p>
            <p>{display_text}</p>
          </div>
          <Link href={`/admin/jobs/${slug}-${id}`}>
            <Button className='self-start md:self-end'>{cta}</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

function CardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Card
      className='self-start flex bg-cover bg-center bg-no-repeat text-white mt-4 lg:mt-0'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/create-job.jpg')`,
      }}
    >
      <CardContent>
        <p className='font-semibold'>Recruit the best candidate</p>
        <p className='text-sm'>Create jobs, invite, and hire with ease</p>
      </CardContent>
      <CardFooter className='flex-1'>
        <Button className='w-full' onClick={() => setOpen(true)}>
          Create a new job
        </Button>
      </CardFooter>
      <ModalJobOpening isOpen={open} onClose={() => setOpen(false)} />
    </Card>
  );
}
