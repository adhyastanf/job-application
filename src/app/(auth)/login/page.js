'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/client/auth-client';
import { loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          toast.loading('Please wait...');
        },
        onSuccess: () => {
          toast.success('You has registered');

          navigate.push('/admin/jobs');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'Something went wrong.');
        },
      }
    );
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[500px]'>
        <Card className='py-10 gap-4'>
          <CardHeader className='px-10'>
            <CardTitle className=''>Bergabung dengan Rakamin</CardTitle>
            <CardDescription className='text-neutral'>
              Belum punya akun?{' '}
              <Link href='/register' className='text-blue-500'>
                Daftar menggunakan email
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className='px-10'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=''>Alamat Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='Enter your email address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=''>Kata Sandi</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='Enter your password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex items-center justify-between'>
                  <Button type='submit' variant='secondary' className='w-full'>
                    Masuk
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
