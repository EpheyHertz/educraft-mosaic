
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TeacherDetail } from '@/integrations/supabase/types.d';
import { toast } from 'sonner';

export const useTeacherData = (teacherId?: string) => {
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState<TeacherDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!teacherId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('teacher_details')
          .select('*, profiles(*)')
          .eq('teacher_id', teacherId)
          .single();
          
        if (error) throw error;
        
        setTeacherData(data);
      } catch (error: any) {
        console.error('Error fetching teacher data:', error);
        setError(error.message);
        toast.error('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeacherData();
  }, [teacherId]);
  
  return { teacherData, loading, error };
};
