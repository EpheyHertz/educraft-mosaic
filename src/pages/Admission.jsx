
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // First create a user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || Math.random().toString(36).slice(-8), // Generate random password if not provided
        options: {
          data: {
            first_name: data.fullName.split(' ')[0],
            last_name: data.fullName.split(' ').slice(1).join(' '),
            role: 'student'
          }
        }
      });
      
      if (authError) throw authError;
      
      // Update student details
      if (authData?.user) {
        const { error: detailsError } = await supabase
          .from('student_details')
          .update({
            guardian_name: data.guardianName,
            guardian_email: data.guardianEmail,
            guardian_phone: data.phone,
            current_grade: data.gradeLevel,
            admission_date: new Date().toISOString().split('T')[0],
            previous_school: data.previousSchool
          })
          .eq('student_id', authData.user.id);
        
        if (detailsError) throw detailsError;
      }
      
      toast.success('Application submitted successfully!');
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
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
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
              <label className="block text-sm font-medium mb-1">Guardian Name</label>
              <Input
                {...register('guardianName', { required: 'Guardian name is required' })}
                placeholder="Enter guardian's name"
              />
              {errors.guardianName && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Guardian Email</label>
              <Input
                type="email"
                {...register('guardianEmail')}
                placeholder="Enter guardian's email"
              />
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admission;
