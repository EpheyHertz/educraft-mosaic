
import React from 'react';
import { Clock } from 'lucide-react';
import DailyScheduleItem from './DailyScheduleItem';

const DailyScheduleList = ({ schedule }) => {
  return (
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
            <DailyScheduleItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyScheduleList;
