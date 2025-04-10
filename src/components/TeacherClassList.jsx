
import React, { useState, useEffect } from 'react';
import { Users, BookOpen, MoreVertical, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const TeacherClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('courses')
          .select(`
            id, 
            name, 
            code,
            status,
            description,
            teacher_id,
            department_id,
            departments(name),
            enrollments(id)
          `)
          .eq('teacher_id', user?.id);
          
        if (error) throw error;
        
        // Transform data to include student count
        const transformedData = data.map(course => ({
          id: course.id,
          name: course.name,
          grade: course.departments?.name || 'Unknown Department',
          students: course.enrollments ? course.enrollments.length : 0,
          room: `Room ${Math.floor(Math.random() * 300) + 100}`,  // Mock data for now
          time: '8:30 AM - 9:45 AM',  // Mock data for now
          days: 'Mon, Wed, Fri'  // Mock data for now
        }));
        
        setClasses(transformedData);
      } catch (error) {
        console.error('Error fetching classes:', error);
        toast.error('Failed to load classes');
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchClasses();
    }
  }, [user?.id]);

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">My Classes</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search classes..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <span>Add New Class</span>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                            <BookOpen size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{cls.name}</div>
                            <div className="text-sm text-gray-500">{cls.grade}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <Users size={16} className="mr-2 text-gray-400" />
                          <span>{cls.students} students</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{cls.room}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{cls.time}</div>
                          <div className="text-gray-500">{cls.days}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80 transition-colors">
                            View
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      {searchTerm ? 'No classes found matching your search' : 'No classes found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassList;
