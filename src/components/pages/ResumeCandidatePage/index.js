'use client';

import HandDetector from '@/components/Camera';
import CommandComponent from '@/components/command';
import PageContainer from '@/components/layout/page-container';
import Modal from '@/components/modal';
import PopoverComponent from '@/components/popover';
import SuccessComponent from '@/components/SuccessComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { generateResumeSchema } from '@/lib/schema';
import { useJobStore } from '@/lib/store/useJobStore';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns/format';
import { ArrowLeft, CalendarIcon, ChevronDown, ChevronRight, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { domicileOptions, listCountry } from './constant';

export default function ResumeCandidatePage({ jobConfigs }) {
  const [controls, setControls] = useState(null);
  const [success, setSuccess] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(false);
  const [selected, setSelected] = useState(listCountry[0]);
  const [open, setOpen] = useState(false);
  const { jobConfig, loadingConfig, fetchJobConfig } = useJobStore((state) => state);

  const resumeSchema = useMemo(() => {
    if (!jobConfigs) return null;
    return generateResumeSchema(jobConfigs);
  }, [jobConfigs]);

  function isFieldRequired(config, key) {
    const field = config?.application_form?.sections?.[0]?.fields?.find((f) => f.key === key);
    return field?.validation?.required === true;
  }

  const form = useForm({
    resolver: resumeSchema ? zodResolver(resumeSchema) : undefined,
    defaultValues: {
      photo_profile: '',
      full_name: '',
      date_of_birth: '',
      gender: '',
      domicile: '',
      phone_number: '',
      email: '',
      linkedin_link: '',
    },
  });

  const captured = form.watch('photo_profile');

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setSuccess(true);
  };

  // useEffect(() => {
  //   fetchJobConfig();
  // }, [fetchJobConfig]);

  const handlePhotoCaptured = useCallback((img) => {
    setCapturedPhoto(img);
  }, []);

  const handleHandDetectorReady = useCallback((api) => {
    setControls(api);
  }, []);

  const handleRetakePhoto = () => {
    if (controls?.resetGesture) {
      controls.resetGesture();
      setCapturedPhoto(null);
    }
  };

  const handleSubmitPhoto = () => {
    if (capturedPhoto) {
      form.setValue('photo_profile', capturedPhoto);
      setOpen(false);
      alert('📸 Foto berhasil dimasukkan ke form!');
    } else {
      alert('Belum ada foto yang diambil!');
    }
  };

  // if (loadingConfig) return <div>Loading config...</div>;

  if (success) return <SuccessComponent />;

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-2 h-full'>
        <Card className='min-w-[700px] mx-auto flex flex-col h-full'>
          <CardHeader className='flex justify-between'>
            <div className='flex items-center space-x-2'>
              <Link href={'/applicant/jobs'}>
                <Button variant='outline'>
                  <ArrowLeft />
                </Button>
              </Link>
              <p className='font-bold'>Apply Front End at Rakamin</p>
            </div>
            <p>ℹ️ This field is required to fill.</p>
          </CardHeader>

          <ScrollArea className='flex-1 overflow-hidden'>
            <CardContent>
              <p className='mb-4 text-destructive text-xs'>* Required</p>
              <Form {...form}>
                <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)} id='form-application'>
                  <FormField
                    control={form.control}
                    name='photo_profile'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold block space-y-2'>
                          <div>Photo Profile</div>
                          <Avatar className='rounded-sm w-36 h-36'>
                            <AvatarImage src={captured || 'https://github.com/shadcn.png'} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </FormLabel>

                        {/* Tombol buka modal */}
                        <Button type='button' variant='outline' className='max-w-36 flex items-center space-x-2' onClick={() => setOpen(true)}>
                          <Upload />
                          Take a Picture
                        </Button>

                        <FormControl>
                          <Input type='hidden' {...field} value={captured || ''} />
                        </FormControl>

                        <FormMessage />

                        <Modal title='Raise your hand to capture' description="We'll take a photo once your hand pose is detected" isOpen={open} onClose={() => setOpen(false)} separator={false} className='min-w-[640px] space-y-4'>
                          <div className='space-y-4'>
                            <div className='bg-muted flex items-center justify-center overflow-hidden'>
                              <HandDetector onPhotoCaptured={handlePhotoCaptured} onReady={handleHandDetectorReady} />
                            </div>

                            <div className='space-y-4'>
                              <p className='text-xs'>To take a picture, follow the hand poses in the order shown below. The system will automatically capture the image once the final pose is detected.</p>

                              <div className='flex items-center justify-center space-x-4 flex-1'>
                                {!capturedPhoto ? (
                                  <>
                                    <Image src='/pose3.png' width={50} height={50} alt='pose-3' />
                                    <ChevronRight />
                                    <Image src='/pose2.png' width={50} height={50} alt='pose-2' />
                                    <ChevronRight />
                                    <Image src='/pose1.png' width={50} height={50} alt='pose-1' />
                                  </>
                                ) : (
                                  <>
                                    <Button type='button' onClick={handleRetakePhoto}>
                                      Retake Photo
                                    </Button>
                                    <Button type='button' onClick={handleSubmitPhoto}>
                                      Submit
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='full_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-normal'>
                          Full Name
                          {isFieldRequired(jobConfigs, 'full_name') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Enter your full name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='date_of_birth'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel className='text-xs font-normal'>
                          Date of Birth
                          {isFieldRequired(jobConfigs, 'date_of_birth') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant='outline' className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} captionLayout='dropdown' />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel className='text-xs font-normal'>
                          Pronoun (gender)
                          {isFieldRequired(jobConfigs, 'gender') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex items-center space-x-2'>
                            <FormItem className='flex items-center space-x-2'>
                              <FormControl>
                                <RadioGroupItem value='female' />
                              </FormControl>
                              <FormLabel className='font-normal'>She/her (Female)</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-2'>
                              <FormControl>
                                <RadioGroupItem value='male' />
                              </FormControl>
                              <FormLabel className='font-normal'>He/him (Male)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='domicile'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-normal'>
                          Domicile
                          {isFieldRequired(jobConfigs, 'domicile') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select domicile' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {domicileOptions.map((val, idx) => (
                                <SelectItem value={val.value} key={idx}>
                                  {val.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-normal'>
                          Phone Number
                          {isFieldRequired(jobConfigs, 'phone_number') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <InputGroup>
                          <FormControl>
                            <InputGroupInput placeholder='81xxxxxxx' {...field} />
                          </FormControl>
                          <InputGroupAddon>
                            <PopoverComponent
                              trigger={
                                <div className='flex items-center cursor-pointer'>
                                  {selected.flag}
                                  <ChevronDown size={20} />
                                </div>
                              }
                            >
                              <CommandComponent list={listCountry} onSelect={setSelected} />
                            </PopoverComponent>
                            <p>{selected.numberCode}</p>
                          </InputGroupAddon>
                        </InputGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-normal'>
                          Email
                          {isFieldRequired(jobConfigs, 'email') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input type='email' placeholder='Enter your email address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='linkedin_link'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-normal'>
                          Linkedin Link
                          {isFieldRequired(jobConfigs, 'linkedin_link') && <span className='text-red-500'>*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='https://linkedin.com/in/username' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </ScrollArea>

          <Separator />
          <CardFooter>
            <Button className='w-full' type='submit' form='form-application'>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
