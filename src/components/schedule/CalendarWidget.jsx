
import React from 'react';
import { Calendar } from 'lucide-react';

const CalendarWidget = ({ currentDate }) => {
  // Get the current day for highlighting
  const today = currentDate.getDate();
  
  return (
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
          const isToday = day === today;
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
  );
};

export default CalendarWidget;
