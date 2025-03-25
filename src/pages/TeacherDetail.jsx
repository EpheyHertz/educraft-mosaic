
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, BookOpen, Users, Award, FileText, GraduationCap } from 'lucide-react';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching teacher data
    const fetchTeacher = () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setTeacher({
          id,
          name: 'Dr. John Smith',
          image: 'https://randomuser.me/api/portraits/men/42.jpg',
          position: 'Senior Professor',
          department: 'Science & Mathematics',
          email: 'john.smith@school.edu',
          phone: '(555) 123-4567',
          office: 'Science Building, Room 305',
          officeHours: 'Monday & Wednesday, 2:00 PM - 4:00 PM',
          education: [
            { degree: 'Ph.D. in Mathematics', institution: 'Stanford University', year: '2010' },
            { degree: 'M.S. in Applied Mathematics', institution: 'MIT', year: '2006' },
            { degree: 'B.S. in Mathematics', institution: 'UC Berkeley', year: '2004' }
          ],
          bio: 'Dr. Smith has over 15 years of teaching experience in mathematics and statistics. His research focuses on applied mathematics and data science, with particular interest in mathematical modeling and analysis of complex systems. He has published numerous papers in prestigious journals and is a recipient of multiple teaching awards.',
          courses: [
            { id: 1, title: 'Advanced Calculus', code: 'MATH 301', students: 28 },
            { id: 2, title: 'Linear Algebra', code: 'MATH 240', students: 35 },
            { id: 3, title: 'Differential Equations', code: 'MATH 320', students: 22 },
            { id: 4, title: 'Statistical Methods', code: 'STAT 210', students: 40 }
          ],
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
        });
        setLoading(false);
      }, 800);
    };

    fetchTeacher();
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
