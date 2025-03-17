
import React, { useState } from 'react';
import { MessageSquare, Users, ChevronDown, ChevronUp, Paperclip, Send, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AnnouncementItem = ({ announcement }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(announcement.comments || 0);
  const [commentsList, setCommentsList] = useState([]);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        author: 'John Smith',
        authorRole: 'Teacher',
        content: replyContent,
        timestamp: new Date().toISOString(),
      };
      
      setCommentsList([newComment, ...commentsList]);
      setComments(comments + 1);
      setReplyContent('');
      setIsReplying(false);
      toast.success('Reply posted successfully!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{announcement.title}</h3>
        <span className="text-xs text-gray-500">{announcement.date}</span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">{announcement.content}</p>
      
      {announcement.attachments && announcement.attachments.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-sm font-medium mb-2">Attachments ({announcement.attachments.length})</p>
          <div className="space-y-2">
            {announcement.attachments.map(file => (
              <a 
                href={file.url} 
                key={file.id} 
                className="flex items-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={16} className="text-gray-500 mr-2" />
                <span className="text-sm truncate">{file.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users size={16} />
          <span>{announcement.classes.join(', ')}</span>
        </div>
        
        <Collapsible
          open={showComments}
          onOpenChange={setShowComments}
          className="w-full max-w-[350px]"
        >
          <div className="flex items-center">
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/90 mr-3"
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>
            
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                <MessageSquare size={16} />
                <span>{comments} comments</span>
                {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {commentsList.length > 0 ? (
              commentsList.map(comment => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">({comment.authorRole})</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">No comments yet</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {isReplying && (
        <div className="mt-4">
          <form onSubmit={handleReplySubmit} className="flex gap-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 p-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md"
              placeholder="Write your reply..."
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors"
              disabled={!replyContent.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnnouncementItem;
