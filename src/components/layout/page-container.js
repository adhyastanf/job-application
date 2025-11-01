'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({ children, scrollable = true, className }) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-52px)]'>
          <div className='flex flex-1 p-4 md:px-6'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='h-[calc(100dvh-52px)]'>
          <div className='p-4 md:px-6 h-full'>{children}</div>
        </div>
      )}
    </>
  );
}
