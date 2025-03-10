
import React from 'react';
import { Clock, Users, BookOpen, BarChart2 } from 'lucide-react';

const OverviewDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stats cards */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Classes Today</h3>
          <Clock size={20} className="text-primary" />
        </div>
        <p className="text-3xl font-bold mt-2">4</p>
        <p className="text-xs text-gray-500 mt-1">Next class: Advanced Math (10:30 AM)</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
          <Users size={20} className="text-primary" />
        </div>
        <p className="text-3xl font-bold mt-2">128</p>
        <p className="text-xs text-gray-500 mt-1">Across 5 different classes</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Upcoming Tests</h3>
          <BookOpen size={20} className="text-primary" />
        </div>
        <p className="text-3xl font-bold mt-2">2</p>
        <p className="text-xs text-gray-500 mt-1">Next: Calculus (Friday)</p>
      </div>

      {/* Recent activity timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:col-span-2">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: '9:40 AM', text: 'Graded Algebra II homework assignments' },
            { time: 'Yesterday', text: 'Created new quiz for Calculus class' },
            { time: '2 days ago', text: 'Posted new learning materials for Advanced Math' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-primary"></div>
              <div>
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next class card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="font-medium mb-4">Next Class</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-primary/10 text-primary p-3 rounded">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="font-medium">Advanced Mathematics</p>
            <p className="text-sm text-gray-500">Grade 11 • Room 103</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock size={16} />
          <span>10:30 AM - 11:45 AM</span>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="text-sm text-primary hover:underline">View lesson plan</button>
          <button className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20">
            Start class
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
