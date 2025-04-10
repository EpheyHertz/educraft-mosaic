import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, BookOpen, Users, Award, FileText, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        
        // Fetch teacher profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*, teacher_details(*), departments(*)')
          .eq('id', id)
          .single();
          
        if (profileError) throw profileError;
        
        // Fetch courses taught by this teacher
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select(`
            id,
            name,
            code,
            enrollments(id)
          `)
          .eq('teacher_id', id);
          
        if (coursesError) throw coursesError;
        
        // Transform courses
        const courses = coursesData.map(course => ({
          id: course.id,
          title: course.name,
          code: course.code,
          students: course.enrollments ? course.enrollments.length : 0
        }));
        
        // Combine data
        const teacherData = {
          id,
          name: `${profileData.first_name || 'Dr.'} ${profileData.last_name || 'Smith'}`,
          image: profileData.avatar_url || 'https://randomuser.me/api/portraits/men/42.jpg',
          position: profileData.teacher_details?.qualification || 'Senior Professor',
          department: profileData.departments?.name || 'Science & Mathematics',
          email: profileData.email,
          phone: profileData.phone || '(555) 123-4567',
          office: 'Science Building, Room 305',
          officeHours: 'Monday & Wednesday, 2:00 PM - 4:00 PM',
          education: [
            { degree: 'Ph.D. in Mathematics', institution: 'Stanford University', year: '2010' },
            { degree: 'M.S. in Applied Mathematics', institution: 'MIT', year: '2006' },
            { degree: 'B.S. in Mathematics', institution: 'UC Berkeley', year: '2004' }
          ],
          bio: profileData.address || 'Experienced educator with a passion for teaching.',
          courses,
          publications: [
            'Smith, J., et al. (2022). "Novel Approaches to Mathematical Modeling." Journal of Applied Mathematics, 45(3), 112-128.',
            'Smith, J., & Johnson, A. (2020). "Statistical Analysis Methods for Educational Research." Educational Mathematics Review, 18(2), 78-95.',
            'Smith, J. (2018). "Advances in Computational Methods for Complex Systems." Computational Mathematics Journal, 29(4), 203-215.'
          ],
          awards: [
            'Excellence in Teaching Award (2021)',
            'Faculty Research Achievement Award (2019)',
            'Outstanding Mentor Award (2017)'
          ]
        };
        
        setTeacher(teacherData);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        toast.error('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!teacher) {
    return <div className="text-center py-10">Teacher not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teacher Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="bg-primary text-white p-6 text-center">
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover"
              />
              <h2 className="text-2xl font-bold mt-4">{teacher.name}</h2>
              <p className="text-blue-100">{teacher.position}</p>
              <p className="text-blue-100">{teacher.department}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>{teacher.email}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>{teacher.phone}</span>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p>{teacher.office}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p>{teacher.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {teacher.education.map((edu, index) => (
                <div key={index} className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}, {edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Awards & Recognition</h3>
            <ul className="space-y-2">
              {teacher.awards.map((award, index) => (
                <li key={index} className="flex items-start">
                  <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Teacher Information */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Biography</h3>
            <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Courses Taught</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacher.courses.map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <a 
                    href={`/course/${course.id}`} 
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {course.title}
                  </a>
                  <p className="text-gray-500">{course.code}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students} Students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Selected Publications</h3>
            <div className="space-y-4">
              {teacher.publications.map((publication, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <p className="text-gray-700">{publication}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
