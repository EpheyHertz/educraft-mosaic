
import React, { useState } from 'react';
import { BarChart2, Users, ChevronDown, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeacherStudentPerformance = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('average');
  
  // Mock performance data
  const classOptions = [
    { id: 'all', name: 'All Classes' },
    { id: 'algebra', name: 'Algebra II' },
    { id: 'advmath', name: 'Advanced Mathematics' },
    { id: 'calculus', name: 'Calculus' },
    { id: 'prealg', name: 'Pre-Algebra' },
    { id: 'stats', name: 'Statistics' },
  ];
  
  const metricOptions = [
    { id: 'average', name: 'Average Score' },
    { id: 'attendance', name: 'Attendance Rate' },
    { id: 'homework', name: 'Homework Completion' },
    { id: 'participation', name: 'Class Participation' },
  ];
  
  // Sample chart data
  const performanceData = [
    { name: 'Week 1', score: 72, attendance: 95, homework: 85, participation: 70 },
    { name: 'Week 2', score: 68, attendance: 92, homework: 78, participation: 65 },
    { name: 'Week 3', score: 74, attendance: 94, homework: 82, participation: 72 },
    { name: 'Week 4', score: 76, attendance: 93, homework: 88, participation: 75 },
    { name: 'Week 5', score: 80, attendance: 96, homework: 90, participation: 80 },
    { name: 'Week 6', score: 78, attendance: 95, homework: 86, participation: 78 },
    { name: 'Week 7', score: 82, attendance: 97, homework: 92, participation: 82 },
    { name: 'Week 8', score: 85, attendance: 98, homework: 94, participation: 85 },
  ];
  
  // Student data for the table
  const students = [
    { id: 1, name: 'Emma Thompson', grade: 'A', avgScore: 92, trend: 'up', last: 94 },
    { id: 2, name: 'Liam Johnson', grade: 'B+', avgScore: 87, trend: 'up', last: 89 },
    { id: 3, name: 'Olivia Williams', grade: 'A-', avgScore: 90, trend: 'down', last: 88 },
    { id: 4, name: 'Noah Garcia', grade: 'B', avgScore: 84, trend: 'up', last: 86 },
    { id: 5, name: 'Sophia Martinez', grade: 'C+', avgScore: 78, trend: 'down', last: 75 },
    { id: 6, name: 'James Rodriguez', grade: 'B-', avgScore: 81, trend: 'up', last: 83 },
  ];
  
  // Get chart data based on selected metric
  const getChartData = () => {
    switch (selectedMetric) {
      case 'average':
        return performanceData.map(item => ({ name: item.name, value: item.score }));
      case 'attendance':
        return performanceData.map(item => ({ name: item.name, value: item.attendance }));
      case 'homework':
        return performanceData.map(item => ({ name: item.name, value: item.homework }));
      case 'participation':
        return performanceData.map(item => ({ name: item.name, value: item.participation }));
      default:
        return performanceData.map(item => ({ name: item.name, value: item.score }));
    }
  };
  
  const chartData = getChartData();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Student Performance</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative inline-block">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md pl-4 pr-10 py-2 cursor-pointer w-full"
            >
              {classOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          
          <div className="relative inline-block">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md pl-4 pr-10 py-2 cursor-pointer w-full"
            >
              {metricOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Class Average</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">78%</p>
            <span className="flex items-center text-green-500 text-sm">
              <ArrowUpRight size={16} />
              2.4%
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Attendance Rate</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">94%</p>
            <span className="flex items-center text-green-500 text-sm">
              <ArrowUpRight size={16} />
              1.2%
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Homework Completion</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">87%</p>
            <span className="flex items-center text-red-500 text-sm">
              <ArrowDownRight size={16} />
              0.8%
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <p className="text-sm text-gray-500 mb-1">Class Participation</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">75%</p>
            <span className="flex items-center text-green-500 text-sm">
              <ArrowUpRight size={16} />
              3.5%
            </span>
          </div>
        </div>
      </div>
      
      {/* Chart and table grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 size={20} className="text-primary" />
            <h3 className="font-medium">
              {metricOptions.find(m => m.id === selectedMetric)?.name} Trend
            </h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top students */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <h3 className="font-medium">Top Students</h3>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {students.slice(0, 5).map(student => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-medium text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">Grade: {student.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{student.avgScore}%</p>
                  <p className={`text-xs flex items-center ${student.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {student.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {student.last}% last
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-sm text-primary hover:text-primary/80">
            View All Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentPerformance;
