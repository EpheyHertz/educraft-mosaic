
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAdmin, isTeacher, isStudent } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const success = await login(data.email, data.password);
      
      if (success) {
        // Navigate based on role - we'll redirect in useEffect after auth state changes
        setTimeout(() => {
          if (isAdmin) {
            navigate('/admin');
          } else if (isTeacher) {
            navigate('/teacher');
          } else if (isStudent) {
            navigate('/student');
          } else {
            navigate('/');
          }
        }, 500); // Small timeout to let auth state propagate
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-24">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary py-6 px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-blue-100">Sign in to access your account</p>
        </div>
        
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/auth" className="font-medium text-primary hover:text-primary/80">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
