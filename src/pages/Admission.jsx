
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Admission = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admission Application</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                {...register('fullName', { required: 'Full name is required' })}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                {...register('phone', { required: 'Phone number is required' })}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Desired Grade Level</label>
              <Input
                {...register('gradeLevel', { required: 'Grade level is required' })}
                placeholder="Enter desired grade level"
              />
              {errors.gradeLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.gradeLevel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Previous School</label>
              <Input
                {...register('previousSchool')}
                placeholder="Enter previous school name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Comments</label>
              <Textarea
                {...register('comments')}
                placeholder="Any additional information you'd like to share"
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admission;
