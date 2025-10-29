'use client';

import Modal from '@/components/modal';
import { jobSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormJobOpening from './FormJobOpening';

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

  function handleClose() {
    onClose();
  }

  return (
    <Modal title='Job Opening' isOpen={isOpen} onClose={handleClose} className='max-w-4xl!'>
      <FormJobOpening form={form} onSubmit={handleSubmit} />
    </Modal>
  );
}
