
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/integrations/supabase/types.d';
import { toast } from 'sonner';

export const useCourses = (teacherId?: string) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('courses')
          .select('*, departments(*), profiles!courses_teacher_id_fkey(*)');
        
        if (teacherId) {
          query = query.eq('teacher_id', teacherId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        setCourses(data || []);
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        setError(error.message);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [teacherId]);
  
  return { courses, loading, error };
};
