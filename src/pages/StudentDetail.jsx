
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, GraduationCap, Calendar, Award, BarChart } from 'lucide-react';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching student data
    const fetchStudent = () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setStudent({
          id,
          name: 'Jane Smith',
          image: 'https://randomuser.me/api/portraits/women/67.jpg',
          grade: '11th Grade',
          enrollmentYear: '2022',
          major: 'Science',
          gpa: '3.8',
          email: 'jane.smith@school.edu',
          phone: '(555) 123-4567',
          dateOfBirth: '2006-05-15',
          address: '123 Student Avenue, Academic City, CA 90210',
          parentName: 'Robert & Mary Smith',
          parentContact: '(555) 987-6543',
          courses: [
            { id: 1, name: 'Advanced Mathematics', grade: 'A', teacher: 'Dr. Alan Johnson' },
            { id: 2, name: 'Physics', grade: 'A-', teacher: 'Prof. Maria Garcia' },
            { id: 3, name: 'Literature', grade: 'B+', teacher: 'Ms. Elizabeth Taylor' },
            { id: 4, name: 'Computer Science', grade: 'A+', teacher: 'Mr. James Wilson' }
          ],
          attendance: 95,
          achievements: [
            'Science Fair Winner 2023',
            'Outstanding Academic Performance',
            'Student Council Representative'
          ]
        });
        setLoading(false);
      }, 800);
    };

    fetchStudent();
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
                  {student.courses.map(course => (
                    <tr key={course.id} className="border-b">
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
