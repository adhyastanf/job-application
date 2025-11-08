import { z } from 'zod';

export const jobSchema = z
  .object({
    jobName: z.string().nonempty('Job name is required'),
    jobType: z.string().nonempty('Job Type is required'),
    jobDesc: z.string().nonempty('Job Description is required').optional(),
    candidate: z
      .string()
      .nonempty('Number of candidates is required')
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Must be a valid positive number',
      }),
    fullname: z.string().nonempty('Fullname is required'),
    profile: z.string().nonempty('Profile is required'),
    gender: z.string().nonempty('Gender is required'),
    domicile: z.string().nonempty('Domicile is required'),
    linkedin: z.string().nonempty('Linkedin is required'),
    email: z.string().nonempty('Email is required'),
    phone: z.string().nonempty('Phone Number is required'),
    birth: z.string().nonempty('Date of Birth is required'),
  })

export const resumeSchema = z.object({
  photo_profile: z.any().refine((val) => val !== null && val !== undefined, {
    message: 'Photo profile wajib diisi.',
  }),

  full_name: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter.' }).nonempty({ message: 'Nama lengkap wajib diisi.' }),

  date_of_birth: z.date({ required_error: 'Tanggal lahir wajib diisi.' }).refine((date) => date <= new Date() && date >= new Date('1900-01-01'), { message: 'Tanggal lahir tidak valid.' }),

  gender: z.enum(['male', 'female'], {
    required_error: 'Jenis kelamin wajib dipilih.',
  }),

  domicile: z.string().nonempty('Domicile is required'),

  phone_number: z
    .string()
    .min(8, { message: 'Nomor telepon minimal 8 digit.' })
    .max(15, { message: 'Nomor telepon maksimal 15 digit.' })
    .regex(/^[0-9]+$/, { message: 'Nomor telepon hanya boleh angka.' })
    .nonempty({ message: 'Nomor telepon wajib diisi.' }),

  email: z.string().email({ message: 'Format email tidak valid.' }).nonempty({ message: 'Email wajib diisi.' }),

  linkedin_link: z.string().url({ message: 'Link LinkedIn tidak valid.' }).nonempty({ message: 'Link LinkedIn wajib diisi.' }),
});

export function generateResumeSchema(config) {
  const fields = config?.application_form?.sections?.[0]?.fields || [];

  const shape = {};

  for (const field of fields) {
    const key = field.key;
    const required = field.validation?.required;

    switch (key) {
      case 'photo_profile':
        shape[key] = required ? z.string().min(1, { message: 'Photo is required' }) : z.string().optional();
        break;

      case 'full_name':
        shape[key] = required ? z.string().min(1, { message: 'Full name is required' }) : z.string().optional();
        break;

      case 'email':
        shape[key] = required ? z.string().email({ message: 'Invalid email address' }) : z.string().email().optional();
        break;

      case 'phone_number':
        shape[key] = required ? z.string().min(6, { message: 'Phone number is required' }) : z.string().optional();
        break;

      case 'linkedin_link':
        shape[key] = required ? z.string().url({ message: 'LinkedIn URL is required' }) : z.string().url().optional();
        break;

      case 'gender':
        shape[key] = required ? z.enum(['male', 'female'], { message: 'Gender is required' }) : z.enum(['male', 'female']).optional();
        break;

      case 'domicile':
        shape[key] = required ? z.string().min(1, { message: 'Domicile is required' }) : z.string().optional();
        break;

      case 'date_of_birth':
        shape[key] = required ? z.any().min(1, { message: 'Date of birth is required' }) : z.any().optional();
        break;

      default:
        shape[key] = z.any().optional();
    }
  }

  return z.object(shape);
}

export const loginSchema = z.object({
  email: z.string().nonempty('Email wajib diisi').email({ message: 'Alamat email tidak valid' }),
  password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
});
