
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, BarChart2, Users, Calendar, MessageSquare, GraduationCap, 
  Book, FileText, Library, Settings, User
} from 'lucide-react';

const SidebarNavigation = ({ activeTab, setActiveTab, teacher }) => {
  // Navigation items with icons and labels
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 size={18} /> },
    { id: 'classes', label: 'My Classes', icon: <Users size={18} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'performance', label: 'Student Performance', icon: <BarChart2 size={18} /> },
    { id: 'gradebook', label: 'Gradebook', icon: <GraduationCap size={18} /> },
    { id: 'lesson-planner', label: 'Lesson Planner', icon: <Book size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <MessageSquare size={18} /> },
    { id: 'resources', label: 'Resources', icon: <Library size={18} /> },
  ];
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-md">
            <BookOpen size={20} />
          </div>
          <span className="text-lg font-semibold">School Portal</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
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
        <div className="mt-3 flex space-x-2">
          <Link 
            to="/profile/teacher" 
            className="text-xs text-primary hover:underline flex items-center"
          >
            <User size={12} className="mr-1" />
            Profile
          </Link>
          <Link 
            to="/settings" 
            className="text-xs text-gray-500 hover:underline flex items-center"
          >
            <Settings size={12} className="mr-1" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
