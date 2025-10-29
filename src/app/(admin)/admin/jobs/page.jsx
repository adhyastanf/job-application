'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { fields } from './constant';
import { jobSchema } from '@/lib/schema';
import ModalJobOpening from './ModalJobOpening';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { useJobStore } from '@/lib/store/useJobStore';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';

export default function AdminPage() {
  const { jobs, loading, fetchJobs } = useJobStore((state) => state);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex gap-4'>
          <section className='flex-1 space-y-4'>
            <InputGroup>
              <InputGroupInput placeholder='Search by job details' required />
              <InputGroupAddon className='text-primary' align='inline-end'>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <JobList data={jobs} loading={loading} />
          </section>
          <CardSidebar />
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
      <Card className='gap-3'>
        <CardHeader>
          <div className='flex space-x-4'>
            {badgeComponent(status)}
            <Badge variant='outline' className='border border-neutral/10 rounded-sm px-4 py-2'>
              {started_on_text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='flex justify-between'>
          <div>
            <p className='font-bold text-xl'>{title}</p>
            <p>{display_text}</p>
          </div>
          <Link href={`/admin/jobs/${slug}-${id}`}>
            <Button className='self-end'>{cta}</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

function CardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Card className='self-start flex'>
      <CardContent className='text-neutral/10'>
        <p className='text-xl'>Recruit the best candidate</p>
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
