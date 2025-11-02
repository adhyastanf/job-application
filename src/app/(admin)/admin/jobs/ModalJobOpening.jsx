'use client';

import Modal from '@/components/modal';
import { jobSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormJobOpening from './FormJobOpening';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ModalJobOpening({ isOpen, onClose }) {
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobName: '',
      jobType: '',
      jobDesc: '',
      candidate: '',
      minSalary: '',
      maxSalary: '',
      fullname: '',
      profile: '',
      gender: '',
      domicile: '',
      linkedin: '',
      email: '',
      phone: '',
      birth: '',
    },
  });

  function handleSubmit(data) {
    onClose();
    form.reset();
  }

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className='p-0 gap-0 min-w-[900px] mx-auto h-[78vh] flex flex-col'>
        <DialogHeader className='p-6'>
          <DialogTitle>Job Opening</DialogTitle>
        </DialogHeader>
        <Separator />
        <ScrollArea className='flex-1 space-y-4 px-6 overflow-hidden'>
          <FormJobOpening form={form} onSubmit={handleSubmit} />
        </ScrollArea>
        <Separator />
        <div className='flex justify-end p-6'>
          <Button type='submit'>Publish Job</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 'use client';

// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Separator } from '../ui/separator';

// export default function Modal({ title, description, isOpen = false, onClose, children, className }) {
//   const onChange = (open) => {
//     if (!open) {
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onChange}>
//       <DialogContent className={className}>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <Separator />
//         <div>{children}</div>
//       </DialogContent>
//     </Dialog>
//   );
// }
