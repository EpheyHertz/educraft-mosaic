import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, GraduationCap, Calendar, Award, BarChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        
        // Fetch student profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*, student_details(*)')
          .eq('id', id)
          .single();
          
        if (profileError) throw profileError;
        
        // Fetch enrollments and courses
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            id,
            course_id,
            courses(
              id,
              name,
              profiles(first_name, last_name)
            ),
            grades(grade_value)
          `)
          .eq('student_id', id);
          
        if (enrollmentsError) throw enrollmentsError;
        
        // Transform enrollments to courses array
        const courses = enrollmentsData.map(enrollment => ({
          id: enrollment.course_id,
          name: enrollment.courses?.name || 'Unknown Course',
          grade: enrollment.grades?.[0]?.grade_value || 'N/A',
          teacher: enrollment.courses?.profiles ? 
            `${enrollment.courses.profiles.first_name} ${enrollment.courses.profiles.last_name}` : 
            'Unknown Teacher'
        }));
        
        // Combine data
        const studentData = {
          id,
          name: `${profileData.first_name} ${profileData.last_name}`,
          image: profileData.avatar_url || 'https://randomuser.me/api/portraits/women/67.jpg',
          grade: profileData.student_details?.current_grade || 'Unknown Grade',
          enrollmentYear: profileData.student_details?.admission_date ? 
            new Date(profileData.student_details.admission_date).getFullYear().toString() : 
            'Unknown',
          major: 'Science', // Mock data for now
          gpa: '3.8', // Mock data for now
          email: profileData.email,
          phone: profileData.phone || 'Not provided',
          dateOfBirth: profileData.birth_date || 'Not provided',
          address: profileData.address || 'Not provided',
          parentName: profileData.student_details?.guardian_name || 'Not provided',
          parentContact: profileData.student_details?.guardian_phone || 'Not provided',
          courses,
          attendance: 95, // Mock data for now
          achievements: [
            'Science Fair Winner 2023',
            'Outstanding Academic Performance',
            'Student Council Representative'
          ] // Mock data for now
        };
        
        setStudent(studentData);
      } catch (error) {
        console.error('Error fetching student data:', error);
        toast.error('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!student) {
    return <div className="text-center py-10">Student not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="bg-primary text-white p-6 text-center">
              <img 
                src={student.image} 
                alt={student.name} 
                className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover"
              />
              <h2 className="text-2xl font-bold mt-4">{student.name}</h2>
              <p className="text-blue-100">{student.grade} • Student ID: {student.id}</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{student.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{student.phone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p>{student.dateOfBirth}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Major</p>
                  <p>{student.major}</p>
                </div>
                
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{student.address}</p>
                </div>
                
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Parent/Guardian</p>
                  <p>{student.parentName}</p>
                  <p className="text-sm">{student.parentContact}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <ul className="space-y-2">
              {student.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Academic Information */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Academic Summary</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <GraduationCap className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-500">GPA</p>
                <p className="text-xl font-bold">{student.gpa}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Book className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-500">Courses</p>
                <p className="text-xl font-bold">{student.courses.length}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-500">Enrollment</p>
                <p className="text-xl font-bold">{student.enrollmentYear}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <BarChart className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="text-xl font-bold">{student.attendance}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Current Courses</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Course</th>
                    <th className="py-3 text-left">Teacher</th>
                    <th className="py-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.courses.map((course, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">
                        <a 
                          href={`/course/${course.id}`} 
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {course.name}
                        </a>
                      </td>
                      <td className="py-3 text-gray-600">{course.teacher}</td>
                      <td className="py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded ${
                          course.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                          course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
