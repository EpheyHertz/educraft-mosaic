
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScheduleControls = ({ formattedDate, onPrevDay, onNextDay }) => {
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-1">
      <button
        onClick={onPrevDay}
        className="p-2 text-gray-500 hover:text-primary transition-colors rounded-md"
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="px-4 font-medium">{formattedDate}</span>
      
      <button
        onClick={onNextDay}
        className="p-2 text-gray-500 hover:text-primary transition-colors rounded-md"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ScheduleControls;
