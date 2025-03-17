
import React, { useState } from 'react';
import { PlusCircle, FileEdit, Trash2, Calendar, FileText, CheckCircle, XCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const mockAssignments = [
  {
    id: 1,
    title: 'Chapter 5 Math Problems',
    description: 'Complete problems 1-15 from Chapter 5',
    dueDate: '2025-04-15',
    classes: ['Math 101', 'Advanced Math'],
    submissions: 18,
    totalStudents: 25,
    status: 'active'
  },
  {
    id: 2,
    title: 'Science Lab Report',
    description: 'Write a report on the photosynthesis experiment',
    dueDate: '2025-04-20',
    classes: ['Biology'],
    submissions: 12,
    totalStudents: 30,
    status: 'active'
  },
  {
    id: 3,
    title: 'History Essay',
    description: 'Write a 500-word essay on the Industrial Revolution',
    dueDate: '2025-04-10',
    classes: ['History 101'],
    submissions: 22,
    totalStudents: 22,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Literature Analysis',
    description: 'Analyze the themes in "To Kill a Mockingbird"',
    dueDate: '2025-03-15',
    classes: ['English Literature'],
    submissions: 15,
    totalStudents: 28,
    status: 'expired'
  }
];

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    dueDate: '',
    classes: [],
    status: 'active'
  });
  
  // Available classes
  const availableClasses = [
    { id: 1, name: 'Math 101' },
    { id: 2, name: 'Advanced Math' },
    { id: 3, name: 'Biology' },
    { id: 4, name: 'Chemistry' },
    { id: 5, name: 'Physics' },
    { id: 6, name: 'History 101' },
    { id: 7, name: 'English Literature' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleClassSelection = (className) => {
    setFormData(prev => {
      if (prev.classes.includes(className)) {
        return {
          ...prev,
          classes: prev.classes.filter(c => c !== className)
        };
      } else {
        return {
          ...prev,
          classes: [...prev.classes, className]
        };
      }
    });
  };

  const submitAssignment = (e) => {
    e.preventDefault();
    
    if (formData.title && formData.description && formData.dueDate && formData.classes.length > 0) {
      if (formData.id) {
        // Update existing assignment
        setAssignments(
          assignments.map(assignment => 
            assignment.id === formData.id 
              ? { 
                  ...formData, 
                  submissions: assignment.submissions,
                  totalStudents: assignment.totalStudents
                } 
              : assignment
          )
        );
        toast.success("Assignment updated successfully!");
      } else {
        // Create new assignment
        const newAssignment = {
          ...formData,
          id: Date.now(),
          submissions: 0,
          totalStudents: 30
        };
        setAssignments([newAssignment, ...assignments]);
        toast.success("Assignment created successfully!");
      }
      
      resetForm();
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  const editAssignment = (assignment) => {
    setFormData({
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      classes: assignment.classes,
      status: assignment.status
    });
    setShowForm(true);
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    toast.success("Assignment deleted successfully!");
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      description: '',
      dueDate: '',
      classes: [],
      status: 'active'
    });
    setShowForm(false);
  };

  // Filter assignments
  const filteredAssignments = assignments
    .filter(assignment => {
      // Filter by status
      if (statusFilter !== 'all' && assignment.status !== statusFilter) {
        return false;
      }
      
      // Filter by search term
      return (
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.classes.some(cls => cls.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Assignments</h2>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
            {assignments.length} Total
          </span>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Assignment
            </>
          )}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{formData.id ? 'Edit Assignment' : 'Create New Assignment'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitAssignment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  Title*
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Assignment title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Assignment description"
                  className="w-full p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
                  Due Date*
                </label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Assign to Classes*
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableClasses.map(cls => (
                    <div key={cls.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`class-${cls.id}`}
                        checked={formData.classes.includes(cls.name)}
                        onCheckedChange={() => toggleClassSelection(cls.name)}
                      />
                      <label 
                        htmlFor={`class-${cls.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {cls.name}
                      </label>
                    </div>
                  ))}
                </div>
                {formData.classes.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please select at least one class</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {formData.id ? 'Update Assignment' : 'Create Assignment'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-2 text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(assignment => (
            <Card key={assignment.id} className={`transition-all ${
              assignment.status === 'completed' 
                ? 'border-l-4 border-l-green-500' 
                : assignment.status === 'expired'
                  ? 'border-l-4 border-l-red-500 opacity-70'
                  : 'border-l-4 border-l-primary'
            }`}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{assignment.title}</h3>
                      {assignment.status === 'completed' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                      {assignment.status === 'expired' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Expired
                        </span>
                      )}
                      {assignment.status === 'active' && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{assignment.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-gray-500">
                        Classes: {assignment.classes.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end justify-between">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => editAssignment(assignment)}
                        variant="outline"
                        size="sm"
                        className="h-8"
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => deleteAssignment(assignment.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                      <span className="font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                      <span>submissions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No assignments found</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all'
                ? "Try changing your search or filter criteria"
                : "Create your first assignment by clicking the 'New Assignment' button"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAssignments;
