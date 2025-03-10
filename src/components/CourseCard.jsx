
import { useState } from 'react';
import { Clock, Users, BookOpen, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
        
        {/* Course Level Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-xs font-medium">
          {course.level}
        </div>
        
        {/* Course Rating */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-yellow-400/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
          <Star className="h-3 w-3 fill-current" />
          <span>{course.rating}</span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        {/* Course Info */}
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-gray-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-gray-400" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-1 h-4 w-4 text-gray-400" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
        
        {/* Course Description */}
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {course.description}
        </p>
        
        {/* Teacher Info */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={course.teacherImage} 
              alt={course.teacher} 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-medium">{course.teacher}</span>
          </div>
          
          <Link 
            to={`/courses/${course.id}`} 
            className="inline-flex items-center text-primary text-sm font-medium hover:underline"
          >
            Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Hover effect */}
      <div 
        className={`absolute inset-0 bg-primary/5 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};

export default CourseCard;
