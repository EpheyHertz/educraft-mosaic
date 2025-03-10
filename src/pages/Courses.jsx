
import React from 'react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Mathematics",
      description: "Advanced mathematics including algebra, calculus, and statistics",
      instructor: "Dr. John Smith",
      duration: "1 semester",
      level: "Advanced"
    },
    {
      id: 2,
      title: "Physics",
      description: "Fundamental principles of physics and practical applications",
      instructor: "Dr. Sarah Johnson",
      duration: "1 semester",
      level: "Intermediate"
    },
    // Add more courses as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
