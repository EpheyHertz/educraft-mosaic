
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AnnouncementItem from './announcements/AnnouncementItem';
import AnnouncementForm from './announcements/AnnouncementForm';

const TeacherAnnouncements = () => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Final Exam Preparation',
      content: 'Don\'t forget that our final exam will be held next Friday. We will have a review session on Wednesday during regular class hours. Please bring any questions you might have.',
      classes: ['Advanced Mathematics', 'Calculus'],
      date: '2 days ago',
      comments: 4
    },
    {
      id: 2,
      title: 'Project Deadline Extension',
      content: 'Due to multiple requests, I\'ve decided to extend the project deadline by one week. New due date is May 25th. Use this extra time wisely to polish your work.',
      classes: ['Algebra II'],
      date: '5 days ago',
      comments: 12
    },
    {
      id: 3,
      title: 'New Study Materials Available',
      content: 'I\'ve uploaded new study materials for the upcoming test to our class portal. These include practice problems and solutions that cover all the topics we\'ve discussed.',
      classes: ['All Classes'],
      date: '1 week ago',
      comments: 3
    }
  ]);
  
  // Mock data
  const classes = [
    { id: 1, name: 'Algebra II' },
    { id: 2, name: 'Advanced Mathematics' },
    { id: 3, name: 'Calculus' },
    { id: 4, name: 'Pre-Algebra' },
    { id: 5, name: 'Statistics' }
  ];
  
  const handleSubmitAnnouncement = (announcementData) => {
    // Create new announcement with mock data
    const newAnnouncement = {
      id: Date.now(),
      ...announcementData,
      date: 'Just now',
      comments: 0,
      classes: announcementData.classes.map(id => 
        classes.find(c => c.id === id)?.name || 'Unknown'
      )
    };
    
    // Add to list
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowNewForm(false);
    
    // Show success message (would use toast in real implementation)
    alert('Announcement posted successfully!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Announcements</h2>
        
        <button
          onClick={() => setShowNewForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Announcement</span>
        </button>
      </div>
      
      {/* New announcement form */}
      {showNewForm && (
        <AnnouncementForm 
          classes={classes}
          onClose={() => setShowNewForm(false)}
          onSubmit={handleSubmitAnnouncement}
        />
      )}
      
      {/* Announcements list */}
      <div className="space-y-4">
        {announcements.map(announcement => (
          <AnnouncementItem key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default TeacherAnnouncements;
