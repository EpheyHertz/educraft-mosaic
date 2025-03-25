
import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, CheckCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const TeacherLessonPlanner = () => {
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    subject: '',
    grade: '',
    duration: '',
    objectives: '',
    materials: '',
    procedure: '',
    assessment: '',
    date: '',
  });

  // Sample data - in a real app, this would come from an API
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      grade: '9th Grade',
      duration: '45 minutes',
      date: '2024-05-15',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Cell Structure and Function',
      subject: 'Biology',
      grade: '10th Grade',
      duration: '60 minutes',
      date: '2024-05-17',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'World War II: Causes and Effects',
      subject: 'History',
      grade: '11th Grade',
      duration: '90 minutes',
      date: '2024-05-20',
      status: 'upcoming'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewLesson(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLesson = () => {
    // In a real app, this would be an API call
    const lesson = {
      id: lessons.length + 1,
      ...newLesson,
      status: 'upcoming'
    };
    
    setLessons([...lessons, lesson]);
    setLessonDialogOpen(false);
    toast.success('Lesson plan added successfully!');
    
    // Reset form
    setNewLesson({
      title: '',
      subject: '',
      grade: '',
      duration: '',
      objectives: '',
      materials: '',
      procedure: '',
      assessment: '',
      date: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lesson Planner</h2>
        <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Lesson Plan</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new lesson plan.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lesson Title</label>
                  <Input 
                    name="title"
                    value={newLesson.title}
                    onChange={handleInputChange}
                    placeholder="Introduction to Photosynthesis"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('subject', value)}
                    value={newLesson.subject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Physical Education">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('grade', value)}
                    value={newLesson.grade}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9th Grade">9th Grade</SelectItem>
                      <SelectItem value="10th Grade">10th Grade</SelectItem>
                      <SelectItem value="11th Grade">11th Grade</SelectItem>
                      <SelectItem value="12th Grade">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Input 
                    name="duration"
                    value={newLesson.duration}
                    onChange={handleInputChange}
                    placeholder="45 minutes"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input 
                  name="date"
                  type="date"
                  value={newLesson.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Learning Objectives</label>
                <Textarea 
                  name="objectives"
                  value={newLesson.objectives}
                  onChange={handleInputChange}
                  placeholder="Students will be able to..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Materials Needed</label>
                <Textarea 
                  name="materials"
                  value={newLesson.materials}
                  onChange={handleInputChange}
                  placeholder="Textbooks, worksheets, lab equipment..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Procedure/Activities</label>
                <Textarea 
                  name="procedure"
                  value={newLesson.procedure}
                  onChange={handleInputChange}
                  placeholder="Step-by-step instructional activities..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment Method</label>
                <Textarea 
                  name="assessment"
                  value={newLesson.assessment}
                  onChange={handleInputChange}
                  placeholder="How student learning will be assessed..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setLessonDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddLesson}>
                Add Lesson Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map(lesson => (
          <div 
            key={lesson.id} 
            className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${
              lesson.status === 'completed' ? 'border-green-500' : 'border-blue-500'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              {lesson.status === 'completed' && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </span>
              )}
              {lesson.status === 'upcoming' && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Upcoming
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span>{lesson.subject} - {lesson.grade}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>{lesson.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{new Date(lesson.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherLessonPlanner;
