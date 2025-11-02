import { Checkbox } from '@/components/ui/checkbox';

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


