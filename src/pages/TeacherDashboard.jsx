
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TeacherClassList from '../components/TeacherClassList';
import TeacherSchedule from '../components/TeacherSchedule';
import TeacherStudentPerformance from '../components/TeacherStudentPerformance';
import TeacherAnnouncements from '../components/TeacherAnnouncements';
import SidebarNavigation from '../components/dashboard/SidebarNavigation';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import OverviewDashboard from '../components/dashboard/OverviewDashboard';

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
        <SidebarNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          teacher={teacher} 
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader activeTab={activeTab} teacher={teacher} />
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === 'overview' && <OverviewDashboard />}
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
