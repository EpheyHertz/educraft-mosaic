
import React, { useState } from 'react';
import { MessageSquare, Plus, Send, X, Paperclip, Users } from 'lucide-react';

const TeacherAnnouncements = () => {
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  
  // Mock data
  const classes = [
    { id: 1, name: 'Algebra II' },
    { id: 2, name: 'Advanced Mathematics' },
    { id: 3, name: 'Calculus' },
    { id: 4, name: 'Pre-Algebra' },
    { id: 5, name: 'Statistics' }
  ];
  
  const announcements = [
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
  ];
  
  const toggleClassSelection = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter(id => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim() && selectedClasses.length > 0) {
      // Would normally send to API
      console.log('New announcement:', {
        content: newAnnouncement,
        classes: selectedClasses
      });
      
      // Reset form
      setNewAnnouncement('');
      setSelectedClasses([]);
      setShowNewForm(false);
      
      // Show success message (would use toast in real implementation)
      alert('Announcement posted successfully!');
    }
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Create New Announcement</h3>
            <button 
              onClick={() => setShowNewForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md"
                placeholder="Enter announcement title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                For Classes
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => toggleClassSelection(cls.id)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedClasses.includes(cls.id)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
              {selectedClasses.length === 0 && (
                <p className="text-xs text-red-500">Please select at least one class</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                className="w-full p-3 min-h-[150px] border border-gray-200 dark:border-gray-700 rounded-md"
                placeholder="Type your announcement here..."
              ></textarea>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Paperclip size={16} />
                <span className="text-sm">Attach</span>
              </button>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                  disabled={!newAnnouncement.trim() || selectedClasses.length === 0}
                >
                  <Send size={16} />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      {/* Announcements list */}
      <div className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
        ))}
      </div>
    </div>
  );
};

export default TeacherAnnouncements;
