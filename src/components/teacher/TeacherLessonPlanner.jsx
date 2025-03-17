
import React, { useState } from 'react';
import { Book, Calendar, Clock, Plus, Search, Filter, MoreVertical } from 'lucide-react';

const TeacherLessonPlanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock lesson plans data
  const lessonPlans = [
    {
      id: 1,
      title: 'Introduction to Quadratic Equations',
      subject: 'Advanced Mathematics',
      grade: '11th Grade',
      date: '2023-05-15',
      status: 'published',
      objectives: ['Understand the standard form of quadratic equations', 'Learn to factor quadratic expressions', 'Solve quadratic equations by factoring'],
      materials: ['Textbook pages 45-50', 'Worksheet 3A', 'Graphing calculators'],
      activities: [
        { type: 'Warm-up', duration: 10, description: 'Review of linear equations' },
        { type: 'Direct Instruction', duration: 25, description: 'Introduction to quadratic forms' },
        { type: 'Group Activity', duration: 30, description: 'Factoring practice in pairs' },
        { type: 'Assessment', duration: 15, description: 'Exit ticket: solve 3 problems' }
      ]
    },
    {
      id: 2,
      title: 'Solving Systems of Equations',
      subject: 'Algebra II',
      grade: '10th Grade',
      date: '2023-05-18',
      status: 'draft',
      objectives: ['Understand what a system of equations represents', 'Learn to solve systems using substitution', 'Learn to solve systems using elimination'],
      materials: ['Whiteboard and markers', 'Handout on real-world applications', 'Online practice tool'],
      activities: [
        { type: 'Review', duration: 15, description: 'Review homework problems' },
        { type: 'Instruction', duration: 20, description: 'New methods for systems of equations' },
        { type: 'Practice', duration: 35, description: 'Individual and pair practice' },
        { type: 'Wrap-up', duration: 10, description: 'Summary and homework assignment' }
      ]
    },
    {
      id: 3,
      title: 'Derivatives and Rate of Change',
      subject: 'Calculus',
      grade: '12th Grade',
      date: '2023-05-20',
      status: 'published',
      objectives: ['Understand the concept of a derivative', 'Calculate basic derivatives', 'Apply derivatives to rate of change problems'],
      materials: ['Calculus textbook', 'Graphing software', 'Handouts with practice problems'],
      activities: [
        { type: 'Bell Ringer', duration: 10, description: 'Function review' },
        { type: 'New Content', duration: 30, description: 'Introducing derivatives' },
        { type: 'Application', duration: 25, description: 'Real-world examples of rates of change' },
        { type: 'Practice', duration: 15, description: 'Independent practice and questions' }
      ]
    }
  ];
  
  const filterLessons = () => {
    if (!searchTerm) return lessonPlans;
    return lessonPlans.filter(plan => 
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredLessons = filterLessons();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Lesson Planner</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search lesson plans..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Plus size={18} />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>
      
      {/* Plans List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLessons.map(plan => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <Book className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{plan.title}</h3>
                    <p className="text-sm text-gray-500">{plan.subject} • {plan.grade}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  plan.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </span>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>
                  {new Date(plan.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="mt-3">
                <h4 className="text-xs font-medium uppercase text-gray-500 mb-1">Objectives</h4>
                <ul className="text-sm space-y-1 pl-5 list-disc">
                  {plan.objectives.map((objective, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300">{objective}</li>
                  )).slice(0, 2)}
                  {plan.objectives.length > 2 && <li className="text-gray-500 italic">+ {plan.objectives.length - 2} more</li>}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>{plan.activities.reduce((total, act) => total + act.duration, 0)} minutes</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-primary hover:text-primary/80 transition-colors text-sm">
                    Edit
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredLessons.length === 0 && (
        <div className="text-center py-8">
          <Book size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-500">No lesson plans found</h3>
          <p className="text-gray-400 mt-1">Try adjusting your search or create a new lesson plan</p>
        </div>
      )}
    </div>
  );
};

export default TeacherLessonPlanner;
