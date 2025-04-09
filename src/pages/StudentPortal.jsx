
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { 
  BookOpen, FileText, Bell, Calendar, MessageSquare, 
  User, Award, ChevronRight, Clock, CheckCircle, Upload, Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Sample data
const assignments = [
  { id: 1, title: 'Research Paper on Renewable Energy', course: 'Environmental Science', dueDate: '2023-11-20', status: 'pending' },
  { id: 2, title: 'Calculus Problem Set 3', course: 'Advanced Mathematics', dueDate: '2023-11-15', status: 'completed' },
  { id: 3, title: 'Literary Analysis Essay', course: 'Modern Literature', dueDate: '2023-11-18', status: 'pending' },
];

const courses = [
  { id: 1, title: 'Introduction to Computer Science', progress: 65, nextClass: 'Tomorrow, 10:00 AM' },
  { id: 2, title: 'Advanced Mathematics', progress: 78, nextClass: 'Today, 2:00 PM' },
  { id: 3, title: 'Modern Literature', progress: 42, nextClass: 'Thursday, 11:30 AM' },
];

const announcements = [
  { id: 1, title: 'Midterm Exam Schedule', date: '2023-11-05', content: 'The midterm exams will begin on November 20th. Please check the detailed schedule.' },
  { id: 2, title: 'Campus Maintenance Notice', date: '2023-11-03', content: 'The west wing library will be closed this weekend for maintenance.' },
];

const StudentPortal = () => {
  const { currentUser, isAuthenticated, isStudent } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionComment, setSubmissionComment] = useState('');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated or not a student
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isStudent) {
    return <Navigate to="/" />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <User className="h-5 w-5" /> },
    { id: 'courses', label: 'My Courses', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="h-5 w-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleAssignmentSubmit = () => {
    if (!selectedFile && !submissionComment) {
      toast.error("Please upload a file or add a comment");
      return;
    }

    // Update the assignment status
    const updatedAssignments = assignmentsList.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? { ...assignment, status: 'completed' } 
        : assignment
    );

    setAssignmentsList(updatedAssignments);
    setSubmitDialogOpen(false);
    setSelectedFile(null);
    setSubmissionComment('');
    toast.success("Assignment submitted successfully!");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const openSubmitDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmitDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {currentUser.name}
          </p>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center pb-4 px-1 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          // Dashboard Content
          <div className="space-y-6">
            {activeTab === 'dashboard' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: <BookOpen className="h-5 w-5" />, label: 'Enrolled Courses', value: '5' },
                    { icon: <FileText className="h-5 w-5" />, label: 'Pending Assignments', value: '3' },
                    { icon: <Award className="h-5 w-5" />, label: 'GPA', value: '3.8' },
                    { icon: <Bell className="h-5 w-5" />, label: 'Notifications', value: '7' },
                  ].map((card, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          {card.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Upcoming Assignments */}
                  <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <h2 className="font-semibold text-gray-900 dark:text-white">Upcoming Assignments</h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('assignments')}
                        className="text-sm text-primary flex items-center hover:underline"
                      >
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {assignmentsList.map((assignment) => (
                        <div key={assignment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.course}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                              </div>
                              <span 
                                className={`text-xs px-2 py-1 mt-1 rounded-full ${
                                  assignment.status === 'completed' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}
                              >
                                {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Announcements */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-primary mr-2" />
                        <h2 className="font-semibold text-gray-900 dark:text-white">Announcements</h2>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {new Date(announcement.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{announcement.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Course Progress */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-2" />
                      <h2 className="font-semibold text-gray-900 dark:text-white">Course Progress</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      View All Courses
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <div key={course.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">{course.title}</h3>
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-primary">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Next class: {course.nextClass}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'courses' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">My Courses</h2>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div 
                      key={course.id} 
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-medium text-lg">{course.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Next class: {course.nextClass}</span>
                          </div>
                        </div>
                        <div className="w-full md:w-1/3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-primary">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <Link 
                          to={`/courses/${course.id}`}
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Go to Course
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'assignments' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Assignments</h2>
                <div className="space-y-6">
                  {assignmentsList.map((assignment) => (
                    <div 
                      key={assignment.id} 
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">{assignment.title}</h3>
                            <span 
                              className={`ml-3 text-xs px-2 py-1 rounded-full ${
                                assignment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{assignment.course}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div>
                          {assignment.status === 'completed' ? (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircle className="h-5 w-5 mr-1" />
                              <span>Submitted</span>
                            </div>
                          ) : (
                            <Button 
                              onClick={() => openSubmitDialog(assignment)}
                              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              Submit Assignment
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assignment Submission Dialog */}
                <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                    </DialogHeader>
                    {selectedAssignment && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">{selectedAssignment.title}</h3>
                          <p className="text-sm text-gray-500">{selectedAssignment.course}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Upload File</label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                            <input
                              type="file"
                              id="file-upload"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <label 
                              htmlFor="file-upload"
                              className="cursor-pointer text-primary hover:underline flex flex-col items-center"
                            >
                              <Upload className="h-6 w-6 mb-2" />
                              <span>Click to upload file</span>
                              <span className="text-xs text-gray-500 mt-1">PDF, DOCX, XLSX files</span>
                            </label>
                            
                            {selectedFile && (
                              <div className="mt-3 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                                <PaperClip className="h-4 w-4 mr-1" />
                                <span>{selectedFile.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Comments (optional)</label>
                          <textarea
                            className="w-full p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 rounded-md"
                            placeholder="Add any comments about your submission..."
                            value={submissionComment}
                            onChange={(e) => setSubmissionComment(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setSubmitDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAssignmentSubmit}>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            
            {activeTab === 'messages' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Messages</h2>
                <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start a conversation with your classmates or teachers</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;
