
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, BarChart2, Users, Calendar, MessageSquare
} from 'lucide-react';

const SidebarNavigation = ({ activeTab, setActiveTab, teacher }) => {
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
  );
};

export default SidebarNavigation;
