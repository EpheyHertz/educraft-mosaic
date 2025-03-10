
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const TeacherSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format date to display
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = currentDate.getDay();
  
  // Helper function to go to previous/next day
  const changeDay = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);
    setCurrentDate(newDate);
  };
  
  // Schedule data based on the day of week
  const getScheduleForDay = () => {
    // No classes on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return [];
    }
    
    // MWF Schedule
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      return [
        {
          id: 1,
          name: "Algebra II",
          grade: "10th Grade",
          room: "101",
          startTime: "08:30",
          endTime: "09:45",
          status: "completed",
        },
        {
          id: 2,
          name: "Advanced Mathematics",
          grade: "11th Grade",
          room: "103",
          startTime: "10:30",
          endTime: "11:45",
          status: "current",
        },
        {
          id: 5,
          name: "Office Hours",
          room: "Faculty Office 3B",
          startTime: "12:00",
          endTime: "13:00",
          status: "upcoming",
        }
      ];
    }
    
    // TTh Schedule
    return [
      {
        id: 3,
        name: "Calculus",
        grade: "12th Grade",
        room: "205",
        startTime: "13:00",
        endTime: "14:15",
        status: "upcoming",
      },
      {
        id: 4,
        name: "Pre-Algebra",
        grade: "9th Grade",
        room: "107",
        startTime: "14:30",
        endTime: "15:45",
        status: "upcoming",
      },
      {
        id: 6,
        name: "Department Meeting",
        room: "Conference Room A",
        startTime: "16:00",
        endTime: "17:00",
        status: "upcoming",
      }
    ];
  };
  
  const schedule = getScheduleForDay();
  
  const getStatusStyles = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-gray-100 border-gray-200 text-gray-500';
      case 'current':
        return 'bg-primary/10 border-primary text-primary';
      case 'upcoming':
        return 'bg-white border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Schedule</h2>
        
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-1">
          <button
            onClick={() => changeDay(-1)}
            className="p-2 text-gray-500 hover:text-primary transition-colors rounded-md"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="px-4 font-medium">{formattedDate}</span>
          
          <button
            onClick={() => changeDay(1)}
            className="p-2 text-gray-500 hover:text-primary transition-colors rounded-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar widget */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-primary" />
            <h3 className="font-medium">Calendar</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
              <div key={i} className="py-1 text-gray-500 font-medium">
                {day}
              </div>
            ))}
            
            {/* Simplified calendar display (just show numbers 1-30) */}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const isToday = day === currentDate.getDate();
              const hasEvents = [3, 8, 12, 15, 24, 27].includes(day);
              
              return (
                <div
                  key={day}
                  className={`py-1 rounded-full ${
                    isToday
                      ? 'bg-primary text-white'
                      : hasEvents
                      ? 'text-primary font-medium'
                      : ''
                  }`}
                >
                  {day}
                  {hasEvents && !isToday && (
                    <div className="h-1 w-1 bg-primary rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Daily schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-primary" />
            <h3 className="font-medium">Daily Schedule</h3>
          </div>
          
          {schedule.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">No classes scheduled for today.</p>
              <p className="text-sm">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 ${getStatusStyles(item.status)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="p-3 rounded-md bg-primary/10 text-primary">
                        <BookOpen size={20} />
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.grade && <p className="text-sm text-gray-500">{item.grade}</p>}
                        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock size={14} className="mr-1" />
                          <span>{item.startTime} - {item.endTime}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span>Room {item.room}</span>
                        </div>
                      </div>
                    </div>
                    
                    {item.status === 'current' && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        In progress
                      </span>
                    )}
                    
                    {item.status === 'completed' && (
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;
