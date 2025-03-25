
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, Clock, BarChart, Users, Award } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching course data
    const fetchCourse = () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setCourse({
          id,
          title: `Course ${id}`,
          description: 'Comprehensive curriculum designed to provide in-depth knowledge and practical skills.',
          image: 'https://images.unsplash.com/photo-1588580000645-5a11a6be778d?q=80&w=2000',
          teacher: 'Dr. Jane Smith',
          teacherImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          level: 'Intermediate',
          duration: '12 weeks',
          lessons: 24,
          students: 156,
          rating: 4.8,
          syllabus: [
            { week: 1, topic: 'Introduction to the Subject', description: 'Overview and basic concepts' },
            { week: 2, topic: 'Fundamental Principles', description: 'Core theories and methodologies' },
            { week: 3, topic: 'Advanced Applications', description: 'Practical implementations and case studies' },
          ]
        });
        setLoading(false);
      }, 800);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center py-10">Course not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Main Info */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-primary" />
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-primary" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <span>{course.rating} Rating</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden mb-8">
            <img src={course.image} alt={course.title} className="w-full h-80 object-cover" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Course Syllabus</h2>
            <div className="space-y-4">
              {course.syllabus.map((item) => (
                <div key={item.week} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Week {item.week}: {item.topic}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={course.teacherImage} 
                  alt={course.teacher} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{course.teacher}</h3>
                  <p className="text-sm text-gray-500">Course Instructor</p>
                </div>
              </div>
              
              <button className="w-full bg-primary text-white rounded-lg py-3 font-medium hover:bg-primary/90 transition-colors mb-3">
                Enroll Now
              </button>
              
              <button className="w-full border border-primary text-primary rounded-lg py-3 font-medium hover:bg-primary/10 transition-colors">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
