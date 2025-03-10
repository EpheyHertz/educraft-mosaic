
import React from 'react';
import { MessageSquare, Users } from 'lucide-react';

const AnnouncementItem = ({ announcement }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{announcement.title}</h3>
        <span className="text-xs text-gray-500">{announcement.date}</span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">{announcement.content}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users size={16} />
          <span>{announcement.classes.join(', ')}</span>
        </div>
        
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
          <MessageSquare size={16} />
          <span>{announcement.comments} comments</span>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementItem;
