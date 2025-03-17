
import React, { useState } from 'react';
import { X, Paperclip, Send, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';

const AnnouncementForm = ({ classes, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);

  const toggleClassSelection = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter(id => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploading(true);
      
      // Simulate file upload
      setTimeout(() => {
        const newAttachments = files.map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        }));
        
        setAttachments([...attachments, ...newAttachments]);
        setUploading(false);
        toast.success("Files attached successfully!");
      }, 1000);
    }
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && selectedClasses.length > 0) {
      onSubmit({
        title,
        content,
        classes: selectedClasses,
        attachments
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedClasses([]);
      setAttachments([]);
      toast.success("Announcement posted successfully!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Create New Announcement</h3>
        <button 
          onClick={onClose}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 min-h-[150px] border border-gray-200 dark:border-gray-700 rounded-md"
            placeholder="Type your announcement here..."
          ></textarea>
        </div>
        
        {attachments.length > 0 && (
          <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm font-medium mb-2">Attachments ({attachments.length})</p>
            <div className="space-y-2">
              {attachments.map(file => (
                <div key={file.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-gray-500" />
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeAttachment(file.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer">
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading ? (
              <>
                <Upload size={16} className="animate-spin" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <Paperclip size={16} />
                <span className="text-sm">Attach Files</span>
              </>
            )}
          </label>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              disabled={!content.trim() || selectedClasses.length === 0 || uploading}
            >
              <Send size={16} />
              <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;
