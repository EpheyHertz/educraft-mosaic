
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User, BookOpen, Award, FileText, Calendar, Phone, Mail, Home, Edit, Save, GraduationCap, Book } from 'lucide-react';

const TeacherProfile = () => {
  const { currentUser, isAuthenticated, isTeacher } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data 
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'teacher@school.edu',
    phone: '(555) 123-4567',
    address: '123 Campus Drive, University City, CA 94102',
    bio: 'Experienced educator with over 10 years of teaching in mathematics and computer science with a passion for innovative teaching methods.',
    teacherId: 'T12345',
    department: 'Science & Mathematics',
    joinDate: '2018-08-15',
    education: 'M.Ed in Mathematics Education, Stanford University',
    certifications: 'State Teaching License, Mathematics Specialist Certification'
  });

  // Form state for editing
  const [formData, setFormData] = useState({...profileData});

  // Mock classes taught
  const classesTaught = [
    { id: 1, code: 'MATH101', name: 'Introduction to Algebra', grade: '9th Grade', students: 28 },
    { id: 2, code: 'MATH202', name: 'Advanced Calculus', grade: '11th Grade', students: 22 },
    { id: 3, code: 'CS101', name: 'Computer Science Fundamentals', grade: '10th Grade', students: 25 },
    { id: 4, code: 'CS203', name: 'Data Structures', grade: '12th Grade', students: 18 }
  ];

  // Mock achievements
  const achievements = [
    { id: 1, title: 'Teacher of the Year', date: '2023-05-15', description: 'Awarded for exceptional teaching performance and student outcomes' },
    { id: 2, title: 'STEM Education Grant', date: '2022-09-10', description: 'Received $5,000 grant for innovative mathematics curriculum development' },
    { id: 3, title: 'Published Research Paper', date: '2021-11-20', description: 'Published "Engaging Students Through Technology" in Education Journal' }
  ];

  // Redirect if not authenticated or not a teacher
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isTeacher) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfileData({...formData});
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Teacher Profile</h1>
        <p className="text-gray-500">Manage your personal information and view your teaching portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={profileData.name} />
                  <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-gray-500">Teacher ID: {profileData.teacherId}</p>
                  <Badge className="mt-2">{profileData.department}</Badge>
                </div>
                <div className="w-full border-t border-gray-200 my-2 pt-4">
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <Home className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                    <span className="text-sm">{profileData.address}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your personal and professional details</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "outline" : "default"} 
                    size="sm" 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="education">Education</Label>
                          <Input 
                            id="education" 
                            name="education" 
                            value={formData.education} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="certifications">Certifications</Label>
                          <Input 
                            id="certifications" 
                            name="certifications" 
                            value={formData.certifications} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            name="bio" 
                            rows={4} 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Personal Details</h3>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Full Name:</dt>
                              <dd>{profileData.name}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Email:</dt>
                              <dd>{profileData.email}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Phone:</dt>
                              <dd>{profileData.phone}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Address:</dt>
                              <dd>{profileData.address}</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Professional Details</h3>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Teacher ID:</dt>
                              <dd>{profileData.teacherId}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Department:</dt>
                              <dd>{profileData.department}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Join Date:</dt>
                              <dd>{new Date(profileData.joinDate).toLocaleDateString()}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Education:</dt>
                              <dd>{profileData.education}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="text-gray-500">Certifications:</dt>
                              <dd>{profileData.certifications}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-2">Bio</h3>
                        <p className="text-gray-700">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Classes You Teach</CardTitle>
                  <CardDescription>Current classes and student information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classesTaught.map((course) => (
                      <div 
                        key={course.id} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg flex items-center">
                              <BookOpen className="h-5 w-5 mr-2 text-primary" />
                              {course.code}: {course.name}
                            </h3>
                            <p className="text-gray-500">{course.grade}</p>
                          </div>
                          <Badge variant="secondary">
                            {course.students} Students
                          </Badge>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                          <Button variant="outline" size="sm">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            View Grades
                          </Button>
                          <Button variant="outline" size="sm">
                            <Book className="h-4 w-4 mr-2" />
                            Lesson Plans
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your professional accomplishments and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{achievement.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
