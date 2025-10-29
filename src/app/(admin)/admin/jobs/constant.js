import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const options = [
  {
    value: 'mandatory',
    label: 'mandatory',
  },
  {
    value: 'optional',
    label: 'optional',
  },
  {
    value: 'off',
    label: 'off',
  },
];

export const fields = [
  {
    name: 'fullname',
    label: 'Full Name',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional', disabled: true },
      { label: 'Off', value: 'off', disabled: true },
    ],
  },
  {
    name: 'profile',
    label: 'Photo Profile',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional', disabled: true },
      { label: 'Off', value: 'off', disabled: true },
    ],
  },
  {
    name: 'gender',
    label: 'Gender',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    name: 'domicile',
    label: 'Domicile',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional', disabled: true },
      { label: 'Off', value: 'off', disabled: true },
    ],
  },
  {
    name: 'phone',
    label: 'Phone Number',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    name: 'linkedin',
    label: 'Linkedin link',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional' },
      { label: 'Off', value: 'off' },
    ],
  },
  {
    name: 'birth',
    label: 'Date of birth',
    options: [
      { label: 'Mandatory', value: 'mandatory' },
      { label: 'Optional', value: 'optional' },
      { label: 'Off', value: 'off' },
    ],
  },
];

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label='Select all' className='border-primary' />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'full_name',
    header: <div className='text-left'>NAMA LENGKAP</div>,
    cell: ({ row }) => <div className='capitalize text-left'>{row.getValue('full_name')}</div>,
  },
  {
    accessorKey: 'email',
    header: <div className='text-left'>EMAIL ADDRESS</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: <div className='text-left'>PHONE NUMBERS</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'date_of_birth',
    header: <div className='text-left'>DATE OF BIRTH</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{'31 Januari 2001'}</div>,
  },
  {
    accessorKey: 'domicile',
    header: <div className='text-left'>DOMICILE</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{row.getValue('domicile')}</div>,
  },
  {
    accessorKey: 'gender',
    header: <div className='text-left'>GENDER</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{row.getValue('gender')}</div>,
  },
  {
    accessorKey: 'linkedin_link',
    header: <div className='text-left'>LINK LINKEDIN</div>,
    cell: ({ row }) => <div className='lowercase text-left'>{row.getValue('linkedin_link')}</div>,
  },
];

export const dummy = [
  {
    fullname: 'Adhyasta Naufal Faadhilah',
    email: 'adhyasta.faadhilah@example.com',
    phone: '+62 812-3456-7890',
    birth: '2001-06-15',
    domicile: 'Bandung, Indonesia',
    gender: 'male',
    linkedin: 'linkedin.com/in/adhyasta',
  },
  {
    fullname: 'Nadia Rahmawati',
    email: 'nadia.rahmawati@example.com',
    phone: '+62 813-9988-1122',
    birth: '1999-12-28',
    domicile: 'Jakarta, Indonesia',
    gender: 'female',
    linkedin: 'linkedin.com/in/nadiarahmawati',
  },
  {
    fullname: 'Rizky Pratama',
    email: 'rizky.pratama@example.com',
    phone: '+62 811-2233-4455',
    birth: '2000-03-09',
    domicile: 'Yogyakarta, Indonesia',
    gender: 'male',
    linkedin: 'linkedin.com/in/rizkypratama',
  },
  {
    fullname: 'Dewi Anggraini',
    email: 'dewi.anggraini@example.com',
    phone: '+62 822-3344-5566',
    birth: '1998-08-22',
    domicile: 'Surabaya, Indonesia',
    gender: 'female',
    linkedin: 'linkedin.com/in/dewianggraini',
  },
  {
    fullname: 'Fajar Nugraha',
    email: 'fajar.nugraha@example.com',
    phone: '+62 812-8899-6677',
    birth: '2002-04-11',
    domicile: 'Tegal, Indonesia',
    gender: 'male',
    linkedin: 'linkedin.com/in/fajarnugraha',
  },
];
