
import React from 'react';
import { Clock, BookOpen } from 'lucide-react';

const DailyScheduleItem = ({ item }) => {
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
    <div
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
  );
};

export default DailyScheduleItem;
