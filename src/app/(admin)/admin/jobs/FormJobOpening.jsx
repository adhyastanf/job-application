'use client';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { fields } from './constant';

export default function FormJobOpening({ form, onSubmit }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4 py-6'>
          <FormField
            control={form.control}
            name='jobName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal'>
                  Job Name<span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Ex. Front End Developer' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Type */}
          <FormField
            control={form.control}
            name='jobType'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal'>
                  Job Type<span className='text-red-500'>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} className='w-full'>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select job type' />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className='w-full'>
                    <SelectItem value='fulltime'>Full-time</SelectItem>
                    <SelectItem value='parttime'>Part-time</SelectItem>
                    <SelectItem value='internship'>Internship</SelectItem>
                    <SelectItem value='contract'>Contract</SelectItem>
                    <SelectItem value='freelance'>Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name='jobDesc'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal'>
                  Job Description<span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder='Describe the job position here...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Candidates */}
          <FormField
            control={form.control}
            name='candidate'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal'>
                  Number of Candidates<span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type='number' placeholder='Ex. 2' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p>Job Salary</p>

          <div className='flex space-x-2'>
            {/* Number of Minimum Salary */}
            <FormField
              control={form.control}
              name='minSalary'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel className='font-normal'>
                    Minimum Estimated Salary <span className='text-red-500'>*</span>
                  </FormLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <FormControl>
                        <InputGroupText className='font-bold text-neutral/90'>Rp</InputGroupText>
                      </FormControl>
                    </InputGroupAddon>
                    <InputGroupInput placeholder='7.000.000' {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Maximum Salary */}
            <FormField
              control={form.control}
              name='maxSalary'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel className='font-normal'>
                    Maximum Estimated Salary <span className='text-red-500'>*</span>
                  </FormLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <FormControl>
                        <InputGroupText className='font-bold text-neutral/90'>Rp</InputGroupText>
                      </FormControl>
                    </InputGroupAddon>
                    <InputGroupInput placeholder='7.000.000' {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CardProfileInformation form={form} />
        </div>
      </form>
    </Form>
  );
}

function CardProfileInformation({ form }) {
  return (
    <Card className='gap-4'>
      <CardHeader>
        <CardTitle className='font-bold'>Minimum Profile Information Required</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {fields.map((fieldItem, idx) => (
          <FormField
            key={fieldItem.name}
            control={form.control}
            name={fieldItem.name}
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <div className='flex items-center'>
                  <FormLabel className='font-normal'>{fieldItem.label}</FormLabel>
                  <FormControl>
                    <RadioGroupPrimitive.Root value={field.value} onValueChange={field.onChange} className='flex justify-end gap-3 flex-1'>
                      {fieldItem.options.map((option) => (
                        <RadioGroupPrimitive.Item
                          key={option.value}
                          value={option.value}
                          className={cn(buttonVariants({ variant: 'outline' }), 'data-[state=checked]:text-primary data-[state=checked]:border-primary rounded-full font-normal')}
                          disabled={option.disabled}
                        >
                          <span className='tracking-tight'>{option.label}</span>
                        </RadioGroupPrimitive.Item>
                      ))}
                    </RadioGroupPrimitive.Root>
                  </FormControl>
                </div>
                <FormMessage />
                {!(fields.length - 1 === idx) && <Separator />}
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}
