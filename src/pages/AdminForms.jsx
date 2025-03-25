
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const AdminForms = () => {
  // State for date pickers
  const [eventDate, setEventDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState("teacher");

  // Forms
  const teacherForm = useForm();
  const studentForm = useForm();
  const courseForm = useForm();
  const eventForm = useForm();

  // Handle form submissions
  const handleTeacherSubmit = (data) => {
    console.log("Teacher data:", data);
    toast.success("Teacher added successfully!");
    teacherForm.reset();
  };

  const handleStudentSubmit = (data) => {
    console.log("Student data:", data);
    toast.success("Student added successfully!");
    studentForm.reset();
  };

  const handleCourseSubmit = (data) => {
    console.log("Course data:", data);
    toast.success("Course added successfully!");
    courseForm.reset();
  };

  const handleEventSubmit = (data) => {
    const finalData = {
      ...data,
      date: eventDate ? format(eventDate, 'yyyy-MM-dd') : ''
    };
    console.log("Event data:", finalData);
    toast.success("Event added successfully!");
    eventForm.reset();
    setEventDate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Management Forms</h1>
      
      <Tabs 
        defaultValue="teacher" 
        className="w-full" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="teacher">Add Teacher</TabsTrigger>
          <TabsTrigger value="student">Add Student</TabsTrigger>
          <TabsTrigger value="course">Add Course</TabsTrigger>
          <TabsTrigger value="event">Add Event</TabsTrigger>
        </TabsList>
        
        {/* Teacher Form */}
        <TabsContent value="teacher">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
            <form onSubmit={teacherForm.handleSubmit(handleTeacherSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    {...teacherForm.register("name", { required: true })}
                    placeholder="John Smith"
                  />
                  {teacherForm.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">Name is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    {...teacherForm.register("email", { 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                    type="email"
                    placeholder="teacher@school.edu"
                  />
                  {teacherForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">Valid email is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <Input
                    {...teacherForm.register("subject", { required: true })}
                    placeholder="Mathematics"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <Select 
                    onValueChange={(value) => teacherForm.setValue("department", value)}
                    defaultValue={teacherForm.getValues("department")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science & Mathematics</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="technology">Technology & Computer Science</SelectItem>
                      <SelectItem value="physical">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    {...teacherForm.register("phone")}
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Employee ID</label>
                  <Input
                    {...teacherForm.register("employeeId", { required: true })}
                    placeholder="T10001"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Qualifications</label>
                <Textarea
                  {...teacherForm.register("qualifications")}
                  placeholder="Ph.D. in Mathematics, 5+ years teaching experience"
                  className="min-h-[100px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Student Form */}
        <TabsContent value="student">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={studentForm.handleSubmit(handleStudentSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    {...studentForm.register("name", { required: true })}
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    {...studentForm.register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                    type="email"
                    placeholder="student@school.edu"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Grade/Year</label>
                  <Select 
                    onValueChange={(value) => studentForm.setValue("grade", value)}
                    defaultValue={studentForm.getValues("grade")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade/year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Student ID</label>
                  <Input
                    {...studentForm.register("studentId", { required: true })}
                    placeholder="S20001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Parent/Guardian Name</label>
                  <Input
                    {...studentForm.register("guardianName")}
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Parent/Guardian Phone</label>
                  <Input
                    {...studentForm.register("guardianPhone")}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Textarea
                  {...studentForm.register("address")}
                  placeholder="123 Main St, City, State, Zip"
                  className="min-h-[80px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Course Form */}
        <TabsContent value="course">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            <form onSubmit={courseForm.handleSubmit(handleCourseSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course Title</label>
                  <Input
                    {...courseForm.register("title", { required: true })}
                    placeholder="Introduction to Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Course Code</label>
                  <Input
                    {...courseForm.register("code", { required: true })}
                    placeholder="CS101"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <Select 
                    onValueChange={(value) => courseForm.setValue("department", value)}
                    defaultValue={courseForm.getValues("department")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science & Mathematics</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="technology">Technology & Computer Science</SelectItem>
                      <SelectItem value="physical">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Level</label>
                  <Select 
                    onValueChange={(value) => courseForm.setValue("level", value)}
                    defaultValue={courseForm.getValues("level")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Credits</label>
                  <Input
                    {...courseForm.register("credits", { 
                      required: true,
                      valueAsNumber: true 
                    })}
                    type="number"
                    placeholder="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <Input
                    {...courseForm.register("duration", { required: true })}
                    placeholder="1 semester"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  {...courseForm.register("description", { required: true })}
                  placeholder="Comprehensive introduction to computer science and programming..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prerequisites</label>
                <Textarea
                  {...courseForm.register("prerequisites")}
                  placeholder="None"
                  className="min-h-[80px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Add Course</Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Event Form */}
        <TabsContent value="event">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={eventForm.handleSubmit(handleEventSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <Input
                    {...eventForm.register("title", { required: true })}
                    placeholder="Annual Science Fair"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select 
                    onValueChange={(value) => eventForm.setValue("category", value)}
                    defaultValue={eventForm.getValues("category")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <Input
                    {...eventForm.register("time", { required: true })}
                    placeholder="10:00 AM"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    {...eventForm.register("location", { required: true })}
                    placeholder="Main Auditorium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Organizer</label>
                  <Input
                    {...eventForm.register("organizer", { required: true })}
                    placeholder="Science Department"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  {...eventForm.register("description", { required: true })}
                  placeholder="Annual science fair showcasing student projects..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Additional Information</label>
                <Textarea
                  {...eventForm.register("additionalInfo")}
                  placeholder="Open to all students and parents. Refreshments will be provided."
                  className="min-h-[80px]"
                />
              </div>
              
              <Button type="submit" className="w-full">Add Event</Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminForms;
