
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-10 top-1/4 h-64 w-64 rounded-full bg-blue-400/10 animate-float"></div>
        <div className="absolute left-1/4 top-1/2 h-40 w-40 rounded-full bg-primary/5 animate-float animation-delay-300"></div>
        <div className="absolute left-10 top-1/4 h-24 w-24 rounded-full bg-yellow-400/10 animate-float animation-delay-100"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-12 space-y-8 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Welcome to EduSchool
            </span>
            
            <h1 className="text-gradient font-bold leading-tight">
              Nurturing Tomorrow's Leaders Today
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 md:text-xl max-w-xl text-balance">
              We provide a holistic educational experience that inspires curiosity, 
              fosters creativity, and builds the foundation for lifelong learning.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/admission" 
                className="inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-3 text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300"
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                to="/courses" 
                className="inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Explore Courses
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in animation-delay-200">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-white/20 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Students learning" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 glass animate-float animation-delay-100">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center text-xs font-medium text-primary">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800 dark:text-gray-200">500+ Students</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Join our community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
