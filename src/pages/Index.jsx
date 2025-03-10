
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Calendar, User, School, ArrowRight, Clock, Award, GraduationCap } from 'lucide-react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import EventCard from '../components/EventCard';

// Sample courses data
const featuredCourses = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science, algorithms, and programming concepts.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    teacher: 'Dr. Alan Johnson',
    teacherImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    level: 'Beginner',
    duration: '12 weeks',
    lessons: 24,
    students: 1240,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    description: 'Dive deep into calculus, linear algebra, and statistics with practical applications.',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    teacher: 'Prof. Sarah Williams',
    teacherImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    level: 'Advanced',
    duration: '16 weeks',
    lessons: 32,
    students: 850,
    rating: 4.9
  },
  {
    id: 3,
    title: 'Modern Literature',
    description: 'Explore contemporary works of fiction, poetry, and drama from around the world.',
    image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    teacher: 'Dr. Emily Chen',
    teacherImage: 'https://randomuser.me/api/portraits/women/28.jpg',
    level: 'Intermediate',
    duration: '10 weeks',
    lessons: 20,
    students: 720,
    rating: 4.7
  }
];

// Sample events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Science Fair',
    description: 'Showcase your scientific discoveries and innovations. Open to all students.',
    date: '2023-11-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Campus Hall',
    category: 'Science',
    attendees: 350
  },
  {
    id: 2,
    title: 'Career Day: Meet Industry Professionals',
    description: 'Connect with experts from various industries and explore career opportunities.',
    date: '2023-11-20',
    time: '9:00 AM - 2:00 PM',
    location: 'Conference Center',
    category: 'Career',
    attendees: 200
  }
];

// Stats data
const stats = [
  { icon: <User />, value: '12,500+', label: 'Students Enrolled' },
  { icon: <BookOpen />, value: '150+', label: 'Courses Offered' },
  { icon: <GraduationCap />, value: '98%', label: 'Graduation Rate' },
  { icon: <Award />, value: '50+', label: 'Awards Won' }
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold md:text-4xl mb-4 text-gray-900 dark:text-white">
              Exceptional Educational Experience
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We provide a holistic approach to education, focusing on academic excellence, 
              personal growth, and future readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: 'Quality Education',
                description: 'Rigorous academic programs taught by experienced educators.'
              },
              {
                icon: <User className="h-6 w-6" />,
                title: 'Student-Centered',
                description: 'Personalized learning approaches that cater to individual needs.'
              },
              {
                icon: <School className="h-6 w-6" />,
                title: 'Modern Facilities',
                description: 'State-of-the-art classrooms, labs, and recreational spaces.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ${
                  isVisible ? 'animate-slide-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-14 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center text-white"
              >
                <div className="mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Our Programs
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
            </div>
            <Link 
              to="/courses" 
              className="hidden md:flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Courses
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/courses" 
              className="inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Mark Your Calendar
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
            </div>
            <Link 
              to="/events" 
              className="hidden md:flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Events
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/events" 
              className="inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to Begin Your Educational Journey With Us?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Take the first step towards a brighter future. Apply for admission or contact us to learn more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/admission" 
              className="inline-flex items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-medium shadow-lg shadow-blue-900/20 hover:bg-gray-100 transition-colors"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center rounded-full bg-blue-700/50 text-white border border-white/20 px-6 py-3 text-sm font-medium hover:bg-blue-700/70 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
