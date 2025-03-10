
import React, { useState } from 'react';
import ScheduleControls from './schedule/ScheduleControls';
import CalendarWidget from './schedule/CalendarWidget';
import DailyScheduleList from './schedule/DailyScheduleList';

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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Schedule</h2>
        <ScheduleControls 
          formattedDate={formattedDate} 
          onPrevDay={() => changeDay(-1)} 
          onNextDay={() => changeDay(1)} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <CalendarWidget currentDate={currentDate} />
        <DailyScheduleList schedule={schedule} />
      </div>
    </div>
  );
};

export default TeacherSchedule;
