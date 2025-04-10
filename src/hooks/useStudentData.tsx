
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StudentDetail } from '@/integrations/supabase/types.d';
import { toast } from 'sonner';

export const useStudentData = (studentId?: string) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<StudentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('student_details')
          .select('*, profiles(*)')
          .eq('student_id', studentId)
          .single();
          
        if (error) throw error;
        
        setStudentData(data);
      } catch (error: any) {
        console.error('Error fetching student data:', error);
        setError(error.message);
        toast.error('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [studentId]);
  
  return { studentData, loading, error };
};
