'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingApplicantJobSkeleton() {
  return (
    <div className='flex space-x-6 h-full'>
      <ScrollArea className='min-w-[406px] pr-4'>
        <div className='space-y-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className='border-2'>
              <CardHeader className='flex space-x-4 items-center'>
                <Skeleton className='w-12 h-12 rounded-sm' />
                <div className='space-y-2 flex-1'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-3 w-1/2' />
                </div>
              </CardHeader>
              <CardContent className='space-y-2'>
                <Skeleton className='h-3 w-1/2' />
                <Skeleton className='h-3 w-1/3' />
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className='flex-1 h-full'>
        <Card className='h-full flex flex-col'>
          <CardHeader className='gap-0'>
            <div className='flex justify-between items-center'>
              <div className='flex space-x-4 items-center'>
                <Skeleton className='w-12 h-12 rounded-sm' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
              <Skeleton className='h-8 w-24 rounded-md' />
            </div>
            <Separator className='my-6' />
          </CardHeader>
          <CardContent className='flex-1 space-y-2'>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className='h-3 w-full' />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
