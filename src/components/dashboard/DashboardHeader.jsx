
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const DashboardHeader = ({ activeTab, teacher }) => {
  return (
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
  );
};

export default DashboardHeader;
