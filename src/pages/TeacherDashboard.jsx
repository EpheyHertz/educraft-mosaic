
import React, { useState } from 'react';
import { Menu, X, PlusCircle, FileText, Users, ClipboardList } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import TeacherClassList from '../components/TeacherClassList';
import TeacherSchedule from '../components/TeacherSchedule';
import TeacherStudentPerformance from '../components/TeacherStudentPerformance';
import TeacherAnnouncements from '../components/TeacherAnnouncements';
import SidebarNavigation from '../components/dashboard/SidebarNavigation';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import OverviewDashboard from '../components/dashboard/OverviewDashboard';
import TeacherGradeBook from '../components/teacher/TeacherGradeBook';
import TeacherLessonPlanner from '../components/teacher/TeacherLessonPlanner';
import TeacherResourceLibrary from '../components/teacher/TeacherResourceLibrary';
import TeacherAssignments from '../components/teacher/TeacherAssignments';

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated, isTeacher, currentUser } = useAuth();
  
  // Redirect if not authenticated or not a teacher
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isTeacher) {
    return <Navigate to="/" />;
  }
  
  // Teacher data from current user
  const teacher = {
    name: currentUser.name || "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    subject: "Mathematics",
    notifications: 3,
    email: currentUser.email || "teacher@school.edu",
    department: "Science & Mathematics",
    id: currentUser.id || "T1001"
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
          {activeTab === 'gradebook' && <TeacherGradeBook />}
          {activeTab === 'lesson-planner' && <TeacherLessonPlanner />}
          {activeTab === 'resources' && <TeacherResourceLibrary />}
          {activeTab === 'assignments' && <TeacherAssignments />}
          
          {/* Quick Action Floating Button */}
          <div className="fixed bottom-6 right-6">
            <div className="group relative">
              <button className="h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors focus:outline-none">
                <PlusCircle size={24} />
              </button>
              
              <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button className="flex items-center w-full p-2 text-left rounded-md hover:bg-gray-100">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  <span>Create Assignment</span>
                </button>
                <button className="flex items-center w-full p-2 text-left rounded-md hover:bg-gray-100">
                  <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                  <span>Add Lesson Plan</span>
                </button>
                <button className="flex items-center w-full p-2 text-left rounded-md hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  <span>Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
