
import React from 'react';
import { Users, BookOpen, MoreVertical, Search } from 'lucide-react';

const TeacherClassList = () => {
  // Mock class data
  const classes = [
    {
      id: 1,
      name: "Algebra II",
      grade: "10th Grade",
      students: 28,
      room: "101",
      time: "8:30 AM - 9:45 AM",
      days: "Mon, Wed, Fri"
    },
    {
      id: 2,
      name: "Advanced Mathematics",
      grade: "11th Grade",
      students: 24,
      room: "103",
      time: "10:30 AM - 11:45 AM",
      days: "Mon, Wed, Fri"
    },
    {
      id: 3,
      name: "Calculus",
      grade: "12th Grade",
      students: 22,
      room: "205",
      time: "1:00 PM - 2:15 PM",
      days: "Tue, Thu"
    },
    {
      id: 4,
      name: "Pre-Algebra",
      grade: "9th Grade",
      students: 32,
      room: "107",
      time: "2:30 PM - 3:45 PM",
      days: "Tue, Thu"
    },
    {
      id: 5,
      name: "Statistics",
      grade: "11th Grade",
      students: 26,
      room: "202",
      time: "9:00 AM - 10:15 AM",
      days: "Tue, Thu"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">My Classes</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search classes..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md w-full"
            />
          </div>
          
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <span>Add New Class</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{cls.name}</div>
                        <div className="text-sm text-gray-500">{cls.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm">
                      <Users size={16} className="mr-2 text-gray-400" />
                      <span>{cls.students} students</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{cls.room}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>{cls.time}</div>
                      <div className="text-gray-500">{cls.days}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        View
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassList;
