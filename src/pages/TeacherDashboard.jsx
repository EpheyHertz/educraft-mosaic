
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, Calendar, Clock, 
  BarChart2, MessageSquare, Bell, ChevronDown,
  Search, Menu, X
} from 'lucide-react';
import TeacherClassList from '../components/TeacherClassList';
import TeacherSchedule from '../components/TeacherSchedule';
import TeacherStudentPerformance from '../components/TeacherStudentPerformance';
import TeacherAnnouncements from '../components/TeacherAnnouncements';

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock teacher data
  const teacher = {
    name: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    subject: "Mathematics",
    notifications: 3
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <button 
        className="p-2 rounded-md md:hidden fixed top-4 left-4 z-50 bg-primary text-white"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div className={`w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 fixed md:static inset-y-0 left-0 z-40 md:translate-x-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-md">
                <BookOpen size={20} />
              </div>
              <span className="text-lg font-semibold">School Portal</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <BarChart2 size={18} />
              <span>Overview</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('classes')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'classes' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Users size={18} />
              <span>My Classes</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'schedule' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Calendar size={18} />
              <span>Schedule</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'performance' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <BarChart2 size={18} />
              <span>Student Performance</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('announcements')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'announcements' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <MessageSquare size={18} />
              <span>Announcements</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img 
                src={teacher.avatar} 
                alt={teacher.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{teacher.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{teacher.subject} Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-60"
                />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell size={20} />
                {teacher.notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{teacher.notifications}</span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:inline text-sm font-medium">{teacher.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === 'overview' && (
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
          )}
          
          {activeTab === 'classes' && <TeacherClassList />}
          {activeTab === 'schedule' && <TeacherSchedule />}
          {activeTab === 'performance' && <TeacherStudentPerformance />}
          {activeTab === 'announcements' && <TeacherAnnouncements />}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
